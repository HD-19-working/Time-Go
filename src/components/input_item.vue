<template>
  <div class="input_box">
    <div class="input_con" :style="input_con_style">
      <div>
      <div class="input_img_box" :style="input_img_style"></div>
      <input :type="item_style.inputType" :class="item_style.inputName" v-model="texts"
             :name="item_style.inputName" :placeholder="item_style.placeHolderText"
              autocomplete="off" />
      </div>
      <div :class="item_style.inputTagImgName"></div>
    </div>
    <div :class="item_style.inputTagName"></div>
  </div>
</template>

<script>
    export default {
      name: 'input_item',
      props:{
        item_style:{
          type:Object,
          default(){
            return{
              inputType:'',
              inputName:'',
              inputTagName:'',
              inputTagImgName:'',
              placeHolderText:'',
              imgLink:'',
              imgSize:'',
              itemState:0,
              itemWarning: '',
              marginTop:'15px'
            }
          }
        },
        itemIndex:0
      },
      data(){
        return{
          texts:'',
          input_con_style:{
            marginTop:this.item_style.marginTop
          },
          input_img_style:{
            backgroundImage: 'url('+this.item_style.imgLink+')',
            backgroundSize: this.item_style.imgSize,
            backgroundPosition:'center'
          }
        }
      },
      methods:{
        tag_option:function (tagName,imgName,text,tagState) {
          let i=document.getElementsByClassName(tagName)[0];
          let t=document.getElementsByClassName(imgName)[0];
          if(tagState===1){
            t.innerHTML='<img src="./static/img/underRegular.png" height="18" width="18" alt="ok" />';
            i.innerHTML='';
          }
          else if(tagState===0){
            i.innerHTML='<span style="font-size: 14px">'+text+'</span>';
            t.innerHTML='<img src="./static/img/wrong.png" height="18" width="18" alt="wrong" />';
          }
          else if(tagState===-1){
            i.innerHTML='';
            t.innerHTML='';
          }
        }
      },
      computed:{
        state:function () {
          return this.item_style.itemState;
        }
      },
      watch:{
        texts:function () {
          this.$emit('checking',
            {
              whichOne:this.item_style.inputName,
              index:this.itemIndex,
              text:this.texts
            }
          );
        },
        state:function () {
          this.tag_option(this.item_style.inputTagName,this.item_style.inputTagImgName,this.item_style.itemWarning,this.state);
        }
      }
    };
</script>

<style scoped>
  .input_con input{
    font-size: 4.5vw;
    height: 6.1vw;
    padding-left: 5px;
    border: none;
    outline: none;
    flex: 1;
  }
  .input_box{
    width: 100%;
    font-size: 0;
  }
  .input_box>div:nth-child(2){
    height: 15px;
    width: 70%;
    font-weight: 600;
    color: #ff5b50;
    margin: auto;
  }
  .input_con{
    width: 80%;
    display: flex;
    align-items: center;
    margin: auto;
  }
  .input_con>div:nth-child(1){
    width: 100%;
    display: flex;
    align-items: center;
    border-bottom-style: solid;
    border-width: 1px;
    border-color: darkgrey;
  }
  .input_img_box{
    width: 30px;
    height: 30px;
    background-repeat: no-repeat;
  }
  .input_con>div:nth-child(2){
    width: 20px;
    height: 30px;
    padding-left: 2px;
    margin-bottom: 0;
    display: flex;
    align-items: center;
    position: relative;
    margin-top: auto;
  }
</style>
