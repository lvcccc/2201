// const { default: axios } = require("axios");

// const { lazyrouter } = require("express/lib/application");

class List {
  constructor() {
    // 给属性赋值，调用其他方法
    this.getData();
    // 將加入購物車使用事件委託
    this.$('.sk_bd ul').addEventListener('click', this.addCartFn.bind(this))
  }
  // 获取数据的方法
  async getData() {
    // 等待promise 对象解包完成
    let { data, status } = await axios.get('http://localhost:8888/goods/list?current=1')
    // console.log(data,status);
    //判断返回值状态，追加数据
    if (status == 200) {
      // console.log(data);
      let html = '';

      data.list.forEach(goods => {
        // console.log(goods);
        html += `
  <li class="sk_goods" data-id="${goods.goods_id}">
<a href="detail.html"><img src="${goods.img_big_logo}" alt=""></a>
<h5 class="sk_goods_title">${goods.title}</h5>
<p class="sk_goods_price"><em>${goods.current_price}</em> <del>${goods.price}</del></p>
<div class="sk_goods_progress">
    已售<i>${goods.sale_type}</i>
    <div class="bar">
        <div class="bar_in"></div>
    </div>
    剩余<em>${goods.goods_number}</em>件
</div>
<a href="#none" class="sk_goods_buy">立即抢购</a>
</li> `
      })
      this.$('.sk_bd ul').innerHTML = html;
    }
  }

  // 加入購物車方法
  async addCartFn(eve) {
    // console.log(this);
    // console.log(eve.target);
    //判斷用戶是否登錄,如果能獲取到token則表示登錄.獲取不到表示未登錄
    let token = localStorage.getItem('token');
    //  跳转页面
    if (!token) location.assign('./login.html?ReturnUrl=./list.html')
    // 判断是否点击的是A便签
    if (eve.target.classList.contains('sk_goods_buy')) {
      // 获取商品ID。
      let lisObj = eve.target.parentNode;
      let goodsId = lisObj.dataset.id;
      // console.log(lisObj);
      let userId = localStorage.getItem('user_id');
      // 俩个ID都有才能获取
      if (!userId || !goodsId) throw new Error('can is noneERROR')
      axios.defaults.headers.common['authorization'] = token;
      // 必须设置内容的类型，默认是json格式，是处理不了的
      axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      // 数据必须是以原生的方式拼接好
      let param = `id=${userId}&goodsId=${goodsId}`;
      // console.log(eve.target);
      //如果用户登陆，则将数据信息添加到购物车中
      let {data,status} =await axios.post('http://localhost:8888/cart/add', param)
      if(status == 200){
        if(data.code == 1){
          layer.open({
            content:'购物成功',
            btn:['留在这里','去购物车结算'],
            yes:function(index,layer){
            //  按钮一回调
            return location.assign('./list.html')
            // return false;
            },
            btn2:function(index,layer){
            // 按钮二回调
            location.assign('./cart.html')
            }
          })
        }
      }
    }

  }

  // 获取节点方法
  $(tag) {
    let res = document.querySelector(tag)
    return res.length == 1 ? res[0] : res;
  }
}
new List

