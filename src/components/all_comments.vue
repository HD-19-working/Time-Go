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
  <div class="all_comments_container">
    <div>
      <tag_section :tag_list="comments_data.tag_list"></tag_section>
    </div>
    <div>
      <comment_item v-for="(item,index) in comments_data.comment_list"
                    :key="'all_comment'+index"
                    :user_data="item"
                    :is-border="index">
      </comment_item>
    </div>
  </div>
  </scroll>
</template>

<script>
  import tag_section from './tag_section';
  import comment_item from './comment_item';
  import scroll from './scroll';
  import loading_page from './loading_page';
    export default {
      name: 'all_comments',
      data(){
        return{
          comments_data:{
            tag_list:[],
            comment_list:[]
          },
          loading_background:'white',
          loading_box_shadow:'0 0 2px 2px whitesmoke',
          loading_dot_stroke:'cornflowerblue',
          loading_dot_fill:'cornflowerblue',
          is_loading:true,
          is_load:true,
          is_refresh:false,
          animate_id:'all_comments'
        }
      },
      methods:{
        initialRefresh:function(){
          this.is_refresh=false;
        },
        refreshPage:function(){
          this.comments_data.tag_list=[];
          this.comments_data.comment_list=[];
          this.getComments();
        },
        getComments:function () {
          this.is_load=false;
          let request=new XMLHttpRequest();
          request.open('POST',this.$store.state.request_link+'/comment/allComment');/*---------------------------------*/
          request.setRequestHeader('content-type','application/json');
          request.onload=()=>{
            let obj=JSON.parse(request.responseText);
            if(obj.code===0) {
              console.log(obj);
              this.is_load = true;
              this.is_loading = false;
              if (obj.data.tag_list) {
                this.comments_data.tag_list = obj.data.tag_list;
              }
              for (let i = 0; i < obj.data.comment_list.length; i++) {
                this.comments_data.comment_list.push(obj.data.comment_list[i]);
              }
              this.$nextTick(()=>{
                this.is_refresh=true;
              })
            }else if(obj.code===1){
              alert(obj.msg);
            }
            /*
              {
                tag_list:[
                  {value:'景观漂亮',num:6},
                  {value:'景观漂亮',num:6},
                  {value:'景观漂亮',num:6},
                  {value:'景观漂亮',num:6},
                  {value:'景观漂亮',num:6}
                ],
                comment_list:[
                  {
                    user_img:'./static/img/cancel.png',
                    default_img:'./static/img/button.png',
                    user_name:'HD',
                    user_grade:5,
                    comment_text:'真滴好~~~~~',
                    comment_date:'2020/10/29'
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
                  }
                ]
              }
            */
          };
          request.send('{"idCode":"'+this.$store.state.idCode+'","index":"'+this.comments_data.comment_list.length+'"}');
        }
      },
      mounted() {
        this.refreshPage();
      },
      components:{
        tag_section,
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
  .all_comments_container{
    width: 100%;
    box-sizing: border-box;
    padding: 0 12px;
  }
  .all_comments_container>div{
    width: 100%;
  }
  .all_comments_container>div:nth-child(1){
    padding: 10px 0 0 0;
  }
</style>
