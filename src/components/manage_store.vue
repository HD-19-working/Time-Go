<template>
  <div class="store_container">
    <div v-for="(item,index) in store_list"
         :key="'store_list'+index"
         class="store_item_class" @click="storeDetail(index)">
      <img :src="item.store_img" alt="">
      <div class="store_text">
        <div>{{item.store_name}}</div>
        <div>{{item.host_phone}}</div>
      </div>
      <div></div>
    </div>
    <div class="add_button" @click="addStore">
      <div></div>
      <div>{{button_text}}</div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'manage_store',
      data(){
        return{
          store_list:[],
          button_text:'点击添加您的摊位'
        }
      },
      methods:{
        storeDetail:function(index){
          this.$router.push({
            path:'/store_detail',
            query:{ //路由跳转时，传输该摊位的idCode
              code:this.store_list[index].idCode
            }
          })
        },
        addStore:function () {
          this.$router.push('/map');
        },
        updateInformation:function () {
          let request=new XMLHttpRequest(); //发送“用户手机号码”，返回“用户已注册的摊位基本信息数组”
          request.open('POST',this.$store.state.request_link+'/stall/findPerStallByPhone');
          request.setRequestHeader('content-type','application/json');
          request.onload=()=>{
            /*[
              {
                store_img:'./static/img/cancel.png',
                store_name:'HD',
                host_phone:'18107113947',
                idCode:'AA0000000'
              }
            ]*/
            let callData=JSON.parse(request.responseText);
            if(callData.code===0){
              this.store_list=callData.data;
            }else if(callData.code===1){
              alert(callData.msg);
            }
          };
          request.send(this.$store.state.phone);
        }
      },
      mounted() {
        this.updateInformation();
      }
    };
</script>

<style scoped>
  .store_container{
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
  }
  .store_item_class{
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 10px 0;
  }
  .store_item_class>img{
    width: 50px;
    height: 50px;
  }
  .store_text{
    flex: 1;
    box-sizing: border-box;
    padding-left: 10px;
    font-family: Arial;
    font-weight: bold;
  }
  .store_text>div:nth-child(1){
    font-size: 20px;
    letter-spacing: 1px;
  }
  .store_text>div:nth-child(2){
    font-size: 14px;
    color: darkgrey;
  }
  .store_item_class>div:nth-child(3){
    width: 20px;
    height: 20px;
    background-image: url("../../static/img/area_tag.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .add_button{
    width: 100%;
    margin: 10px 0;
    padding: 5px;
    border: 2px solid darkgrey;
    border-radius: 10px;
    box-sizing: border-box;
    display: flex;
  }
  .add_button>div:nth-child(1){
    width: 60px;
    height: 60px;
    border: none;
    border-radius: 10px;
    background-color: whitesmoke;
    background-image: url("../../static/img/increase.png");
    background-size: 15px;
    background-repeat: no-repeat;
    background-position: center;
  }
  .add_button>div:nth-child(2){
    flex: 1;
    font-size: 16px;
    font-weight: bold;
    color: darkgrey;
    font-family: Arial;
    text-align: center;
    letter-spacing: 1px;
    line-height: 60px;
  }
</style>
