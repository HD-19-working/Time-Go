import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'

Vue.use(Vuex);
Vue.config.productionTip = false;

/* eslint-disable no-new */
const user_information=new Vuex.Store({
  state:{
    request_link:'http://121.5.194.184:8083/',
    error_message:'',
    is_error:0,
    isOnline:0,
    checkedX:0,
    checkedY:0,
    X:0,
    Y:0,
    idCode:'',
    name:'',
    phone:'',
    user_img:''
  },
  mutations:{
    changeErrorMessage(state,e){
      state.error_message=e;
      setTimeout(()=>{
        state.is_error=0;
      },2000)
    },
    changeError(state,e){
      state.is_error=e;
    },
    changeChecked(state,e){
      state.checkedX=e.X;
      state.checkedY=e.Y;
    },
    changePosition(state,e){
      state.X=e.X;
      state.Y=e.Y;
    },
    changeIdCode(state,idCode){
      state.idCode=idCode;
    },
    updateInformation(state,user){
      state.isOnline=1;
      state.name=user.name;
      state.phone=user.phone;
      state.user_img=(user.user_img===''? './static/img/user_default.png':user.user_img);
    },
    offState(state){
      state.isOnline=0;
      state.name='';
      state.phone='';
      state.user_img='';
    },
    changeName(state,name){
      state.name=name;
    },
    changePhone(state,phone){
      state.phone=phone;
    },
    changeImg(state,img){
      state.user_img=img;
    }
  }
});
new Vue({
  el: '#app',
  router,
  render: h => h(App),
  store:user_information
});
