<template>
    <div class="item_container" @click="ledTo">
      <img :src="data.img_link" alt="">
      <div>{{data.option_name}}</div>
      <div>{{data.tag_text}}</div>
      <div></div>
    </div>
</template>

<script>
    export default {
      name: 'option_section',
      props:{
        data:{
          type:Object,
          default(){
            return{
              img_link:'',  //选项图标
              option_name:'', //选项名称
              tag_text:'',  //选项文本
              go_to:'', //导向的路由地址
              query_data:'',  //query传输数据，为验证密码后的路由导向地址
              is_back:0,  //点击后路由是否后退
              back_step:0 //路由后退多少
            }
          }
        }
      },
      methods:{
        ledTo:function () {
          if(this.data.query_data==='') {
            if(this.data.is_back===0) {
              this.$router.push(this.data.go_to);
            }else if(this.data.is_back===1){
              this.$store.commit('offState');
              this.$router.go(this.data.back_step);
            }
          }else{
            this.$router.push({
              path:this.data.go_to,
              query:{
                link:this.data.query_data
              }
            });
          }
        }
      }
    };
</script>

<style scoped>
  .item_container{
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 15px 10px 15px 12px;
  }
  .item_container>img{
    width: 26px;
    height: 26px;
  }
  .item_container>div:nth-child(2){
    flex: 1;
    font-size: 16px;
    margin-left: 8px;
    font-family: Arial;
    font-weight: bold;
  }
  .item_container>div:nth-child(3){
    font-size: 16px;
    font-family: Arial;
    font-weight: bold;
    color: darkgrey;
  }
  .item_container>div:nth-child(4){
    width: 18px;
    height: 18px;
    background-image: url("../../static/img/area_tag.png");
    background-position: center;
    background-repeat: no-repeat;
    background-size: contain;
  }
</style>
