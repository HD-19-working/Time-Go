<template>
  <div>
    <div class="verification_box">
      <div class="input_box_verify">
        <div :style="verificationSection_style"></div>
        <input type="text" class="verification" placeholder="请输入验证码" v-model="input_text">
        <button class="send_button" @click="send_verification" :style="button_style">{{text}}</button>
      </div>
      <div class="verification_tag_img"></div>
    </div>
    <div class="verification_tag"></div>
  </div>
</template>

<script>
    export default {
      name: 'verificationCode',
      props:{
        item_style: {
          type:Object,
          default(){
            return{
              imgLink:'',
              imgSize:'',
              phoneNumber:'',
              borderColor:'',
              background:'',
              color:'',
              isVerificationRight:0
            }
          }
        }
      },
      computed:{
        isAnythingWrong:function () {
          return this.item_style.isVerificationRight;
        }
      },
      data(){
          return{
            verificationSection_style:{
              backgroundImage: 'url('+this.item_style.imgLink+')',
              backgroundSize: this.item_style.imgSize,
            },
            button_style:{
              borderColor:this.item_style.borderColor,
              background:this.item_style.background,
              color:this.item_style.color
            },
            text:'获取验证码',
            text_timer:0,
            input_text:''
          }
      },
      methods:{
        get_verificationCode:function(){
          let request=new XMLHttpRequest();
          request.open('GET',this.$store.state.request_link+'/user/send'+'/'+this.item_style.phoneNumber);/*------------------------------------------------------------*/
          request.onload=()=>{
            let callData=JSON.parse(request.responseText);
            if(callData.code===0){
              this.$emit('setSafety',{
                safety_string:callData.data.str,
                safety_date:callData.data.date
              })
            }
          };
          request.send();
        },
        send_verification:function () {
          document.getElementsByClassName('send_button')[0].style.pointerEvents='none';
          this.get_verificationCode();
          this.text_timer=60;
          let timer=setInterval(()=>{
            this.text='('+this.text_timer+')';
            if(this.text_timer===0){
              document.getElementsByClassName('send_button')[0].style.pointerEvents='auto';
              this.text='获取验证码';
              clearInterval(timer);
            }
            this.text_timer--;
          },1000)
        },
        tag_option:function (tagName,imgName,text,tagState) {
          let i=document.getElementsByClassName(tagName)[0];
          let t=document.getElementsByClassName(imgName)[0];
          if(tagState===1){
            t.innerHTML='<img src="./static/img/underRegular.png" height="18" width="18" alt="ok" />';
            i.innerHTML='';
          }
          else if(tagState===0){
            i.innerHTML='<span style="font-size: 14px">'+text+'</span>';
            t.innerHTML='<img src="./static/img/wrong.png" height="18" width="18" alt="wrong" />';
          }
          else if(tagState===-1){
            i.innerHTML='';
            t.innerHTML='';
          }
        }
      },
      watch:{
        input_text:function () {
          this.$emit('freshVerificationCode',this.input_text);
        },
        isAnythingWrong:function () {
          if(this.isAnythingWrong===-1){
            this.tag_option('verification_tag','verification_tag_img','验证码错误',0)
          }
        }
      }
    };
</script>

<style scoped>
  .verification_box{
    width: 80%;
    height: 100%;
    display: flex;
    margin: auto;
    justify-content: center;
    align-items: center;
  }
  .input_box_verify{
    width: 100%;
    display: flex;
    align-items: center;
    margin-top: 1.66vw;
    border-width: 1px;
    border-bottom-style: solid;
    border-color: darkgrey;
    outline: none;
  }
  .input_box_verify>div{
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    background-position: center;
    background-repeat: no-repeat;
  }
  .verification{
    box-sizing: border-box;
    padding-left: 5px;
    text-decoration: none;
    border: none;
    outline: none;
    width: 100%;
    font-size: 4.5vw;
  }
  .verification_tag_img{
    width: 20px;
    height: 30px;
    padding-left: 2px;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    position: relative;
    margin-top: auto;
  }
  .verification_tag{
    width: 70%;
    height: 15px;
    margin: auto;
    color: #ff5b50;
    font-weight: 600;
  }
  .send_button{
    height: 100%;
    flex: 1 0 82px;
    padding: 5px;
    margin-bottom: 2px;
    border-width: 2px;
    border-radius: 5px;
    font-weight: 900;
    line-height: 14px;
    word-break: keep-all;
    outline: none;
    border-style: solid;
    box-sizing: border-box;
    font-family: '黑体';
  }
</style>
