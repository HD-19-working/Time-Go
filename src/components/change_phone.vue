<template>
  <div class="change_box">
    <div class="change_container">
      <label><input type="text" v-model="changed_phone" placeholder="绑定新手机号码"></label>
      <div class="verify_box">
        <label><input type="text" v-model="verify_code" placeholder="输入手机验证码" /></label>
        <button @click="sendCode" :style="code_button_style">{{code_button_text}}</button>
      </div>
      <div class="submit_box"><button @click="submit_phone"></button></div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'change_phone',
      data(){
        return{
          changed_phone:'', //更改的手机号码
          verify_code:'', //用户填写的验证码
          code_button_text:'获取验证码',
          code_button_style:{ //发送验证码按钮样式
            pointerEvents:'auto'
          },
          safety_string:'',
          safety_date:null
        }
      },
      methods:{
        sendCode:function(){  //发送验证码
          this.code_button_style.pointerEvents='none';  //禁止发送验证码按钮的点击事件
          let i=60;
          let timer=setInterval(()=>{
            i--;
            this.code_button_text='('+i+'s)';
            if(i<0){
              this.code_button_style.pointerEvents='auto';
              this.code_button_text='获取验证码';
              clearInterval(timer);
            }
          },1000);
          let request=new XMLHttpRequest(); //发送“用于接收验证码的手机号码”，返回“”
          request.open('GET',this.$store.state.request_link+'/user/send'+'/'+this.changed_phone);
          request.onload=()=>{
            let callData=JSON.parse(request.responseText);
            if(callData.code===0){
              this.safety_string=callData.data.str;
              this.safety_date=callData.data.date;
            }else if(callData.code===1){
              alert(callData.msg);
            }
          };
          request.send();
        },
        submit_phone:function () {
          if(this.changed_phone===''){
            alert('号码不能为空');
          }else if(this.verify_code===''){
            alert("验证码不能为空")
          }else{
            let request = new XMLHttpRequest(); //发送“原手机号码”，“新手机号码”，“新手机号的验证码”，返回“”
            request.open('POST', this.$store.state.request_link+'/user/changeUserPhone');
            request.setRequestHeader('content-type', 'application/json');
            request.onload=()=>{
              let callData=JSON.parse(request.responseText);
              if(callData.code===0){
                this.$store.commit('changePhone',callData.data);
                this.$router.go(-1);
              }else if(callData.code===1){
                alert(callData.msg);
              }
            };
            request.send('{"changed_phone":"'+this.changed_phone+'","phone":"'+this.$store.state.phone+'","verify_code":"'+this.verify_code+'","str":"'+this.safety_string+'","date":"'+this.safety_date+'"}');
          }
        }
      }
    };
</script>

<style scoped>
  .change_box{
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    align-items: center;
  }
  .change_container{
    width: 100%;
    box-sizing: border-box;
  }
  .change_container input{
    width: 80%;
    border: 2px solid darkgrey;
    padding-left: 10px;
    border-radius: 15px;
    line-height: 30px;
    font-size: 18px;
    font-family: Arial;
    font-weight: bold;
    box-sizing: border-box;
    outline: none;
    display: block;
    margin: auto;
  }
  .verify_box>label{
    display: flex;
    align-items: center;
  }
  .verify_box input{
    width: 100%;
  }
  .verify_box{
    width: 80%;
    padding: 10px 0 0 0;
    margin: auto;
    display: flex;
    box-sizing: border-box;
  }
  .verify_box>button{
    flex: 1 0 85px;
    color: grey;
    font-size: 14px;
    font-family: Arial;
    font-weight: bold;
    word-break: keep-all;
    background-color: transparent;
    border: 2px solid darkgrey;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 5px;
    margin-left: 5px;
    outline: none;
  }
  .submit_box{
    width: 100%;
    padding: 10px 0;
  }
  .submit_box button{
    width: 40px;
    height: 40px;
    border: none;
    border-radius: 25px;
    outline: none;
    display: block;
    margin: auto;
    background-image: url("../../static/img/nextStep.png");
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
  }
</style>
