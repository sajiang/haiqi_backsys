<template>
	<div class="">
		<div @click="dialogVisible=true">
			<slot>

			</slot>
		</div>
		
		<el-dialog
		  title="删除图片"
		  :visible.sync="dialogVisible"
		  width="700px"
		  >
		  <el-row :gutter="30">
	        <el-col class="imgPreview" :span="6" v-for="(item,index) in imgList" :key="item.id">
	          <img  :src="item.Thumbnail" @click="previewBigImg(item)">
	          <i class="deleteImg el-icon-circle-close" @click="deleteImg(item,index)"></i>
	        </el-col>
	      </el-row>
		 
		</el-dialog>
		<el-dialog
        width="80%"
        :visible.sync="isPreviewBigImgShow"
        append-to-body>
        <img class="bigImg" :src="currentImgDataUrl">
      </el-dialog>
	</div>
</template>
<script>
export default {
  name: 'deleteImg',
  data () {
    return {
      dialogVisible: false,
      isPreviewBigImgShow:false,
      currentImgDataUrl:""
    }
  },
  props: ['imgList',"soureType","soureId"],
  methods:{
  	previewBigImg(item){
  		this.isPreviewBigImgShow=true;
  		this.currentImgDataUrl=item.Original;
  	},
  	deleteImg(item,index){
  		this.$axios.post(this.$store.commonData.state.url+"Customer/RemoveImgSoure",
        { Id:item.Id,
          SoureType:this.soureType,
          SoureId:this.soureId,
        })
      .then( (response)=>{
        if (response.data.RetCode==0) {
          this.imgList.splice(index,1);
        }else{
          this.$message({
            message: response.data.RetMsg,
            type: 'error'
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  	}
  }
}
</script>
<style lang="less" scoped>
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
</style>