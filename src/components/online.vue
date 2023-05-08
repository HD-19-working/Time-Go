<template>
    <div class="online_box" ref="online_box" :style="box_style">
      <div class="top_head">
        <svg viewBox="-200 -100 400 120" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <text>TIME GO!</text>
          <text>TIME GO!</text>
          <text>TIME GO!</text>
        </svg>
        <svg viewBox="0 20 150 40 "  preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <defs>
            <path id="move-wave" d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z" stroke="none" fill="white"></path>
          </defs>
          <use xlink:href="#move-wave"  x="48"  y="7" ></use>
          <use xlink:href="#move-wave"  x="48"  y="5" ></use>
          <use xlink:href="#move-wave"  x="48"  y="3" ></use>
          <use xlink:href="#move-wave"  x="48"  y="0" ></use>
        </svg>
      </div>
      <div class="section_container">
        <div>
          <button @click="replaceTo('login')" class="options">登录</button>
          <button @click="replaceTo('register')" class="options">注册</button>
        </div>
        <div>
          <keep-alive>
            <router-view></router-view>
          </keep-alive>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'online',
      data(){
        return{
          box_style:{
            height:'100vh'
          }
        }
      },
      methods:{
        setHeight:function () {
          this.box_style.height=this.$refs.online_box.offsetHeight+'px';  //重定义盒子高度，防止输入框顶起盒子
        },
        replaceTo:function (e) {
          this.$router.replace(e);
        }
      },
      mounted() {
        this.setHeight();
      }
    };
</script>

<style scoped>
  .top_head text{
    font-size: 50px;
    stroke-dashoffset: 0;
    stroke-dasharray: 0,100;
    stroke-width: 1;
    fill-opacity: 0;
    font-family: "Brandon Grotesque Light";
    text-anchor: middle;
    fill: white;
    stroke: #ffffff;
  }
  .top_head text:nth-child(3n+1){
    animation: stroke1 10s ease-in-out forwards;
  }
  .top_head text:nth-child(3n+2){
    animation: stroke2 10s ease-in-out forwards;
  }
  .top_head text:nth-child(3n+3){
    animation: stroke3 10s ease-in-out forwards;
  }
  @keyframes stroke1{
    60%{
      fill-opacity: 0;
      stroke-dashoffset: 300;
      stroke-dasharray: 50,100;
      stroke-opacity: 1;
    }
    100%{
      fill-opacity: 1;
      stroke-dashoffset: 300;
      stroke-dasharray: 50,100;
      stroke-opacity: 0;
    }
  }
  @keyframes stroke2{
    60%{
      fill-opacity: 0;
      stroke-dashoffset: 350;
      stroke-dasharray: 50,100;
      stroke-opacity: 1;
    }
    100%{
      fill-opacity: 1;
      stroke-dashoffset: 350;
      stroke-dasharray: 50,100;
      stroke-opacity: 0;
    }
  }
  @keyframes stroke3{
    60%{
      fill-opacity: 0;
      stroke-dashoffset: 400;
      stroke-dasharray: 50,100;
      stroke-opacity: 1;
    }
    100%{
      fill-opacity: 1;
      stroke-dashoffset: 400;
      stroke-dasharray: 50,100;
      stroke-opacity: 0;
    }
  }
  use:nth-child(2){
    opacity: 1;
    animation: move-forever 20s -2s linear infinite;
  }
  use:nth-child(3){
    opacity: 0.3;
    animation: move-forever 15s -4s linear infinite;
  }
  use:nth-child(4){
    opacity: 0.5;
    animation: move-forever 12s -3s linear infinite;
  }
  use:nth-child(5){
    opacity: 0.7;
    animation: move-forever 9s -2s linear infinite;
  }
  @keyframes move-forever{
    0%{
      transform: translate3d(-90px,0,0);
    }
    100%{
      transform: translate3d(85px,0,0);
    }
  }
  .section_container{
    height: 70%;
    background-color: #ffffff;
  }
  .section_container,.top_head{
    display: flex;
    position: relative;
    flex-direction: column;
  }
  .online_box{
    width: 100%;
    box-sizing: border-box;
    background-color: #ffffff;
  }
  .top_head{
    height: 30%;
    width: 100%;
    background-color: cornflowerblue;
  }
  .top_head svg:nth-child(n){
    width: 100%;
  }
  .top_head svg:nth-child(1){
    flex: 1;
  }
  .top_head svg:nth-child(2){
    height: 14vw;
    background-color: transparent;
  }
  .section_container>div:nth-child(1){
    padding-left: 20px;
    background: #ffffff;
  }
  .options{
    margin-left: 20px;
    font-size: 6.4vw;
    font-weight: 600;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -webkit-user-select: none;
    -moz-user-select: none;
    text-decoration: none;
    color: cornflowerblue;
    background-color: white;
    outline: none;
    border: none;
  }
  .section_container>div:nth-child(2){
    width: 100%;
    flex: 1;
    background: #ffffff;
  }
</style>
