# 常用命令分享

> 本文大部分命令在Linux系统环境下都可使用，部分指定仅支持RedHat系列系统

### 1. 目录/文件操作

```shell
# 进入目录
cd 目录名
# 返回上一级目录
cd ..
# 返回上两级目录
cd ../..
# 返回上次操作的目录
cd -
# 复制文件 从第一个文件 复制到另一个文件
cp /path/fileName /newPath/fileName
# 复制目录
cp /path/* /newPath
# 查看当前所在目录
pwd
# 查看当前目录下文件
ls
# 查看当前目录下文件详细信息，大小/修改日期等
ll 
# 创建目录 
mkdir dir1
# 创建一个目录树
mkdir -p /tmp/dir1/dir2
# 移动重名名一个目录或文件
mv /path/fileName /path/newFileName
# 删除文件
rm -r file
# 删除目录及子目录内容
rm -rf /path
```

> 在Linux下没有磁盘的概念，所有文件及目录都在“/”下 如果要执行删除操作请携带具体目录，禁止执行 rm -rf /

### 2. 查看文件内容

```shell
# 显示整个文件内容
cat file
# 查看一个文件的前两行
head -2 file
# 查看一个长文件的内容
more file
# 从最后一行反向查看一个文件
tac file
# 查看一个文件最后3行
tail -3 file
# 滚动输出日志
tail -f logFile
```

### 3. 文本处理

```shell
# 在文件 '/tmp/test' 中查找 "str"
grep str /tmp/test            
#  在文件 '/tmp/test' 中查找以 "str" 开始的行
grep ^str /tmp/test          
# 查找 '/tmp/test' 文件中所有包含数字的行
grep [0-9] /tmp/test         
# 在目录 '/tmp' 及其子目录中查找 "str"
grep str -r /tmp/*             
# 找出两个文件的不同处
diff file1 file2                   
# 以对比的方式显示两个文件的不同
sdiff file1 file2                 
```

### 4. 文件查找

```shell
# 从 '/' 开始进入根文件系统查找文件和目录
find / -name file1                                                 
# 查找属于用户 'user1' 的文件和目录
find / -user user1                                                
# 在目录 '/ home/user1' 中查找以 '.bin' 结尾的文件
find /home/user1 -name \*.bin                            
# 查找在过去100天内未被使用过的执行文件
find /usr/bin -type f -atime +100                         
# 查找在10天内被创建或者修改过的文件
find /usr/bin -type f -mtime -10                           
# 寻找以 '.ps' 结尾的文件，先运行 'updatedb' 命令
locate \*.ps                                                         
# 在当前目录及其子目录所有.c和.h文件中查找 'expr'
find -name '*.[ch]' | xargs grep -E 'expr'              
# 在当前目录及其子目录的常规文件中查找 'expr'
find -type f -print0 | xargs -r0 grep -F 'expr'        
# 在当前目录中查找 'expr'
find -maxdepth 1 -type f | xargs grep -F 'expr'    

```

### 5. 压缩/解压
> 如果提示指令找不到，可以使用yum进行安装，例：yum install -y unzip
```shell
# 压缩当前目录
zip -r name.zip .
# 解压压缩包
unzip name.zip
# tar解压
tar -zxvf file.tar.gz

```

### 6. Yum操作

```shell
# 下载并安装一个rpm包
yum -y install [package]
# 删除一个rpm包
yum remove [package]
# 列出当前系统中安装的所有包
yum list     
# 在rpm仓库中搜寻软件包
yum search [package]                 
# 清除缓存目录（/var/cache/yum）下的软件包
yum clean [package]                   
# 删除所有头文件
yum clean headers                      
# 删除所有缓存的包和头文件
yum clean all                                
                                   
```

### 7. 网络操作

```shell
# 检测网络联通状态
ping www.baidu.com
# 查看防火墙状态
firewall-cmd --state
# 关闭防火墙
systemctl stop firewalld.service
# 禁止防火墙开机启动
systemctl disable firewalld.service 
# 显示一个以太网卡的配置
ifconfig eth0                                                                       
# 配置网卡的IP地址
ifconfig eth0 192.168.1.1 netmask 255.255.255.0            
# 禁用 'eth0' 网络设备
ifdown eth0                                                                        
# 启用 'eth0' 网络设备
ifup eth0                                                                            
# 显示一个无线网卡的配置
iwconfig eth1                                                                     
# 显示无线网络
iwlist scan                                                                         
# 显示网卡的IP地址
ip addr show                                                                     

```