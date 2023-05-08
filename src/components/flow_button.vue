<template>
    <div :style="boxStyle" class="flow_img_container" ref="flow_img_container">
      <div :style="img_box_style" class="flow_img_box" ref="flow_img_box">
        <div :style="flow_img"
             ref="svg_box"
             @touchstart="touchStart_img"
             @touchmove="touchMove_img"
             @touchend="touchEnd_img">
            <!--<img :src="img_link" :style="img_style"  alt=""
                @touchstart="touchStart_img"
                @touchmove="touchMove_img"
                @touchend="touchEnd_img">-->
          <svg width="100%" height="100%"
               :viewBox=viewBoxData
               preserveAspectRatio="xMidYMid meet"
               xmlns="http://www.w3.org/2000/svg"
               fill="none">
            <g>
            <path class="main_svg" d="M10 6 L16 12 L10 18"  stroke-width="1.5" stroke="#ffffff">
              <animate attributeName="d" dur="0.5s" begin="stroke_hidden.begin" fill="freeze" to="M16 12 l0 0 l0 0"></animate>
              <animate id="stroke_hidden" attributeName="stroke-width" dur="0.5s" begin="indefinite" to="0"></animate>
              <animate id="rock_showing" attributeName="d" dur="0.5s" begin="stroke_hidden.end" fill="freeze"
                       from="M16 12 c0 0 0 0 0 0 c0 0 0 0 0 0 M16 12 c0 0 0 0 0 0 c0 0 0 0 0 0 M16 12 l0 0
                       M16 12 c0 0 0 0 0 0 c0 0 0 0 0 0 M16 12 c0 0 0 0 0 0 l0 0 c0 0 0 0 0 0 M16 12 l0 0
                       l0 0 l0 0 M16 12 c0 0 0 0 0 0 M16 12 l0 0 l0 0 l0 0 M16 12 c0 0 0 0 0 0"
                       to="M12.7526 9.92418C12.2059 10.2861 11.679 10.7057 11.1924 11.1924
                       C10.4754 11.9093 10.4947 11.9482 9.85359 12.682M12.7526 9.92418
                       C16.178 7.65685 20.3848 7.65685 20.3848 7.65685C20.3848 7.65685 20.3848 11.8636 18.1174 15.289
                       M12.7526 9.92418L18.1174 15.289M18.1174 15.289C17.7555 15.8358 17.3359 16.3626 16.8492 16.8492
                       C16.1323 17.5662 16.0934 17.5469 15.3596 18.188M6.11523 17.429
                       C5.74278 17.9526 5.53552 18.2635 5.53552 18.2635L9.77816 22.5061
                       C9.77816 22.5061 10.0891 22.2988 10.6127 21.9264M6.11523 17.429L2.70709 14.0208
                       L8.36394 11.1924L9.85359 12.682M6.11523 17.429C6.83965 16.4105 8.18898 14.5874 9.85359 12.682
                       M10.6127 21.9264L14.0208 25.3345L16.8492 19.6777L15.3596 18.188M10.6127 21.9264
                       C11.6311 21.202 13.4542 19.8526 15.3596 18.188"></animate>
              <animateMotion path="M0,0 L5,-5 L0,0" begin="fire_showing.end" dur="3s" repeatCount="indefinite"></animateMotion>

              <!--<animate id="rock_hidden" attributeName="d" begin="fire_hidden.end" fill="freeze" dur="0.5s"
                       to="M16 12 c0 0 0 0 0 0 c0 0 0 0 0 0 M16 12 c0 0 0 0 0 0 c0 0 0 0 0 0 M16 12 l0 0
                       M16 12 c0 0 0 0 0 0 c0 0 0 0 0 0 M16 12 c0 0 0 0 0 0 l0 0 c0 0 0 0 0 0 M16 12 l0 0
                       l0 0 l0 0 M16 12 c0 0 0 0 0 0 M16 12 l0 0 l0 0 l0 0 M16 12 c0 0 0 0 0 0"></animate>
              <animate id="stroke_hidden_back" attributeName="stroke-width" dur="0.5s" begin="fire_hidden.end" to="0"></animate>
              <animateMotion path="M0,0" begin="rock_hidden.end" repeatCount="1" dur="0.1s" ></animateMotion>
              <animate attributeName="d" begin="rock_hidden.end" fill="freeze" dur="0.5s"
                        from="M16 12 l0 0 l0 0"
                        to="M10 6 L16 12 L10 18"></animate>-->
            </path>
            <path d="M5.00003 23c0 0 0 0 0 0c0 0 0 0 0 0Z" stroke-width="0" stroke="red">
                <animate attributeName="d" dur="0.5s" begin="rock_showing.end" fill="freeze"
                         to="M5.00003 23C5.35031 21.5825 5.99994 21.0001 6.5 21.5C7.00003 22 6.41751 22.6497 5.00003 23Z"></animate>
                <animate id="fire_showing" attributeName="stroke-width" dur="0.3s" begin="rock_showing.end" fill="freeze" to="2.5"></animate>
                <!--<animate id="fire_hidden" attributeName="stroke-width" dur="0s" begin="indefinite" fill="freeze" to="0"></animate>-->
                <animateMotion path="M0,0 L5,-5 L0,0" begin="fire_showing.end" dur="3s" repeatCount="indefinite"></animateMotion>
               <!-- <animateMotion path="M0,0" begin="fire_hidden.begin" dur="0.1s" repeatCount="1"></animateMotion>-->
            </path>
              <line x1="10" x2="20" y1="20" y2="10" stroke-linecap="round" stroke='#fff' stroke-width='0'>
                <animate attributeName="stroke-width" begin="fire_showing.end" dur="0.8s" fill="freeze" from="0" to="0.5"></animate>
                <animateMotion path="M25,-10 L-5,20" begin="fire_showing.end" dur="1.1s" repeatCount="indefinite"></animateMotion>
              </line>
              <line x1="10" x2="20" y1="20" y2="10" stroke-linecap="round" stroke='#fff' stroke-width='0'>
                <animate attributeName="stroke-width" begin="fire_showing.end" dur="0.5s" fill="freeze" from="0" to="0.5"></animate>
                <animateMotion path="M20,-35 L-35,20" begin="fire_showing.end" dur="1.3s" repeatCount="indefinite"></animateMotion>
              </line>
            </g>
            <!--d="M10 6 L16 12 L10 18"-->
            <!--d="M6.34314575 6.34314575L17.6568542 17.6568542M6.34314575 17.6568542L17.6568542 6.34314575"-->
            <!--d="M4 13 L9 18 L20 7"-->
            <!--d="M12.7526 9.92418C12.2059 10.2861 11.679 10.7057 11.1924 11.1924C10.4754 11.9093 10.4947 11.9482 9.85359 12.682M12.7526 9.92418C16.178 7.65685 20.3848 7.65685 20.3848 7.65685C20.3848 7.65685 20.3848 11.8636 18.1174 15.289M12.7526 9.92418L18.1174 15.289M18.1174 15.289C17.7555 15.8358 17.3359 16.3626 16.8492 16.8492C16.1323 17.5662 16.0934 17.5469 15.3596 18.188M6.11523 17.429C5.74278 17.9526 5.53552 18.2635 5.53552 18.2635L9.77816 22.5061C9.77816 22.5061 10.0891 22.2988 10.6127 21.9264M6.11523 17.429L2.70709 14.0208L8.36394 11.1924L9.85359 12.682M6.11523 17.429C6.83965 16.4105 8.18898 14.5874 9.85359 12.682M10.6127 21.9264L14.0208 25.3345L16.8492 19.6777L15.3596 18.188M10.6127 21.9264C11.6311 21.202 13.4542 19.8526 15.3596 18.188"-->
          </svg>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: 'flow_button',
      props:{
          flow_style:{
            type:Object,
            default:()=>{
              return {
                width: '90%',//滑动“按钮盒子”的宽度
                height: '50px',//滑动“按钮盒子”的高度
                background: 'black',//滑动“按钮盒子”背景颜色
                borderColor: 'black',//滑动“按钮盒子”边框颜色
                flow_color:'',//滑动后的路径颜色
                imgLink:'',//初始滑动按钮图标链接
                initialDivWidth:50,//初始按钮宽度
                successful_img_link:'',//请求成功后按钮图标链接
                waiting_link:'',//等待时的图标链接
                gapOfImg:'3px',
                btImgColor:'black'
              }
            }
          },
          isOk:{//判断请求是否成功
            type:Number,
            default:0
          },
          isAnimate:{//判断是否执行动画
            type:Number,
            default:0
          }
      },
      data(){
          return{
            boxStyle:{
              width:this.flow_style.width,
              height:this.flow_style.height,
              background:this.flow_style.background,
              borderColor: this.flow_style.borderColor,
            },
            flow_img:{
              borderColor:this.flow_style.borderColor,
              height:this.flow_style.height,
              background:this.flow_style.background,
              transform:'rotate(0deg)',
              padding:this.flow_style.gapOfImg
            },
            /*img_style:{
              background:this.flow_style.btImgColor
            },*/
            img_box_style:{
              borderColor:this.flow_style.borderColor,
              height: this.flow_style.height,
              background:this.flow_style.flow_color,
              transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
              transitionDuration: 'width 0ms',
              transition:'width 0ms',
              width:this.flow_style.initialDivWidth+'px'
            },
            img_address_begin:0,//触屏后的“初始位置”
            currentWidth:0,//“未滑动时”当前按钮宽度
            divWidth:0,//滑动时距离“初始位置”的相对距离
            initialWidth:this.flow_style.initialDivWidth,//按钮的“初始宽度”
            currentAddress:0,//“滑动时”当前按钮宽度
            flow_section_width:0,//存储“按钮盒子”宽度
            /*img_link:this.flow_style.imgLink,//当前显示的图标路径*/
            isStopFlow:0,//开关，是否停止模块滑动
            isBackTimer:0,//开关，是否进行“按钮宽度初始化”
            backContainer:null,
            backDelayedTime:1,
            isMove:0,
            viewBoxData:'0 0 24 24',
          }
      },
      methods:{
          setWidth:function(widthData){//设置“按钮宽度”
            this.img_box_style.width=widthData+'px';
          },
          isStopSectionFlow:function(e){//是否取消“模块”滑动，0=滑动，1=不滑动
            this.$emit('stop-touch-event', e);
          },
          backBeginWidth:function(){//“按钮宽度初始化”
            /*if(document.getElementById('fire_hidden')){
              let item=document.getElementById('fire_hidden');
              this.setSvgViewBox('0 0 24 24');
              item.beginElement();
            }*/
            this.img_box_style.transitionDuration='width 1000ms ease-in-out';
            this.img_box_style.transition='width 1000ms ease-in-out';
            this.img_box_style.width=this.flow_style.initialDivWidth+'px';
            this.isMove=0;
            this.initializeCurrentWidth();
            this.isStopSectionFlow(1);
            console.log(this.isStopFlow);
            setTimeout(()=>{
              this.img_box_style.transition='width 0ms';
              this.img_box_style.transitionDuration='width 0ms';
              this.isStopFlow=0;
              this.isStopSectionFlow(0);
              console.log("ready");
            },1200)
          },
          touchStart_img:function (ev) {//触屏时
            if(this.isStopFlow===0) {
              this.isMove=0;
              this.img_address_begin = ev.touches[0].pageX;
              /*console.log(this.img_address_begin);*/
              this.isStopSectionFlow(1);
              this.isBackTimer=0;
              if(this.backContainer!=null) {
                clearInterval(this.backContainer);
                console.log(this.backContainer)
              }
            }
          },
          touchMove_img:function (ev) {//滑动时
            if(this.isStopFlow===0) {
              this.isMove=1;
              this.divWidth = (ev.touches[0].pageX - this.img_address_begin)*0.9;
              if (this.currentWidth === this.initialWidth && this.divWidth > 0) {
                let i = this.divWidth + this.initialWidth;
                this.currentAddress = i;
                this.setWidth(i);
              } else if (this.currentWidth !== this.initialWidth && this.currentWidth + this.divWidth >= this.initialWidth) {
                let setWidth = this.currentWidth + this.divWidth;
                this.currentAddress = setWidth;
                this.setWidth(setWidth);
              }
            }
            else if(this.isStopFlow===1){
              this.img_address_begin=ev.touches[0].pageX;
            }
            console.log(this.currentWidth,this.divWidth,this.currentAddress);
          },
          touchEnd_img:function () {//滑动结束时
            if(this.isStopFlow===0) {
              console.log(this.currentWidth,this.currentAddress,this.isMove+'---------------');
              if(this.isMove===1) {
                this.currentWidth = this.currentAddress;
                this.isMove=0;
              }
              this.isStopSectionFlow(0);
              this.backContainer=setInterval(()=>{
                this.isBackTimer++;
                if(this.isBackTimer>=this.backDelayedTime){
                  this.backBeginWidth();
                  this.isBackTimer=0;
                  console.log(this.backContainer);
                  clearInterval(this.backContainer);
                }
              },1000)
            }
          },
          initializeCurrentWidth:function(){
            this.currentWidth=this.initialWidth;
            this.currentAddress=this.currentWidth;
          },
          submitEmit:function(){
            this.$emit('submit-option', 1);
          },
          submit_options:function () {
            this.isStopFlow=1;
            this.submitEmit();
            /*this.img_link=this.flow_style.waiting_link;*/
            let timer=setInterval(()=>{
              if(this.isOk===1){
                /*this.img_link = this.flow_style.successful_img_link;*/
                clearInterval(timer);
              }
              else if(this.isOk===-1){
                /*this.img_link=this.flow_style.imgLink;*/
                this.backBeginWidth();
                clearInterval(timer);
              }
            },500);
            console.log(this.currentWidth,this.divWidth,this.currentAddress);
          },
        setSvgViewBox:function(data){
            this.viewBoxData=data;
        },
        rockEmit:function () {
          this.setSvgViewBox('0 0 29 28');
          let i=document.getElementById('stroke_hidden');
          i.beginElement();
          /*let item='<animate attributeName="d" dur="2s" begin="1s" fill="freeze" to="M16 12 l0 0 l0 0"></animate>'*/
         // let item='<animate attributeName="d" to="M12.7526 9.92418C12.2059 10.2861 11.679 10.7057 11.1924 11.1924C10.4754 11.9093 10.4947 11.9482 9.85359 12.682M12.7526 9.92418C16.178 7.65685 20.3848 7.65685 20.3848 7.65685C20.3848 7.65685 20.3848 11.8636 18.1174 15.289M12.7526 9.92418L18.1174 15.289M18.1174 15.289C17.7555 15.8358 17.3359 16.3626 16.8492 16.8492C16.1323 17.5662 16.0934 17.5469 15.3596 18.188M6.11523 17.429C5.74278 17.9526 5.53552 18.2635 5.53552 18.2635L9.77816 22.5061C9.77816 22.5061 10.0891 22.2988 10.6127 21.9264M6.11523 17.429L2.70709 14.0208L8.36394 11.1924L9.85359 12.682M6.11523 17.429C6.83965 16.4105 8.18898 14.5874 9.85359 12.682M10.6127 21.9264L14.0208 25.3345L16.8492 19.6777L15.3596 18.188M10.6127 21.9264C11.6311 21.202 13.4542 19.8526 15.3596 18.188" dur="1s" begin="0s" fill="freeze"></animate>'
        }
      },
      mounted() {
        this.initializeCurrentWidth();
        this.flow_section_width=this.$refs.flow_img_container.clientWidth;
      },
      watch:{
          currentAddress:function () {
            if(this.currentAddress>=this.flow_section_width){
              this.submit_options();
            }
          },
          isAnimate:function () {
              if(this.isAnimate===1){
                this.rockEmit();
              }
          }
      }
    };
</script>

<style scoped>
  .flow_img_container{
    border-radius: 25px;
    font-size:0;
    margin: auto;
    box-sizing:border-box;
    border-style: solid;
    border-width: 2px;
    display:flex;
    align-items:center;
  }
  .flow_img_box{
    padding: 0;
    border-radius: 25px;
    border-left-width:1px;
    border-right-width:0;
    box-sizing:border-box;
    border-style: solid;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .flow_img_box>div{
    width:50px;
    border-radius:50%;
    margin-right:0;
    transform:rotate(0deg);
    transition:transform 0.4s;
    box-sizing:border-box;
    border-style:solid;
    margin-left:auto;
  }
  .flow_img_box svg{
    border-radius: 50%;
    border-style: none;
    background: black;
  }
  .main_svg{
    stroke-linecap: round;
    stroke-linejoin: round;
  }
  /*.flow_img_box img{
    max-height: 100%;
    border-radius:50%;
    box-sizing:border-box;
    border-style:none;
    display: flex;
    justify-content: center;
    align-items: center;
  }*/
</style>
