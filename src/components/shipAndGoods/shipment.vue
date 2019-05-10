<template>
<div class="shipment" v-loading="isLoading" element-loading-background="rgba(255, 255, 255, 0.5)">
	<div id="mapContainer"></div>
	<div class="bottom">
		<div class="searchPart flex">
			<div class="sortBy">
				<i class="el-icon-sort"></i>
	        	<el-select v-model="queryInfo.sortBy" class="select" placeholder="请选择"  size="mini" @change="getShipList(1)">
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
							<div class="city " v-if="queryInfo.curProvinceIndex!=-1">
                                <li v-for="(item,index) in portListOption[queryInfo.curProvinceIndex].Citys" @click="selectCity(index)" :class="queryInfo.curCityIndex==index?'blue':''">{{item.Name}}</li>
                            </div>
                            <div class="port flex1" v-if="queryInfo.curCityIndex!=-1">
                                        <li v-for="(item,index) in portListOption[queryInfo.curProvinceIndex].Citys[queryInfo.curCityIndex].Ports" @click="selectPort(index)" :class="queryInfo.curPortIndex==index?'blue':''">{{item.Name}}</li>
							</div>
						</div>
						<div class="textRight">
							<el-button size="mini" @click="clearPortSelectRe0">重置</el-button>
							<el-button size="mini" type="primary" @click="surePortSelect">确定</el-button>
                        </div>
						<el-input size="mini"   slot="reference" v-model="queryInfo.positionText"></el-input>
					</el-popover>
				</el-col>
				<el-col :span="4" class="flex">
					<span class="label">空船海域</span>
					<el-popover  class="flex1" placement="top" width="300" v-model="popoverShow.area">
						<el-radio-group v-model="queryInfo.area" @change="selectArea">
							<el-radio :key="item" class="areaItem" v-for="item in areaOption" :label="item">{{item}}</el-radio>
						</el-radio-group>
						<div style="text-align: right; margin: 0">
							<el-button size="mini" type="text" @click="clearArea">重置</el-button>
						</div>
						<el-input size="mini"  slot="reference" v-model="queryInfo.area"></el-input>
					</el-popover>
				</el-col>
				<el-col :span="7" class="flex">
					<span class="label">空船日期</span>
					<el-date-picker  size="mini" class="flex1"
				      v-model="queryInfo.dateArr"
				      @change="getShipList(1)"
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
							<el-input  size="mini" class="flex1" v-model="queryInfo.MinTond"></el-input>
							<span>-</span>
							<el-input  size="mini" class="flex1" v-model="queryInfo.MaxTond"></el-input>
						</div>
						<div class="textRight mgt10">
							<el-button size="mini" @click="clearTon">重置</el-button>
							<el-button size="mini" type="primary" @click="selectTon">确定</el-button>
                        </div>
						<el-input class="center" size="mini"  slot="reference" :value="queryInfo.MinTond+'-'+queryInfo.MaxTond"></el-input>
					</el-popover>
				</el-col>
				<el-col :span="4" class="flex autoComplete">
					<span class="label">船名</span>
					<el-autocomplete class="flex1" size="mini"
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
					    <el-tab-pane :label="'船期总数: '+vaildShipListPager.totalCount" name="totalShip"  class="totalShip" @scroll.native="shipListScroll">
					    	<table border="1" cellpadding="0" cellspacing="0">
					    		<thead ref="thead1">
					    			<th>序号</th>
					    			<th>状态</th>
					    			<th>船名</th>
					    			<th>吨位</th>
					    			<th>空船港</th>
					    			<th>空船日期</th>
					    			<th>船舶状态</th>
					    			<th>当前位置</th>
					    			<th>联系人</th>
					    			<th>电话</th>
					    			<th>更新者</th>
					    			<th>更新时间</th>
					    		</thead>
					    		<tbody>
					    			<tr v-for="(item,index) in vaildShipList" @click="chooseShipInList(index,item.ShipId)" :class="item.isChecked?'backBlack':''">
					    				<td>{{index+1}}</td>
					    				<td>
					    					<el-button v-if="item.shipListState" circle type="danger" plain size="mini"  @click="handleEdit(item)">急</el-button>
							        		<el-button v-if="item.fixedRoute" circle type="success" plain size="mini" >定</el-button>
							    		</td>
							    		<td class="orange">{{item.ShipName}}</td>
							    		<td>{{item.LoadTon}}</td>
							    		<td>{{item.LoadPort}}</td>
							    		<td>{{item.LoadDateStr}}</td>
							    		<td>{{item.navStatus}}</td>
							    		<td>{{item.PositionText}}</td>
							    		<td>{{item.soName}}</td>
							    		<td>{{item.MobilePhone}}</td>
							    		<td>{{item.UpdateUser}}</td>
							    		<td>{{item.UpdateTimeStr}}</td>
					    			</tr>
					    		</tbody>
							</table>
					    </el-tab-pane>
					    <el-tab-pane :label="'船队: '+myStarShipList.length" @scroll.native="fixHead" name="myStarShip" class="totalShip">
					    	<table border="1" cellpadding="0" cellspacing="0" >
					    		<thead ref="thead2">
					    			<th>序号</th>
					    			<th>状态</th>
					    			<th>船名</th>
					    			<th>吨位</th>
					    			<th>空船港</th>
					    			<th>空船日期</th>
					    			<th>船舶状态</th>
					    			<th>当前位置</th>
					    			<th>联系人</th>
					    			<th>电话</th>
					    			<th>更新者</th>
					    			<th>更新时间</th>
					    		</thead>
					    		<tbody>
					    			<tr v-for="(item,index) in myStarShipList" @click="chooseShipInMyStar(index,item.ShipId)" :class="item.isChecked?'backBlack':''">
					    				<td>{{index+1}}</td>
					    				<td>
					    					<el-button v-if="item.shipListState" circle type="danger" plain size="mini"  @click="handleEdit(item)">急</el-button>
							        		<el-button v-if="item.fixedRoute" circle type="success" plain size="mini"  @click="handleEdit(item)">定</el-button>
							    		</td>
							    		<td class="orange">{{item.ShipName}}</td>
							    		<td>{{item.LoadTon}}</td>
							    		<td>{{item.LoadPort}}</td>
							    		<td>{{item.LoadDateStr}}</td>
							    		<td>{{item.navStatus}}</td>
							    		<td>{{item.PositionText}}</td>
							    		<td>{{item.soName}}</td>
							    		<td>{{item.MobilePhone}}</td>
							    		<td>{{item.UpdateUser}}</td>
							    		<td>{{item.UpdateTimeStr}}</td>
					    			</tr>
					    		</tbody>
							</table>
					    </el-tab-pane>
					</el-tabs>
				</div>
			</div>
		</transition>
	</div>
	<div class="detailInfo" v-show="detailInfoShow">
		<div class="white fr"><i @click="detailInfoShow=false" class="el-icon-close"></i></div>
		<div class="orange font20 bold">{{shipDetailInfo.ShipName}}</div>
		<div class="flex info">
			<div class="mgr10">
				<div>船籍港： {{shipDetailInfo.RegPortName}}</div>
				<div class="">类型： {{shipDetailInfo.ShipTypeName}}</div>
				<div class="">建造年份： {{shipDetailInfo.Makedate}}</div>
				<div class="">船舱： {{shipDetailInfo.shipCapacity}}</div>
				<div class="">吨位： {{shipDetailInfo.loadTon}}</div>
				<div class="">状态： {{shipDetailInfo.navStatus}}</div>
				<div class="">目的港： {{shipDetailInfo.dest_port}}</div>
				<div class="">空船港： {{shipDetailInfo.portName}}</div>
				<div class="orange mgt10">联系人： {{shipDetailInfo.ShipperOwner}}</div>
				<div class="orange">公司： {{shipDetailInfo.Company}}</div>
			</div>
			<div class="flex1">
				<div class="">呼号： {{shipDetailInfo.HuHao}}</div>
				<div class="">MMSI： {{shipDetailInfo.Mmsi_num}}</div>
				<div class="">船长/船宽： {{shipDetailInfo.shipLong+'m/'+shipDetailInfo.shipWidth+'m'}}</div>
				<div class="">航速： {{shipDetailInfo.speed}}</div>
				<div class="">吃水： {{shipDetailInfo.Draft}}</div>
				<div class="">预到时间： {{shipDetailInfo.eta?shipDetailInfo.eta.substr(5):''}}</div>
				<div class="">空船日期： {{shipDetailInfo.loadDateStr?shipDetailInfo.loadDateStr.split(" ")[0]:''}}</div>
				<div class="nonVisible">占位</div>
				<div class="orange mgt10">联系电话： {{shipDetailInfo.MobilePhone}}</div>
			</div>
		</div>
		<div class="flex operate">
			<div class="flex1 btn hand" @click="editTip()" v-show="shipDetailInfo.Jid>0">
	      		<span class="center"><i class="el-icon-edit-outline"></i></span>
	      		<span class="center">备注</span>
	      	</div>
	      	<div class="flex1 btn hand" @click="openHistory()">
	      		<span class="center"><i class="el-icon-tickets"></i></span>
	      		<span class="center">历史</span>
	      	</div>
	      	<div class="flex1 btn hand" @click="dialogVisible_updateShip=true">
	      		<span class="center"><i class="el-icon-refresh"></i></span>
	      		<span class="center">更新</span>
	      	</div>
	      	<div class="flex1 btn hand" @click="starShip()">
	      		<span class="center"><i :class="shipDetailInfo.Jid>0?'el-icon-star-on':'el-icon-star-off'"></i></span>
	      		<span class="center">关注</span>
	      	</div>
      	</div>
	</div>
	<div class="drag" v-drag v-show="dialogVisible_shipHistory">
		<div>历史船期</div>
		<div class=" fr"><i @click="dialogVisible_shipHistory=false" class="el-icon-close"></i></div>
		<el-row  class="flex mgt10">
			<el-col :span="18" class="flex">
				<span class="label">船名</span>
				<span>{{shipDetailInfo.ShipName}}</span>
			</el-col >
			<el-col :span="6"  class="hand">
				<span @click="searchTrack">（轨迹）</span><i class="el-icon-location blue"></i>
			</el-col>
		</el-row>
		<div  class="mgt10">
			<span class="label">时间</span>
			<el-date-picker size="mini"  v-model="historyDateRange" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" format="MM-dd" @change="searchHistoryShip"></el-date-picker>
		</div>
		<table class="mgt10" border="1" cellpadding="0" cellspacing="0" width="100%">
    		<thead>
    			<th>空船港</th>
    			<th>空船日期</th>
    			<th>更新人员</th>
    			<th>更新时间</th>
    		</thead>
    		<tbody>
    			<tr v-for="(item,index) in historyShip">
		    		<td>{{item.PortName}}</td>
		    		<td>{{item.LoadDateStr}}</td>
		    		<td>{{item.UpdateUser}}</td>
		    		<td>{{item.UpdateTimeStr}}</td>
    			</tr>
    		</tbody>
		</table>
		<div class="pager" v-show='historyShipPager.totalCount/historyShipPager.pageSize>1'>
	        <el-pagination small
	          :current-page="historyShipPager.currentPage"
	          @current-change="getNewHistoryShipPage"
	          layout="prev, pager, next,jumper"
	          :page-size='historyShipPager.pageSize'
	          :total="historyShipPager.totalCount">
	        </el-pagination>
	    </div>
	</div>
	<el-dialog title="更新船期" :visible.sync="dialogVisible_updateShip" width="350px">
		<div class="flex">
			<div class="label">船名</div>
			<div class="flex1">{{shipDetailInfo.ShipName}}</div>
		</div>
		<div class="flex mgt10">
			<div class="label">空船时间</div>
			<div class="flex1 flex">
				<el-date-picker class="flex1" v-model="updateShipData.emptyTime" type="date" placeholder="选择日期"></el-date-picker>
			</div>
		</div>
		<div class="flex mgt10">
			<div class="label">空船港</div>
			<el-popover class="flex1" placement="bottom" width="380" v-model="popoverShow.emptyShipPort">
				<div class="portList flex">
					<div class="province">
						<li v-for="(item,index) in portListOption" @click="selectProvince2(index)" :class="updateShipData.curProvinceIndex==index?'blue':''">{{item.Name}}</li>
					</div>
					<div class="city " v-if="updateShipData.curProvinceIndex!=-1">
                        <li v-for="(item,index) in portListOption[updateShipData.curProvinceIndex].Citys" @click="selectCity2(index)" :class="updateShipData.curCityIndex==index?'blue':''">{{item.Name}}</li>
                    </div>
                    <div class="port flex1" v-if="updateShipData.curCityIndex!=-1">
                        <li v-for="(item,index) in portListOption[updateShipData.curProvinceIndex].Citys[updateShipData.curCityIndex].Ports" @click="selectPort2(index)" :class="updateShipData.curPortIndex==index?'blue':''">{{item.Name}}</li>
                        <li class="flex mgt10 ">
                        	<el-input class="flex1 mgr10" v-model="updateShipData.newPort" placeholder="新增港口"></el-input>
                        	<el-button type="success" icon="el-icon-check" circle @click="createNewPort"></el-button>
                        </li>
					</div>
				</div>
				<div class="textRight">
					<el-button size="mini" type="primary" @click="surePortSelect2">确定</el-button>
                </div>
				<el-input size="mini"   slot="reference" v-model="updateShipData.positionText"></el-input>
			</el-popover>
		</div>
		<div class="flex mgt20 center">
			<el-checkbox v-model="updateShipData.shipListState">加急</el-checkbox>
			<el-checkbox v-model="updateShipData.fixedRoute">定线</el-checkbox>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button type="primary" @click="updateShipDate">确 定</el-button>
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
			    <el-table-column prop="PortName" label="空船港" width="100"></el-table-column>
			    <el-table-column prop="RemarkContent" label="备注" ></el-table-column>
			    <el-table-column prop="AddTimeStr" label="更新时间" width="120"></el-table-column>
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
	<div class="historyTrackTimeSelect" v-show="historyTrackTimeSelect_visible">
		<el-date-picker size="mini"
	      v-model="historyTrack.startDate"
	      type="date"
	      placeholder="开始日期">
	    </el-date-picker>
	    <span>-</span>
	    <el-date-picker size="mini"
	      v-model="historyTrack.endDate"
	      type="date"
	      placeholder="结束日期">
	    </el-date-picker>
	    <el-button size="mini" type="primary" @click="searchTrack">确定</el-button>
	    <el-button size="mini" @click="backFromTrack">返回</el-button>
	</div>
</div>
</template>
<script>
export default {
    name: 'shipment',
    directives:{
        drag(el,bindings){
            el.onmousedown = function(e){
                var disx = e.pageX - el.offsetLeft;
                var disy = e.pageY - el.offsetTop;
                document.onmousemove = function (e){
                    el.style.left = e.pageX - disx+'px';
                    el.style.top = e.pageY - disy+'px';
                }
                document.onmouseup = function(){
                    document.onmousemove = document.onmouseup = null;
                }
            }
        }
    },
    data () {
      	return {
      		map:{},
      		mapReady:{},
      		searchMarkerList:[],
      		queryInfo:{
      			sortBy:2,
      			curProvinceIndex:-1,
      			curCityIndex:-1,
      			curPortIndex:-1,
      			positionText:"",
      			positionType:'',
      			area:"",
      			ShipName:"",
      			MinTond:"",
      			MaxTond:"",
      			dateArr:[],
      		},
      		popoverShow:{
      			curshipPos:false,
      			area:false,
      			ton:false,
      			emptyShipPort:false,
      		},
      		sortOptions:[ {
	          value: 2,
	          label: '空船日期'
	        },{
	          value: 1,
	          label: '更新时间'
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
	        historyDateRange:[],
	        historyShipPager:{
	        	currentPage:1,
				pageSize:10,
				totalCount:0
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
			historyTrack:{
				startDate: new Date(Date.now() - 7*24*3600*1000),
        		endDate: new Date(),
        		TraceList:[],
			},
			polyline:null,
			dialogVisible_updateShip:false,
			updateShipData:{
				curProvinceIndex:-1,
      			curCityIndex:-1,
      			curPortIndex:-1,
      			positionText:"",
      			positionType:'',
      			newPort:'',
      			shipListState:false,
      			fixedRoute:false,
			},
			dialogVisible_editTip:false,
			detailInfoShow:false,
			historyTrackTimeSelect_visible:false,
      		showBottom:false,
  		}
  	},
/*    activated(){
	    this.$store.tabs.commit('assignNewTab', {
		    path:this.$route.path,
		    name:"VIP船期",
		    isActive:true
	    });
  	},*/
  	created(){
  		this.$store.tabs.commit('assignNewTab', {
		    path:this.$route.path,
		    name:"VIP船期",
		    isActive:true
	    });
  		this.querySearchInfo();
  		this.getShipList();
  		this.getAllShipPosition();
	},
  	mounted(){
 		this.initMap();
 		this.getMyStarShipNum();
  	},
    methods: {
    	fixTitle(e){
    		console.log(e)
    	},
    	initMap(){
			var mapOptions = new shipxyMap.MapOptions();
		    mapOptions.center = new shipxyMap.LatLng(39.9, 116);
		    mapOptions.zoom = 5;
		    mapOptions.mapType = shipxyMap.MapType.CMAP;
		    mapOptions.hidePort = 'y';
	  		this.map = new shipxyMap.Map('mapContainer', mapOptions);
	  		this.mapReady=new Promise((resolve,reject)=>{
	  			shipxyMap.mapReady =  ()=> {
	  				var commonOptions = new shipxyMap.MarkerOptions()
			        commonOptions.zIndex = 4;  //显示层级
			        commonOptions.isShowLabel = false; //是否显示label
			        commonOptions.isEditable = false; //是否可编辑
			        commonOptions.imagePos = new shipxyMap.Point(0, 16); //图片偏移量
			        commonOptions.imageUrl = "http://www.sspp.co/new_images/shipList/chosen.png";
			        this.curChosenMarker = new shipxyMap.Marker("shipId0", new shipxyMap.LatLng(50,120), commonOptions);
	  				this.map.addShipEventListener(shipxyMap.Event.CLICK,  (event)=>{
	  					this.historyDateRange=[];
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
    	chooseShipInList(index,shipId){
    		for (var i = this.vaildShipList.length - 1; i >= 0; i--) {
    			this.vaildShipList[i].isChecked=false;
    		}
    		this.vaildShipList[index].isChecked=true;
    		this.queryShipDetailInfo(shipId);
    	},
    	chooseShipInMyStar(index,shipId){
    		for (var i = this.myStarShipList.length - 1; i >= 0; i--) {
    			this.myStarShipList[i].isChecked=false;
    		}
    		this.myStarShipList[index].isChecked=true;
    		this.queryShipDetailInfo(shipId);
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
					this.detailInfoShow=true;
					this.resetMarkerPosition(this.curChosenMarker,this.shipDetailInfo.Latitude,this.shipDetailInfo.Longitude);
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
    	getMyStarShipNum(){
			this.isLoading=true;
    		this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/QueryAttentionVaildShipList',{})
			.then( (response)=>{
				this.isLoading=false;
				if (response.data.RetCode==0) {
					this.myStarShipList=response.data.RetData;
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
    	getMyStarShip(){
    		this.isLoading=true;
    		this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/QueryAttentionVaildShipList',{})
			.then( (response)=>{
				this.isLoading=false;
				if (response.data.RetCode==0) {
					this.myStarShipList=response.data.RetData;
					this.drawMakerAndName(this.myStarShipList);
					this.map.removeOverlay(this.curChosenMarker);
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
    	getShipList(pageIdx){
    		this.isLoading=true;
    		if (pageIdx>0) {
    			this.vaildShipListPager.currentPage=pageIdx;
    		}
    		let subData={
    			PageIndex:this.vaildShipListPager.currentPage,
    			PageSize:this.vaildShipListPager.pageSize,
    			positionText:this.queryInfo.positionText,
    			positionType:this.queryInfo.positionType,
    			positionId:this.queryInfo.positionId,
    			Area:this.queryInfo.area,
    			Sdate:this.queryInfo.dateArr!==null&&this.queryInfo.dateArr.length>1?this.queryInfo.dateArr[0].toLocaleDateString():'',
    			Edate:this.queryInfo.dateArr!==null&&this.queryInfo.dateArr.length>1?this.queryInfo.dateArr[1].toLocaleDateString():'',
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
					if (response.data.RetData.list.length==0) {
						this.message({
							message: "暂无数据",
			    			type: 'error'
						})
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
    			positionType:this.queryInfo.positionType,
    			positionId:this.queryInfo.positionId,
    			Area:this.queryInfo.area,
    			Sdate:this.queryInfo.dateArr.length>1?this.queryInfo.dateArr[0]:'',
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
    	fixHead(e){
    		this.$refs.thead2.style.transform = 'translate(0, '+e.target.scrollTop+'px)';
    	},
    	shipListScroll(e){
    		this.$refs.thead1.style.transform = 'translate(0, '+e.target.scrollTop+'px)';
    		if(e.target.scrollHeight-e.target.scrollTop<480&&this.vaildShipListPager.currentPage<this.vaildShipListPager.totalCount/this.vaildShipListPager.pageSize&&this.isLoading==false){//280
    			this.vaildShipListPager.currentPage++;
    			this.getShipList();
    		}
    	},
    	selectProvince: function(index) {
            this.queryInfo.curProvinceIndex = index;
            this.queryInfo.curCityIndex = "-1";
            this.queryInfo.curPortIndex = "-1";
            this.queryInfo.positionId = this.portListOption[index].Id;
            this.queryInfo.positionText = this.portListOption[index].Name;
            this.queryInfo.positionType=1; //1省 2市
        },
        selectCity: function(index) {
            this.queryInfo.curCityIndex = index;
            this.queryInfo.curPortIndex = "-1";
            this.queryInfo.positionText = this.portListOption[this.queryInfo.curProvinceIndex].Citys[index].Name;
            this.queryInfo.positionId = this.portListOption[this.queryInfo.curProvinceIndex].Citys[index].Id;
            this.queryInfo.positionType=2; //1省 2市
        },
        selectPort:function(index){
			this.queryInfo.curPortIndex = index;
            this.queryInfo.positionText = this.portListOption[this.queryInfo.curProvinceIndex].Citys[this.queryInfo.curCityIndex].Ports[index].Name;
            this.queryInfo.positionId = this.portListOption[this.queryInfo.curProvinceIndex].Citys[this.queryInfo.curCityIndex].Ports[index].Id;
            this.queryInfo.positionType=3; //1省 2市 3港口
            this.surePortSelect();
        },
        clearPortSelectRe0: function(type) {
        	this.queryInfo.curProvinceIndex = -1;
            this.queryInfo.curCityIndex = -1;
            this.queryInfo.curPortIndex = -1;
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
        clearArea(){
        	this.queryInfo.area='';
        	this.popoverShow.area = false;
        	this.vaildShipListPager.currentPage=1;
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
			this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/QueryProvinceCityPortInfo')
			.then( (response)=>{
				if (response.data.RetCode==0) {
					this.portListOption=response.data.RetData.PortList;

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
        		this.getAllShipPosition();
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
	    		Stime:this.historyDateRange!==null&&this.historyDateRange.length>1?this.historyDateRange[0].toLocaleDateString():'',
	    		Etime:this.historyDateRange!==null&&this.historyDateRange.length>1?this.historyDateRange[1].toLocaleDateString():'',
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
	    searchTrack(){
	    	this.historyTrackTimeSelect_visible=true;
	    	this.isLoading=true;
	    	this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/QueryShipHistoryTraceInfo',{
	    		MmsiNum:this.shipDetailInfo.Mmsi_num,
	    		StartDate:this.historyTrack.startDate.toLocaleDateString(),
	    		EndDate:this.historyTrack.endDate.toLocaleDateString(),
	    	})
			.then( (response)=>{
				this.isLoading=false;
				if (response.data.RetCode==0) {
					this.historyTrack.TraceList=response.data.RetData.TraceList;
					this.drawHistoryTrack();
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
	    clearHistoryTrack: function() {
            if(this.polyline){
                this.map.removeOverlayByType(shipxyMap.OverlayType.TRACK)
                this.polyline=null;
            }
            this.historyTrack.TraceList=[];

        },
	    backFromTrack: function() {
	    	this.historyTrackTimeSelect_visible=false;
	    	this.detailInfoShow=true;
            this.clearHistoryTrack();
            this.showSearchMarkerList();
            this.historyTrack.startDate = new Date(Date.now() - 7*24*3600*1000);
            this.historyTrack.endDate = new Date();
            this.map.addOverlay(this.curChosenMarker);
            this.resetMarkerPosition(this.curChosenMarker,this.shipDetailInfo.Latitude,this.shipDetailInfo.Longitude);
        },
	    drawHistoryTrack: function() {
            if(this.historyTrack.TraceList.length==0){
            	this.$message({
					message: "暂无数据",
					type: 'error'
				});
				return;
            }
            var trackData = new shipxyAPI.Track(this.shipDetailInfo.Mmsi_num, this.historyTrack.startDate.getTime()/1000, this.historyTrack.endDate.getTime()/1000);
            trackData.data = this.historyTrack.TraceList;
            var opts = new shipxyMap.TrackOptions();
            opts.isShowLabel = true; //显示标签
            opts.isVacuate = true; //抽稀
            opts.distance = 100; //抽稀间距：100像素
            /*****轨迹点样式*****/
            opts.pointStyle.radius = 4;
            opts.pointStyle.strokeStyle.thickness = 2;
            opts.pointStyle.strokeStyle.color = 0xff0000;
            opts.pointStyle.strokeStyle.alpha = 0.7;
            opts.pointStyle.fillStyle.color = 0xffffff;
            opts.pointStyle.fillStyle.alpha = 1;
            /*****线条样式*****/
            opts.strokeStyle.thickness = 2;
            opts.strokeStyle.color = 0x0000ff;
            opts.strokeStyle.alpha = 0.8;
            /*****标签风格*****/
            /*****标签字体风格*****/
            opts.labelOptions.fontStyle.name = 'Arial';
            opts.labelOptions.fontStyle.size = 12;
            opts.labelOptions.fontStyle.color = 0x0000ff;
            opts.labelOptions.fontStyle.bold = false;
            opts.labelOptions.fontStyle.italic = false;
            opts.labelOptions.fontStyle.underline = false;
            /*****标签边线样式*****/
            opts.labelOptions.border = true;
            opts.labelOptions.borderStyle.thickness = 1;
            opts.labelOptions.borderStyle.color = 0x0000ff;
            opts.labelOptions.borderStyle.alpha = 0.8;
            /*****标签背景样式*****/
            opts.labelOptions.background = false;
            opts.labelOptions.backgroundStyle.color = 0xbbbbbb;
            opts.labelOptions.backgroundStyle.alpha = 0;
            this.polyline = new shipxyMap.Track(trackData.trackId, trackData, opts);
            this.hideSearchMarkerList();
    		this.detailInfoShow=false;
            this.map.addOverlay(this.polyline);
        },
	    getNewHistoryShipPage(e){
	    	this.historyShipPager.currentPage=e;
      		this.searchHistoryShip()
	    },
	    updateShipDate(){
	    	this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/ExeUpdateShipList',{
	    		ShipId:this.shipDetailInfo.ShipId,
	    		LoadDate:this.updateShipData.emptyTime.toLocaleDateString(),
	    		PortId:this.updateShipData.positionId,
	    		ShipListState:this.updateShipData.shipListState?1:0,
	    		fixedRoute:this.updateShipData.fixedRoute?1:0,
	    	})
			.then( (response)=>{
				if (response.data.RetCode==0) {
					this.dialogVisible_updateShip=false;
					this.$message({
					    message: response.data.RetMsg,
					    type: 'success'
					  });
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
	    selectProvince2: function(index) {
            this.updateShipData.curProvinceIndex = index;
            this.updateShipData.curCityIndex = "-1";
            this.updateShipData.curPortIndex = "-1";
            this.updateShipData.positionId = this.portListOption[index].Id;
            this.updateShipData.positionText = this.portListOption[index].Name;
            this.updateShipData.positionType=1; //1省 2市
        },
        selectCity2: function(index) {
            this.updateShipData.curCityIndex = index;
            this.queryInfo.curPortIndex = "-1";
            this.updateShipData.positionText = this.portListOption[this.updateShipData.curProvinceIndex].Citys[index].Name;
            this.updateShipData.positionId = this.portListOption[this.updateShipData.curProvinceIndex].Citys[index].Id;
            this.updateShipData.positionType=2; //1省 2市
        },
        selectPort2:function(index){
			this.updateShipData.curPortIndex = index;
            this.updateShipData.positionText = this.portListOption[this.updateShipData.curProvinceIndex].Citys[this.updateShipData.curCityIndex].Ports[index].Name;
            this.updateShipData.positionId = this.portListOption[this.updateShipData.curProvinceIndex].Citys[this.updateShipData.curCityIndex].Ports[index].Id;
            this.updateShipData.positionType=3; //1省 2市 3港口
            this.surePortSelect2();
        },
        surePortSelect2(){
        	this.popoverShow.emptyShipPort = false;
        },
        createNewPort(){
        	this.$axios.post(this.$store.commonData.state.url+'BaseShipGoods/ExeAddPort',{
	    		AddType:2,
	    		ParentId:this.portListOption[this.updateShipData.curProvinceIndex].Citys[this.updateShipData.curCityIndex].Id,
	    		PortName:this.updateShipData.newPort
	    	})
			.then( (response)=>{
				if (response.data.RetCode==0) {
					this.portListOption[this.updateShipData.curProvinceIndex].Citys[this.updateShipData.curCityIndex].push({
						Id:1,
						Name:this.updateShipData.newPort,
					});
					this.updateShipData.newPort='';
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
	    		HandType:this.shipDetailInfo.Jid>0?1:0,//0 关注 1 取关
	    	})
			.then( (response)=>{
				if (response.data.RetCode==0) {
					if (this.shipDetailInfo.Jid>0) {
						this.shipDetailInfo.Jid=0;
					}else{
						this.shipDetailInfo.Jid=1;
					}
					this.$message({
			          message: response.data.RetMsg,
			          type: 'success'
			        });
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
	    resetMarkerPosition(marker,lat,lng){
		    if(!lat||!lat){
		        return false;
		    }
		    this.map.removeOverlay(marker);
		    var newMarker=marker;
		    newMarker.data=new shipxyMap.LatLng(parseFloat(lat),parseFloat(lng));
		    this.map.addOverlay(newMarker, true);
		    let zoom=this.map.getZoom()>10?this.map.getZoom():10;
		    this.map.setCenter(new shipxyMap.LatLng(parseFloat(lat),parseFloat(lng)),zoom);
		},
		hideSearchMarkerList: function() {
			this.map.removeOverlay(this.curChosenMarker);
            try{
	    		this.map.removeOverlayByType(shipxyMap.OverlayType.SHIP);
	    	}catch(err){}
        },
        showSearchMarkerList: function() {
            for (var i = this.searchMarkerList.length - 1; i >= 0; i--) {
                this.map.addOverlay(this.searchMarkerList[i]);
            }
        },
	    drawMakerAndName(data) {
	    	this.mapReady.then(()=>{
	    		try{
	    			this.map.removeOverlayByType(shipxyMap.OverlayType.SHIP);
	    		}catch(err){}
	    		this.searchMarkerList=[];
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
			            option.isSelected = false; //船舶框选
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
			            this.searchMarkerList.push(addshipOverlay);
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
	.province,.city,.port{
		overflow-y: scroll;
		height: 160px;
		float: left;
		padding: 8px;
		li{
			line-height: 26px;
			height: 26px;
		}
	}
	.province{
		width: 80px;
	}
	.city{
		width: 80px;
	}
	.port{
		li{
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
	padding:10px;
	padding-bottom: 55px;
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
	.info{
		align-items: flex-start;
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
			bottom: -25px;
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
		height: 260px;
		.shipList{
			background-color: @backBlue;
			padding:0px 10px 0 10px;
			/deep/.el-tabs__item.is-active{
				color: white;
				font-weight: bold;
			}
			/deep/.el-tabs__item{
				color:#A7A4A6;
				font-weight: bold;
				height: 30px;
				line-height:30px;
				position: relative;
    			top: -5px;
			}
			.totalShip{
				overflow-y: scroll;
				height: 230px;
			}
			table{
				width: 100%;
				border:1px solid rgba(255, 255, 255, 0.3);
				th{
					color: #A7A4A6;
				}
				td,th{
					padding: 0px;
				}
				td{
					box-sizing: border-box;
					text-align: center;
				}
				thead{
				    background: rgba(14, 66, 104, 0.8);
				}
				/deep/.el-button--mini.is-circle{
					padding: 3px;
					margin: 0;
				}
			}
		}
	}
	/deep/.el-tabs__header{
		margin:0;
	}
}
.drag{
	width: 400px;
    position: absolute;
    top: 100px;
    left: 100px;
    padding: 10px;
    z-index: 10;
    background-color: white;
}
.historyTrackTimeSelect{
	position: fixed;
	top: 180px;
	right: 50px;
	background-color: white;
	padding: 10px;
}
</style>