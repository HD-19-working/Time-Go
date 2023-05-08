<template>
  <div class="remark_container">
    <div class="remark_head">
      <button @click="back_history"></button>
      <div>{{remarked_name}}</div>
      <button @click="publish_remark">发布</button>
    </div>
    <div class="remark_grade">
      <div>
        {{help_tag}}
      </div>
      <div>
        <grade_section @getGrade="refresh_grade" :index="0"></grade_section>
      </div>
    </div>
    <div class="remark_text">
      <label><textarea name="remark_section"
                       v-model="remarked_text"
                       :placeholder="default_text"></textarea></label>
    </div>
    <div class="remark_img">
      <div><updata_img :max-num="max_img_num" @getImgFiles="getImgFiles"></updata_img></div>
    </div>
    <div class="remark_tag">
      <div v-for="(item,index) in remark_tag_list" :key="'remark_tag'+index" class="tag_item">
        <div>{{item.tag_name}}:</div>
        <div><grade_section @getGrade="setTagGrade" :index="index"></grade_section></div>
      </div>
    </div>
  </div>
</template>

<script>
  import grade_section from './grade_section';
  import updata_img from './updata_img';
  import axios from 'axios';
    export default {
      name: 'remark_section',
      data(){
        return{
          remark_tag_list:[
            {tag_name:'商品质量',grade:5},
            {tag_name:'服务态度',grade:5},
            {tag_name:'商品价格',grade:5}
          ],
          remarked_name:'写评论',
          help_tag:'触星星打分',
          default_text:'该商铺如何？与描述是否相符？谈谈你的感受与建议吧',
          max_img_num:3,
          grade:5,
          remarked_text:'',
          img_files:null
        }
      },
      methods:{
        refresh_grade:function (e) {
          this.grade=e.grade;
        },
        setTagGrade:function(e){
          this.remark_tag_list[e.index].grade=e.grade;
        },
        getImgFiles:function (file) {
          this.img_files=file;
        },
        back_history:function () {
          this.$router.go(-1);
        },
        publish_remark:function () {
          if(this.img_files===null){
            this.img_files=new FormData();
            this.img_files.append('user_img',null);
          }
          this.img_files.append('grade',this.grade);

          this.img_files.append('work_quality',this.remark_tag_list[0].grade);
          this.img_files.append('serve_state',this.remark_tag_list[1].grade);
          this.img_files.append('work_price',this.remark_tag_list[2].grade);

          this.img_files.append('remark_text',this.remarked_text);
          this.img_files.append('user_phone',this.$store.state.phone);
          this.img_files.append('idCode',this.$store.state.idCode);
          console.log("grade:"+this.grade);
          console.log('商品质量' + this.remark_tag_list[0].grade);
          console.log('服务态度' + this.remark_tag_list[1].grade);
          console.log('商品价格' + this.remark_tag_list[2].grade);
          /*let request=new XMLHttpRequest();
          request.open('POST',this.$store.state.request_link+'/comment/addComment');/!*-----------------------------*!/
          request.setRequestHeader('content-type','multipart/form-data');
          request.onload=()=>{
              if(JSON.parse(request.responseText).code===0) {
                this.back_history();
              }
          };
          request.send(this.img_files);*/
          axios({
            url:this.$store.state.request_link+'/comment/addComment',
            method:'post',
            data:this.img_files,
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then((response)=>{
            let callData=response.data;
            if(callData.code===0){
              this.back_history();
            }else if(callData.code===1){
              alert(callData.msg);
            }
          })
        }
      },
      components:{
        updata_img,
        grade_section
      }
    };
</script>

<style scoped>
  .remark_container{
    width: 100%;
    height: auto;
  }
  .remark_head{
    display: flex;
  }
  .remark_head>button{
    background-color: transparent;
    outline: none;
    border: none;
    box-sizing: border-box;
  }
  .remark_head>button:nth-child(1){
    width: 40px;
    height: 40px;
    margin-left: 5px;
    background-image: url("../../static/img/back_forward.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: 20px;
  }
  .remark_head>div{
    flex: 1;
    font-size: 18px;
    letter-spacing: 1px;
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .remark_head>button:nth-child(3){
    font-size: 18px;
    letter-spacing: 1px;
    margin-right: 15px;
    color: cornflowerblue;
    font-weight: bold;
  }
  .remark_grade {
    width: 100%;
    height: 100px;
    padding: 20px;
    text-align: center;
    box-sizing: border-box;
  }
  .remark_grade>div:nth-child(1){
    width: 100%;
    font-size: 14px;
    font-family: Arial;
    letter-spacing: 1px;
  }
  .remark_grade>div:nth-child(2){
    width: 140px;
    margin: auto;
  }
  .remark_text{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
  }
  .remark_text>label{
    width: 90%;
  }
  .remark_text textarea{
    width: 100%;
    height: 150px;
    font-size: 16px;
    border-radius: 15px;
    padding: 10px;
    font-family: "Arial";
    outline: none;
    border: none;
    box-sizing: border-box;
    background-color: whitesmoke;
  }
  .remark_img{
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: center;
  }
  .remark_img>div{
    width: 90%;
  }
  .remark_tag{
    width: 90%;
    padding: 15px 0 0 0;
    margin: auto;
  }
  .tag_item{
    display: flex;
  }
  .tag_item{
    display: flex;
  }
  .tag_item>div:nth-child(1){
    font-size: 14px;
    letter-spacing: 1px;
    font-family: Arial;
    padding: 5px 0 5px 5px;
  }
  .tag_item>div:nth-child(2){
    width: 120px;
    display: flex;
    align-items: center;
  }
</style>
