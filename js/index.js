class index {
constructor(){
    this.checkLogin();
}
async checkLogin() {
    // 获取token值,进行判断
    const TOKEN = localStorage.getItem('token');
    // 判断是否登录过期
    axios.defaults.headers.common['authorization'] = TOKEN;
    let userId = localStorage.getItem('user_id');
    let { data, status } = await axios.get('http://localhost:8888/users/info/' + userId);
    // console.log(data);

    // 如果没有token肯定没有登录
    if (!TOKEN || data.code == 401) {
      location.assign('./login.html?ReturnUrl=./cart.html')
    }
  }

  // 获取购物车中的数据
  async getCartGoods() {
    const TOKEN = localStorage.getItem('token');
    let userId = localStorage.getItem('user_id');
    axios.defaults.headers.common['authorization'] = TOKEN;
    let { data, status } = await axios.get('http://localhost:8888/cart/list?id=' + userId);
    if (status == 200) {
      // 判断是否超过有效期,过期则跳转到登录页面
      if (data.code == 401) location.assign('./login.html?ReturnUrl=./cart.html')
      // 判断接口的状态
      if (data.code == 1) {
        let html = '';
        // console.log(data.cart);
        data.cart.forEach(goods => {
          html += `<ul data-id="${goods.goods_id}" class="goods-list yui3-g">
          <li class="yui3-u-3-8 pr">
              <input type="checkbox" class="good-checkbox">
              <div class="good-item">
                  <div class="item-img">
                      <img src="${goods.img_small_logo}">
                  </div>
                  <div class="item-msg">${goods.title}</div>
              </div>
          </li>
          <li class="yui3-u-1-8">
             
          </li>
          <li class="yui3-u-1-8">
              <span class="price">${goods.price}</span>
          </li>
          <li class="yui3-u-1-8">
              <div class="clearfix">
                  <a href="javascript:;" class="increment mins">-</a>
                  <input autocomplete="off" type="text" value="${goods.cart_number}" minnum="1" class="itxt">
                  <a href="javascript:;" class="increment plus">+</a>
              </div>
              <div class="youhuo">有货</div>
          </li>
          <li class="yui3-u-1-8">
              <span class="sum">${goods.price * goods.cart_number}</span>
          </li>
          <li class="yui3-u-1-8">
              <div class="del1">
                  <a href="javascript:;">删除</a>
              </div>
              <div>移到我的关注</div>
          </li>
      </ul>`;
        });

        this.$('.cart-list').innerHTML = html;

      }


    }


  }






 $(tag) {
    let res = document.querySelectorAll(tag)
    return res.length == 1 ? res[0] : res;
}

} 

new index();