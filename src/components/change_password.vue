<template>
  <div class="change_box">
    <div class="change_container">
      <label><input type="text" v-model="changed_password" placeholder="输入新密码"></label>
      <div></div>
      <label><input type="text" v-model="changed_password_again" placeholder="重新输入新密码"></label>
      <div><button @click="submit_password"></button></div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'change_password',
      data(){
        return{
          changed_password:'',
          changed_password_again:'',
        }
      },
      methods:{
        submit_password:function () {
          if(this.changed_password===''||this.changed_password_again===''){
            alert("输入密码不能为空");
          }
          else if(this.changed_password_again!==this.changed_password){
            alert("两次输入密码不一致，请重新输入");
          }
          else{
            let request = new XMLHttpRequest(); //发送“用户手机号码”，“修改后的密码”，返回“”
            request.open('POST', this.$store.state.request_link+'/user/changePassword');/*-----------------------------*/
            request.setRequestHeader('content-type', 'application/json');
            request.onload=()=>{
              let callData=JSON.parse(request.responseText);
              if(callData.code===0){
                this.$router.go(-1);
              }else if(callData.code===1){
                alert(callData.msg);
              }
            };
            request.send('{"changed_password":"'+this.changed_password+'","phone":"'+this.$store.state.phone+'"}')
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
  .change_container>div{
    width: 100%;
    padding: 5px 0;
  }
  .change_container button{
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
