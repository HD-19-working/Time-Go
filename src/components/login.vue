<template>
  <div>
    <input_item v-for="(item,index) in login_style"
                :key="index"
                :item_style="item"
                :item-index="index"
                @checking="checking"></input_item>
    <div class="help_box">
      <router-link to="message_login" class="help_tag">短信登录</router-link>
      <router-link to="forget_password" class="help_tag">忘记密码？</router-link>
    </div>
    <div class="button_box"><button @click="login_submit">登录</button></div>
  </div>
</template>

<script>
  import input_item from './input_item';
    export default {
      name: 'login',
      data(){
        return{
          phone_text:'',
          password_text:'',
          isPhoneRight:0, //状态开关，判断phone_text是否复合标准
          isPasswordRight:0,  //状态开关，判断password_text是否复合标准
          login_style:[
            {
              inputType:'text',
              inputName:'phone',
              inputTagName:'phone_tag',
              inputTagImgName:'phone_tag_img',
              placeHolderText:'请输入您的手机号码',
              imgLink:'./static/img/phoneRegister.png',
              imgSize:'8.16vw',
              imgDistance:'3px',
              itemState:0,
              itemWarning: '',
              marginTop:'6.8vw'
            },
            {
              inputType:'password',
              inputName:'password',
              inputTagName:'password_tag',
              inputTagImgName:'password_tag_img',
              placeHolderText:'请输入您的密码',
              imgLink:'./static/img/closeLock.png',
              imgSize:'6.1vw',
              imgDistance:'5px',
              itemState:0,
              itemWarning: '',
              marginTop:'2vw'
            }
          ]
        }
      },
      components:{
        input_item
      },
      methods:{
        checking:function(checker){ //input_item里面文本改变时，回调执行
          if(checker.text===''){
            this.login_style[checker.index].itemState=-1;
            this.isPhoneRight=0;
          }
          else{
            if(checker.whichOne==='phone'){
              if(!isNaN(Number(checker.text))) {
                this.login_style[checker.index].itemState = 1;
                this.isPhoneRight = 1;
                this.phone_text = checker.text;
              }else{
                this.login_style[checker.index].itemState = 0;
                this.isPhoneRight = 0;
                this.login_style[checker.index].itemWarning='电话号码格式不正确'
              }
            }
            else if(checker.whichOne==='password'){
              this.login_style[checker.index].itemState=1;
              this.isPasswordRight=1;
              this.password_text=checker.text;
            }
          }
        },
        login_submit:function () {  //提交执行
          if(this.isPhoneRight===1&&this.isPasswordRight===1){
            this.submit_send(this.phone_text,this.password_text);
          }
        },
        submit_send:function(phone,password){ //发送登录信息
          let request=new XMLHttpRequest();
          request.open('POST',this.$store.state.request_link+'/user/login');/*-------------------------------------------------------*/
          request.setRequestHeader('content-type','application/json');
          request.onload=()=>{
            let callData=JSON.parse(request.responseText);
            if(callData.code===1){
              alert(callData.msg);
            }else if(callData.code===0){
              let item=callData.data;
              /*item:{
                name:'',
                phone:'',
                user_img:''
              }*/
              this.$store.commit('updateInformation',item);
              this.$router.push({
                path:'/map_views'
              })
            }
          };
          request.send('{"phone":"'+phone+'","password":"'+password+'"}');
        }
      }
    };
</script>

<style scoped>
  .button_box>button{
    font-size: 20px;
    margin: auto;
    color: #ffffff;
    letter-spacing: 4px;
    border-radius: 5px;
    width: 50%;
    height: 50px;
    font-weight: 600;
    box-sizing: border-box;
    border-width: 0;
    background: linear-gradient(45deg,#69b7ff 0%,#d09be4 80%);
    box-shadow: 0 3px 5px lightgrey;
    outline: none;
  }
  .button_box{
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
  .help_box{
    width: 80%;
    margin: auto;
    position: relative;
  }
  .help_box>.help_tag:nth-child(2){
    position: absolute;
    right: 10px;
    left: auto;
  }
  .help_tag{
    font-size: 14px;
    font-weight: 400;
    letter-spacing: 1px;
    text-decoration: none;
    color: #484646;
  }
</style>
