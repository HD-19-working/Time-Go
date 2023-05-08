<template>
  <scroll class="scroll_class"
          @loadMore="getComments"
          @initialRefresh="initialRefresh"
          @refreshPage="refreshPage"
          :is-load="is_load"
          :animate-id="animate_id"
          :is-refresh="is_refresh">
    <transition name="loading_faded">
      <loading_page :background="loading_background"
                    :box_shadow="loading_box_shadow"
                    :dot_stroke="loading_dot_stroke"
                    :dot_fill="loading_dot_fill"
                    v-if="is_loading"></loading_page>
    </transition>
  <div class="img_comments_container">
    <comment_item v-for="(item,index) in comment_list"
                  :key="'img_comment'+index"
                  :user_data="item"
                  :is-border="index">
    </comment_item>
  </div>
  </scroll>
</template>

<script>
  import scroll from './scroll';
  import comment_item from './comment_item';
  import loading_page from './loading_page';
    export default {
      name: 'img_comments',
      data(){
        return{
          comment_list:[],
          loading_background:'white',
          loading_box_shadow:'0 0 2px 2px whitesmoke',
          loading_dot_stroke:'cornflowerblue',
          loading_dot_fill:'cornflowerblue',
          comments_num:-1,
          is_loading:true,
          is_load:true,
          is_refresh:false,
          animate_id:'img_comments'
        }
      },
      methods:{
        initialRefresh:function(){
          this.is_refresh=false;
        },
        refreshPage:function(){
          this.comment_list=[];
          this.comments_num=-1;
          this.getComments();
        },
        /*moreComments:function(){
          this.is_load=false;
          let request=new XMLHttpRequest();
          request.open('POST','/comment/imgComment');
          request.setRequestHeader('content-type','application-x-www-form-urlencoded');
          request.onload=()=>{
            this.is_load=true;
            this.is_loading=false;
            let t=JSON.parse(request.responseText);
            for(let i=0;i<t.length;i++){
              this.comment_list.push(t[i]);
            }
            /!*[{
                user_img:'./static/img/done.png',
                default_img:'./static/img/button.png',
                user_name:'HD',
                user_grade:4,
                comment_text:'真滴好~~~',
                comment_date:'2020/10/29',
                images:[
                  './static/img/done.png',
                  './static/img/done.png'
                ]
              },
              {
                user_img:'./static/img/done.png',
                default_img:'./static/img/button.png',
                user_name:'HD',
                user_grade:4,
                comment_text:'真滴好~~~',
                comment_date:'2020/10/29',
                images:[
                  './static/img/done.png',
                  './static/img/done.png'
                ]
              }]*!/
          };
          request.send('idCode='+this.$store.state.idCode+"&index="+this.comment_list.length+"&size="+this.comments_num);
          this.$nextTick(()=>{
            this.is_refresh=true;
          })
        },*/
        getComments:function () {
          this.is_load=false;
          let request=new XMLHttpRequest();
          request.open('POST',this.$store.state.request_link+'/comment/imgComment');
          request.setRequestHeader('content-type','application/json');
          request.onload=()=>{
            let callData=JSON.parse(request.responseText);
            this.is_load=true;
            this.is_loading=false;
            if(callData.code===0){
              this.comments_num=callData.data.size;
              for(let i=0;i<callData.data.comment_list.length;i++){
                this.comment_list.push(callData.data.comment_list[i]);
              }
              this.$nextTick(()=>{
                this.is_refresh=true;
              })
            }else if(callData.code===1){
              alert(callData.msg);
            }
            /*[{
                user_img:'./static/img/done.png',
                default_img:'./static/img/button.png',
                user_name:'HD',
                user_grade:4,
                comment_text:'真滴好~~~',
                comment_date:'2020/10/29',
                images:[
                  './static/img/done.png',
                  './static/img/done.png'
                ]
              },
              {
                user_img:'./static/img/done.png',
                default_img:'./static/img/button.png',
                user_name:'HD',
                user_grade:4,
                comment_text:'真滴好~~~',
                comment_date:'2020/10/29',
                images:[
                  './static/img/done.png',
                  './static/img/done.png'
                ]
              }]*/
          };
          request.send('{"idCode":"'+this.$store.state.idCode+'","index":"'+this.comment_list.length+'","size":"'+this.comments_num+'"}');
        }
      },
      mounted() {
        this.refreshPage();
      },
      components:{
        comment_item,
        scroll,
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
  .scroll_class{
    width: 100%;
    height: calc(100vh - 90px);
  }
  .img_comments_container{
    width: 100%;
    box-sizing: border-box;
    padding: 0 12px;
  }
</style>
