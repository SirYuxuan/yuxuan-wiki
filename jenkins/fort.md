# 堡垒机接口项目部署
> 请按项目建立完善的项目目录
#### 1. 建立流水线项目
![](https://yuxuan-pic.oss-cn-hangzhou.aliyuncs.com/picGo20221026143242.png)
#### 2. 添加触发器使其代码提交自动发布，配置Token区分项目
![](https://yuxuan-pic.oss-cn-hangzhou.aliyuncs.com/picGo/202210261435212.png)
#### 3. 添加流水线代码进行保存
![](https://yuxuan-pic.oss-cn-hangzhou.aliyuncs.com/picGo/202210261436539.png)
#### 4. 流水线代码解释,凡是带注释的都需要注意修改
> 需要提前在堡垒机内运行Jenkins接收程序
> 接收程序下载地址在常用文件下载里 
[常用文件下载](/download.md)

> 还需要在接收程序的目录准备启动API项目的脚本 
```script
import java.text.SimpleDateFormat
def time = ""
pipeline {
   agent any

   tools {
      maven "maven3.8"
   }
   
   environment {
      // GIT仓库地址
	  GIT_REGISTRY = 'https://git.hsstwater.com/WCS-API/wcs-lanshan-api'
	  // 分支
	  GIT_BRANCH = 'master'
	  // 项目下载凭证，默认即可
	  GITLAB_ACCESS_TOKEN_ID = 'YuxuanGit'
	  // 这里指堡垒机上的接收程序。
	  // 堡垒机的公网IP+固定端口及路径
	  REMOTE_EXECUTE_HOST = 'http://58.59.43.49:50010/receive/release'
	  // 在堡垒机下载保存的文件名
	  SAVE_FILE_NAME="standardizationLanShan"
	  // 在堡垒机保存的目录
	  SAVE_PATH = "/mnt/project/standardization/"
	  // 项目名称
	  PROJECT_NAME = "岚山"
   }
   
   

   stages {
      stage('Build') {
         steps {
            // 获取代码
            git credentialsId: "${env.GITLAB_ACCESS_TOKEN_ID}", url: "${env.GIT_REGISTRY}", branch: "${env.GIT_BRANCH}"

            // maven 打包
            sh "mvn -Dmaven.test.failure.ignore=true clean package "

         }

      }
     
      stage('Push File') {
	    // 将jar包拷贝到Dockerfile所在目录
		steps {
		    script{
		      def dateFormat = new SimpleDateFormat("yyyyMMddHHmmss")
		      def date = new Date()
			  time = dateFormat.format(date)
		    }
		  
			sh "cp ${env.WORKSPACE}/target/*.jar /mnt/project/push/api/${time}.jar"
		
		}
	  }
	  
	  
	  stage('Notice Release') {

	    //请求堡垒机内的发布服务
		steps {
		   
		    //将body转换为json
            script {
              def toJson = {
                input ->
                groovy.json.JsonOutput.toJson(input)
            }
			//body定义,根据实际情况而定
			def body = [
                type:"api",
                fileName:"${time}.jar",
                saveName:"${SAVE_FILE_NAME}.jar",
                savePath:"${SAVE_PATH}",
                projectName:"${PROJECT_NAME}"
                
            ]
			
			sh "echo '通知接收服务开始发布项目'"
			response = httpRequest acceptType: 'APPLICATION_JSON', consoleLogResponseBody: true, contentType: 'APPLICATION_JSON', httpMode: 'POST', requestBody: toJson(body), responseHandle: 'NONE', url: "${env.REMOTE_EXECUTE_HOST}"
		    sh "echo '结束调用目标服务器发布'"	
		    sh "rm -rf /mnt/project/push/api/${time}.jar"
		}
		

	  }
   }
}
}

```