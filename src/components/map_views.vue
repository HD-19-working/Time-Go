<template>
  <div class="view_box">
    <transition name="loading_faded">
      <loading_page v-if="loading_is_show"></loading_page>
    </transition>
    <div class="view_container">
    <div id="map_view"></div>
    <button class="user_img"
            :class="user_img_class"
            :style="user_img_style"
            @click="checkUser">{{user_img_text}}</button>
      <div :class="box_class"
         ref="box_container"
          :style="transform_style"
          @touchstart="touchStart"
          @touchmove="touchMove"
          @touchend="touchEnd">
      <div class="advertised_img" :style="advertised_style"  ref="advertised_img"></div>
        <!--<scroll :style="tag_style" class="container" :is-scroll-y="is_scroll_y" :overflow-style="overflow_style">-->
      <div :style="tag_style" class="container">
      <div ref="tag_height">
      <div class="tag_head">
        <svg xmlns="http://www.w3.org/2000/svg" width="25px" height="15px"
             viewBox="3 8 29 8" stroke="#000" stroke-width="2.4"
             stroke-linecap="round" stroke-linejoin="round" fill="none" color="#000">
          <polyline points="6 14 18 8 30 14">
            <animate id="animate_up" attributeName="points" to="6 8 18 14 30 8" dur="1s" begin="indefinite" fill="freeze"></animate>
            <animate id="animate_down" attributeName="points" to="6 14 18 8 30 14" dur="1s" begin="indefinite" fill="freeze"></animate>
          </polyline>
        </svg>
      </div>
      <div class="store_name">
        <span>{{store_information.name}}</span>
        <!--<div class="start_box" :style="star_background">
          <img src="/static/img/start.png" alt="" />
          <img src="/static/img/start.png" alt="" />
          <img src="/static/img/start.png" alt="" />
          <img src="/static/img/start.png" alt="" />
          <img src="/static/img/start.png" alt="" />
        </div>-->

        <div>
          <button @click="searchWalker">{{navigation_text}}</button>
        </div>
      </div>
      <div class="host_phone">
        <span>电话:{{store_information.phone}}</span>
        <div @click="phoneTo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12.7407967,18.4035953 L15.8976569,15.246735 L21.114676,18.885324
	              L19.9443794,20.055614 C19.1648657,20.8351277 18.020623,21.1243165 16.9643502,20.8087683
	              C13.7351168,19.8440753 10.8342484,18.0754771 8.26174492,15.5029737
	              C5.6892452,12.930474 3.92064841,10.0296102 2.95595454,6.80038244
	              C2.64039085,5.74410652 2.92958124,4.59985601 3.70910009,3.82033716
	              L4.87939464,2.65004261 L8.51798358,7.86706169 L5.36112331,11.023922"/>
          </svg>
        </div>
      </div>
      <div class="store_introduction">{{store_information.text}}</div>
      </div>
      <more-detail :comment_calculate_list="more_message.comment_calculate_list"
                   :tag_list="more_message.tag_list"
                   :comment_data_list="more_message.comment_data_list"
                   :comment_num="more_message.comment_num"
                   :recommend_list="more_message.recommend_list"
                   :loading_state="loading_state"
                   @toRecommendItem="toRecommendItem"
                   :is_update="is_update"></more-detail>
        <!--</scroll>-->
          </div>
    </div>
    </div>
  </div>
</template>

<script>
  import moreDetail from './moreDetail';
  import Scroll from './scroll';
  import loading_page from './loading_page';
  import iconImg from '../assets/img/director.png'
  import storeIconChecked from '../assets/img/store_checked.png';
    export default {
      name: 'map_views',
      data(){
        return{
          /*star_background:{
            width:(4/5)*80+'px',
            backgroundColor:'orange'
          },*/
          store_information:{},
          more_message:{
            comment_calculate_list:[],
            tag_list:[],
            comment_data_list:[],
            recommend_list:[],
            comment_num:0
          },
          advertised_style:{  //宣传图片样式
            backgroundImage:'url(./static/img/done.png)',
            position:'absolute'
          },
          transform_style:{ //“摊位信息模块”样式
            transitionTimingFunction: 'cubic-bezier(0.165, 0.84, 0.44, 1)',
            transform:'translateY(0px)',
            transition:'transform 0s'
          },
          tag_style:{ //“摊位文本模块”样式
            /*transitionTimingFunction: 'cubic-bezier(0,0,0.58,1)',*/
            transform:'translateY(0px)',
            transition:'transform 0s'
          },
          begin_position:0, //存储touchStart时的初始位置
          page_switch:0,  //状态开关，判断“摊位信息模块”隐藏或显示
          is_move:0,  //判断开关，判断用户touchStart后是否滑动
          box_class:'showing_box page_mode1 box_hidden',
          mode1_height:0,  //存储“摊位文字模块”高度
          window_height:document.documentElement.clientHeight,  //用户手机视窗高度
          img_height:document.documentElement.clientWidth*0.5,  //设置宣传图片高度
          is_get_top:0, //状态开关，判断是否到达滚轮顶部
          is_off_page:0,  //状态开关，是否向下移动隐藏“摊位信息模块”
          user_img_text:'登录',
          user_img_class:'',  //存储用户头像样式类名
          user_img_style:{},  //用户头像样式
          is_load:1,  //状态开关，判断是否可以加载，默认可以加载
          navigation_text:'导航',
          loading_is_show:true, //控制开关，控制“摊位信息模块”加载动画是否显示，默认为true=>显示
          loading_state:true,  //控制开关，控制“摊位文本模块”加载动画是否显示，默认为true=>显示
          is_update:false
          /*current_position:0,
          lasted_position:document.documentElement.clientWidth*0.5,
          touch_move_distance:0,
          start_time:0,
          timer:null*/
        }
      },
      computed:{
        map:function () {
          return new window.BMap.Map('map_view');
          /*return null;*/
        },
        animate_up:function () {
          return document.getElementById('animate_up');
        },
        animate_down:function () {
          return document.getElementById('animate_down');
        }
      },
      methods:{
        forbidScrollIndicator:function () { //禁止该页面滚轮显示
          plus.webview.currentWebview().setStyle({scrollIndicator:'none'});
          this.getCurrentPosition();
        },
        initialHeight:function(){//点击地摊图标后触发
          this.mode1_height=this.$refs.tag_height.clientHeight; //存储“摊位文字模块”高度
          this.transform_way(this.window_height - this.mode1_height); //隐藏“摊位信息模块”
        },
        initialUserImg:function(){  //初始化用户头像
          if(this.$store.state.isOnline===1){ //已登录时执行
            this.user_img_style={ //设置用户头像
              backgroundImage:'url('+this.$store.state.user_img+')'
            };
            this.user_img_class='user_img_login'; //设置用户头像对应样式
            this.user_img_text='';
          }else{  //未登录时执行
            this.user_img_text='登录';
            this.user_img_class='user_img_unlogin';  //设置登录button样式
          }
        },


        phoneTo:function(){ //向点击的摊位拨号
          plus.device.dial(this.store_information.phone, true);
        },


        toRecommendItem:function(e){
          this.offMainPage();
          this.$refs.box_container.scrollTo({
            top:0,
            behavior:'smooth'
          });
          this.showMore(this.$store.state.idCode,e.X,e.Y);
        },


        searchWalker:function(){  //导航按钮点击执行
          this.navigateTo();
        },
        navigateTo:function () {  //跳转到第三方进行导航
          let i=this.getWgs84(this.$store.state.checkedX,this.$store.state.checkedY);
          let t=this.getWgs84(this.$store.state.X,this.$store.state.Y);
          let start=new plus.maps.Point(t.lng,t.lat);
          let end=new plus.maps.Point(i.lng,i.lat);
          /*/!**!/let end=new plus.maps.Point(this.$store.state.checkedX,this.$store.state.checkedY);*/
          plus.maps.openSysMap( end,this.store_information.name, start);
        },
        getWgs84:function(lng,lat){
          let CoordinateUtil = {
            x_pi: 3.14159265358979324 * 3000.0 / 180.0,
            //pai
            pi: 3.1415926535897932384626,
            //离心率
            ee: 0.00669342162296594323,
            //长半轴
            a: 6378245.0,
            //百度转国测局
            bd09togcj02: function(bd_lon, bd_lat) {
              let x = bd_lon - 0.0065;
              let y = bd_lat - 0.006;
              let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * CoordinateUtil.x_pi);
              let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * CoordinateUtil.x_pi);
              let gg_lng = z * Math.cos(theta);
              let gg_lat = z * Math.sin(theta);
              return {
                lng: gg_lng,
                lat: gg_lat
              }
            },
            //国测局转84
            gcj02towgs84: function(lng, lat) {
              let dlat = CoordinateUtil.transformlat(lng - 105.0, lat - 35.0);
              let dlng = CoordinateUtil.transformlng(lng - 105.0, lat - 35.0);
              let radlat = lat / 180.0 * CoordinateUtil.pi;
              let magic = Math.sin(radlat);
              magic = 1 - CoordinateUtil.ee * magic * magic;
              let sqrtmagic = Math.sqrt(magic);
              dlat = (dlat * 180.0) / ((CoordinateUtil.a * (1 - CoordinateUtil.ee)) / (magic * sqrtmagic) * CoordinateUtil.pi);
              dlng = (dlng * 180.0) / (CoordinateUtil.a / sqrtmagic * Math.cos(radlat) * CoordinateUtil.pi);
              let mglat = lat + dlat;
              let mglng = lng + dlng;
              return {
                lng: lng * 2 - mglng,
                lat: lat * 2 - mglat
              };
            },
            //经度转换
            transformlat: function(lng, lat) {
              let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
              ret += (20.0 * Math.sin(6.0 * lng * CoordinateUtil.pi) + 20.0 * Math.sin(2.0 * lng * CoordinateUtil.pi)) * 2.0 / 3.0;
              ret += (20.0 * Math.sin(lat * CoordinateUtil.pi) + 40.0 * Math.sin(lat / 3.0 * CoordinateUtil.pi)) * 2.0 / 3.0;
              ret += (160.0 * Math.sin(lat / 12.0 * CoordinateUtil.pi) + 320 * Math.sin(lat * CoordinateUtil.pi / 30.0)) * 2.0 / 3.0;
              return ret;
            },
            //纬度转换
            transformlng: function(lng, lat) {
              let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
              ret += (20.0 * Math.sin(6.0 * lng * CoordinateUtil.pi) + 20.0 * Math.sin(2.0 * lng * CoordinateUtil.pi)) * 2.0 / 3.0;
              ret += (20.0 * Math.sin(lng * CoordinateUtil.pi) + 40.0 * Math.sin(lng / 3.0 * CoordinateUtil.pi)) * 2.0 / 3.0;
              ret += (150.0 * Math.sin(lng / 12.0 * CoordinateUtil.pi) + 300.0 * Math.sin(lng / 30.0 * CoordinateUtil.pi)) * 2.0 / 3.0;
              return ret;
            },
            getWgs84xy:function(x,y){
              //先转 国测局坐标
              let doubles_gcj = CoordinateUtil.bd09togcj02(x, y); //（x 117.   y 36. ）
              //国测局坐标转wgs84
              return CoordinateUtil.gcj02towgs84(doubles_gcj.lng, doubles_gcj.lat);
            }
          };
          return CoordinateUtil.getWgs84xy(lng, lat);
        },


        checkUser:function(){ //用户个人信息管理入口
          if(this.$store.state.isOnline===1){ //已登录时执行
            this.$router.push('/user_area');  //跳转到个人信息界面
          }
          else{ //未登录时执行
            this.$router.push('/online/login'); //跳转到登录界面
          }
        },


        getCurrentPosition:function () {  //获取用户当前位置坐标
          let map=this.map;
          let X=0,Y=0;
          plus.geolocation.getCurrentPosition(function(p){
            X=p.coords.longitude;
            Y=p.coords.latitude;
            let user_point=new BMap.Point(p.coords.longitude,p.coords.latitude);
            map.centerAndZoom(new BMap.Point(113.11373,27.831232), 14);  // 初始化地图,设置中心点坐标和地图级别
            //添加地图类型控件
            let myIcon = new BMap.Icon(iconImg, new BMap.Size(30, 30),{ //创建地摊图标对象
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
          /*let geolocation = new window.BMap.Geolocation();
          geolocation.enableSDKLocation();
          geolocation.getCurrentPosition(function(r){
            if(this.getStatus() === BMAP_STATUS_SUCCESS){
              map.centerAndZoom(new BMap.Point(113.11373,27.831232), 14);  // 初始化地图,设置中心点坐标和地图级别
              //添加地图类型控件
              map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
              let myIcon = new BMap.Icon(iconImg, new BMap.Size(30, 30),{ //创建地摊图标对象
                anchor: new BMap.Size(15, 30),
                offset: new BMap.Size(15,30),
                imageSize:new BMap.Size(30, 30)
              });
              console.log(myIcon,'asdasdsadsa');
              let mk = new BMap.Marker(r.point,{icon:myIcon});  //创建地摊点对象
              map.addOverlay(mk); //在地图上加载地毯点对象
              map.panTo(r.point); //地图中心点移动到用户当前位置
              X=r.point.lng;  //暂存用户当前X坐标
              Y=r.point.lat;  //暂存用户当前Y坐标
            }
            else {
              alert('failed'+this.getStatus());
            }
          },{enableHighAccuracy: true});*/
          let timer=setInterval(()=>{
            if(X!==0&&Y!==0){
              this.$store.commit('changePosition',{X,Y}); //存储用户当前坐标
              this.getPointInformation();
              clearInterval(timer);
            }
          },500);
        },
        getPointInformation:function () { //获取地图摊位点信息
          let request=new XMLHttpRequest();
          request.open('POST',this.$store.state.request_link+'/stall/findAllStall');/*---------------------------------------------*/
          request.setRequestHeader('content-type','application/json');
          request.onload=()=>{
            let callData=JSON.parse(request.responseText);
            if(callData.code===0){
              this.loading_is_show=false; //关闭loading动画
              let context=callData.data;/*返回Json数组*/
              /*
                {
                  positionX:Number, 摊位地图横坐标
                  positionY:Number, 摊位地图纵坐标
                  name:String, 摊位名称
                  idCode:String 摊位唯一id标识码
                }
              */
              if(typeof context!=='string') {
                for (let i = 0; i < context.length; i++) {  //将获取的地摊点信息加载到地图上
                  this.add_information(context[i].positionX, context[i].positionY, context[i].name, context[i].idCode);
                }
              }
            }else if(callData.code===1){
              alert(callData.msg);
            }
          };
          request.send('{"positionX":"'+this.$store.state.X+'","positionY":"'+this.$store.state.Y+'"}');
        },
        add_information:function (X,Y,name,idCode) {  //在地图上加载摊位点信息
          let call_method;
          let point=new BMap.Point(X,Y);
          let opts = {
            position : point,    // 指定文本标注所在的地理位置
            offset   : new BMap.Size(-40, 8)    //设置文本偏移量
          };
          let label = new BMap.Label(name, opts);  // 创建文本标注对象
          label.setStyle({  //文本标注的css样式
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
          this.map.addOverlay(label); //在地图上添加文本标注对象
          let Icon = new BMap.Icon(storeIconChecked, new BMap.Size(24, 24),{  //创建摊位图标对象
            anchor: new BMap.Size(12, 12),
            imageSize:new BMap.Size(24, 24)
          });
          let marker=new BMap.Marker(point,{icon:Icon});  //创建图标标注对象
          this.map.addOverlay(marker);  //在地图上添加图标标注对象
          marker.addEventListener('click',call_method=()=>{
            this.showMore(idCode,X,Y);
          }) //给每一个摊位图标添加点击事件->加载更多信息
        },
        showMore:function(idCode,X,Y){
          let point=new BMap.Point(X,Y);
          this.map.panTo(point);
          this.loading_is_show=true;  //开启loading动画
          this.is_load=1; //开启is_load触发touch事件后执行loadMore函数
          this.$store.commit('changeChecked',{X:X,Y:Y});  //存储点击摊位坐标
          this.$store.commit('changeIdCode',idCode);  //存储点击摊位id码
          let request=new XMLHttpRequest(); //发送“点击的摊位id码”获取“该摊位基本信息”
          request.open('POST',this.$store.state.request_link+'/stall/findByIdCode');/*-----------------------------------------*/
          request.setRequestHeader('content-type','application/json');
          request.onload=()=>{
            let callData=JSON.parse(request.responseText);
            if(callData.code===0){
              this.is_update=true;
              this.loading_is_show=false; //关闭loading动画
              this.store_information=callData.data;
              this.advertised_style.backgroundImage='url('+callData.data.imgUrl+')';
              this.$nextTick(()=>{
                this.box_class='showing_box page_mode1';
                this.initialHeight();
              })
            }else if(callData.code===1){
              alert(callData.msg);
            }
            /*
            {
              name:String,
              phone:String,
              text:String,
              imgUrl:String
            }
            */
          };
          request.send(idCode);
        },

        /*toNumber:function(){
          return parseFloat(this.tag_style.transform.slice(11,this.tag_style.transform.length));
        },*/
        /*getCurrentTime:function(){
          return new Date().getTime();
        },*/
        getScrollPosition:function(){ //获取当前滑轮距离顶部的距离
          return this.$refs.box_container.scrollTop;
        },
        setTransition:function(nam,val){  //设置指定对象的transition属性
          this[nam].transition='transform '+val+'s';
        },
        tag_transform:function(position){ //设置“摊位文字模块”移动
          this.tag_style.transform='translateY('+position+'px)';
        },
        transform_way:function(position){ //设置“摊位信息模块”移动，“摊位信息模块”包括“摊位文字模块”和“宣传图片”
          this.transform_style.transform='translateY('+position+'px)';
        },
        /*touchFlow:function(){
          let time=this.getCurrentTime()-this.start_time;
          console.log(time);
          if(time<1000){
            this.setTransition('tag_style',0);
            let i=this.touch_move_distance*2/time;
            let flow_distance=0;
            this.timer=setInterval(()=>{
              if(Math.abs(flow_distance)>=Math.abs(this.touch_move_distance)){
                this.setTransition('tag_style',2);
                this.tag_transform(this.toNumber()+this.touch_move_distance*10);
                clearInterval(this.timer);
              }
              console.log(flow_distance);
              flow_distance+=i;
              this.tag_transform(this.lasted_position+flow_distance);
            },1);
            /!*this.setTransition('tag_style',time/500);
            this.tag_transform(this.lasted_position+this.touch_move_distance*2);*!/
          }else{
            this.setTransition('tag_style',1);
            this.tag_transform(this.lasted_position+this.touch_move_distance*2);
          }
          /!*this.setTransition('tag_style',1);*!/
          console.log(this.lasted_position+this.touch_move_distance);
        },*/
        touchStart:function(ev){
          this.setTransition('transform_style',0);  //设置“摊位详细信息模块”的transition为0s
          this.setTransition('tag_style',0);  //设置“摊位文字模块”的transition为0s
          if(!this.page_switch){  //当“摊位详细信息模块”隐藏时执行
            this.is_move=0; //初始化is_move
            if(this.is_load===1){ //当is_load等于1时执行
              this.loadMore();
            }
          }
          else{ //当“摊位详细信息模块”显示时执行
           /* clearInterval(this.timer);
            console.log(this.tag_style.transform,this.toNumber());
            this.start_time=this.getCurrentTime();
            this.lasted_position=this.toNumber();*/
            if(!this.getScrollPosition()){  //滑轮距离顶部的距离为0时执行
              this.is_get_top=1;  //is_get_top设置为1
            }
          }
          this.begin_position=ev.touches[0].pageY;  //存储touchStart时的初始位置
        },
        touchMove:function(ev){
          let i = (ev.touches[0].pageY - this.begin_position)*0.5;  //获取滑动时距离touchStart初始位置的距离
          if (!this.page_switch && i < 0) {  //当“摊位详细信息模块”隐藏并且向上滑动时执行
              this.is_move = 1; //设置is_move=1，代表有滑动事件触发
              this.transform_way(i + this.window_height - this.mode1_height); //移动“摊位详细信息模块”
              if (-i <= this.img_height) {  //当移动距离的绝对值<宣传图片高度时执行
                this.tag_transform(-i); //“摊位文字模块”向下移动i的绝对值
              }
            } else if (this.page_switch) { // 当“摊位详细信息模块”显示时执行
              if (this.is_get_top === 1 && i > 0) { //如果is_get_top===1且向下滑动时执行
                this.is_off_page = 1; //设置is_off_page=1
                this.transform_way(i);  //移动“摊位详细信息模块”
                if (i <= this.img_height) { //当移动距离的绝对值<宣传图片高度时执行
                  this.tag_transform(-i + this.img_height); //“摊位文字模块”向上移动
                }
              }else{
                /*this.touch_move_distance=i*2;
                i=i*1.5;
                this.current_position=i+this.lasted_position;
                if(this.current_position<=this.img_height) {
                  this.tag_transform(this.current_position);
                }*/
              }
            }
        },
        touchEnd:function(){
          if(!this.page_switch&&this.is_move===1){  //当“摊位详细信息模块”隐藏，并且有滑动事件时=>
            this.setMainPage();
          }
          else if(this.page_switch) { //当“摊位详细信息模块”显示时执行
            if (this.is_off_page === 1) {
              this.offMainPage();
            }else{
              /*this.lasted_position=this.current_position;*/
              this.is_get_top=0;
              /*this.touchFlow();*/
            }
          }
        },
        setMainPage:function(){ //“摊位详细信息模块”上滑显示执行函数
          this.page_switch=1; //状态开关，page_switch===1，代表“摊位详细信息模块”上滑显示
          this.is_off_page=0; //初始化is_off_page
          this.is_get_top=0;  //初始化is_get_top
          this.box_class='showing_box page_mode2';  //给“摊位详细信息模块”设置 page_mode2类样式
          this.setTransition('transform_style',1);  //设置“摊位详细信息模块”的transition为1s
          this.setTransition('tag_style',1);  //设置“摊位文字模块”的transition为1s
          this.transform_way(0);  //将“摊位详细信息模块”上滑到顶部
          this.tag_transform(this.img_height);  //将“摊位文字模块”距离盒子顶部的偏移量设置为“宣传图片的高度”
          this.animate_up.beginElement(); //开启svg上滑时的上下箭头动画
        },
        offMainPage:function(){ //“摊位详细信息模块”下滑隐藏执行函数
          this.page_switch=0; //状态开关，page_switch===0,代表“摊位详细信息模块”下滑隐藏
          this.is_move=0; //初始化is_move（判断是否滑动）
          this.box_class='showing_box page_mode1';  //给“摊位详细信息模块”设置 page_mode1类样式
          this.setTransition('transform_style',1);  //设置“摊位详细信息模块”的transition为1s
          this.setTransition('tag_style',1);  //设置“摊位文字模块”的transition为1s
          this.transform_way(this.window_height - this.mode1_height); //将“摊位详细信息模块”下滑到底部
          this.tag_transform(0);  //将“摊位文字模块”距离盒子顶部的偏移量设置为0
          this.animate_down.beginElement(); //开启svg下滑时的上下箭头动画
          /*this.lasted_position=document.documentElement.clientWidth*0.5;*/
        },
        loadMore:function(){  //加载点击摊位更多相关信息
          this.loading_state=true;  //开启loading动画
          let request=new XMLHttpRequest();//发送“用户当前X坐标，Y坐标，点击摊位id码”，返回“摊位详细信息”
          request.open('POST',this.$store.state.request_link+'/comment/commentData');/*----------------------------*/
          request.setRequestHeader('content-type','application/json');
          request.onload=()=>{
            let callData=JSON.parse(request.responseText);
            if(callData.code===0) {
              this.is_load = 0; //is_load赋值为0防止touch后重复加载
              this.loading_state = false; //关闭loading动画
              this.more_message = callData.data;
            }
            else if(callData.code===1){
              alert(callData.msg);
            }
            /*more_message:{
              comment_calculate_list:[0.66, 0.15, 0.08, 0.04, 0.07],//5,4,3,2,1
                tag_list:[
                {value:'景观漂亮',num:6},
                {value:'景观漂亮',num:6},
                {value:'景观漂亮',num:6},
                {value:'景观漂亮',num:6},
                {value:'景观漂亮',num:6}
              ],
                comment_data_list:[
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
                },
                {
                  user_img:'./static/img/done.png',
                  default_img:'./static/img/button.png',
                  user_name:'HD',
                  user_grade:4,
                  comment_text:'真滴好~~~~~',
                  comment_date:'2020/10/29'
                }
              ],
                recommend_list:[
                {
                  img_link:'./static/img/done.png',
                  name:'神农城',
                  grade:4.5,
                  distance:2.7,
                  tag:['真滴好','妙啊'],
                  idCode:'',
                  X:0,
                  Y:0
                }
              ],
                comment_num:53
            }*/
          };
          request.send('{"positionX":"'+this.$store.state.X+'","positionY":"'+this.$store.state.Y+'","idCode":"'+this.$store.state.idCode+'"}');
        }
      },
      mounted() {
        if(window.plus){    //确保plus初始化
          this.forbidScrollIndicator();
        }else{
          document.addEventListener("plusready", this.forbidScrollIndicator, false);
        }
        this.initialUserImg();
      },
      activated() {
        this.initialUserImg();
        this.getPointInformation();
      },
      components:{
        Scroll,
        moreDetail,
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
  .user_img_unlogin{
    background-color: whitesmoke;
    opacity: 0.8;
    font-size: 14px;
    width:50px;
    height: 50px;
    font-family: Arial;
    font-weight: bold;
    color: cornflowerblue;
  }
  .user_img_login{
    width: 60px;
    height: 60px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
  .showing_box{
    width: 100%;
    height: 100vh;
    top: 0;
    border-style: none;
    background-color: whitesmoke;
    box-sizing: border-box;
    position: absolute;
    display: block;
  }
  .box_hidden{
    visibility: hidden;
  }
  .page_mode1{
    border-top-right-radius: 15px;
    border-top-left-radius: 15px;
    overflow: hidden;
  }
  .page_mode2{
    overflow: auto;
  }
  .view_box{
    width: 100%;
    height: 100vh;
    font-size: 0;
    overflow: hidden;
  }
  .view_container{
    width: 100%;
    height: 100vh;
    position: relative;
  }
  #map_view{
    width: 100%;
    height: 100vh;
  }
  .user_img{
    position: absolute;
    top: 30px;
    left: 20px;
    outline: none;
    border: none;
    border-radius: 50%;
  }
  .container{
    z-index: 2;
    padding: 4px 12px 10px 12px;
    position: relative;
    background-color: white;
  }
  .tag_head{
    display: flex;
    justify-content: center;
  }
  .tag_head>svg{
    width: 25px;
    height: 15px;
    stroke: #000;
    stroke-width: 2.4;
    fill: none;
    stroke-linejoin: round;
    stroke-linecap: round;
    color: #000;
  }
  .store_name{
    width: 100%;
    font-size: 22px;
    line-height: 30px;
    font-weight: bold;
    display: flex;
    align-items: center;
  }
  .store_name>div{
    margin-right: 0;
    margin-left: auto;
    line-height: 0;
    box-sizing: border-box;
    padding: 0 5px;
    font-size: 15px;
  }
  .store_name button{
    width: 70px;
    height: 30px;
    outline: none;
    border: none;
    border-radius: 15px;
    background-position: 5px;
    background-repeat: no-repeat;
    background-color: cornflowerblue;
    background-size: 22px 22px;
    padding-left: 22px;
    line-height: 30px;
    font-size: 16px;
    font-weight: bold;
    font-family: Arial;
    word-break: keep-all;
    color: white;
    box-sizing: border-box;
    background-image: url("../../static/img/navigation.png");
  }
  .host_phone{
    width: 100%;
    font-size: 14px;
    font-weight: bold;
    padding: 2px 0 0 0;
    display: flex;
    align-items: center;
  }
  .host_phone>div{
    margin-right: 10px;
    font-size: 0;
    margin-left: auto;
  }
  .host_phone svg{
    width: 30px;
    padding: 5px;
    height: 30px;
    border-radius: 50%;
    stroke-width: 2.4;
    line-height: 0;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
    box-sizing: border-box;
    background-color: cornflowerblue;
    stroke: white;
  }
  .store_introduction{
    width: 70%;
    line-height: 16px;
    font-size: 12px;
    font-weight: 600;
    padding-bottom: 10px;
    letter-spacing: 1px;
    word-break: break-word;
    color: dimgray;
  }
  .advertised_img{
    width: 100vw;
    height: 50vw;
    z-index: -10;
    top: 0;
    position: fixed;
    background-position: center;
    background-size: 100%;
    background-repeat: no-repeat;
  }
</style>
