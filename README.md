# FantasyDreamStoryClubVUE

绮梦故事会网站——前端    
FantasyDreamStoryClub-绮梦故事会网站源码分享（故事接龙网站）    
**后端源码跳转：https://github.com/1051727403/FantasyDreamStoryClubJAVA**
  
  
## 使用方式：  
本项目为springboot项目，项目成品可通过访问域名查看：www.qmstory.club  或ip地址:  http://118.89.184.240/   
项目启动前请修改utils中的request.js文件来配置axios拦截器等  
该项目为开源项目，欢迎大家提出修改意见或学习参考。  
  
前端启动请使用指令：npm run sever  
  

## 首页展示：  
![image](https://github.com/1051727403/FantasyDreamStoryClubVUE/assets/70049475/95600828-cb76-4260-a956-556d0c47c722)

  
## 注意  
该网站源码仅为个人学习测试使用，请在下载后24小时内删除，不得用于商业用途，否则后果自负。任何违规使用造成的法律后果与本人无关。  
  

## 更新日志

2023-6-24 
- 树状图优化重构ing，添加动画样式，可用animate实现动画效果,修改树状图曲线从贝尔赛曲线变为直线

2023-6-25
- 实现添加子节点功能，修复点击bug，自定义数据可存放于data。
- 可将片段内容展示在悬浮框中，完善侧边框以及样式
- 完善header和详情页设计

2023-6-26
- 实现预览，鼠标移动到片段可查看部分内容
- 个人中心路由实现
- 实现选择下一幕和返回上一幕，侧边栏ui优化

2023-6-27
- header网页链接跳转和前端实现md5加密
- 评论区雏形,内嵌于侧边栏
- 修复添加子节点bug，优化评论区等细节
- header登录显示头像
- 添加点赞和收藏

2023-6-28
- 优化页面布局以及交互,修复bug
- 详情页收藏实现

2023-6-29
- 用户信息页展示完成
- 优化交互，完善接龙逻辑
- 用户中心-收藏-故事

2023-6-30
- 添加删除片段功能实现，优化ui
- 用户中心-片段-上传故事

2023-7-1
- 修改片段完成，目前可以直接修改是否可接龙，不判断后续是否有其他人接龙过
- 评论功能实现，可展开收起过多评论
- 个人中心修改

2023-7-2
- 个人中心我的片段
- 评论区功能全部实现
- 修复跳转bug
- 故事详情页评论区完成
2023-7-3
- 管理端路由完成-用户/标签管理完成
- 修复跳转bug，添加JWT接口


