<template>
  <div>
    <input_item :item_style="phoneStyle" @checking="checking"></input_item>
    <verification-code
      :item_style="verification_style"
      @freshVerificationCode="date_text"
      @setSafety="setSafety"></verification-code>
    <div class="forget_section_button">
      <button @click="next_part">下一步</button>
    </div>
  </div>
</template>

<script>
  import input_item from './input_item';
  import verificationCode from './verificationCode';
    export default {
        name: 'forget_password',
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
        setSafety:function(safety){
          this.safety_string=safety.safety_string;
          this.safety_date=safety.safety_date;
        },
        next_part:function(){
          if(this.phoneStyle.itemState===1
            &&this.safety_string!==''
            &&this.safety_date!==null){
            let request=new XMLHttpRequest(); //发送“手机号码”，“手机验证码”，返回是否ok
            request.open('POST',this.$store.state.request_link+'/user/verifyCode');
            request.setRequestHeader('content-type','application/json');
            request.onload=()=>{
              let callData=JSON.parse(request.responseText);
              if(callData.code===0){
                this.$router.push({
                  name:'correctPassword',
                  params:{
                    phone:this.phoneText
                  }
                })
              }else if(callData.code===1){
                this.verification_style.isVerificationRight=-1;
              }
            };
            request.send('{"phone":"'+this.phoneText+'","code":"'+this.codeText+'","str":"'+this.safety_string+'","date":"'+this.safety_date+'"}');
          }
        },
        date_text:function(text){ //验证码输入模块改变，执行的回调函数
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
        }
      },
      components:{
        verificationCode,
        input_item
      }
    };
</script>

<style scoped>
  .forget_section_button{
    width: 100%;
    margin-top: 50px;
    display: flex;
    justify-content: center;
  }
  .forget_section_button button{
    width: 27vh;
    height: 6.75vh;
    font-size: 2.85vh;
    font-weight: 600;
    letter-spacing: 3px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, .2);
    border-width: 0;
    border-radius: 5px;
    background: linear-gradient(-90deg, #29bdd9, #276ace);
    margin-bottom: 10px;
    box-sizing: border-box;
    border-color: transparent;
    outline: none;
    border-style: solid;
    color: #ffffff;
  }
</style>
