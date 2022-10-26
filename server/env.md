# 环境搭建

> 本文环境适用与Centos7。其余Centos版本部分命令略有差异

> 如果服务器有网络但不能访问百度等,可以手动配置DNS

```shell
# 修改配置文件
vim /etc/NetworkManager/NetworkManager.conf
# 在main中添加 dns=no，按键盘i进入编辑模式，编辑完成后按ESC退出编辑模式，输出“:wq”保存退出
# 具体请百度VIM使用。

# 修改resolv.conf配置文件
vim /etc/resolv.conf
#添加以下内容
#主DNS服务器
nameserver 114.114.114.114
#备DNS服务器
nameserver 8.8.8.8
# 重启网络服务
systemctl restart NetworkManager

```
> 前置条件，两台服务器都需要有可外网访问的端口，默认 数据库服务器为20000-20005 应用服务器为 30000-30010

> 修改XShell配置，保证中文正常输出
![](https://yuxuan-pic.oss-cn-hangzhou.aliyuncs.com/picGo/202210261633262.png)
![](https://yuxuan-pic.oss-cn-hangzhou.aliyuncs.com/picGo/202210261632265.png)

#### 一. 基础操作，数据库服务器\应用服务器都需要操作
1. 宝塔安装，宝塔是一个服务器运维工具，具体可以去百度了解
```shell
# 输出以下命令进行安装
yum install -y wget && wget -O install.sh http://download.bt.cn/install/install_6.0.sh && sh install.sh ed8484bec
# 中途会询问是否创建www目录 输入y进行确认
# 完成之后输入 "bt" 
# 出现菜单后输入 8 
# 在数据库服务器输入端口20005/应用服务器输入端口30010
# 重新输入 "bt" > 输入 6 修改用户名
# 重新输入 "bt" > 输入 5 修改密码
# 输入 "bt default" 获取端口后的安全入口 例如 http://ip:port/305be3f9
# 宝塔访问地址为 http://外网IP:20005/安全入口
```
