<template>
  <div class="big_box" ref="map_big_box" :style="big_box_style">
    <transition name="loading_faded">
      <loading_page v-if="loading_is_show"></loading_page>
    </transition>
    <div id="map_box" :style="map_style"></div>
      <div class="post_bar">
        <img :src="barLink" alt="" @click="expend_post" ref="post_bar">
      </div>
      <div class="post_section"
           :style="post_section_style"
           @touchstart="touchStart"
           @touchmove="touchMove"
           @touchend="touchEnd"
           ref="post_section">

        <div class="user_information_box">
          <img :src="name_img" alt="" class="bar_img">
          <input type="text" class="storeAndPhone" autocomplete="off"
                 v-model="storename" name="storeName" :placeholder="who"/>
        </div>
        <div class="storeNameTag tagStyle"></div>

        <div class="user_information_box">
          <img :src="phone_img" alt="" class="bar_img">
          <input type="text" class="storeAndPhone" autocomplete="off"
                 v-model="phoneNumber" name="phoneNumber" :placeholder="how"/>
        </div>
        <div class="phoneNumberTag tagStyle"></div>

        <div class="user_information_box">
          <div ref="img_list_box">
            <updata_img :max-num="1"
                        @getImgFiles="setFiles"
                        @isStopMove="isStopMove"></updata_img>
          </div>
        </div>
        <div class="imgTag tagStyle"></div>

        <div class="user_information_box">
          <textarea name="storeIntroduction" class="storeIntroduction"
                    v-model="introduction" cols="24" rows="6" :placeholder="what"></textarea>
        </div>
        <div class="storeIntroductionTag tagStyle"></div>

        <div class="user_information_box">
          <div class="decoration_box"></div>
        </div>
        <div class="flow_sectionTag tagStyle"></div>

        <div>
          <flow_button :flow_style="flow_button_style"
                       :is-ok="isOk"
                       :is-animate="isAnimate"
                       @stop-touch-event="isStopTouch"
                       @submit-option="submits">
          </flow_button>
        </div>
      </div>

  </div>
</template>

<script>
  import updata_img from './updata_img';
  import flow_button from './flow_button';
  import storeIcon from '../assets/img/store.png';
  import director from '../assets/img/director.png';
  import storeIconChecked from '../assets/img/store_checked.png';
  import loading_page from './loading_page';
  import axios from 'axios';
    export default {
        name: 'map',
      data(){
          return{
            map_style:{
              height:'100vh'
            },
            big_box_style:{
              height:'100vh'
            },
            post_section_style:{
              transform:'translateY(0px) translateZ(0px)',//给模块添加transform样式
              transition:'transform 0.5s ease-out'
            },
            flow_button_style:{
              width: '90%',//滑动按钮宽度
              height: '50px',//滑动按钮高度
              background: '#ffffff',//滑动按钮背景颜色
              flow_color:'linear-gradient(-225deg, #22E1FF 0%, #1D8FE1 68%, #625EB1 100%)',//滑动后的路径颜色
              borderColor: 'black',//滑动盒子边框颜色
              imgLink:'./static/img/button.png',//滑动按钮图片
              initialDivWidth:50,//滑动按钮的宽度
              successful_img_link:'./static/img/done.png',//提交成功后滑动按钮变化的图片
              waiting_link:'./static/img/waiting.png',//提交等待时滑动按钮变化的图片
              gapOfImg:'4px',//滑动按钮图片距离滑动按钮盒子的距离
              btImgColor:'black'//滑动按钮图片盒子的背景颜色
            },
            positionX:0,//标记点的X坐标
            positionY:0,//标记点的Y坐标
            ispoint:0,//判断是否已在地图上标记点
            barLink:'./static/img/towards.png',//bar图片路径
            who:'摊主姓名',
            how:'摊主电话',
            what:'摊位介绍',
            name_img:'./static/img/name.png',
            phone_img:'./static/img/phone.png',
            beginY:0, /*touch开始时的Y坐标*/
            switchGuard:0, /*模块隐藏在上方（===1）或者下方（===2）的开关*/
            current:0,/*touchMove时，实时记录的当前模块坐标位置*/
            sectionPosition:0,/*touchEnd后当前的模块坐标*/
            storename:'',/*input中绑定name输入信息*/
            phoneNumber:'',/*input中绑定phoneNumber输入信息*/
            imgFiles:null,/*存储即将上传的图片信息*/
            introduction:'',/*input中绑定introduction输入信息*/
            checkStoreName:0,/*检查name输入是否复合规范*/
            checkPhoneNumber:0,/*检查phoneNumber输入是否复合规范*/
            checkImgFiles:0,/*检查ImgFiles是否符合规范*/
            checkIntroduction:0,/*检查introduction输入是否复合规范*/
            checkPosition:0,/*检查坐标是否标记*/
            stopTouchSwitch:0,/*开关，模块是否允许进行滑动*/
            isOk:0,/*开关，提交数据后，返回数据是否提交成功*/
            isMove:0,/*开关，touchStart后检查模块是否滑动*/
            isAnimate:0,
            loading_is_show:true
          }
      },
      computed:{
        map:function () {
          return new BMap.Map("map_box");//
        }
      },
      methods:{
        initialBoxHeight:function(){
          this.big_box_style.height=document.documentElement.clientHeight+'px';
          this.map_style.height=document.documentElement.clientHeight+'px';
        },
        isStopTouch:function(data){//在滑动提交按钮时，取消模块滑动
          this.stopTouchSwitch=data;
          if(this.positionX===0&&this.positionY===0){
            this.tagOptions('flow_sectionTag','请在地图中标记您的摊位地址',0);
            this.checkPosition=0;
          }
          else{
            this.tagOptions('flow_sectionTag','',-1);
            this.checkPosition=1;
          }
        },
        isStopMove:function(data){//在滑动图片时，取消模块滑动
          this.stopTouchSwitch=data;
        },
        getCurrentPosition(){//获取当前浏览器定位坐标
          let map=this.map;
          plus.geolocation.getCurrentPosition(function(p){
            let user_point=new BMap.Point(p.coords.longitude,p.coords.latitude);
            let myIcon = new BMap.Icon(director, new BMap.Size(30, 30),{ //创建地摊图标对象
              anchor: new BMap.Size(15, 30),
              offset: new BMap.Size(15,30),
              imageSize:new BMap.Size(30, 30)
            });
            let mk = new BMap.Marker(user_point,{icon:myIcon});  //创建地摊点对象
            map.addOverlay(mk); //在地图上加载地毯点对象
            map.panTo(user_point); //地图中心点移动到用户当前位置
          }, function(e){
            alert('Geolocation error: ' + e.message);
          },{provider:'baidu',coordsType:'bd09ll'} );
          /*let geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function(r){
            if(this.getStatus() === BMAP_STATUS_SUCCESS){
              map.panTo(r.point);
              let Icon = new BMap.Icon(director, new BMap.Size(24, 24),{
                anchor: new BMap.Size(12, 12),
                imageSize:new BMap.Size(24, 24)
              });
              let marker=new BMap.Marker(r.point,{icon:Icon});
              map.addOverlay(marker);
              console.log(map.getOverlays());
            }
            else {
              alert('failed'+this.getStatus());
            }
          },{enableHighAccuracy: true})*/
        },
        add_point(X,Y){//在对应的点上添加标记
          if(this.ispoint===0) {//如果该店未被标记，则标记该点
            let point = new BMap.Point(X, Y);//
            let Icon = new BMap.Icon(storeIcon, new BMap.Size(24, 24),{
              anchor: new BMap.Size(12, 12),
              imageSize:new BMap.Size(24, 24)
            });
            let marker = new BMap.Marker(point,{icon:Icon});//
            this.map.addOverlay(marker);
            this.ispoint=1;
          }
          else{//如果该点已被标记，该次点击将取消标记
            let remove = this.map.getOverlays();
            this.map.removeOverlay(remove[remove.length-2]);
            this.ispoint=0;
            this.add_point(X,Y);
          }
          console.log(this.map.getOverlays());
        },
        getPosition(e){//获取用户设置“点”的坐标，并在地图上添加标记
          this.positionX=e.point.lng;
          this.positionY=e.point.lat;
          console.log(this.positionX,this.positionY);
          this.add_point(this.positionX,this.positionY);
        },
        expend_post:function () {//隐藏bar按钮，弹出注册模块函数
          this.$refs.post_bar.className='post_bar_img_moveDown';//设置bar按钮隐藏动画css样式
          this.post_section_style.transition = 'transform 0.5s ease-out';
          setTimeout(()=>{
            this.post_section_style.transform='translateY('+this.sectionPosition+'px) translateZ(0px)';//注册模块弹出
          },600)
        },
        touchStart:function (ev) {
          if (this.stopTouchSwitch === 0) {
            this.isOk=0;//-------------------------------------
            this.beginY = ev.touches[0].pageY;//记录触屏开始时Y坐标
            this.post_section_style.transition = 'transform 0s';
          }
        },
        touchMove:function (ev) {
          if(this.stopTouchSwitch===0) {
            this.isMove=1;//如果触发touchMove函数，则证明有滑动事件，开关“记录触屏后是否滑动”
            let distance = ev.touches[0].pageY - this.beginY;//存储距触屏开始后移动的相对距离
            this.current = this.sectionPosition + distance;//更新当前模块的具体Y坐标
            /*this.post_section_style.transition = 'transform 0s';*/
            this.post_section_style.transform = 'translateY(' + this.current + 'px) translateZ(0px)';//移动模块
            if (Math.abs(distance) >= 30) {//如果移动的相对距离>=30则更新“模块隐藏状态”
              if (distance > 0) {
                this.switchGuard = 1;//模块在下方隐藏
              } else {
                this.switchGuard = 2;//模块在上方隐藏
              }
            }
          }
          else if(this.stopTouchSwitch===1){//当禁止模块滑动时，实时更新beginY数据
            this.beginY = ev.touches[0].pageY;
          }
        },
        touchEnd:function () {
          if(this.stopTouchSwitch===0) {
            if(this.isMove===1) {//判断触屏后模块是否滑动
              this.sectionPosition = this.current;//更新sectionPosition
              this.isMove=0;//初始化isMove
            }
            this.post_section_style.transition = 'transform 0.5s ease-in';//初始化“模块transition样式”
            if (this.switchGuard === 1) {//如果模块在下方隐藏
              this.switchGuard=0;//初始化“模块隐藏开关”
              this.post_section_style.transform = 'translateY(0px) translateZ(0px)';//移动模块位置
              this.initializeSection();//初始化sectionPosition
              this.initialization();//设置bar按钮“显示”动画css样式
            } else if (this.switchGuard === 2) {//如果模块在上方隐藏
              this.switchGuard=0;//初始化“模块隐藏开关”
              this.upForwardHidden();//向上移动隐藏模块函数
              this.initializeSection();//初始化sectionPosition
              setTimeout(() => {//延迟设置，当模块向上隐藏动画完成后，设置bar按钮“显示”动画css样式
                this.initialization();
              }, 400)
            }
          }
        },
        initialization:function () {
          this.$refs.post_bar.className='post_bar_img_moveUp';//设置bar按钮“显示”动画css样式
        },
        initializeSection:function () { //初始化sectionPosition为了在expend_post方法中能让注册模块竖直居中
          let wHeight=document.documentElement.clientHeight;
          let sectionHeight=this.$refs.post_section.clientHeight;
          this.sectionPosition=-0.5*(wHeight-sectionHeight)-sectionHeight;
        },
        initializeMax_width:function(){//初始化图片容器的宽度
          let i=document.getElementsByClassName('storeIntroduction')[0].clientWidth+'px';
          this.$refs.img_list_box.style.width=i;
          },
        upForwardHidden:function () {//移动模块向上隐藏函数
          let i=-this.$refs.post_section.clientHeight-
            document.documentElement.clientHeight-100;
          this.post_section_style.transform='translateY('+i+'px) translateZ(0px)';
        },
        tagOptions:function (name,message,isRight) {//封装“tag”消息展示函数
            let tag=document.getElementsByClassName(name)[0];
            if(isRight===1){
              tag.innerHTML=`<img height="15" width="15" src="./static/img/underRegular.png"/>`
            }
            else if(isRight===0){
              tag.innerHTML='<img height="15" width="15" src="./static/img/wrong.png"/><span style="font-size: 13px">'+message+'</span>';
            }
            else if(isRight===-1){
              tag.innerHTML='';
            }
        },
        setFiles:function(files){//接收updata_img组件传回的FormData
          this.imgFiles=files;
          if(this.imgFiles.getAll('user_img').length===0){
            this.checkImgFiles=0;
            this.tagOptions('imgTag','请选择您的商铺宣传照片',0);
          }
          else{
            this.checkImgFiles=1;
            this.tagOptions('imgTag','',-1);
          }
        },
        submits:function (data) {//“提交”按钮触发后执行的函数
            if(this.checkStoreName===1&&this.checkPhoneNumber===1
              &&this.checkImgFiles===1&&this.checkIntroduction===1
              &&this.checkPosition===1){
              this.imgFiles.append('name',this.storename);
              this.imgFiles.append('phone',this.phoneNumber);
              this.imgFiles.append('text',this.introduction);
              this.imgFiles.append('positionX',this.positionX);
              this.imgFiles.append('positionY',this.positionY);
              this.isAnimate=1;
              /*let request=new XMLHttpRequest();
              request.open('POST',this.$store.state.request_link+'');/!*--------------------------------------------*!/
              request.setRequestHeader('content-type','application/json');
              request.onload=()=>{
                if(request.responseText==='ok') {
                  this.isOk = 1;/!*---------------------------------------------------------*!/
                  this.$router.push('/map_views');
                }
              };
              request.send('{"name":"'+this.storename+'","phone":"'+this.phoneNumber+'","img":"'+this.imgFiles+'","text":"'+this.introduction+'","X":"'+this.positionX+'","Y":"'+this.positionY+'"}')*/
              axios({
                url:this.$store.state.request_link+'/stall/save',
                method:'post',
                data:this.imgFiles,
                headers:{
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then((response)=>{
                let callData=response.data;
                console.log(callData.code);
                if(callData.code===0){
                  this.isOk=1;
                  this.$router.push('/map_views');
                }
              })
            }
            else{
              this.isOk=-1;
            }
        },
        showStoreList:function(X,Y,name){
          let point = new BMap.Point(X, Y);//
          let opts = {
            position : point,    // 指定文本标注所在的地理位置
            offset   : new BMap.Size(-40, 8)    //设置文本偏移量
          };
          let label = new BMap.Label(name, opts);  // 创建文本标注对象
          label.setStyle({
            width:'80px',
            textAlign:'center',
            padding:'0px',
            color : "black",
            fontSize : "12px",
            height : "20px",
            lineHeight : "20px",
            letterSpacing:'0px',
            fontWeight:600,
            fontFamily:"微软雅黑",
            backgroundColor:'transparent',
            borderStyle:'none'
          });
          this.map.addOverlay(label);
          let Icon = new BMap.Icon(storeIconChecked, new BMap.Size(24, 24),{
            anchor: new BMap.Size(12, 12),
            imageSize:new BMap.Size(24, 24)
          });
          let marker = new BMap.Marker(point,{icon:Icon});//
          this.map.addOverlay(marker);
        },
        loadingStoreList:function () {
            let request=new XMLHttpRequest();
            request.open('POST',this.$store.state.request_link+'/stall/findAllByPhone');
            request.setRequestHeader('content-type','application/json');
            request.onload=()=>{
              let callData=JSON.parse(request.responseText);
              if(callData.code===0){
                this.loading_is_show=false;
                /*[{
                  store_name:'',
                  X:Number,
                  Y:Number:
                }]*/

                /*let arr=JSON.parse(request.responseText);*/
                let arr=callData.data;
                for (let i=0;i<arr.length;i++){
                  this.showStoreList(arr[i].X,arr[i].Y,arr[i].store_name)
                }
              }else if(callData.code===1){
                alert(callData.msg);
              }
            };
            request.send('{"phone":"'+this.$store.state.phone+'","idCode":-1}');
        }
      },
      mounted() {
        this.initializeSection();//初始化sectionPostion
        this.map.centerAndZoom(new BMap.Point(113.72066355,27.69586405), 14);  // 初始化地图,设置中心点坐标和地图级别
        if(window.plus){    //确保plus初始化
          this.getCurrentPosition();//获取当前定位坐标
        }else{
          document.addEventListener("plusready", this.getCurrentPosition, false);
        }
        this.map.addEventListener('click',this.getPosition);
        this.initializeMax_width();
        this.loadingStoreList();
        this.initialBoxHeight();
      },
      watch:{
        positionX:function(){
          if(this.positionX!==0||this.positionY!==0){
            this.tagOptions('flow_sectionTag','',-1);
          }
        },
        storename:function () {
          if (this.storename.length>10){
            this.checkStoreName=-1;
            this.tagOptions('storeNameTag','输入字符请在10个以内',0);
          }
          else if(this.storename.length>0){
            this.checkStoreName=1;
            this.tagOptions('storeNameTag','',-1)
          }
          else if(this.storename.length===0){
            this.checkStoreName=0;
            this.tagOptions('storeNameTag','',-1)
          }
        },
        phoneNumber:function () {
          if(this.phoneNumber.length!==11){
            this.checkPhoneNumber=-1;
            this.tagOptions('phoneNumberTag','请输入正确格式的号码',0);
            if(this.phoneNumber.length===0){
              this.checkPhoneNumber=0;
              this.tagOptions('phoneNumberTag','',-1);
            }
          }
          else if(this.phoneNumber.length===11){
            let phone=Number(this.phoneNumber);
            if(isNaN(phone)){
              this.checkPhoneNumber=-1;
              this.tagOptions('phoneNumberTag','请输入正确格式的号码',0);
            }
            else{
              this.checkPhoneNumber=1;
              this.tagOptions('phoneNumberTag','',-1);
            }
          }
        },
        introduction:function () {
          if(this.introduction.length<=100&&this.introduction.length>0){
            this.checkIntroduction=1;
            this.tagOptions('storeIntroductionTag','',-1);
          }
          else if(this.introduction.length===0){
            this.checkIntroduction=0;
            this.tagOptions('storeIntroductionTag','',-1);
          }
          else if(this.introduction.length>100){
            this.checkIntroduction=-1;
            this.tagOptions('storeIntroductionTag','输入信息请在100个字符以内',0);
          }
        }
      },
      components:{
          flow_button,
          updata_img,
          loading_page
      }
    };
</script>

<style scoped>
  @keyframes moveDown {
    50%{
      transform: translateY(-100px) rotate(180deg);
    }
    100%{
      transform: translateY(0px) rotate(180deg);
    }
  }
  @keyframes moveUp {
    0%{
      transform: translateY(0px) rotate(0deg);
    }
    100%{
      transform: translateY(-100px) rotate(0deg);
    }
  }
  .loading_faded-enter,
  .loading_faded-leave-active{
    opacity: 0;
  }
  .loading_faded-enter-active,
  .loading_faded-leave-active{
    transition: opacity 0.5s linear;
  }
  .big_box{
    width: 100%;
    overflow: hidden;
  }
  #map_box{
    height: 100vh;
    width: 100%;
    padding: 0;
    margin: 0;
  }
  .user_information_box{
    display: flex;
    justify-content: center;
  }
  .post_bar{
    position: relative;
  }
  .post_bar>img{
    width: 45px;
    height: 45px;
    padding: 0;
    border-radius:50%;
    left:40px;
    transform:translateY(-100px);
    position:absolute;
    border-style:solid;
    border-color:black;
  }
  .post_bar_img_moveDown{/*bar向下运动时动画样式*/
    animation: moveDown 0.8s ease-in-out forwards;
  }
  .post_bar_img_moveUp{/*bar向上运动时动画样式*/
    animation: moveUp 0.4s ease-out forwards;
  }
  .post_section{
    border-radius: 20px;
    padding: 15px 8px 15px 8px;
    width: 80%;
    height:auto;
    margin: auto;
    border-style: solid;
    border-width: 2px;
    border-color: black;
    overflow: hidden;
    box-sizing: border-box;
    background: #ffffff;
  }
  .storeNameTag{
    width: 60%;
  }
  .phoneNumberTag{
    width: 60%;
  }
  .imgTag{
    width: 80%;
  }
  .storeIntroductionTag{
    width: 60%;
  }
  .flow_sectionTag{
    width: 80%;
  }
  .tagStyle{
    height: 20px;
    margin: auto;
    display: flex;
    align-items: center;
  }
  .storeAndPhone{
    font-size: 20px;
    width: 70%;
    border-radius: 10px;
    padding-left: 5px;
    outline: none;
    border-style: solid;
    border-color: #000000;
    color: #000000;
  }
  .storeIntroduction{
    width: 90%;
    font-size: 20px;
    border-radius: 10px;
    padding-left: 5px;
    outline: none;
    border-color: transparent;
    background: whitesmoke;
    resize: none;
  }
  .decoration_box{
    width: 100px;
    border-style: solid;
    text-decoration: none;
    border-color: black;
    color: black;
    text-align: center;
  }
  .bar_img{
    width: 35px;
    height: 35px;
    padding: 0;
    margin-right: 10px;
  }
</style>
