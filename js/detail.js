class Zoom {
  constructor(smallbox, move, bigbox, moveImg) {
      this.smallbox = smallbox
      this.move = move
      this.bigbox = bigbox
      this.moveImg = moveImg
      this.maxMoveSizeX = 0
      this.maxMoveSizeY = 0
      this.init()     
  }
  init(){
      this.zoomMoveOut()
      this.zoomMove()
  }
  setMoveSize(){
      // 移动盒子的大小 = 大盒子/图片大小*小盒子
      this.move.style.width = this.bigbox.clientWidth/this.moveImg.clientWidth*this.smallbox.clientWidth + "px"
      this.move.style.height = this.bigbox.clientHeight/this.moveImg.clientHeight*this.smallbox.clientHeight + "px"
      this.maxMoveSizeX = this.smallbox.clientWidth - this.move.clientWidth 
      this.maxMoveSizeY = this.smallbox.clientHeight - this.move.clientHeight
  }
  zoomMoveOut(){
      // 初始化 移入遮罩层
      this.smallbox.onmouseenter = () => {
          this.move.style.display = "block"
          this.bigbox.style.display = "block"
          this.setMoveSize()
      }
      
      this.smallbox.onmouseleave = () => {
          this.move.style.display = "none"
          this.bigbox.style.display = "none"
      }
  }
  zoomMove(){
      // 给移动那个的盒子加移动事件
      this.smallbox.onmousemove = (e) => {
          e = e || window.event
          /* // 获取鼠标在小盒子里面的位置
          let moveX = e.clientX - this.smallbox.offsetLeft
          let moveY = e.clientY - this.smallbox.offsetTop
          // 在事件中移动鼠标控制移动的盒子位置改变
          // 鼠标在move中心点的位置
          let centerX = this.move.clientWidth / 2
          let centerY = this.move.clientHeight / 2 */
          // 鼠标在遮罩层里面的位置
          let targetX = e.pageX - this.smallbox.offsetLeft - this.move.clientWidth / 2
          let targetY = e.pageY - this.smallbox.offsetTop - this.move.clientHeight / 2
          /* // 区间判断 全局变量 不会在拖拽时变化，抽取为全局
          let maxMoveSizeX = this.smallbox.clientWidth - 2 - this.move.clientWidth
          let maxMoveSizeY = this.smallbox.clientHeight - 2 - this.move.clientHeight */
          if (targetX < 0) targetX = 0
          if (targetY < 0) targetY = 0
          if (targetX > this.maxMoveSizeX) targetX = this.maxMoveSizeX
          if (targetY > this.maxMoveSizeY) targetY = this.maxMoveSizeY
          this.move.style.left = targetX + "px"
          this.move.style.top = targetY + "px"
          //同时控制大盒子里面的图片坐标变化（图片相对于盒子移动所以要乘以-1）
          this.moveImg.style.left = targetX * this.moveImg.clientWidth / this.smallbox.clientWidth * -1  +"px"
          this.moveImg.style.top = targetY * this.moveImg.clientHeight / this.smallbox.clientHeight * -1 + "px"
          // console.log(smallbox.clientWidth / move.clientWidth)
      }
  }
}
// 获取小盒子
let smallbox = document.getElementsByClassName('preview_img')[0]
// 获取移动的盒子
let move = document.getElementsByClassName('mask')[0]
// 获取大盒子
let bigbox = document.getElementsByClassName('big')[0]
// 获取大盒子里面的图片
let moveImg = document.querySelector('.big>img')
let p = new Zoom(smallbox, move, bigbox, moveImg)
// 给小盒子移入事件 移动的盒子显示
