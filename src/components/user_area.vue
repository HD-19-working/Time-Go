<template>
    <div class="area_container">
      <div class="area_head">
        <button @click="backTo"></button>
      </div>
      <div class="floated_box">
      <transition :name="floated_side">
        <router-view></router-view>
      </transition>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'user_area',
      data(){
        return{
          floated_side:'right'  //设置路由跳转的动画样式类
        }
      },
      methods:{
        backTo:function () {
          this.$router.go(-1);
        }
      },
      watch:{
        '$route':function (to,from) { //判断路由跳转时是“左移动画”还是“右移动画”
          let toDepth = to.path.split('/').length;
          let fromDepth = from.path.split('/').length;
          this.floated_side = toDepth >= fromDepth ? 'right' : 'left'
        }
      }
    };
</script>

<style scoped>
  .area_container{
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
  .area_head{
    width: 100%;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .area_head>button{
    width: 20px;
    height: 20px;
    display: block;
    margin-right: 20px;
    margin-left: auto;
    background-color: transparent;
    background-image: url("../../static/img/cha.png");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    outline: none;
    border: none;
  }
  .floated_box{
    width: 100%;
    position: relative;
  }
  .floated_box>*{
    width: 100%;
    position: absolute;
  }
  .right-enter-active,.right-leave-active,
  .left-enter-active,.left-leave-active{
    transition: all 0.5s;
    transform: translateX(0);
  }
  .right-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .right-leave-active{
    opacity: 0;
    transform: translateX(-100%);
  }
  .left-enter{
    opacity: 0;
    transform: translateX(-100%);
  }
  .left-leave-active{
    opacity: 0;
    transform: translateX(100%);
  }
</style>
