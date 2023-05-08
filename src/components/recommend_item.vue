<template>
    <div class="item_box" @click="toThisItem">
      <div class="store_icon_class" :style="store_icon_style"></div>
      <div class="recommend_intro">
        <div>{{item_data.name}}</div>
        <div class="recommend_grade">
          <div class="start_box" :style="start_background">
            <img src="../../static/img/start.png" alt="" />
            <img src="../../static/img/start.png" alt="" />
            <img src="../../static/img/start.png" alt="" />
            <img src="../../static/img/start.png" alt="" />
            <img src="../../static/img/start.png" alt="" />
          </div>
          <span>距您{{Math.round(item_data.distance)/1000}}km</span>
        </div>
        <div>
          <div v-for="(item,index) in item_data.tag"
               :key="'E'+index"
               class="tag_items">{{item}}</div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'recommend_item',
      props:{
        item_data:{
          type:Object,
          default(){
            return{
              img_link:'',
              name:'',
              grade:5,
              distance:0,
              tag:[],
              idCode:'',
              x:0,
              y:0
            }
          }
        }
      },
      data(){
        return{
          store_icon_style:{
            backgroundImage:"url("+this.item_data.img_link+")"
          },
          start_background:{
            width:(this.item_data.grade/5)*80+'px',
            backgroundColor:'orange'
          }
        }
      },
      computed:{
        Grade:function () {
          return this.item_data.grade;
        }
      },
      methods:{
        toThisItem:function () {
          this.$store.commit('changeChecked',{
            X:this.item_data.X,
            Y:this.item_data.Y
          });
          this.$store.commit('changeIdCode',this.item_data.idCode);
          this.$emit('toThisItem');
        }
      },
      watch:{
        Grade:function () {
          this.start_background.width=(this.Grade/5)*80+'px';
        }
      }
    };
</script>

<style scoped>
  .item_box{
    width: 100%;
    margin-bottom: 20px;
    height: auto;
    display: flex;
  }
  .store_icon_class{
    width: 65px;
    height: 65px;
    border-radius: 10px;
    box-sizing: border-box;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }
  .recommend_intro{
    flex: 1;
    padding-left: 10px;
    box-sizing: border-box;
  }
  .recommend_intro>div:nth-child(1){
    font-size: 16px;
    line-height: 26px;
    font-weight: bold;
  }
  .recommend_grade{
    display: flex;
    align-items: center;
  }
  .recommend_grade>span{
    font-size: 14px;
    margin-right: 0;
    display: block;
    margin-left: auto;
  }
  .recommend_grade+div{
    display: flex;
    align-items: center;
  }
  .tag_items{
    font-size: 10px;
    letter-spacing: 1px;
    padding: 1px 4px;
    margin-right: 2px;
    border-radius: 5px;
    margin-top: 5px;
    border: 1px solid darkgray;
    color: darkgrey;
  }
  .start_box{
    /*outline: white 2px solid;*/
    border: none;
    display: flex;
    overflow: hidden;
    font-size: 0;
  }
  .start_box>img{
    width: 16px;
    /*outline: white 2px solid;*/
    height: 16px;
    border: none;
    box-sizing: border-box;
    /*box-shadow: 0 0 0 1px white inset;*/
  }
</style>
