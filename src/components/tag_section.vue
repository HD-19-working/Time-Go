<template>
  <div class="tag_container" v-if="tag_list[0]&&tag_list[1]&&tag_list[2]&&tag_list[0].num===0&&tag_list[1].num===0&&tag_list[2].num===0">
    <div v-for="item in tag_list" class="tag_item" :class="{is_show:item.num===0||'0'}">
      <div>
        <span>{{item.value}}</span>
        <span>{{item.num}}</span>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: 'tag_section',
      props:{
        tag_list: {
          type:Array,
          default:[]
        }
      }
    };
</script>

<style scoped>
  .tag_container{
    width: 90%;
    column-count: 3;
    column-width: 80px;
    column-gap: 10px;
    padding: 15px 0;
    column-fill: auto;
    height: auto;
  }
  .tag_item{
    padding: 6px 0;
    break-inside: avoid;
  }
  .tag_item span:nth-child(2){
    margin-left: 3px;
  }
  .tag_item>div{
    border-radius: 10px;
    font-size: 14px;
    padding: 2px 0;
    border-style: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    background-color: #5f9df5;
  }
  .is_show{
    display: none;
  }
</style>
