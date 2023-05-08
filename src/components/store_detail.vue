<template>
    <div>
      <div class="detail_head">
        <div @click="backOff"></div>
        <div>{{head_text}}</div>
        <div @click="submitForm"></div>
      </div>
      <div id="set_point" class="detail_position"></div>
      <div class="detail_name">
        <label><span>{{name_title}}:</span><input type="text" v-model="detail.name" /></label>
      </div>
      <div class="detail_phone">
        <label><span>{{phone_title}}:</span><input type="text" v-model="detail.phone" /></label>
      </div>
      <div class="detail_text">
        <label>
          <div>{{text_title}}:</div>
          <textarea name="text_word" rows="7" v-model="detail.text"></textarea>
        </label>
      </div>
      <div class="detail_img">
        <updata_img :max-num="1" @getImgFiles="getImg"></updata_img>
      </div>
    </div>
</template>

<script>
  import updata_img from './updata_img';
  import storeIcon from '../assets/img/store.png';
  import director from '../assets/img/director.png';
  import storeIconChecked from '../assets/img/store_checked.png'
  import axios from 'axios';
  export default {
      name: 'store_detail',
      data(){
        return{
          detail:{
            X:0,
            Y:0,
            name:'',
            phone:'',
            text:''
          },
          img_detail:null,
          name_title:'摊位名称',
          phone_title:'摊主号码',
          text_title:'摊位简介',
          head_text:'摊位管理'
        }
      },
      computed:{
        map:function () {
          return new BMap.Map("set_point");
        }
      },
      methods:{
        backOff:function(){
          this.$router.go(-1);
        },
        submitForm:function(){  //点击提交按钮后执行
          if(this.detail.name.length>10){
            alert('摊位名称请在10个字符以内！');
          }
          else if(this.detail.text.length>100){
            alert('摊位简介请在100个字符以内！');
          }
          else {
            if(this.img_detail===null) {
              this.img_detail=new FormData();
              this.img_detail.append('user_img',null);
            }
              this.img_detail.append('positionX', this.detail.X);
              this.img_detail.append('positionY', this.detail.Y);
              this.img_detail.append('name', this.detail.name);
              this.img_detail.append('phone', this.detail.phone);
              this.img_detail.append('text', this.detail.text);
              this.img_detail.append('idCode',this.$route.query.code);
              axios({
                url:this.$store.state.request_link+'/stall/update',
                method:'post',
                data:this.img_detail,
                headers:{
                  'Content-Type': 'application/x-www-form-urlencoded'
                }
              }).then((response)=>{
                let callData=response.data;
                if(callData.code===0){
                  this.$router.go(-1);
                }else if(callData.code===1){
                  alert(callData.msg);
                }
              })
            }
        },
        getImg:function(e){ //接收用户上传的FormData类型文件对象
          this.img_detail=e;
        },
        pointXY:function(X,Y){  //向地图X，Y坐标标记摊位
          let point = new BMap.Point(X, Y);//
          let Icon = new BMap.Icon(storeIcon, new BMap.Size(24, 24),{
            anchor: new BMap.Size(12, 12),
            imageSize:new BMap.Size(24, 24)
          });
          let marker = new BMap.Marker(point,{icon:Icon});//
          this.map.addOverlay(marker);
        },
        getPosition:function(e){  //获取用户点击的坐标
          this.detail.X=e.point.lng;
          this.detail.Y=e.point.lat;
          this.addPoint(this.detail.X,this.detail.Y);
        },
        addPoint:function(X,Y){ //移除原点击的坐标点，并添加新点
          let remove = this.map.getOverlays();
          this.map.removeOverlay(remove[remove.length-2]);
          this.pointXY(X,Y);
        },
        initialMap:function(){  //初始化地图
          this.map.centerAndZoom(new BMap.Point(this.detail.X,this.detail.Y), 14);
          this.map.enableScrollWheelZoom(true);
          this.map.addEventListener('click',this.getPosition);
          this.showCurrentPosition();
          this.loadingStoreList();
        },
        getStoreDetail:function () {  //获取该摊位信息
          let code=this.$route.query.code;
          let request=new XMLHttpRequest(); //发送“该摊位idCode”,返回“摊位信息对象”
          request.open('POST',this.$store.state.request_link+'/stall/findRegister');/*----------------------------*/
          request.setRequestHeader('content-type','application/json');
          request.onload=()=>{
            let callData=JSON.parse(request.responseText);
            if(callData.code===0){
              this.detail.X=callData.data.positionX;
              this.detail.Y=callData.data.positionY;
              this.detail.name=callData.data.name;
              this.detail.phone=callData.data.phone;
              this.detail.text=callData.data.text;
              this.initialMap();
            }else if(callData.code===1){
              alert(callData.msg);
            }
            /*this.detail=JSON.parse(request.responseText);*/
            /*{
              X:0,
              Y:0,
              name:'',
              phone:'',
              text:'',
              img:null
            }*/
          };
          request.send(code);
        },
        showCurrentPosition:function () { //获取并显示用户位置
          let map=this.map;
          let pointXY=this.pointXY;
          let X=this.detail.X;
          let Y=this.detail.Y;
          plus.geolocation.getCurrentPosition(function(p){
            let user_point=new BMap.Point(p.coords.longitude,p.coords.latitude);
            let myIcon = new BMap.Icon(director, new BMap.Size(30, 30),{ //创建地摊图标对象
              anchor: new BMap.Size(15, 30),
              offset: new BMap.Size(15,30),
              imageSize:new BMap.Size(30, 30)
            });
            let mk = new BMap.Marker(user_point,{icon:myIcon});  //创建地摊点对象
            map.addOverlay(mk); //在地图上加载地毯点对象
            pointXY(X,Y);
          }, function(e){
            alert('Geolocation error: ' + e.message);
          },{provider:'baidu',coordsType:'bd09ll'} );
          /*let geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function(r){
            if(this.getStatus() === BMAP_STATUS_SUCCESS){
              let Icon = new BMap.Icon(director, new BMap.Size(24, 24),{
                anchor: new BMap.Size(12, 12),
                imageSize:new BMap.Size(24, 24)
              });
              let marker=new BMap.Marker(r.point,{icon:Icon});
              map.addOverlay(marker);
              pointXY(X,Y);
            }
            else {
              alert('failed'+this.getStatus());
            }
          },{enableHighAccuracy: true})*/
        },
        showStoreList:function(X,Y,name){ //在地图中加载用户已注册摊位
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
        loadingStoreList:function () {  //获取用户已注册摊位列表
          let request=new XMLHttpRequest(); //发送“用户手机号”，“该摊位idCode”,返回“用户已注册摊位基本信息数组”
          request.open('POST',this.$store.state.request_link+'/stall/findAllByPhone');
          request.setRequestHeader('content-type','application/json');
          request.onload=()=>{
            let callData=JSON.parse(request.responseText);
            if(callData.code===0){
              let arr=callData.data;
              for (let i=0;i<arr.length;i++){
                this.showStoreList(arr[i].X,arr[i].Y,arr[i].store_name)
              }
            }else if(callData.code===1){
              alert(callData.msg);
            }
            /*[{
              store_name:'',
              X:Number,
              Y:Number:
            }]*/

            /*let arr=JSON.parse(request.responseText);*/
            /*[
              {store_name:'hdasdasd',X:113.112702,Y:27.830694},
              {store_name:'hp',X:113.122622,Y:27.830674}
            ];*/
          };
          request.send('{"phone":"'+this.$store.state.phone+'","idCode":"'+this.$route.query.code+'"}');
        }
      },
      mounted() {
        if(window.plus){    //确保plus初始化
          this.getStoreDetail()
        }else{
          document.addEventListener("plusready", this.getStoreDetail, false);
        }
      },
    components:{
        updata_img
      }
    };
</script>

<style scoped>
  .detail_head{
    width: 100%;
    display: flex;
    padding: 10px 15px;
    box-sizing: border-box;
  }
  .detail_head>div:nth-child(1),.detail_head>div:nth-child(3){
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: contain;
  }
  .detail_head>div:nth-child(1){
    background-image: url("../../static/img/cha.png");
  }
  .detail_head>div:nth-child(2){
    flex: 1;
    font-size: 18px;
    font-weight: bold;
    font-family: Arial;
    text-align: center;
  }
  .detail_head>div:nth-child(3){
    margin-right: 0;
    margin-left: auto;
    background-image: url("../../static/img/store_detail_submit.png");
  }
  .detail_position{
    width: 100%;
    height: 30vh;
  }
  .detail_name,.detail_phone,.detail_text{
    padding: 6px 0;
  }
  .detail_name>label,.detail_phone>label{
    display: flex;
    align-items: center;
    width: 80%;
    font-size: 16px;
    padding: 5px 10px;
    box-sizing: border-box;
    font-weight: bold;
    color: darkgrey;
    border-radius: 15px;
    border: 2px solid darkgrey;
    margin: auto;
  }
  .detail_name span,.detail_phone span{
    word-break: keep-all;
  }
  .detail_name input,.detail_phone input{
    width: 100%;
    line-height: 21px;
    height: 21px;
    font-size: 16px;
    font-family: Arial;
    outline: none;
    border: none;
    color: black;
  }
  .detail_text>label{
    width: 80%;
    margin: auto;
    font-size: 16px;
    display: block;
    border: 2px solid darkgrey;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 2px 10px;
  }
  .detail_text div{
    font-weight: bold;
    color: darkgrey;
    height: 28px;
    line-height: 28px;
  }
  .detail_text textarea{
    width: 100%;
    font-size: 16px;
    font-family: Arial;
    border: none;
    outline: none;
    resize: none;
  }
  .detail_img{
    width: 80%;
    margin: auto;
  }
</style>
