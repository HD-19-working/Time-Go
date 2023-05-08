<template>
    <div class="grade_container" ref="grade">
      <div v-for="(item,index) of grade_class_list"
           :key="'grade'+index"
           class="grade_adapted"
           :class="item"
           :style="grade_style" @click="colorStart(index+1)"></div>
    </div>
</template>

<script>
    export default {
      name: 'grade_section',
      props:{
        index:{
          type:Number,
          default:-1
        }
      },
      data(){
        return{
          grade_class_list:[
            'grade_shadow',
            'grade_shadow',
            'grade_shadow',
            'grade_shadow',
            'grade_shadow'
          ],
          grade_style:{
            height:''
          },
          grade:0
        }
      },
      methods:{
        colorStart:function (item) {
          this.grade_class_list.splice(0,5,
            'grade_shadow','grade_shadow','grade_shadow','grade_shadow','grade_shadow')
          this.grade_class_list.splice(0,item,);
          for(let i=0;i<item;i++){
            this.grade_class_list.splice(0,0,'grade_color');
          }
          this.grade=item;
          this.refreshGrade()
        },
        refreshGrade:function () {
          if(this.index===-1) {
            this.$emit('getGrade', 5);
          }
          else{
            this.$emit('getGrade',
              {
                      'grade':this.grade,
                      'index':this.index
                    });
          }
        }
      },
      mounted() {
        this.grade_style.height=this.$refs.grade.clientWidth/5+'px';
      }
    };
</script>

<style scoped>
  .grade_container{
    width: 100%;
    display: flex;
  }
  .grade_adapted{
    width: 20%;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
  }
  .grade_shadow{
    background-image: url("../../static/img/start_shadow.png");
  }
  .grade_color{
    background-image: url("../../static/img/start_color.png");
  }
</style>
