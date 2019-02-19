var e = "https://yangsheng.sjwke.com/?r=",
  r = {
    login: 'https://yangsheng.sjwke.com/?r=mobile/default/login',//用户登录

    //信息中心
    infoCenter: {
      // info: e + 'mobile/msg/index',
      List:'https://yangsheng.sjwke.com/?r=mobile/news/index', //信息中心列表
      detail: 'https://yangsheng.sjwke.com/?r=mobile/news/show', //信息详情
      bjread:'https://yangsheng.sjwke.com/?r=mobile/news/read', //把信息标记为已读
      peread:'https://yangsheng.sjwke.com/?r=mobile/news/getreaders',//信息被那些人员阅读过
      create:'https://yangsheng.sjwke.com/?r=mobile/news/addarticle',//信息添加 
      infodel:'https://yangsheng.sjwke.com/?r=mobile/news/del', //信息删除
      infoselect:'https://yangsheng.sjwke.com/?r=mobile/news/updatearticle', //信息修改
      infoclas: 'https://yangsheng.sjwke.com/?r=mobile/news/category' //信息分类
    },

    //任务指派
    taskAssigned: {
      taskadd:'https://yangsheng.sjwke.com/?r=mobile/assignment/add', //任务添加
      tasklist:'https://yangsheng.sjwke.com/?r=mobile/assignmentfinished/index',//已完成任务列表
      tasksearch: 'https://yangsheng.sjwke.com/?r=mobile/assignmentfinished/search',//已完成任务搜索
      taskdetail:'https://yangsheng.sjwke.com/?r=mobile/assignment/show',//任务详细页
      tasknolist:'https://yangsheng.sjwke.com/?r=mobile/assignmentunfinished/index',//待办任务列表
      taskeditor:'https://yangsheng.sjwke.com/?r=mobile/assignment/edit',//任务编辑
      taskend: 'https://yangsheng.sjwke.com/?r=mobile/assignmentunfinished/tofinished', //完成任务
      comments: 'https://yangsheng.sjwke.com/?r=mobile/assignment/comments' //任务动态
    },

    //通讯录
    Address: {
      addressindex: 'https://yangsheng.sjwke.com/?r=mobile/api/deptlist', // 通讯录主页面
      addresslist: 'https://yangsheng.sjwke.com/?r=mobile/api/getDataByDept', //根据部门id返回用户信息
    },

    modify:'https://yangsheng.sjwke.com/?r=mobile/setting/update', //修改个人信息
    upload: 'https://yangsheng.sjwke.com/?r=mobile/setting/upload', //头像上传
    pwd: 'https://yangsheng.sjwke.com/?r=mobile/setting/changepass',//修改密码
    exit: 'https://yangsheng.sjwke.com/?r=mobile/default/logout',//退出登录
  };
module.exports = r;