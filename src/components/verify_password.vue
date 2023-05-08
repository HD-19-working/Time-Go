<template>
  <div class="verify_box" ref="verify_box" :style="verify_box_style">
    <div class="verify_container">
      <label><input type="password"
                    v-model="password"
                    name="verify_password"
                    placeholder="请输入您的登录密码" /></label>
      <div><button @click="checkPassword"></button></div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'verify_password',
      data(){
        return{
          verify_box_style:{
            height:'calc(100vh - 100px)'
          },
          password:'',
          link:this.$route.query.link //路由跳转的路径
        }
      },
      methods:{
        checkPassword:function () { //检验密码是否正确
          if(this.password!==''){
            let request=new XMLHttpRequest(); //发送“待验证的密码”，“用户手机号”，返回“ok”
            request.open('POST',this.$store.state.request_link+'/user/login');/*--------------------------------------------*/
            request.setRequestHeader('content-type','application/json');
            request.onload = ()=>{
              let callData=JSON.parse(request.responseText);
              if(callData.code===0){
                this.$router.replace(this.link);
              }else if(callData.code===1){
                alert(callData.msg);
                this.password='';
              }
            };
            request.send('{"password":"'+this.password+'","phone":"'+this.$store.state.phone+'"}');
          }else{
            alert("密码不能为空！");
          }
        },
        setBoxHeight:function () {  //重定义盒子高度，解决打字框顶起文本
          this.verify_box_style.height=this.$refs.verify_box.clientHeight+'px';
        }
      },
      mounted() {
        this.setBoxHeight()
      }
    };
</script>

<style scoped>
  .verify_box{
    width: 100%;
    display: flex;
    align-items: center;
  }
  .verify_container{
    width: 100%;
    box-sizing: border-box;
    padding: 20px 0;
  }
  .verify_container input{
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
  .verify_container>div{
    width: 100%;
    padding: 10px 0;
  }
  .verify_container button{
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
