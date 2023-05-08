<template>
  <keep-alive include="map_views">
    <router-view></router-view>
  </keep-alive>
  <!--<span class="error_tag" :style="error_style">{{error_text}}</span>-->
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      error_style:{
        'display':'block'/*(this.$store.state.is_error===1 ? 'block':'none')*/
      },
      error_text:this.$store.state.error_message
    }
  }
}
</script>

<style scoped>
  .error_tag{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    border-radius: 10px;
    z-index: 999;
    padding: 5px 10px 5px 27px;
    font-size: 16px;
    color: whitesmoke;
    background-image: url("../static/img/error.png");
    background-size: 25px;
    background-position: 0;
    background-repeat: no-repeat;
    background-color: rgba(105,105,105,0.8);
    margin: auto;
  }
</style>
