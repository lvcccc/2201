// const { default: axios } = require("axios");
// const res = require("express/lib/response");

class Login {
  constructor() {
    //   console.log(2333);
    // 给登录按绑定点击事件
    this.$('.login-w .over').addEventListener('click', this.clickFn.bind(this))
  }
  clickFn() {
     console.log(location.search);
    // 获取页面中的from点击事件
    let forms = document.forms[0].elements;
    // // console.log(forms);
    let username = forms.uname.value;
    let password = forms.password.value;
    // // 判断是否为空
    if (!username.trim() || !password.trim()) throw new Error('can not is none')
    // console.log(username,password);
    //发送axios请求
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    // 对参数进行编码
    let data = `username=${username}&password=${password}`;
    axios.post('http://localhost:8888/users/login', data).then(res => {
      let { status, data } = res;
      // console.log(data);
      if (status == 200) {

        //    判断是否登录成功
        if (data.code == 1) {
          // token 是登录 的 标识符
          localStorage.setItem('token', data.token);
          localStorage.setItem('user_id', data.user.id);

          //判断有没有携带地址
          if(location.search){
            // 带有就从哪来到哪去
            location.assign(location.search.split('=')[1])
          }else{
            // 没带跳转首页
            location.assign('./index.html')
          }
         

        } else {  // 登录失败,就提示输入错误
          layer.open({
            title: '登录提示'
            , content: '用户名或者密码输入错误'
          });
        }
      }
    })
  }
  // 获取节点方法
  $(tag) {
    let res = document.querySelectorAll(tag)
    return res.length == 1 ? res[0] : res;
  }
}
new Login