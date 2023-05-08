<template>
  <div class="register_box">
    <input_item v-for="(item,index) in input_item_list"
                :key="index"
                :item_style="item"
                :item-index=index @checking="checking"></input_item>
    <verification-code
      :item_style="verification_style"
      @freshVerificationCode="freshCode"
      @setSafety="setSafety"></verification-code>
    <div class="register_button">
      <button @click="submit_data">注册</button>
    </div>
  </div>
</template>

<script>
  import input_item from './input_item';
  import verificationCode from './verificationCode';
    export default {
      name: 'register',
      data(){
        return{
          firstPassword:0,
          verificationText:'',
          nameText:'',
          passwordText:'',
          phoneText:'',
          input_item_list:[
            {
              inputType:'text',
              inputName:'name',
              inputTagName:'name_tag',
              inputTagImgName:'name_tag_img',
              placeHolderText:'设置您的用户名',
              imgLink:'./static/img/nameRegister.png',
              imgSize:'5.8vw',
              itemState:-1,
              itemWarning:'',
              marginTop: '5.66vw'
            },
            {
              inputType:'password',
              inputName:'password',
              inputTagName:'password_tag',
              inputTagImgName:'password_tag_img',
              placeHolderText:'设置您的密码',
              imgLink:'./static/img/openLock.png',
              imgSize:'8.26vw',
              itemState:-1,
              itemWarning:'',
              marginTop:'1.66vw'
            },
            {
              inputType:'password',
              inputName:'passwordAgain',
              inputTagName:'passwordAgain_tag',
              inputTagImgName:'passwordAgain_tag_img',
              placeHolderText:'重新输入您的密码',
              imgLink:'./static/img/closeLock.png',
              imgSize:'6.13vw',
              itemState:-1,
              itemWarning:'',
              marginTop:'1.66vw'
            },
            {
              inputType:'text',
              inputName:'phone',
              inputTagName:'phone_tag',
              inputTagImgName:'phone_tag_img',
              placeHolderText:'请输入您的手机号码',
              imgLink:'./static/img/phoneRegister.png',
              imgSize:'8.16vw',
              itemState:-1,
              itemWarning:'',
              marginTop:'1.66vw'
            },
          ],
          verification_style: {
            imgLink:'./static/img/verification.png',
            imgSize:'6.4vw',
            phoneNumber:'',
            borderColor:'#0863bc',
            background:'#ffffff',
            color:'#0863bc',
            isVerificationRight:0,
            safety_string:'',
            safety_date:null
          }
        }
      },
      components:{
        input_item,
        verificationCode
      },
      methods:{
        setSafety:function(e){
          this.safety_string=e.safety_string;
          this.safety_date=e.safety_date;
        },
        submit_data:function(){ //提交按钮
          if(this.input_item_list[0].itemState===1&&this.input_item_list[1].itemState===1&&
            this.input_item_list[2].itemState===1&&this.input_item_list[3].itemState===1
            &&this.verificationText!==''&&this.safety_string!==''&&this.safety_date!==null){
            let request=new XMLHttpRequest();
            request.open('POST',this.$store.state.request_link+'/user/register');/*-----------------------------------------------------------------*/
            request.setRequestHeader('Content-type','application/json');
            request.onload=()=>{
              let callData=JSON.parse(request.responseText);
              if(callData.code===1){
                this.verification_style.isVerificationRight=-1;
              }else if(callData.code===0){
                /*{
                  name:'',
                  phone:'',
                  user_img:''
                }*/
                this.$store.commit('updateInformation',callData.data);
                this.$router.push({
                  path:'/map_views'
                })
              }
            };
            request.send('{"verification":"'+this.verificationText+'","name":"'+this.nameText+
              '","phone":"'+this.phoneText+'","password":"'+this.passwordText+
              '","str":"'+this.safety_string+'","date":"'+this.safety_date+'"}');
          }
        },
        freshCode:function(data){ //验证码输入框内容更新后，回调执行
          this.verification_style.isVerificationRight=0;
          this.verificationText=data;
        },
        checking:function (checker) { //input_item改变后回调执行
          if(checker.text===''){
            this.input_item_list[checker.index].itemState=-1;
          }
          else {
            if (checker.whichOne === 'name') {
              if (checker.text.length > 10) {
                this.input_item_list[checker.index].itemState = 0;
                this.input_item_list[checker.index].itemWarning = '设置用户名请在10个字符以内';
              } else {
                this.input_item_list[checker.index].itemState = 1;
                this.nameText = checker.text;
              }
            }
            else if(checker.whichOne==='password') {
                this.input_item_list[checker.index].itemState = 1;
                this.passwordText=checker.text;
                this.firstPassword = checker.text;
            }
            else if(checker.whichOne==='passwordAgain'){
                if (this.firstPassword === checker.text) {
                  this.input_item_list[checker.index].itemState = 1;
                }
                else {
                  this.input_item_list[checker.index].itemState = 0;
                  this.input_item_list[checker.index].itemWarning = '两次密码输入不相同';
                }
            }
            else if(checker.whichOne==='phone'){
              if(isNaN(Number(checker.text))){
                this.input_item_list[checker.index].itemState=0;
                this.input_item_list[checker.index].itemWarning='电话号码格式不正确';

                  /*this.input_item_list[checker.index].itemState=0;
                  this.input_item_list[checker.index].itemWarning='该号码已被绑定';*/

              }
              else{
                this.input_item_list[checker.index].itemState=1;
                this.verification_style.phoneNumber=checker.text;
                this.phoneText=checker.text
              }
            }
          }
        }
      }
    };
</script>

<style scoped>
  .register_box{
    width: 100%;
  }
  .register_button{
    width:100%;
    margin-top: 5.34vw;
    display: flex;
    justify-content: center;
  }
  .register_button button{
    width: 48vw;
    height: 12vw;
    margin-bottom: 10px;
    font-size: 5.1vw;
    font-weight: 600;
    border-width: 0;
    border-radius: 5px;
    letter-spacing: 3px;
    border-style: solid;
    box-sizing: border-box;
    border-color: transparent;
    outline: none;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
    background: linear-gradient(135deg,#6e8efb, #a777e3);
    color: #ffffff;
  }
</style>
