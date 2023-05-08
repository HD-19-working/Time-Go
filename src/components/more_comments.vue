<template>
  <div class="comments_container" ref="scroll_box">
    <div class="comments_head">
      <button @click="backStep"></button>
      <div>{{comments_head_text}}</div>
      <button @click="remarkStep">{{comments_head_button_text}}</button>
    </div>
    <div class="comments_navigation">
      <div v-for="(item,index) in navigation_item"
           @click="routerTo(index)"
           :class="{'is_light':item.switch}"
           :key="item.text">{{item.text}}</div>
    </div>
    <div class="comments_router">
      <transition :name="floated_side">
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'more_comments',
      data(){
        return{
          navigation_item:[
            {
              text:"全部",
              switch:1,
              router_to:'all_comments',
              index:'1'
            },
            {
              text:"带图",
              switch:0,
              router_to: 'img_comments',
              index:'2'
            },
            {
              text:"最新",
              switch:0,
              router_to: 'lasted_comments',
              index:'3'
            },
            {
              text:"差评",
              switch:0,
              router_to: 'negative_comments',
              index:'4'
            }
          ],
          comments_head_text:'评论',
          comments_head_button_text:'写评论',
          floated_side:'right'
        }
      },
      methods:{
        backStep:function(){
          this.$router.go(-1);
        },
        remarkStep:function(){
          if(this.$store.state.isOnline===1) {
            this.$router.push('/remark_section');
          }else if(this.$store.state.isOnline===0){
            this.$router.push('/online');
          }
        },
        routerTo:function (index) {
          for(let i=0;i<4;i++){
            if(i!==index) {
              this.navigation_item[i].switch = 0;
            }else{
              this.navigation_item[i].switch=1;
            }
          }
          this.$router.replace({
            path:this.navigation_item[index].router_to,
            query:{
              index:this.navigation_item[index].index
            }
          });
        }
      },
      watch:{
        '$route':function (to,from) {
          if(to.query.index&&from.query.index) {
            let toDepth = to.query.index;
            let fromDepth = from.query.index;
            this.floated_side = toDepth >= fromDepth ? 'right' : 'left';
          }
        }
      },
      mounted() {
        /*this.$refs.scroll_box.addEventListener('scroll',()=>{
          if(this.$refs.scroll_box.scrollHeight>this.$refs.scroll_box.clientHeight&&
            this.$refs.scroll_box.scrollTop+this.$refs.scroll_box.clientHeight===this.$refs.scroll_box.scrollHeight){
            this.$store.commit('changeIsLoad',1);
          }
        });
        console.log(this.navigation_item[0].switch,this.navigation_item[1].switch,this.navigation_item[2].switch,this.navigation_item[3].switch);*/
      }
    };
</script>

<style scoped>
  .comments_container{
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }
  .comments_head{
    width: 100%;
    padding: 10px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    font-family: Arial;
    box-shadow: 0 4px 0 -1px whitesmoke;
  }
  .comments_head>button:nth-child(1){
    width: 30px;
    height: 30px;
    background-color: transparent;
    border: none;
    outline: none;
    background-image: url("../../static/img/back_forward.png");
    background-position: center;
    background-size: 20px;
    background-repeat: no-repeat;
  }
  .comments_head>div{
    flex: 1;
    text-align: center;
    font-size: 16px;
    font-weight: bold;
    letter-spacing: 1px;
  }
  .comments_head>button:nth-child(3){
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 1px;
    background-color: transparent;
    border: none;
    outline: none;
  }
  .comments_navigation{
    width: 100%;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    color: darkgrey;
  }
  .comments_navigation>div{
    flex: 1;
    font-size: 16px;
    font-family: Arial;
    letter-spacing: 2px;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
    outline: none;
  }
  .comments_router{
    width: 100%;
    position: relative;
  }
  .comments_router>*{
    width: 100%;
    position: absolute;
  }
  .right-enter-active,.right-leave-active,
  .left-enter-active,.left-leave-active{
    transition: all 0.5s;
    transform: translateX(0);
  }
  .right-enter{
    opacity: 0;
    transform: translateX(100%);
  }
  .right-leave-active{
    opacity: 0;
    transform: translateX(-100%);
  }
  .left-enter{
    opacity: 0;
    transform: translateX(-100%);
  }
  .left-leave-active{
    opacity: 0;
    transform: translateX(100%);
  }
  .is_light{
    color: cornflowerblue;
    box-shadow: 0 3px 0 -1px cornflowerblue;
  }
</style>
