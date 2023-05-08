<template>
  <div class="img_files" >
    <div class="show_box"
        @touchstart="isStopMove(1)"
        @touchend="isStopMove(0)">

      <div class="item_box" v-for="(item,index) in img_list">
        <img  :src="item" :key="index" alt="空" class="show_img">
        <img src="../../static/img/cancel.png" @click="cancelImg(index)" class="cancel_button" alt="">
      </div>

      <label>
        <input type="file"
               name="img_files"
               @change="showImg"
               ref="img_files"
               multiple="multiple"
               accept="image/jpeg,image/png,image/jpg" />
        <img src="../../static/img/increase.png" class="show_img button_img" alt="">
      </label>

    </div>
    <p class="img_tag">(请上传最多{{maxNum}}张照片)</p>
  </div>
</template>

<script>
    export default {
      name: 'updata_img',
      props:{
          maxNum:{//最大上传图片数量
            type:Number,
            default:1
          }
      },
      data(){
        return{
          img_list:[],//存储临时的图片url供展示
          file_array:[],//存储file序列
          numOfImg:0//记录当前图片个数
        }
      },
      methods:{
        isStopMove:function(e){//是否停止模块滑动
          this.$emit('isStopMove',e);
        },
        sendImgLink:function(){//向父元素发送file序列
          let formData=new FormData();
          for(let i=0;i<this.file_array.length;i++){
            formData.append('user_img',this.file_array[i],this.file_array[i].name);
          }
          this.$emit('getImgFiles',formData);
        },
        warning:function(){//警告
          alert('上传图片数量最大'+this.maxNum+'张')
        },
        showImg:function () {//存储临时url=>img_list，存储files=>file_array
          let file_list=this.$refs.img_files.files;//获取该次改变input获取的files
          if(this.numOfImg<this.maxNum) {//判断是否在maxNum范围内
            for (let i = 0; i < file_list.length; i++) {//对files遍历
              let url = window.URL.createObjectURL(file_list[i]);//将每个file转化为临时url
              this.img_list.push(url);//存储临时url
              this.numOfImg++;//图片数量加一
              this.file_array.push(file_list[i]);//存储每个file
              this.sendImgLink();//发送添加后的file序列
            }
          }else{
            this.warning()
          }
        },
        cancelImg:function (index) {
          this.img_list.splice(index,1);//删除临时url数组中对应元素，使图片实现点击删除效果
          this.file_array.splice(index,1);//删除file序列对应元素
          this.$refs.img_files.value=null;
          //改变value值，解决了：用户删除a图片后，再选择a图片时，因onchange事件未触发而造成第二次a图片不能上传
          this.numOfImg--;//图片数量减一
          this.sendImgLink();//发送删除后的file序列
        }
      }
    };
</script>

<style scoped>
  .img_files{
    width: 100%;
    height: 100%;
    overflow-x: auto;
  }
  .show_box{
    border-radius: 15px;
    height: auto;
    border-style: none;
    display: flex;
    align-items: center;
  }
  .show_box input{
    display: none;
  }
  .item_box{
    width: 90px;
    height: 90px;
    border-radius: 5px;
    margin-right: 5px;
    position: relative;
  }
  .show_img{
    width: 90px;
    height: 90px;
    border-radius: 8px;
    background-color: whitesmoke;
    box-sizing: border-box;
  }
  .cancel_button{
    width: 16px;
    height: 16px;
    right: 5px;
    top: 5px;
    position: absolute;
  }
  .button_img{
    padding: 30px;
  }
  .img_tag{
    width: 100%;
    font-size: 15px;
    line-height: 20px;
    color: darkgrey;
  }
</style>
