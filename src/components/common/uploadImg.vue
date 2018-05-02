<template>
  <div class="uploadImg">
    <slot>
      <div class="chooseImg" @click="dialogVisible = true">{{imgObjs.length>0?"已选择"+imgObjs.length+"张图片":"选择图片"}}</div>
    </slot>
    <el-dialog
      title="上传图片"
      :visible.sync="dialogVisible"
      width="700px">
      <div></div>
      <el-row :gutter="30">
        <el-col class="imgPreview" :span="6" v-for="(imgObj,index) in imgObjs" :key="imgObj.id">
          <img  :src="imgObj.imgDataUrl" @click="previewBigImg(index)">
          <i class="deleteImg el-icon-circle-close" @click="deleteImg(index)"></i>
        </el-col>
        <el-col  class="addImg" :span="6">
          <div>
            <i class="el-icon-circle-plus-outline"></i>
            <input class="inputFile" type="file" accept="image/png, image/jpeg" @change="uploadChange">
          </div>
        </el-col>
      </el-row>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="returnFiles">确 定</el-button>
      </span>
      <el-dialog
        width="80%"
        :visible.sync="isPreviewBigImgShow"
        append-to-body>
        <img class="bigImg" :src="currentImgDataUrl">
      </el-dialog>
    </el-dialog>
  </div>
  
</template>
<script>
let id=0;
export default {
  name: 'reloadBtn',
  data () {
    return {
      dialogVisible: false,
      isPreviewBigImgShow:false,
      currentImgDataUrl:"",
      imgObjs:[]
    }
  },
  methods: {
    returnFiles(){
      this.dialogVisible=false;
      this.$emit('fileUpload', { imgObjs: this.imgObjs })
    },
    uploadChange(event){  
      if(event.target.files.length>0){  
          this.imgObjs.push();  //提交的图片  
          this.getBase64(event.target,(url)=>{  
              this.imgObjs.push({
                file:event.target.files[0],
                imgDataUrl:'data:image/png;base64,'+url,
                id:id++
              });
              console.log(this.imgObjs)
          });
      }
    },
    deleteImg(index){
      this.imgObjs.splice(index,1)
    },
    clearImg(){
      this.imgObjs=[];
    },
    previewBigImg(index){
      this.isPreviewBigImgShow=true;
      this.currentImgDataUrl=this.imgObjs[index].imgDataUrl;
    },
    getBase64(file,callback){
      var maxWidth = 640;  
      if(file.files && file.files[0]){  
          var thisFile = file.files[0];  
          if(thisFile.size>5242880){  
              // mualert.alertBox("图片不能超过800K");  
              alert("图片不能超过5M");  
              return  
          };  
          var reader = new FileReader();  
          reader.onload = function(event){  
              var imgUrl = event.target.result;  
              var img = new Image();  
              img.onload = function(){  
                  var canvasId = 'canvasBase64Imgid',  
                  canvas = document.getElementById(canvasId);  
                  if(canvas!=null){document.body.removeChild(canvas);}  
                  var canvas = document.createElement("canvas");  
                  canvas.innerHTML = 'New Canvas';  
                  canvas.setAttribute("id", canvasId);  
                  canvas.style.display='none';  
                  document.body.appendChild(canvas);  
                  canvas.width = this.width;  
                  canvas.height = this.height;  
                  var imageWidth = this.width,   
                  imageHeight = this.height;  
                  if (this.width > maxWidth){  
                      imageWidth = maxWidth;  
                      imageHeight = this.height * maxWidth/this.width;  
                      canvas.width = imageWidth;  
                      canvas.height = imageHeight;  
                  }  
                  var context = canvas.getContext('2d');  
                  context.clearRect(0, 0, imageWidth, imageHeight);  
                  context.drawImage(this, 0, 0, imageWidth, imageHeight);  
                  var base64 = canvas.toDataURL('image/png',1);  
                  var imgbase = base64.substr(22);  
                  callback(imgbase)  
              }  
              img.src = imgUrl;  
          }  
          reader.readAsDataURL(file.files[0]);  
      }  
    },
  }
}
</script>
<style lang="less" scoped>
.chooseImg{
    width: 100%;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 40px;
    outline: 0;
    padding: 0 15px;
}
.addImg{
  height: 160px;
  line-height: 160px;
  border: 1px solid #dcdfe6;
  position: relative;
  text-align: center;
  .el-icon-circle-plus-outline{
    font-size: 30px;
    vertical-align: middle;
  }
  .inputFile{
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    color: transparent;
    opacity:0;
  }
}
.imgPreview{
  margin-bottom: 20px;
  height: 160px;
  position: relative;
  img{
    width: 100%;
    height: 100%;
  }
  .deleteImg{
    position: absolute;
    top: -5px;
    right: 5px;
    background: white;
    &:hover{
      color: #409EFF;
    }
  }
}
.uploadImg{
  text-align: center;
}
</style>