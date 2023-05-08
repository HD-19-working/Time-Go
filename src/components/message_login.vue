<template>
    <div>
      <input_item :item_style="phoneStyle" @checking="checking"></input_item>
      <verification-code
        :item_style="verification_style"
        @freshVerificationCode="date_text"
        @setSafety="setSafety"></verification-code>
      <div class="message_login_submit">
        <button @click="message_login_submit">登录</button>
      </div>
    </div>
</template>

<script>
  import input_item from './input_item';
  import verificationCode from './verificationCode';
    export default {
      name: 'message_login',
      data(){
        return{
          phoneStyle:{
            inputType:'text',
            inputName:'phone',
            inputTagName:'phone_tag',
            inputTagImgName:'phone_tag_img',
            placeHolderText:'请输入您绑定的手机号',
            imgLink:'./static/img/phoneRegister.png',
            imgSize:'8.16vw',
            itemState:-1,
            itemWarning:'',
            marginTop:'6.8vw'
          },
          verification_style:{
            imgLink:'./static/img/verification.png',
            imgSize:'6.4vw',
            phoneNumber:'',
            borderColor:'#0863bc',
            background:'#ffffff',
            color:'#0863bc',
            isVerificationRight:0
          },
          codeText:'',
          phoneText:'',
          safety_string:'',
          safety_date:null
        }
      },
      methods:{
        setSafety:function(e){
          this.safety_string=e.safety_string;
          this.safety_date=e.safety_date;
        },
        date_text:function(text){
          this.verification_style.isVerificationRight=0;
          this.codeText=text;
        },
        checking:function (checker) {
          if(checker.text===''){
            this.phoneStyle.itemState=-1;
          }
          else{
            if(!isNaN(Number(checker.text))){
              this.phoneStyle.itemState=1;
              this.verification_style.phoneNumber=checker.text;
              this.phoneText=checker.text;
            }
            else{
              this.phoneStyle.itemState=0;
              this.phoneStyle.itemWarning='电话号码格式不正确';
            }
          }
        },
        message_login_submit:function () {
          if(this.codeText!==''){
            if(this.phoneStyle.itemState===1){
              let request=new XMLHttpRequest();
              request.open('POST',this.$store.state.request_link+'/user/loginByMessage');
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
              request.send('{"phone":"'+this.phoneText+'","code":"'+this.codeText+'","str":"'+this.safety_string+'","date":"'+this.safety_date+'"}');
            }
          }else{
            alert('验证码不得为空');
          }
        }
      },
      components:{
        input_item,
        verificationCode
      }
    };
</script>

<style scoped>
  .message_login_submit{
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
  .message_login_submit>button{
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
    background-image: linear-gradient(-225deg, #2CD8D5 0%, #C5C1FF 56%, #FFBAC3 100%);
    box-shadow: 0 3px 5px lightgrey;
    outline: none;
  }
</style>
