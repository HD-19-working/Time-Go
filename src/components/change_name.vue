<template>
  <div class="change_box" :style="box_style" ref="change_name_box">
    <div class="change_container">
      <label><input type="text" v-model="changed_name" placeholder="输入您的新昵称"></label>
      <div><button @click="submit_name"></button></div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'change_name',
      data(){
        return{
          changed_name:'',
          box_style:{
            height:'calc(100vh - 100px)'
          }
        }
      },
      methods:{
        submit_name:function () {
          if (this.changed_name!=='') {
            if(this.changed_name.length>10){
              alert("昵称请在十个字符内！");
            }else {
              let request = new XMLHttpRequest(); //发送“更改的昵称”，“用户手机号码”，返回“ok”
              request.open('POST', this.$store.state.request_link+'/user/changeUserName');
              request.setRequestHeader('content-type', 'application/json');
              request.onload = () => {
                let callData=JSON.parse(request.responseText);
                if(callData.code===0) {
                  this.$store.commit('changeName',callData.data);
                  this.$router.go(-1);
                }else if(callData.code===1){
                  alert(callData.msg);
                }
              };
              request.send('{"changed_name":"'+this.changed_name+'","phone":"'+this.$store.state.phone+'"}')
            }
          }else{
            alert("新昵称不能为空！");
          }
        },
        setBoxHeight:function () {  //重定义盒子高度，解决打字框顶起文本
          this.box_style.height=this.$refs.change_name_box.clientHeight+'px';
        }
      },
      mounted() {
        this.setBoxHeight();
      }
    };
</script>

<style scoped>
  .change_box{
    width: 100%;
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
    padding: 10px 0;
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
