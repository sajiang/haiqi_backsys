<template>
  <div class="sideDialog">
    <div class="mask" @click="hide" v-show="visible" ></div>
    <transition name="rightIn">
      <div class="drawer" v-bind:style="drawerStyle" v-show="visible">
        <div class="content" >
          <div class="title">
            <slot name="title"></slot>
          </div>
          <div class="main">
            <slot name="content"></slot>
          </div>
        </div>
      </div>
    </transition>
    
  </div>
</template>

<script>
export default {
  name: 'sideDialog',
  data () {
    return {
      drawerStyle:{
        "min-width": this.width?this.width+ 'px':"256px",
        "height": "100%",
      }
    }
  },
  props:{
    width:{
      type: [String,Number],
    },
    visible: {
      type: Boolean,
      default: false
    },
  },
  created(){
    
  },
  methods:{
    hide(){
      this.$emit('changeVisible', false)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "../../assets/common.less";
.mask{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55,55,55,.6);
  height: 100%;
  z-index: 100;
}
.warp{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 101;
  -webkit-overflow-scrolling: touch;
  outline: 0;
}
.drawer{
  height: 100%;
  position: fixed;
  top: 0;
  right: 0;
  width: auto;
  z-index: 101;
}
.content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
  background-color: #fff;
  border: 0;
  background-clip: padding-box;
  box-shadow: 0 4px 12px rgba(0,0,0,.15);
  display: flex;
  flex-direction:column;
}
.title{
  background-color:@blue;
  color:white;
  padding:5px 10px;
}
.main{
  padding:5px 10px;
  flex: 1;
  box-sizing:border-box;
}
.rightIn-enter-active {
  animation: ivuSlideRightIn .5s;
}
.rightIn-leave-active {
  animation: ivuSlideRightOut .5s;
}
@keyframes ivuSlideRightIn {
    0% {
        opacity: 0;
        transform-origin: 100% 0%;
        transform: scaleX(.8);
    }
    100% {
        opacity: 1;
        transform-origin: 100% 0%;
        transform: scaleX(1);
    }
}

@keyframes ivuSlideRightOut {
    0% {
        opacity: 1;
        transform-origin: 100% 0%;
        transform: scaleX(1);
    }
    100% {
        opacity: 0;
        transform-origin: 100% 0%;
        transform: scaleX(.8);
    }
}
</style>