<template>
  <div class="comment_box" :class="{'border_control': isBorder}">
    <div class="user_information">
      <div class="user_icon_class" :style="user_icon_style"></div>
      <div class="user_name_grade">
        <div>{{user_data.user_name}}</div>
        <div class="start_box" :style="start_background">
          <img src="../../static/img/start.png" alt="" />
          <img src="../../static/img/start.png" alt="" />
          <img src="../../static/img/start.png" alt="" />
          <img src="../../static/img/start.png" alt="" />
          <img src="../../static/img/start.png" alt="" />
        </div>
      </div>
    </div>
    <div class="comment_text">
      {{user_data.comment_text}}
    </div>
    <div class="img_box">
      <img v-for="(item,index) in user_data.images"
           :key="'img_box'+index"
           :src="item" alt="">
    </div>
    <div class="comment_date">
      {{user_data.comment_date}}
    </div>
  </div>
</template>

<script>
    export default {
      name: 'comment_item',
      props:{
        user_data:{
          type:Object,
          default(){
            return{
              user_img:'./static/img/button.png',
              user_name:'HD',
              user_grade:5,
              comment_text:'真滴好~~~~~',
              comment_date:'2020/10/29',
              images:[]
            }
          }
        },
        isBorder:{
          type:Number,
          default:0
        }
      },
      data(){
        return{
          user_icon_style: {
            backgroundImage:"url("+(this.user_data.user_img || './static/img/user_default.png')+")"
          },
          start_background:{
            width:(this.user_data.user_grade/5)*80+'px',
            backgroundColor:'orange'
          }
        }
      }
    };
</script>

<style scoped>
  .comment_box{
    width: 100%;
    padding: 14px 0;
  }
  .border_control{
    border-top: 1px solid gainsboro;
  }
  .user_information{
    width: 100%;
    display: flex;
    height: auto;
  }
  .user_icon_class{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .user_name_grade{
    flex: 1;
    height: 50px;
  }
  .user_name_grade>div{
    width: 100%;
    margin-left: 5px;
    box-sizing: border-box;
    display: flex;
  }
  .user_name_grade>div:nth-child(1){
    line-height: 25px;
    font-size: 14px;
  }
  .comment_text{
    width: 100%;
    font-size: 14px;
    padding: 10px 0;
    word-break: break-word;
    height: auto;
  }
  .img_box{
    width: 100%;
    display: flex;
    align-items: center;
  }
  .img_box>img{
    width: 60px;
    margin-right: 5px;
  }
  .comment_date{
    width: 100%;
    font-size: 12px;
    height: auto;
    color: lightgrey;
    font-weight: bold;
  }
  .start_box{
    /*outline: white 2px solid;*/
    border: none;
    display: flex;
    overflow: hidden;
    font-size: 0;
  }
  .start_box>img{
    width: 16px;
    /*outline: white 2px solid;*/
    height: 16px;
    border: none;
    box-sizing: border-box;
    /*box-shadow: 0 0 0 1px white inset;*/
  }
</style>
