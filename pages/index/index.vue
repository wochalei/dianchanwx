<template>
	<view>
		<!-- 顶部 -->
		<view class="top-view">
			<view>{{clientStatus.man}}人就餐</view>
			<view class="top-view-flex">
				<image src="/static/tab/fenxiang.svg" mode="widthFix" class="top-search"></image>
				<image @click="toHistry" src="/static/tab/dingdan.svg" mode="widthFix"></image>
			</view>
		</view>
		<!-- 点餐界面 -->
		<view class="order-view">
			<view class="commodity">
				<!-- 左 -->
				<view class="order-left">
					<scroll-view scroll-y="true" class="scroll-Hei" :scroll-with-animation="true" :enhanced="true"
						:show-scrollbar="false">

						<view class="itemize-text" v-for="(item,index) in typeData" :key="index"
							:class="{active:lIndex == 'a' + index}" @click="changeIndex('a'+index)">
							<text>{{item.label}}</text>
							<text>{{item.count}}</text>

						</view>

					</scroll-view>
				</view>
				<!-- 右 -->
				<view class="order-right">
					<scroll-view scroll-y="true" class="scroll-Hei" @scrolltolower="tolower"
						:scroll-with-animation="true" :enhanced="true" :show-scrollbar="false"
						:scroll-into-view="rIndex" @scroll="scrollIndex">

						<view class="rig-height" v-for="(item,index) in listData" :key="index" :id="'a'+index">
							<view class="classif">{{item.type}}</view>
							<view class="classif-goods" v-for="(tmp,index1) in item.list" :key="index1"
								@click="toShowDetails(tmp,index)">
								<view class="goods-image">
									<image src="/static/tab/guanbi.png" mode="aspectFill"></image>
								</view>
								<view class="goods-Price">
									<view class="goods-name">
										<text class="Bold">{{tmp.name}}</text>
										<text class="Thinning">已售 {{tmp.monthlySale}}</text>
									</view>
									<view class="unit-price">
										<text class="Symbol">¥</text>
										<text class="Bold">{{tmp.unitPrice}}</text>
										<text class="Thinning">/{{tmp.unit}}</text>
									</view>
								</view>
								<view class="quantity">
									<view @click.prevent="delCount(tmp,index)">
										<image src="/static/tab/jianhao.png" mode="widthFix"></image>
									</view>
									<view><text>{{tmp.count}}</text></view>
									<view @click.prevent="addCount(tmp,index)">
										<image src="/static/tab/jia.png" mode="widthFix"></image>
									</view>
								</view>
							</view>
						</view>

						<view style="height:900rpx;"></view>
					</scroll-view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="order-bottom">
				<view class="Shopping" style="width: 115rpx;" @click="toShowCart">
					<view class="Shopping-left">
						<image src="/static/tab/gouwuche.png" mode="widthFix"></image>
					</view>
					<view class="Shopping-number">{{allShopCount}}</view>
				</view>
				<view class="Shopping-title">已点{{allShopCount}}份菜品</view>
				<view class="place-order">
					<button plain="true" open-type="getUserInfo" @click="toSubmit">选好了</button>
				</view>
			</view>
		</view>
		<!-- 单个商品详情 -->
		<Details v-if="detailShow" :detailItemData='detailItemData' @toCloseDetail='toCloseDetail' @addCount='addCount'
			@delCount='delCount'></Details>
		<!-- 购物车 -->
		<Cart v-if="cardShow" @toShowCart='toShowCart' :shopCart='shopCart' @addCount='addCount' @delCount='delCount'
			@clearShopData='clearShopData'></Cart>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
		nextTick,
		computed
	} from 'vue'
	import {
		db,
		_
	} from '@/utils/db.js'
	import moment from 'moment'
	import Cart from './components/shopping-cart.vue'
	import Details from './components/goods-details.vue'
	import {goeasy} from '@/utils/chartNow.js'
	const toHistry = ()=>{
		wx.navigateTo({
		  url: '/pages/my-order/my-order',
	})}
	const clientStatus = ref({});
	onMounted(()=>{
		const status =	JSON.parse(wx.getStorageSync('clientStatus')) ;
		
	    clientStatus.value=status;
		
	})
	//建立连接
	goeasy.connect({
		id: "", //pubsub选填，im必填，最大长度60字符
		data: {
			
		}, //必须是一个对象，pubsub选填，im必填，最大长度300字符，用于上下线提醒和查询在线用户列表时，扩展更多的属性
		onSuccess: function() { //连接成功
			console.log("GoEasy connect successfully.") //连接成功
		},
		onFailed: function(error) { //连接失败
			console.log("Failed to connect GoEasy, code:" + error.code + ",error:" + error.content);
		},
		onProgress: function(attempts) { //连接或自动重连中
			console.log("GoEasy is connecting", attempts);
		}
	});
    //发送消息
	function sendMessage(){
		const pubsub = goeasy.pubsub;
		pubsub.publish({
		    channel: "my_channel",//替换为您自己的channel
		    message: "Hello GoEasy!",//替换为您想要发送的消息内容
		    onSuccess:function(){
		        console.log("消息发布成功。");
		    },
		    onFailed: function (error) {
		        console.log("消息发送失败，错误编码："+error.code+" 错误信息："+error.content);
		    }
		});
	}
	




	//提交订单
	const toSubmit = async () => {
		if (shopCart.value.length === 0) return;
		//算消费总价
		let totalPrice = 0;
		shopCart.value.forEach((item) => {
			totalPrice += item.count * item.unitPrice;
		})
		const orderData = {
			tableName: clientStatus.value.tableName,
			numberOfDiners: clientStatus.value.man,
			orderTime: moment().utcOffset(8).format('YYYY-MM-DD HH:mm:ss'),
			totalPrice,
			transacStatus: 'unsettled', // unsettled:未结账，success:结账
			orderReceiving: 'unsettled', // unsettled:未接单，success:已接单
			menu: [{
				goodList: shopCart.value
			}]
		}
		
		const getRes = await db.collection('order').where({
			transacStatus: 'unsettled',
			tableName: clientStatus.value.tableName
		}).get()
		// 未结账
		if (getRes.data.length != 0) {

			const res = await db.collection('order').doc(getRes.data[0]._id).update({
				data: {
					menu: _.unshift({
						goodList: shopCart.value
					}),
					totalPrice: _.inc(totalPrice)
				}
			})
            
		}
		// 已结账 
		else {
			const addRes = await db.collection('order').add({
				data: orderData
			})
		}
		//增加销量
		shopCart.value.forEach(async (item) => {
			await db.collection('foodInfo').doc(item._id).update({
				data: {
					monthlySale: _.inc(item.count)
				}
			})

		})
		//增加当日销量
		const daySale = await db.collection('sevenSales').where({
			time: moment().utcOffset(8).format('YYYY-MM-DD')
		}).get();
		if (daySale.data.length === 0) {
			await db.collection('sevenSales').add({
				data: {
					time: moment().utcOffset(8).format('YYYY-MM-DD'),
					total: totalPrice
				}
			});
		} else {
			await db.collection('sevenSales').doc(daySale.data[0]._id).update({
				data: {
					total: _.inc(totalPrice)
				}
			})
		}
		//订阅消息
		dingMessage()
		//购物车清空
		clearShopData();
		//即使消息通讯
        sendMessage();
		//
		wx.redirectTo({
		  url: '/pages/order-details/details'
		})
	}
	const dingMessage = () => {
		wx.requestSubscribeMessage({
			tmplIds: ['GcOj-Sa8gzNwwPxR5WsxYtiwrbc4kK36GV7bneJ5xa8'],
			success(res) {
				console.log(res);
			}
		})
	}
	//购物车部分
	const shopCart = ref([]);
	//减少
	const delCount = (item, index) => {

		const res = shopCart.value.find((kid) => {
			if (item === kid) {
				return kid;
			}
		})
		if (!res) return;
		typeData.value[index].count--;
		item.count--;
		if (item.count <= 0) {
			shopCart.value = shopCart.value.filter((tmp) => {
				return tmp != item;
			})
		}

	}
	//增加
	const addCount = (item, index) => {
		const res = shopCart.value.find((kid) => {
			if (item === kid) {
				return kid;
			}
		})
		if (!res) shopCart.value.push(item);
		item.count++;
		typeData.value[index].count++;

	}
	//清空
	const clearShopData = () => {

		shopCart.value.forEach((item) => {
			item.count = 0;
		})
		typeData.value.forEach((item) => {
			item.count = 0
		})
		shopCart.value = [];
	}
	//计算商品数量
	const allShopCount = computed(() => {

		let res = 0;
		shopCart.value.forEach((item) => {
			res += item.count;
		})
		return res;
	})


	//菜单展示
	const detailShow = ref(false);
	const detailItemData = ref({});
	const toShowDetails = (item, index) => {
		toCloseDetail();
		detailItemData.value = {
			item,
			index
		};
	}
	const toCloseDetail = () => {
		detailShow.value = !detailShow.value;
	}
	//购物车展示
	const cardShow = ref(false)
	const toShowCart = () => {
		cardShow.value = !cardShow.value
	}




	// 菜单与右边排列 联动部分
	const lIndex = ref("a0");
	const rIndex = ref("a0");
	const listHeight = ref([])
	const changeIndex = (value) => {
		rIndex.value = value
	}
	const scrollIndex = (e) => {
		const top = e.detail.scrollTop;
		const data = listHeight.value;
		for (let i = 0; i < data.length; i++) {
			if (top < data[0]) {
				lIndex.value = 'a0';
				return
			}
			if (data[i] < top && top < data[i + 1]) {

				lIndex.value = 'a' + (i + 1);
				return;
			}
			if (data[data.length - 1] < top) {
				lIndex.value = "a" + data.length;
			}
		}
	}


	// 数据获取部分
	const listData = ref(null);
	const typeData = ref(null);
	onMounted(async () => {
		const res = await wx.cloud.callFunction({
			// 云函数名称
			name: 'dianchan',
			// 传给云函数的参数
			data: {}
		})
		listData.value = res.result.list;
		typeData.value = res.result.type.data;
		//获取数据渲染到组件的节点信息
		nextTick(() => {
			const tmp = [];
			const query = uni.createSelectorQuery();
			query.selectAll('.rig-height').boundingClientRect(data => {
				data.forEach((item, index) => {
					if (index == 0) {
						tmp[index] = item.height;
					} else {
						tmp[index] = tmp[index - 1] + item.height;
					}
				})
			}).exec();
			listHeight.value = tmp;
		})
	})
</script>

<style scoped lang="scss">
	.top-view {
		background: linear-gradient(to bottom, #f7d45f, #f7d562, #f8d561, #f9db76, #f9de80);
		height: 120rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 20rpx;
		position: fixed;
		top: 0;
		right: 0;
		left: 0;
	}

	.top-view image {
		display: block;
		width: 35rpx;
		height: 35rpx;
	}

	.top-view-flex {
		display: flex;
		align-items: center;
	}

	.top-search {
		padding-right: 50rpx;
	}

	/* 点餐界面 */
	.order-view {
		margin-top: 120rpx;
	}

	.commodity {
		display: flex;
		position: fixed;
		top: 120rpx;
		left: 0;
		right: 0;
	}

	.order-left {
		background-color: #fafafa;
		width: 150rpx;
		overflow-y: auto;
	}

	.itemize-text {
		font-size: 27rpx;
		padding: 30rpx 10rpx;
		display: flex;
		align-items: center;
		color: #797979;
	}

	.itemize-text text:nth-child(1) {
		flex: 1;
	}

	.itemize-text text:nth-child(2) {
		background-color: #eb5941;
		border-radius: 50%;
		font-size: 20rpx;
		color: #FFFFFF;
		width: 30rpx;
		height: 30rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 2rpx;
	}

	.scroll-Hei {
		height: 100vh;
		/* white-space: nowrap; */
	}

	.order-right {

		background-color: #FFFFFF;
		flex: 1;
		overflow-y: auto;

	}

	.classif {
		font-size: 27rpx;
		padding: 30rpx 20rpx;
		color: #797979;
	}

	/* 分类商品 */
	.classif-goods {
		display: flex;
		justify-content: space-between;
		padding: 0 20rpx;
		height: 150rpx;
		font-size: 30rpx;
		margin-bottom: 45rpx;
	}

	.goods-image image {
		display: block;
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
	}

	.goods-Price {
		flex: 1;
		position: relative;
		padding: 0 20rpx;
	}

	.goods-Price text {
		display: block;
	}

	.goods-name {
		display: flex;
		flex-direction: column;
		position: relative;
		top: 0;
	}

	.goods-name text:nth-child(1) {
		padding-bottom: 9rpx;
	}

	.unit-price {
		position: absolute;
		bottom: 0;
		display: flex;
		align-items: baseline;
	}

	.Bold {
		font-weight: bold;
	}

	.Symbol {
		font-size: 20rpx;
	}

	.Thinning {
		font-size: 25rpx;
		color: #cccccc;
	}

	.quantity image {
		width: 50rpx;
		height: 50rpx;
	}

	.quantity view {
		width: 50rpx;
		height: 50rpx;
		text-align: center;
		line-height: 50rpx;
	}

	.quantity {
		display: flex;
		align-items: center;
		align-self: flex-end;
		width: 200rpx;
		justify-content: space-between;
	}

	.order-bottom {
		background-color: #fefefe;
		height: 120rpx;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		box-shadow: 0rpx -1.9rpx 1rpx 1rpx #f9f9f9;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		z-index: 9;
	}

	.Shopping image {
		width: 75rpx;
		height: 75rpx;
		display: block;
	}

	.Shopping-left {
		width: 75rpx;
		height: 75rpx;
	}

	.Shopping {
		display: flex;
		align-items: center;
		/* height: 120rpx; */
	}

	.Shopping-number {
		align-self: flex-start;
		background: #eb5941;
		color: #ffff;
		width: 40rpx;
		border-radius: 50rpx;
		text-align: center;
		font-size: 20rpx;
		/* margin-top: 15rpx; */
	}

	.Shopping-title {
		flex: 1;
		padding: 0 25rpx;
		color: #999999;
		/* height: 120rpx;
	line-height: 120rpx; */
	}

	.place-order button {
		border: none;
		background: linear-gradient(to right, #f8da81, #f8d771, #f7d362, #f6cb4a);
		width: 200rpx;
		height: 75rpx;
		line-height: 75rpx;
		border-radius: 50rpx;
		font-weight: bold;
		z-index: 9;
	}

	/* 点击分类列表加上背景色 */
	.active {
		background-color: rgba(0, 0, 0, 0.1);
		color: #000000 !important;
	}
</style>
