<template>
	<input type="file" accept="image/jpeg,image/png" @change="uploadChange" multiple="multiple">
</template>
<script>
export default {
	name: 'uploadImg',
  	data () {
	    return {
	      imgObjs:{},
	      imgArr:[],
	    }
  	},
  	methods: {
  		uploadChange(event){  
  			if(event.target.files.length>0){
  				let wait=0;
	        	for(let i=0;i<event.target.files.length;i++){
	        		this.getBase64(event.target.files[i],(url)=>{
	        			wait++;
		              	this.imgArr.push({
		                	file:event.target.files[i],
		                	imgDataUrl:'data:image/png;base64,'+url
		              	});
		              	if (wait==event.target.files.length) {
		              		this.$emit('fileUpload', { imgObjs: this.imgArr });
		              		this.imgArr=[];
		              	}
	          		});
	        	}
	        	
	        }
      	},
      	getBase64(file,callback){
	      var maxWidth = 640;  
	      if(file){  
	          var thisFile = file;  
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
	          reader.readAsDataURL(thisFile);  
	      }  
	    },
  	}
}
</script>