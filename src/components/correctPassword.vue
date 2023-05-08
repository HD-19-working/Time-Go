<template>
  <div class="correct_box">
    <input_item v-for="(item,index) in item_style"
                :key="index"
                :item_style="item" :item-index="index" @checking="checking"></input_item>
    <div class="correct_submit"><button @click="correct_submit">提交</button></div>
  </div>
</template>

<script>
  import input_item from './input_item';
    export default {
      name: 'correctPassword',
      data(){
        return{
          password:'',
          item_style:[
            {
              inputType:'password',
              inputName:'newPassword',
              inputTagName:'newPassword_tag',
              inputTagImgName:'newPassword_tag_img',
              placeHolderText:'设置您的新密码',
              imgLink:'./static/img/openLock.png',
              imgSize: '6.1vw',
              itemState:-1,
              itemWarning:'',
              marginTop:'6.8vw'
            },
            {
              inputType:'password',
              inputName:'newPasswordAgain',
              inputTagName:'newPassword_tagAgain',
              inputTagImgName:'newPassword_tag_imgAgain',
              placeHolderText:'重新输入您的新密码',
              imgLink:'./static/img/closeLock.png',
              imgSize:'6.1vw',
              itemState:-1,
              itemWarning:'',
              marginTop:'2vw'
            }
          ]
        }
      },
      methods:{
        correct_submit:function(){
          if(this.item_style[0].itemState===1&&this.item_style[1].itemState===1){
            let request=new XMLHttpRequest(); //发送“新密码”，“通过验证的用户手机号”，返回“该用户信息对象”
            request.open('POST',this.$store.state.request_link+'/user/changePassword');
            request.setRequestHeader('content-type','application/json');
            request.onload=()=>{
              /*{
                name:'',
                phone:'',
                user_img:''
              }*/
              let callData=JSON.parse(request.responseText);
              if(callData.code===0) {
                this.$store.commit('updateInformation', callData.data);
                this.$router.push({
                  path: '/map_views'
                });
              }
            };
            request.send('{"changed_password":"'+this.password+'","phone":"'+this.$route.params.phone+'"}')
          }
        },
        checking:function (checker) {
          if(checker.text===""){
            this.item_style[checker.index].itemState=-1;
          }else{
            if(checker.whichOne==='newPassword'){
              this.password=checker.text;
              this.item_style[checker.index].itemState=1;
            }
            else if(checker.whichOne==='newPasswordAgain'){
              if(checker.text===this.password){
                this.item_style[checker.index].itemState=1;
              }
              else{
                this.item_style[checker.index].itemState=0;
                this.item_style[checker.index].itemWarning='两次密码输入不同';
              }
            }
          }
        }
      },
      components:{
          input_item
      }
    };
</script>

<style scoped>
  .correct_box{
    margin-top: 15px;
  }
  .correct_submit{
    margin-top: 30px;
    display: flex;
    justify-content: center;
  }
  .correct_box button{
    width: 180px;
    height: 45px;
    font-size: 19px;
    font-weight: 600;
    letter-spacing: 3px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
    border-width: 0;
    border-radius: 5px;
    margin-bottom: 10px;
    background: linear-gradient(90deg, #97ABFF, #123597);
    border-style: solid;
    box-sizing: border-box;
    color: #ffffff;
    border-color: transparent;
    outline: none;
  }
</style>
