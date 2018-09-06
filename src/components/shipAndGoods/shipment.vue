<template>
<div class="shipment" v-loading="isLoading" element-loading-background="rgba(255, 255, 255, 0.5)">
	<div id="mapContainer"></div>
	<div class="bottom">
		<div class="searchPart flex">
			<div class="sortBy">
				<i class="el-icon-sort"></i>
	        	<el-select v-model="queryInfo.sortBy" class="select" placeholder="请选择"  size="small">
				    <el-option
				      v-for="item in sortOptions"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</div>
			<i @click="showBottom = !showBottom" class="collapseBtn el-icon-caret-bottom" :class="showBottom?'totateTriangle2':'totateTriangle'" ></i>
			<el-row class="flex1" :gutter="10">
				<el-col :span="4"   class="flex">
					<span class="label">当前船位</span>
					<el-popover class="flex1" placement="top" width="350" v-model="popoverShow.curShipPos">
						<div class="portList flex">
							<div class="province">
								<li v-for="(item,index) in portListOption" @click="selectProvince(index)" :class="queryInfo.curProvinceIndex==index?'blue':''">{{item.Name}}</li>
							</div>
							<div class="city flex1" v-if="queryInfo.curProvinceIndex!=-1">
                                <li v-for="(item,index) in portListOption[queryInfo.curProvinceIndex].Citys" @click="selectCity(index)" :class="queryInfo.curCityIndex==index?'blue':''">{{item.Name}}</li>
                            </div>
						</div>
						<div class="textRight">
							<el-button size="medium" @click="clearPortSelectRe0">重置</el-button>
							<el-button size="medium" type="primary" @click="surePortSelect">确定</el-button>
                        </div>
						<el-input size="medium"   slot="reference" v-model="queryInfo.positionText"></el-input>
					</el-popover>
				</el-col>
				<el-col :span="4" class="flex">
					<span class="label">空船海域</span>
					<el-popover  class="flex1" placement="top" width="300" v-model="popoverShow.area">
						<el-radio-group v-model="queryInfo.area" @change="selectArea">
							<el-radio :key="item" class="areaItem" v-for="item in areaOption" :label="item">{{item}}</el-radio>
						</el-radio-group>
						<div style="text-align: right; margin: 0">
							<el-button size="mini" type="text" @click="popoverShow.area = false">重置</el-button>
						</div>
						<el-input size="medium"  slot="reference" v-model="queryInfo.area"></el-input>
					</el-popover>
				</el-col>
				<el-col :span="7" class="flex">
					<span class="label">空船日期</span>
					<el-date-picker  size="medium" class="flex1"
				      v-model="queryInfo.dateArr"
				      type="daterange" format="MM-dd"
				      align="right"
				      range-separator="-"
				      start-placeholder="开始日期"
				      end-placeholder="结束日期"
				      :picker-options="pickerOptions2">
				    </el-date-picker>
				</el-col>
				<el-col :span="5" class="flex">
					<span class="label">吨位区间</span>
					<el-popover  class="flex1" placement="top" width="300" v-model="popoverShow.ton">
						<div class="flex">
							<el-input  size="medium" class="flex1" v-model="queryInfo.MinTond"></el-input>
							<span>-</span>
							<el-input  size="medium" class="flex1" v-model="queryInfo.MaxTond"></el-input>
						</div>
						<div class="textRight mgt10">
							<el-button size="medium" @click="clearTon">重置</el-button>
							<el-button size="medium" type="primary" @click="selectTon">确定</el-button>
                        </div>
						<el-input class="center" size="medium"  slot="reference" :value="queryInfo.MinTond+'-'+queryInfo.MaxTond"></el-input>
					</el-popover>
				</el-col>
				<el-col :span="4" class="flex autoComplete">
					<span class="label">船名</span>
					<el-autocomplete class="flex1"
					  v-model="queryInfo.shipName"
					  :fetch-suggestions="queryShipNameAsync"
					  placeholder="请输入内容"
					  @select="searchShip"
					></el-autocomplete>
				</el-col>
			</el-row>
		</div>
		<transition name="slide-fade">
			<div v-show="showBottom" class="flex stretch">
				<div class="shipList flex1">
					<el-tabs  v-model="activeName" @tab-click="handleTabChange">
					    <el-tab-pane :label="'船期总数: '+vaildShipListPager.totalCount" name="totalShip" class="totalShip" @scroll.native="shipListScroll">
					    	<table border="1" cellpadding="0" cellspacing="0">
					    		<thead>
					    			<th>序号</th>
					    			<th>状态</th>
					    			<th>船名</th>
					    			<th>吨位</th>
					    			<th>空船港</th>
					    			<th>空船日期</th>
					    			<th>状态</th>
					    			<th>当前位置</th>
					    			<th>位置更新时间</th>
					    			<th>更新者</th>
					    			<th>更新时间</th>
					    		</thead>
					    		<tbody>
					    			<tr v-for="(item,index) in vaildShipList" >
					    				<td>{{index+1}}</td>
					    				<td>
					    					<el-button circle type="danger" plain size="mini"  @click="handleEdit(item)">急</el-button>
							        		<el-button circle type="success" plain size="mini"  @click="handleEdit(item)">定</el-button>
							    		</td>
							    		<td class="orange">{{item.ShipName}}</td>
							    		<td>{{item.LoadTon}}</td>
							    		<td>{{item.LoadPort}}</td>
							    		<td>{{item.LoadDateStr}}</td>
							    		<td>{{item.navStatus}}</td>
							    		<td>{{item.PositionText}}</td>
							    		<td>{{item.P_updatetimeStr}}</td>
							    		<td>{{item.UpdateUser}}</td>
							    		<td>{{item.UpdateTime}}</td>
					    			</tr>
					    		</tbody>
							</table>
					    </el-tab-pane>
					    <el-tab-pane :label="'船队: '+vaildShipListPager.totalCount"  name="myStarShip">
					    	<table border="1" cellpadding="0" cellspacing="0">
					    		<thead>
					    			<th>序号</th>
					    			<th>状态</th>
					    			<th>船名</th>
					    			<th>吨位</th>
					    			<th>空船港</th>
					    			<th>空船日期</th>
					    			<th>状态</th>
					    			<th>当前位置</th>
					    			<th>位置更新时间</th>
					    			<th>更新者</th>
					    			<th>更新时间</th>
					    		</thead>
					    		<tbody>
					    			<tr v-for="(item,index) in myStarShipList" >
					    				<td>{{index+1}}</td>
					    				<td>
					    					<el-button circle type="danger" plain size="mini"  @click="handleEdit(item)">急</el-button>
							        		<el-button circle type="success" plain size="mini"  @click="handleEdit(item)">定</el-button>
							    		</td>
							    		<td class="orange">{{item.ShipName}}</td>
							    		<td>{{item.LoadTon}}</td>
							    		<td>{{item.LoadPort}}</td>
							    		<td>{{item.LoadDateStr}}</td>
							    		<td>{{item.navStatus}}</td>
							    		<td>{{item.PositionText}}</td>
							    		<td>{{item.P_updatetimeStr}}</td>
							    		<td>{{item.UpdateUser}}</td>
							    		<td>{{item.UpdateTime}}</td>
					    			</tr>
					    		</tbody>
							</table>
					    </el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</transition>
	</div>
	<div class="detailInfo">
		<div class="orange font20 bold">{{shipDetailInfo.ShipName}}</div>
		<div>
			<div class="flex">
				<div class="flex1">船籍港： {{shipDetailInfo.RegPortName}}</div>
				<div class="flex1">呼号： {{shipDetailInfo.HuHao}}</div>
			</div>
			<div class="flex">
				<div class="flex1">类型： {{shipDetailInfo.ShipTypeName}}</div>
				<div class="flex1">MMSI： {{shipDetailInfo.Mmsi_num}}</div>
			</div>
			<div class="flex">
				<div class="flex1">建造年份： {{shipDetailInfo.Makedate}}</div>
				<div class="flex1">船长/船宽： {{shipDetailInfo.shipLong+'/'+shipDetailInfo.shipWidth}}</div>
			</div>
			<div class="flex">
				<div class="flex1">船舱： {{shipDetailInfo.shipCapacity}}</div>
				<div class="flex1">航速： {{shipDetailInfo.speed}}</div>
			</div>
			<div class="flex">
				<div class="flex1">状态： {{shipDetailInfo.navStatus}}</div>
				<div class="flex1">吃水： {{shipDetailInfo.Draft}}</div>
			</div>
			<div class="flex">
				<div class="flex1">目的港： {{shipDetailInfo.dest_port}}</div>
				<div class="flex1">预到时间： {{shipDetailInfo.eta}}</div>
			</div>
			<div class="flex">
				<div class="flex1">联系人： {{shipDetailInfo.ShipperOwner}}</div>
				<div class="flex1">联系电话： {{shipDetailInfo.MobilePhone}}</div>
			</div>
			<div class="flex">
				<div class="flex1">公司： {{shipDetailInfo.Company}}</div>
			</div>
			<div class="flex orange mgt10">
				<div class="flex1">空船港： {{shipDetailInfo.ShipperOwner}}</div>
				<div class="flex1">空船时间： {{shipDetailInfo.MobilePhone}}</div>
			</div>
			<div class="flex orange">
				<div class="flex1">更新者： {{shipDetailInfo.ShipperOwner}}</div>
				<div class="flex1">更新时间： {{shipDetailInfo.MobilePhone}}</div>
			</div>
		</div>
		<div class="flex operate">
			<div class="flex1 btn hand" @click="editTip()">
	      		<span class="center"><i class="el-icon-edit-outline"></i></span>
	      		<span class="center">备注</span>
	      	</div>
	      	<div class="flex1 btn hand" @click="openHistory()">
	      		<span class="center"><i class="el-icon-tickets"></i></span>
	      		<span class="center">历史</span>
	      	</div>
	      	<div class="flex1 btn hand" @click="updateShip()">
	      		<span class="center"><i class="el-icon-refresh"></i></span>
	      		<span class="center">更新</span>
	      	</div>
	      	<div class="flex1 btn hand" @click="starShip()">
	      		<span class="center"><i class="el-icon-star-off"></i></span>
	      		<span class="center">关注</span>
	      	</div>
      	</div>
	</div>
	<el-dialog title="历史船期" :visible.sync="dialogVisible_shipHistory" width="60%">
		<el-row  class="flex">
			<el-col :span="6" :offset="1" class="flex">
				<span class="label">船名</span>
				<span>{{shipDetailInfo.ShipName}}</span>
			</el-col >
			 <el-col :span="9"  :offset="1" class="flex">
				<span class="label">时间</span>
				<el-date-picker size="medium" class="flex1" v-model="value1" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="MM-dd" @change="searchHistoryShip"></el-date-picker>
			</el-col class="flex">
			<el-col :span="5" :offset="2">
				<span>（轨迹）</span><i class="el-icon-location blue"></i>
			</el-col>
		</el-row>
		<el-table :data="historyShip" border class="mgt20">
		    <el-table-column prop="date" label="日期" width="180"></el-table-column>
		    <el-table-column prop="name" label="姓名" width="180"></el-table-column>
		    <el-table-column prop="address" label="地址"></el-table-column>
		</el-table>
		<div class="pager" v-show='historyShipPager.totalCount/historyShipPager.pageSize>1'>
	        <el-pagination
	          :current-page="historyShipPager.currentPage"
	          @current-change="getNewPage"
	          layout="prev, pager, next,jumper"
	          :page-size='historyShipPager.pageSize'
	          :total="historyShipPager.totalCount">
	        </el-pagination>
	    </div>
	</el-dialog>
	<el-dialog title="更新船期" :visible.sync="dialogVisible_updateShip" width="350px">
		<div class="flex">
			<div class="label">船名</div>
			<div class="flex1">{{shipDetailInfo.ShipName}}</div>
		</div>
		<div class="flex mgt10">
			<div class="label">空船时间</div>
			<div class="flex1 flex">
				<el-date-picker class="flex1" v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
			</div>
		</div>
		<div class="flex mgt10">
			<div class="label">空船港</div>
			<div class="flex1">
				<el-input  size="medium" v-model="value"></el-input>
			</div>
		</div>
		<div class="flex mgt20 center">
			<el-radio  class="flex1" v-model="radio" label="1">加急</el-radio>
			<el-radio  class="flex1" v-model="radio" label="2">定线</el-radio>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="dialogVisible_updateShip = false">确 定</el-button>
		</span>
	</el-dialog>
	<el-dialog title="备注" :visible.sync="dialogVisible_editTip" width="600px">
		<div class="flex">
			<div class="label">船名</div>
			<div class="flex1">{{shipDetailInfo.ShipName}}</div>
			<el-button type="text" @click="saveTip">保存</el-button>
		</div>
		<div>
			<el-input type="textarea" :autosize="{ minRows: 2}" placeholder="请输入内容" v-model="newTipContent"></el-input>
		</div>
		<div>
			<el-table :data="tipHistoryList" border class="mgt20">
			    <el-table-column prop="name" label="空船港" width="100"></el-table-column>
			    <el-table-column prop="date" label="备注" ></el-table-column>
			    <el-table-column prop="date" label="更新时间" width="120"></el-table-column>
			</el-table>
			<div class="pager" v-show='tipHistoryPager.totalCount/tipHistoryPager.pageSize>1'>
	        	<el-pagination
		          :current-page="tipHistoryPager.currentPage"
		          @current-change="getNewPage"
		          layout="prev, pager, next,jumper"
		          :page-size='tipHistoryPager.pageSize'
		          :total="tipHistoryPager.totalCount">
	       	 </el-pagination>
	    </div>
		</div>
	</el-dialog>
</div>
</template>
<script>
export default {
    name: 'shipment',
    data () {
      	return {
      		map:{},
      		mapReady:{},
      		searchMarkerList:[],
      		queryInfo:{
      			sortBy:1,
      			curProvinceIndex:-1,
      			curCityIndex:-1,
      			positionText:"",
      			Area:"",
      			ShipName:"",
      			MinTond:"",
      			MaxTond:"",
      			dateArr:[],
      		},
      		popoverShow:{
      			curshipPos:false,
      			area:false,
      			ton:false,
      		},
      		sortOptions:[{
	          value: 1,
	          label: '更新时间'
	        }, {
	          value: 2,
	          label: '空船日期'
	        }],
	        areaOption:[],
	        portListOption:[],
      		value:"",
      		radio:"",
      		value1:"",
  			activeName:'totalShip',
	        pickerOptions2: {
	          	shortcuts: [{
	            	text: '最近一周',
	            	onClick(picker) {
	              		const end = new Date();
	              		const start = new Date();
	              		end.setTime(start.getTime() + 3600 * 1000 * 24 * 7);
	              		picker.$emit('pick', [start, end]);
	            	}
	          	},{
		            text: '最近一个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              end.setTime(start.getTime() + 3600 * 1000 * 24 * 30);
		              picker.$emit('pick', [start, end]);
		            }
			    },{
		            text: '最近三个月',
		            onClick(picker) {
		              const end = new Date();
		              const start = new Date();
		              end.setTime(start.getTime() + 3600 * 1000 * 24 * 90);
		              picker.$emit('pick', [start, end]);
		       		}
	            }]
	  		},
	  		isLoading:false,
	  		vaildShipList:[],
	  		myStarShipList:[],
	  		vaildShipPositionList:[],
	        shipDetailInfo:{},
	        tipHistoryList:[],
	        historyShip:[],
	        newTipContent:'',
	        historyShipPager:{
	        	currentPage:1,
				pageSize:10,
				totalCount:300
	        },
	        tipHistoryPager:{
	        	currentPage:1,
				pageSize:10,
				totalCount:0
	        },
	        vaildShipListPager:{
	        	currentPage:1,
				pageSize:20,
				totalCount:0,
	        },
			dialogVisible_shipHistory:false,
			dialogVisible_updateShip:false,
			dialogVisible_editTip:false,
      		showBottom:true,
  		}
  	},
    activated(){
	    this.$store.tabs.commit('assignNewTab', {
		    path:this.$route.path,
		    name:"VIP船期",
		    isActive:true
	    });
  	},
  	created(){
  		this.querySearchInfo();
  		this.getShipList();
  		this.getAllShipPosition();
	},
  	mounted(){
 		this.initMap();
  	},
    methods: {
    	initMap(){
			var mapOptions = new shipxyMap.MapOptions();
		    mapOptions.center = new shipxyMap.LatLng(39.9, 116);
		    mapOptions.zoom = 5;
		    mapOptions.mapType = shipxyMap.MapType.CMAP;
		    mapOptions.hidePort = 'y';
	  		this.map = new shipxyMap.Map('mapContainer', mapOptions);
	  		this.mapReady=new Promise((resolve,reject)=>{
	  			shipxyMap.mapReady =  ()=> {
	  				this.map.addShipEventListener(shipxyMap.Event.CLICK,  (event)=>{
	  					console.log(event)
	  					this.queryShipDetailInfo(event.overlayId); //overlayId就是shipId
	  				});
	  				resolve();
            	}
	  		});
    	},
    	queryShipNameAsync(queryString, cb){
    		this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/QueryMappingShipName',{ShipName:queryString})
			.then( (response)=>{
				if (response.data.RetCode==0) {
					this.queryList=[];
					if (response.data.RetData!==null) {
						for (var i = 0; i <response.data.RetData.length ; i++) {
			      			this.queryList.push({
								value:response.data.RetData[i],
								id:response.data.RetData[i],
							});
						}
					}
					cb(this.queryList);
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
    	},
    	queryShipDetailInfo(shipId){
    		this.tipHistoryList=[];
    		this.tipHistoryPager.currentPage=1;
    		this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/QueryShipDynamic',
    			{ShipId:shipId})
			.then( (response)=>{
				this.isLoading=false;
				if (response.data.RetCode==0) {
					this.shipDetailInfo=response.data.RetData;
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
    	},
    	searchShip(item){
    		this.clearSearchOption();
    		this.queryInfo.ShipName=item.value;
    		this.vaildShipListPager.currentPage=1;
    		this.getShipList();
        	this.getAllShipPosition();
    	},
    	clearSearchOption(){
    		this.vaildShipListPager.currentPage=1;
    		this.queryInfo.positionText="";
    		this.queryInfo.Area="";
    		this.queryInfo.dateArr=[];
    		this.queryInfo.ShipName='';
    		this.queryInfo.MinTond="";
    		this.queryInfo.MaxTond="";
    	},
    	getMyStarShip(){
    		this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/QueryAttentionVaildShipList',{})
			.then( (response)=>{
				this.isLoading=false;
				if (response.data.RetCode==0) {
					this.myStarShipList=response.data.RetData;
					this.drawMakerAndName(this.myStarShipList);
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
    	},
    	getShipList(){
    		this.isLoading=true;
    		let subData={
    			PageIndex:this.vaildShipListPager.currentPage,
    			PageSize:this.vaildShipListPager.pageSize,
    			positionText:this.queryInfo.positionText,
    			positionType:this.queryInfo.positonType,
    			positionId:this.queryInfo.positionId,
    			Area:this.queryInfo.area,
    			Sdate:this.queryInfo.dateArr[0],
    			Edate:this.queryInfo.dateArr.length>1?this.queryInfo.dateArr[1]:'',
    			ShipName:this.queryInfo.ShipName,
    			MinTond:this.queryInfo.MinTond,
    			MaxTond:this.queryInfo.MaxTond,
    			Sort:this.queryInfo.sortBy,
    		};
    		this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/QueryVaildShipList',subData)
			.then( (response)=>{
				this.isLoading=false;
				if (response.data.RetCode==0) {
					if (this.vaildShipListPager.currentPage==1) {
						this.vaildShipList=response.data.RetData.list;
					}else{
						this.vaildShipList=this.vaildShipList.concat(response.data.RetData.list);
					}
					this.vaildShipListPager.totalCount=response.data.RetData.TotalRecord;
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
    	},
    	getAllShipPosition(){
    		this.isLoading=true;
    		let subData={
    			PageIndex:1,
    			PageSize:5000,//不分页
    			positionText:this.queryInfo.positionText,
    			positionType:this.queryInfo.positonType,
    			positionId:this.queryInfo.positionId,
    			Area:this.queryInfo.Area,
    			Sdate:this.queryInfo.dateArr[0],
    			Edate:this.queryInfo.dateArr.length>1?this.queryInfo.dateArr[1]:'',
    			ShipName:this.queryInfo.ShipName,
    			MinTond:this.queryInfo.MinTond,
    			MaxTond:this.queryInfo.MaxTond,
    			Sort:this.queryInfo.sortBy,
    		};
    		this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/QueryAllShipPosition',subData)
			.then( (response)=>{
				this.isLoading=false;
				if (response.data.RetCode==0) {
					this.vaildShipPositionList=response.data.RetData;
					this.drawMakerAndName(response.data.RetData);
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
    	},
    	shipListScroll(e){
    		if(e.target.scrollHeight-e.target.scrollTop<480&&this.vaildShipListPager.currentPage<this.vaildShipListPager.totalCount/this.vaildShipListPager.pageSize&&this.isLoading==false){//280
    			this.vaildShipListPager.currentPage++;
    			this.getShipList();
    		} 
    	},
    	selectProvince: function(index) {
            this.queryInfo.curProvinceIndex = index;
            this.queryInfo.curCityIndex = "-1";
            this.queryInfo.positionId = this.portListOption[index].PID;
            this.queryInfo.positionText = this.portListOption[index].Name;
            this.queryInfo.positonType=1; //1省 2市
        },
        selectCity: function(index) {
            this.queryInfo.curCityIndex = index;
            this.queryInfo.positionText = this.portListOption[this.queryInfo.curProvinceIndex].Citys[index].Name;
            this.queryInfo.positionId = this.portListOption[this.queryInfo.curProvinceIndex].Citys[index].CID;
            this.queryInfo.positonType=2; //1省 2市
            this.surePortSelect();
        },
        clearPortSelectRe0: function(type) {
        	this.queryInfo.curProvinceIndex = -1;
            this.queryInfo.curCityIndex = -1;
            this.queryInfo.positionText = '';
            this.popoverShow.curShipPos = false;
            this.queryInfo.ShipName="";
            this.vaildShipListPager.currentPage=1;
            this.getShipList();
            this.getAllShipPosition();
        },
        surePortSelect(){
        	this.queryInfo.ShipName="";
        	this.vaildShipListPager.currentPage=1;
        	this.getShipList();
        	this.getAllShipPosition();
        	this.popoverShow.curShipPos = false;
        },
        selectArea(){
        	this.queryInfo.ShipName="";
        	this.vaildShipListPager.currentPage=1;
        	this.popoverShow.area=false;
        	this.getShipList();
        	this.getAllShipPosition();
        },
        clearTon(){
        	this.queryInfo.MinTond='';
        	this.queryInfo.MaxTond='';
        	this.vaildShipListPager.currentPage=1;
        	this.getShipList();
        	this.getAllShipPosition();
        },
        selectTon(){
        	this.queryInfo.ShipName="";
        	this.vaildShipListPager.currentPage=1;
        	this.getShipList();
        	this.getAllShipPosition();
        	this.popoverShow.ton = false;
        },
    	querySearchInfo(){
    		this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/QueryBaseShipGoodsSearchInfo')
			.then( (response)=>{
				if (response.data.RetCode==0) {
					this.areaOption=response.data.RetData.Areas;
					this.portListOption=response.data.RetData.proviceList;

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
    	},
      	handleTabChange(tab, event) {
        	if (tab.name=="myStarShip") {
        		this.getMyStarShip();
        	}else{
        		this.getShipList();
        	}
      	},
	    handleEdit(){
	        console.log(index, row);
	    },
	    openHistory(){
	    	this.dialogVisible_shipHistory=true;
	    	this.searchHistoryShip();
	    },
	    searchHistoryShip(){
			this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/QueryHistoryShipList',{
	    		ShipId:this.shipDetailInfo.ShipId,
	    		PageIndex:this.historyShipPager.currentPage,
	    		PageSize:this.historyShipPager.pageSize
	    	})
			.then( (response)=>{
				if (response.data.RetCode==0) {
					this.historyShip=response.data.RetData.list;
					this.historyShipPager.totalCount=response.data.RetData.TotalRecord;
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
	    },
	    updateShip(){
	    	this.dialogVisible_updateShip=true;
	    },
	    editTip(){
	    	this.dialogVisible_editTip=true;
	    	this.getTipList();
	    },
	    saveTip(){
	    	this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/ExeShipRemark',{
	    		ShipId:this.shipDetailInfo.ShipId,
	    		ShipListId:this.shipDetailInfo.ShipListId,
	    		RemarkContent:this.newTipContent
	    	})
			.then( (response)=>{
				if (response.data.RetCode==0) {
					this.newTipContent="";
					this.getTipList();
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
	    },
	    getTipList(){
	    	this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/QueryShipRemark',{
	    		ShipId:this.shipDetailInfo.ShipId,
	    		PageIndex:this.tipHistoryPager.currentPage,
	    		PageSize:this.tipHistoryPager.pageSize
	    	})
			.then( (response)=>{
				if (response.data.RetCode==0) {
					this.tipHistoryList=response.data.RetData.list;
					this.tipHistoryPager.totalCount=response.data.RetData.TotalRecord;
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
	    },
	    starShip(){
	    	this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/ExeAttentionShip',{
	    		ShipId:this.shipDetailInfo.ShipId,
	    		HandType:this.shipDetailInfo.isStar?0:1,//0 关注 1 取关
	    	})
			.then( (response)=>{
				if (response.data.RetCode==0) {
					this.shipDetailInfo.isStar
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
	    },
	    getNewPage(){},
	    drawMakerAndName(data) {
	    	this.mapReady.then(()=>{
	    		try{
	    			this.map.removeOverlayByType(shipxyMap.OverlayType.SHIP);
	    		}catch(err){}
	    		for (var i = data.length - 1; i >= 0; i--) {
			        if(!data[i].Latitude||!data[i].Longitude){
				            continue;
				        }
				        //船舶显示样式
			            var option = new shipxyMap.ShipOptions();
			            /*边框样式*/
			            option.strokeStyle.color = 0xff0000;
			            option.strokeStyle.alpha = 1;
			            option.strokeStyle.thickness = 1;
			            /*填充样式*/
			            option.fillStyle.color = 0x00ff00;
			            option.fillStyle.alpha = 1;
			            /*标签样式*/
			            //标签线条
			            option.labelOptions.border = false; //边框  
			            /*option.labelOptions.borderStyle.color = 0x000000;
			            option.labelOptions.borderStyle.alpha = 1;
			            //标签文字
			            option.labelOptions.fontStyle.name = "Verdana";
			            option.labelOptions.fontStyle.size = "12";
			            option.labelOptions.fontStyle.color = 0x000000;
			            option.labelOptions.fontStyle.bold = true;  //粗体
			            option.labelOptions.fontStyle.bold = true;  //斜体
			            option.labelOptions.fontStyle.underline = true;  //下划线*/
			            //标签填充
			            option.labelOptions.background = false; //有背景  
			            /*option.labelOptions.backgroundStyle.color = 0xffff66;  //边框样式
			            option.labelOptions.backgroundStyle.alpha = 1;*/
			            option.isShowLabel = false; //是否显示label
			            option.isShowMiniTrack = false//船舶自带三分钟轨迹
			            option.isSelected = true; //船舶框选
			            option.zoomLevels = [1, 18]; //显示级别
			            var shipData = new shipxyAPI.Ship();
			            shipData.shipId = data[i].ShipId
			            /*shipData.name = 'shipName1';
			            shipData.callsign = 'BIPE';
			            shipData.imo = '0';
			            shipData.shipType = '货船';
			            shipData.navStatus = '在航（主机推动）';
			            shipData.length = 135;
			            shipData.beam = 21;
			            shipData.draught = 7.3;*/
			            shipData.lat = parseFloat(data[i].Latitude);
			            shipData.lng = parseFloat(data[i].Longitude);
			            shipData.heading = parseFloat(data[i].Heading) ;
			            //shipData.course = 80;
			            /*shipData.speed = 13;
			            shipData.dest = 'BEH LUN';
			            shipData.eta = '6.26 21:00';
			            shipData.lastTime = 1340674688;*/
			            var addshipOverlay = new shipxyMap.Ship(""+data[i].ShipId, shipData, option);
			            this.map.addOverlay(addshipOverlay, true);
				        // var opts = new shipxyMap.MarkerOptions()
				        //     opts.zIndex = 4;  //显示层级
				        //     opts.isShowLabel = false; //是否显示label
				        //     opts.isEditable = false; //是否可编辑
				            
				        //     //opts.imagePos = new shipxyMap.Point(0, 0); //图片偏移量
				        //     /*标签样式*/
				        //     //标签线条
				        //     opts.labelOptions.border = false; //有边框  
				        //     opts.labelOptions.borderStyle.color = 0x222222;
				        //     opts.labelOptions.borderStyle.alpha = 0.8;
				        //     opts.labelOptions.borderStyle.thickness = 1;
				        //     //标签文字
				        //     opts.labelOptions.fontStyle.size = 14;
				        //     opts.labelOptions.fontStyle.color = 0x008800;
				        //     //标签填充
				        //     opts.labelOptions.background = false; //有背景  
				        //     opts.labelOptions.backgroundStyle.color = 0xFFFFFF;  //边框样式
				        //     opts.labelOptions.backgroundStyle.alpha = 0.6;
				        //     opts.labelOptions.text = '.';//data[i].ShipName ? data[i].ShipName : (data[i].PortName + ":" + data[i].GoodsCount);
				        //     opts.labelOptions.labelPosition = new shipxyMap.Point(0,0);
				        //     /*****点*****/
				        // var latLng = new shipxyMap.LatLng(parseFloat(data[i].Latitude),parseFloat(data[i].Longitude));
				        
				        // //添加到地图上显示
				        
			         //    opts.imageUrl = "http://weixin.sspp.co/Images/19.png";
			         //    var id=JSON.stringify(data[i])
				        
				        // var marker = new shipxyMap.Marker(id, latLng, opts);
				        // this.map.addOverlay(marker, true); //优先显示
				        // //map.locateOverlay(marker);
				        // this.searchMarkerList.push(marker);
			    }
	    	});
		    
		    //computeCenter(data);
		}
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@backBlue:rgba(14,66,104,0.8);
.backBlue{
	background-color: @backBlue
}
.shipment{
	position: absolute;
	bottom: 0;
	top: 80px;
	right: 20px;
	left: 20px;
}
#mapContainer{
	width: 100%;
	height: 100%;
}
.flex{
	align-items:center;
}
.font20{
	font-size: 20px;
}
.label{
	margin-right: 5px;
	width: 60px;
}
.searchPart .label{
	margin-right: 5px;
	width:initial;
}
.collapseBtn{
	margin-right: 5px;
}
@media screen and (max-width: 1500px) {
    .bottom /deep/ .el-input__inner{
		padding: 0 5px;
	}

}

@keyframes totateTriangle {
    from { transform: rotate(0deg) }
    to {
        transform: rotate(180deg);
    }
}
@keyframes totateTriangle2 {
    from { transform: rotate(-180deg)}
    to {
        transform: rotate(0deg);
    }
}
.totateTriangle{
    animation: totateTriangle 0.3s;
    animation-fill-mode : forwards;
}
.totateTriangle2{
    animation: totateTriangle2 0.3s;
    animation-fill-mode : forwards;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to{
	transform: translateY(40px);
}

.portList{
	li{
		list-style-type: none;
		cursor: pointer;
	}
	div{
		overflow-y: auto;
		height: 160px;
		float: left;
		padding: 8px;
		li{
			line-height: 26px;
			height: 26px;
		}
	}
	.province{
		width: 100px;
	}
	.city{
		width: 300px;
		border-right: none;
		li{
			display: inline-block;
			width: 50px;
		}
	}
}

.areaItem{
	line-height: 30px;
	text-align: left;
	width: 33%;
	margin-left: 0;
}
.detailInfo{
	position: absolute;
	top: 10px;
	left: 20px;
	width: 350px;
	padding:10px;
	height: 330px;
	box-sizing: border-box;
	background-color: rgba(0, 0, 0, 0.7);
	line-height: 1.5;
	color: white;
	.operate{
		position: absolute;
		bottom: 10px;
		right: 10px;
		.btn{
			border: 1px solid white;
			margin: 8px;
			padding: 0 5px;
			border-radius: 5px;
			text-align: center;
		}
	}
}
.bottom{
	position: absolute;
	bottom: 10px;
	right: 20px;
	left: 20px;
	color:white;
	.searchPart{
		padding: 10px;
		background-color: @backBlue;
		
		position: relative;
		.sortBy{
			position: absolute;
			right: 10px;
			bottom: -46px;
			z-index: 2;
			.select{
				width: 110px;
			}
		}
		.smallBtn{
			padding: 10px 0px
		}
	}
	.stretch{
		align-items: stretch;
		height: 350px;
		.shipList{
			background-color: @backBlue;
			padding: 10px;
			/deep/.el-tabs__item.is-active{
				color: white;
				font-weight: bold;
			}
			/deep/.el-tabs__item{
				color:#A7A4A6;
				font-weight: bold;
			}
			.totalShip{
				overflow-y: scroll;
				height: 280px;
			}
			table{
				
				width: 100%;
				border:1px solid white;
				th{
					color: #A7A4A6;
				}
				td,th{
					padding: 2px;

				}
				td{
					box-sizing: border-box;
				}
				/deep/.el-button--mini.is-circle{
					padding: 3px;
					margin: 0;
				}
			}
		}
	}
	
}

</style>