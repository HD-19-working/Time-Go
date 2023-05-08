<template>
    <div class="loading_box">
      <div :style="loading_background_style">
      <svg width="60" height="60" viewBox="140 40 120 120" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
        <circle id="loading" :style="circle_style" cx="200" cy="100" r="50"></circle>
        <circle class="loading_dot" :style="dot_style" cx="175" cy="100" r="5">
          <animateMotion id="dot1" path="M0 0 l0 -15 l0 15" begin="0s;dot3.end" dur="0.6s"></animateMotion>
        </circle>
        <circle class="loading_dot" :style="dot_style" cx="200" cy="100" r="5">
          <animateMotion id="dot2" path="M0 0 l0 -15 l0 15" begin="dot1.end" dur="0.6s"></animateMotion>
        </circle>
        <circle class="loading_dot" :style="dot_style" cx="225" cy="100" r="5">
          <animateMotion id="dot3" path="M0 0 l0 -15 l0 15" begin="dot2.end" dur="0.6s"></animateMotion>
        </circle>
      </svg>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'loading_page',
      props:{
        background:{
          type:String,
          default:'rgba(105,105,105,0.8)'
        },
        box_shadow:{
          type:String,
          default:'0 0 2px 2px whitesmoke'
        },
        dot_stroke:{
          type:String,
          default:'white'
        },
        dot_fill:{
          type:String,
          default:'white'
        }
      },
      data(){
        return{
          loading_background_style:{
            backgroundColor:this.background,
            boxShadow:this.box_shadow
          },
          dot_style:{
            stroke:this.dot_stroke,
            fill:this.dot_fill
          },
          circle_style:{
            stroke:this.dot_stroke
          }
        }
      }
    };
</script>

<style scoped>
  .loading_box{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    background-color: transparent;
  }
  .loading_box>div{
    width: 50%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
  }
  .loading_dot{
    stroke-width: 1;
  }
  #loading{
    stroke-width: 3;
    fill: transparent;
    animation: loadings 4s ease-in-out infinite;
  }
  @keyframes loadings{
    0%{
      stroke-dashoffset: 0;
      stroke-dasharray: 60,18.5375;
    }
    50%{
      stroke-dashoffset: 314.159;
      stroke-dasharray: 18.5375,60;
    }
    100%{
      stroke-dashoffset: 628.318;
      stroke-dasharray: 60,18.5375;
    }
  }
</style>
