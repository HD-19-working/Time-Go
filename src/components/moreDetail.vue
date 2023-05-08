<template>
    <div class="detail_box" >
      <transition name="loading_faded">
        <loading_page :background="loading_background"
                      :box_shadow="loading_box_shadow"
                      :dot_stroke="loading_dot_stroke"
                      :dot_fill="loading_dot_fill"
                      v-if="is_loading"></loading_page>
      </transition>
      <div class="comment_section">
        <div class="comment_head">
          <span>{{head_note_1}}</span>
          <button @click="remark">{{comment_but_note}}</button>
        </div>
        <div class="comment_show">
          <div class="container_1">
            <div class="sections_1">
              <div v-if="comment_num"><span>{{comment_grade}}</span><span>分</span></div>
              <div></div>
              <div v-if="comment_num">{{comment_num}}条评价</div>
            </div>
            <div class="sections_2" v-if="comment_num">
              <div v-for="(item,index) in comment_calculate_list" class="list_item">
                <span>{{5-index}}</span>
                <img src="../../static/img/start_shadow.png" alt="">
                <div :style="{'width':item*100+'%'}"></div>
              </div>
            </div>
          </div>
          <tag_section :tag_list="tag_list"></tag_section>
          <div class="container_3">
            <div>{{head_note_2}}</div>
            <comment_item v-for="(item,index) in comment_data_list"
                          :user_data="item"
                          :is-border="index"
                          :key="'S'+index"></comment_item>
            <div class="comment_expend_button" v-if="comment_data_list.length" @click="moreComments">全部评论</div>
          </div>
        </div>
      </div>
      <!--<div class="section_gap"></div>-->
      <div>
        <div class="recommend_head">附近推荐</div>
        <recommend_item v-for="(item,index) in recommend_list"
                        :key="'D'+index"
                        :item_data="item"
                        @toThisItem="toRecommendItem(item.x,item.y)"></recommend_item>
      </div>
    </div>
</template>

<script>
  import comment_item from './comment_item';
  import recommend_item from './recommend_item';
  import tag_section from './tag_section';
  import loading_page from './loading_page';
    export default {
      name: 'moreDetail',
      props:{
        comment_calculate_list:{
          type:Array,
          default:[]
        },
        tag_list: {
          type:Array,
          default: []
        },
        comment_data_list:{
          type:Array,
          default:[]
        },
        comment_num:{
          type:Number,
          default:0
        },
        recommend_list:{
          type:Array,
          default:[]
        },
        loading_state:{
          type:Boolean,
          default:true
        },
        is_update:{
          type:Boolean,
          default:false
        }
      },
      data(){
        return{
          loading_background:'white',
          loading_box_shadow:'0 0 2px 2px whitesmoke',
          loading_dot_stroke:'cornflowerblue',
          loading_dot_fill:'cornflowerblue',
          head_note_1:'累计评论',
          head_note_2:'所有评论',
          comment_but_note:'写评论',
          comment_grade:0
        }
      },
      computed:{
        is_loading:function () {
          return this.loading_state;
        }
      },
      methods:{
        initialGrade:function(){
          let t=0;
          for(let i=0;i<this.comment_calculate_list.length;i++){
            t=(5-i)*parseFloat(this.comment_calculate_list[i])+t;
          }
          this.comment_grade=Math.round(t*10)/10;
        },
        remark:function () {
          if(this.$store.state.isOnline===0){
            this.$router.push('/online/login');
          }
          else{
            this.$router.push('remark_section')
          }
        },
        moreComments:function () {
          this.$router.push('more_comments');
        },
        toRecommendItem:function (X,Y) {
          this.$emit('toRecommendItem',{X:X,Y:Y});
        }
      },
      watch:{
        is_update:function () {
          if(this.is_update===true){
            this.initialGrade();
            this.is_update=false;
          }
        }
      },
      components:{
        comment_item,
        recommend_item,
        tag_section,
        loading_page
      }
    };
</script>

<style scoped>
  .loading_faded-enter,
  .loading_faded-leave-active{
    opacity: 0;
  }
  .loading_faded-enter-active,
  .loading_faded-leave-active{
    transition: opacity 0.5s linear;
  }
  .detail_box{
    width: 100%;
    height: 200vh;
    position: relative;
    background-color: white;
  }
  .comment_section{
    width: 100%;
    margin-top: 20px;
  }
  .comment_head{
    width: 100%;
    display: flex;
    align-items: center;
  }
  .comment_head>span{
    font-size: 16px;
    font-weight: bold;
  }
  .comment_head>button{
    width: 80px;
    height: 25px;
    border-width: 2px;
    border-radius: 15px;
    background-position: 5px;
    padding-left: 15px;
    font-size: 14px;
    margin-right: 10px;
    margin-left: auto;
    outline: none;
    font-weight: bold;
    border-style: solid;
    background-image: url("../../static/img/remark_icon.png");
    background-repeat: no-repeat;
    background-size: 18px;
    box-sizing: border-box;
    color: cornflowerblue;
    border-color: cornflowerblue;
    background-color: white;
  }
  .comment_show{
    margin-top: 20px;
  }
  .container_1{
    width: 100%;
    display: flex;
    align-items: center;
  }
  .sections_1{
    width: 40%;
  }
  .sections_2{
    width: 50%;
  }
  .sections_1>div:nth-child(n){
    display: flex;
    justify-content: center;
  }
  .sections_1>div:nth-child(1){
    font-size: 16px;
    color: orange;
  }
  .sections_1>div:nth-child(1)>span:nth-child(1){
    font-size: 45px;
  }
  .sections_1>div:nth-child(1)>span:nth-child(2){
    margin-bottom: 8px;
    margin-top: auto;
    font-size: 16px;
  }
  .sections_1>div:nth-child(3){
    font-size: 14px;
    color: gray;
  }
  .list_item{
    width: 100%;
    display: flex;
    align-items: center;
  }
  .list_item span:nth-child(1){
    font-size: 14px;
    margin-left: 3px;
    color: gray;
  }
  .list_item>img{
    width: 16px;
    margin-left: 3px;
  }
  .list_item>div{
    margin-left: 3px;
    height: 14px;
    background-color: orange;
  }
  .container_3{
    padding: 20px 0;
  }
  .container_3>div:nth-child(1){
    font-size: 16px;
    font-weight: bold;
  }
  .comment_expend_button{
    width: 100%;
    line-height: 30px;
    letter-spacing: 1px;
    font-size: 14px;
    font-weight: normal;
    justify-content: center;
    align-items: center;
    background-color: white;
    text-align: center;
  }
  /*.section_gap{
    width: 100%;
    height: 5px;
    margin: 10px 0;
    background-color: whitesmoke;
  }*/
  .recommend_head{
    font-size: 16px;
    line-height: 34px;
    margin-bottom: 15px;
    font-weight: bold;
  }
</style>
