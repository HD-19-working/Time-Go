<template>
    <div class="menu_container">
      <div class="area_body">
        <label>
          <div class="user_icon_img" :style="user_icon_style"></div>
         <!-- <img :src="area_img" alt="../../static/img/user_default.png">-->
          <input type="file"
                 name="replace_img"
                 ref="replace_img"
                 @change="sendImg"
                 accept="image/jpeg,image/jpg,image/png" />
        </label>
        <div class="area_id">
          <div>{{this.$store.state.name}}</div>
          <div>{{this.$store.state.phone}}</div>
        </div>
      </div>
      <div class="area_option">
        <div v-for="(item,index) in option_list" :key="'area_option'+index" class="option_item">
          <option_item :data="item"></option_item>
        </div>
      </div>
    </div>
</template>

<script>
  import option_item from './option_item';
  import axios from 'axios';
    export default {
      name: 'option_menu',
      data(){
        return{
          user_icon_style:{
            backgroundImage:"url("+(this.$store.state.user_img || './static/img/user_default.png')+")"
          },
          option_list:[
            {
              query_data:'',
              is_back:0,
              back_step:0,
              img_link:'./static/img/menu_name.png',
              option_name:'昵称',
              tag_text:this.$store.state.name,
              go_to:'option_menu/change_name'
            },
            {
              is_back:0,
              back_step:0,
              img_link:'./static/img/menu_phone.png',
              option_name:'电话',
              tag_text: this.$store.state.phone,
              go_to:'option_menu/verify_password',
              query_data:'verify_password/change_phone'
            },
            {
              tag_text:'',
              is_back:0,
              back_step:0,
              img_link:'./static/img/menu_change.png',
              option_name:'修改密码',
              go_to:'option_menu/verify_password',
              query_data: 'verify_password/change_password'
            },
            {
              tag_text:'',
              is_back:0,
              back_step:0,
              img_link:'./static/img/menu_manage.png',
              option_name:'管理摊位',
              go_to:'option_menu/verify_password',
              query_data: 'verify_password/manage_store'
            },
            {
              tag_text:'',
              go_to:'',
              query_data:'',
              img_link:'./static/img/menu_exit.png',
              option_name:'退出登录',
              is_back:1,
              back_step:-1
            }
          ],
          /*area_img:this.$store.state.user_img || './static/img/user_default.png',//存储头像图片路径*/
          user_img:null //存储用户上传的头像图片文件
        }
      },
      methods:{
        replaceImg:function () {  //创建临时url在未刷新的情况下显示用户上传的头像
          this.user_icon_style.backgroundImage='url('+window.URL.createObjectURL(this.user_img)+')';
          /*this.area_img=window.URL.createObjectURL(this.user_img);*/
        },
        sendImg:function () {
          this.user_img=this.$refs.replace_img.files[0];
          let i=new FormData();
          i.append('user_img',this.user_img,this.user_img.name);
          i.append('phone',this.$store.state.phone);
          axios({
            url:this.$store.state.request_link+'/user/changeUserPhoto',
            method:'post',
            data:i,
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response)=>{
            let callData=response.data;
            if(callData.code===0) {
              this.replaceImg();
              this.$store.commit('changeImg', callData.data);
            }else if(callData.code===1){
              alert(callData.msg);
            }
          });
        }
      },
      components:{
        option_item
      }
    };
</script>

<style scoped>
  .menu_container{
    width: 100%;
  }
  .area_body{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    padding: 20px 15px;
  }
  /*.area_body img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    outline: none;
    border: none;
  }*/
  .user_icon_img{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    outline: none;
    border: none;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .area_body input{
    display: none;
  }
  .area_id{
    flex: 1;
    font-family: Arial;
    font-weight: bold;
  }
  .area_id>div:nth-child(n+1){
    font-size: 14px;
    box-sizing: border-box;
    padding-left: 10px;
    line-height: 18px;
    color: darkgrey;
  }
  .area_id>div:nth-child(1){
    font-size: 20px;
    padding-left: 10px;
    line-height: 25px;
    box-sizing: border-box;
    color: black;
  }
  .area_option{
    width: 100%;
    box-sizing: border-box;
    padding: 20px 0;
  }
  .option_item{
    width: 100%;
  }
</style>
