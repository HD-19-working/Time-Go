<template>
    <div ref="wrapper" class="wrapper">
      <div class="content">
        <div class="refresh_page">
          <svg width="30px" height="30px" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="2.5" y="2.5" width="10" height="10" opacity="1" fill="rgba(99,145,235,1)" fill-opacity="1" stroke="rgba(166,3,17,1)" stroke-width="1.5px" stroke-opacity="1"  >
              <animate :id="animateId+'1'" attributeName="opacity" from="0.5" to="1" :begin="animateId+'8.end'" dur="0.15s" fill="freeze"></animate>
              <animate :id="animateId+'1_reverse'" attributeName="opacity" from="1" to="0.1" :begin="animateId+'5.begin'" dur="0.2s" fill="freeze"></animate>
            </rect>
            <rect x="15" y="2.5" width="10" height="10" opacity="1" fill="rgba(99,145,235,1)" fill-opacity="1" stroke="rgba(166,3,17,1)" stroke-width="1.5px" stroke-opacity="1"  >
              <animate :id="animateId+'2'" attributeName="opacity" from="0.5" to="1" :begin="animateId+'1.end'" dur="0.15s" fill="freeze"></animate>
              <animate :id="animateId+'2_reverse'" attributeName="opacity" from="1" to="0.1" :begin="animateId+'6.begin'" dur="0.2s" fill="freeze"></animate>
            </rect>
            <rect x="27.5" y="2.5" width="10" height="10" opacity="1" fill="rgba(99,145,235,1)" fill-opacity="1" stroke="rgba(166,3,17,1)" stroke-width="1.5px" stroke-opacity="1"  >
              <animate :id="animateId+'3'" attributeName="opacity" from="0.5" to="1" :begin="animateId+'2.end'" dur="0.15s" fill="freeze"></animate>
              <animate :id="animateId+'3_reverse'" attributeName="opacity" from="1" to="0.1" :begin="animateId+'7.begin'" dur="0.2s" fill="freeze"></animate>
            </rect>
            <rect x="27.5" y="15" width="10" height="10" opacity="0.3" fill="rgba(99,145,235,1)" fill-opacity="1" stroke="rgba(166,3,17,1)" stroke-width="1.5px" stroke-opacity="1"  >
              <animate :id="animateId+'4'" attributeName="opacity" from="0.5" to="1" :begin="'0s;'+animateId+'3.end'" dur="0.15s" fill="freeze"></animate>
              <animate :id="animateId+'4_reverse'" attributeName="opacity" from="1" to="0.1" :begin="animateId+'8.begin'" dur="0.2s" fill="freeze"></animate>
            </rect>
            <rect x="27.5" y="27.5" width="10" height="10" opacity="0.3" fill="rgba(99,145,235,1)" fill-opacity="1" stroke="rgba(166,3,17,1)" stroke-width="1.5px" stroke-opacity="1"  >
              <animate :id="animateId+'5'" attributeName="opacity" from="0.5" to="1" :begin="animateId+'4.end'" dur="0.15s" fill="freeze"></animate>
              <animate :id="animateId+'5_reverse'" attributeName="opacity" from="1" to="0.1" :begin="animateId+'1.begin'" dur="0.2s" fill="freeze"></animate>
            </rect>
            <rect x="15" y="27.5" width="10" height="10" opacity="0.3" fill="rgba(99,145,235,1)" fill-opacity="1" stroke="rgba(166,3,17,1)" stroke-width="1.5px" stroke-opacity="1"  >
              <animate :id="animateId+'6'" attributeName="opacity" from="0.5" to="1" :begin="animateId+'5.end'" dur="0.15s" fill="freeze"></animate>
              <animate :id="animateId+'6_reverse'" attributeName="opacity" from="1" to="0.1" :begin="animateId+'2.begin'" dur="0.2s" fill="freeze"></animate>
            </rect>
            <rect x="2.5" y="27.5" width="10" height="10" opacity="0.3" fill="rgba(99,145,235,1)" fill-opacity="1" stroke="rgba(166,3,17,1)" stroke-width="1.5px" stroke-opacity="1"  >
              <animate :id="animateId+'7'" attributeName="opacity" from="0.5" to="1" :begin="animateId+'6.end'" dur="0.15s" fill="freeze"></animate>
              <animate :id="animateId+'7_reverse'" attributeName="opacity" from="1" to="0.1" :begin="animateId+'3.begin'" dur="0.2s" fill="freeze"></animate>
            </rect>
            <rect x="2.5" y="15" width="10" height="10" opacity="1" fill="rgba(99,145,235,1)" fill-opacity="1" stroke="rgba(166,3,17,1)" stroke-width="1.5px" stroke-opacity="1"  >
              <animate :id="animateId+'8'" attributeName="opacity" from="0.5" to="1" :begin="animateId+'7.end'" dur="0.15s" fill="freeze"></animate>
              <animate :id="animateId+'8_reverse'" attributeName="opacity" from="1" to="0.1" :begin="animateId+'4.begin'" dur="0.2s" fill="freeze"></animate>
            </rect>
          </svg>
        </div>
        <slot></slot>
        <div class="load_more"></div>
      </div>
    </div>
</template>

<script>
  import BScroll from 'better-scroll'
    export default {
      name: 'scroll',
      props:{
        isLoad:{
          type:Boolean,
          default:true
        },
        isRefresh:{
          type:Boolean,
          default:false
        },
        animateId:{
          type:String,
          default:'rect'
        }
      },
      data(){
        return{
          scroll:null
        }
      },
      mounted() {
        this.scroll=new BScroll(this.$refs.wrapper,{
          pullUpLoad:true,
          pullDownRefresh:true,
          scrollY:true,
          stopPropagation:false
        });
        this.scroll.on('pullingUp',()=>{
          this.$emit('loadMore');
        });
        this.scroll.on('pullingDown',()=>{
          this.$emit('refreshPage');
        });
      },
      watch:{
        isLoad:function () {
          if(this.isLoad===true){
            this.scroll.finishPullUp();
          }
        },
        isRefresh:function () {
          if(this.isRefresh===true){
            this.scroll.refresh();
            this.scroll.finishPullDown();
            this.isRefresh=false;
            this.$emit('initialRefresh')
          }
        }
      },
      components:{
          BScroll
      }
    };
</script>

<style scoped>
  .wrapper{
    overflow: hidden;
  }
  .wrapper,.content{
    width: 100%;
  }
  .refresh_page{
    position: fixed;
    top: -40px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 40px;
  }
  .load_more{
    position: fixed;
    bottom: 10px;
  }
</style>
