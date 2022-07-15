<template>
	<view class="details-view">
		<view class="order-top">
			<view class="order-remind">
				<view>下单成功，坐等开吃</view>
				<view>菜品已在制作中</view>
			</view>
		</view>
		<view class="food-list">
		<view class="foot-back">
			 <block v-for="(item,index) in minData">
				 <view class="foot-til">
				 	<text>第{{minData.length - index}}次下单</text>
				 	<text>下单成功，坐等开吃</text>
				 </view>
				 
				 	<view class="foot-deta" v-for="(itema,indexa) in item.goodList" >
				 		<view>
				 			<image src="/static/tab/gouwuche.png" mode="aspectFill"></image>
				 		</view>
				 		<view class="foot-name">
				 			<text>{{itema.name}}</text>
				 			<text>{{itema.count}}</text>
				 		</view>
				 		<view class="foot-total">¥{{itema.count*itema.unitPrice}}</view>
				 	</view>
				 
				 <!-- 展示更多 -->
				 <view class="expand-more" 
				 v-if="item.max>3"
				 @click="showAll(index)">
				 	<text>展开全部</text>
				 	<image src="/static/tab/zhankai.svg"></image>
				 </view>
			 </block>
				
			
			<!-- 总计 -->
			<view class="total-view">
				<view>共 {{status.num}} 份</view>
				<view class="total-price">
					<text>总计</text>
					<text>¥{{status.totalPrice}}</text>
				</view>
			</view>
		</view>
		<!-- 订单号 -->
		<view class="foot-back order-number">
			<text>订单编号：{{status._id}}</text>
			<text>下单时间：{{status.orderTime}}</text>
			<text>桌台名称：{{status.tableName}}</text>
		</view>
		<view style="height: 300rpx;"></view>
		</view>
		<!-- 加菜 -->
		<view class="add-a-dish" @click="toAddFood">
			<view>加菜</view>
		</view>

	</view>
</template>

<script setup>
import {ref,onMounted} from 'vue'
import {
		db,
		_
	} from '@/utils/db.js'
 const detailData = ref([]);
 const minData = ref([]);
 const status = ref({})
 const showAll =(index)=>{
	 minData.value[index].goodList=detailData.value[index].goodList;
	 minData.value[index].max = 0;
 }
 const totalCount = ()=>{
	 let total = 0;
	 detailData.value.forEach((item)=>{
		    item.goodList.forEach((tmp)=>{
				total+=tmp.count;
			})
	 })
	 status.value.num = total;
 }
 const toAddFood = ()=>{
	 wx.reLaunch({
	   url: '/pages/index/index'
	 })
 }
 onMounted(async ()=>{
	 
	const clientStatus =JSON.parse(wx.getStorageSync('clientStatus')) ;
	console.log(clientStatus);
	const res = await db.collection('order').where({tableName:clientStatus.tableName,transacStatus:'unsettled'}).get();
	 //声明两个数据源，来使得minData 被点击展开菜单时 替换数据源来展示全部
	 console.log(res);
	 status.value = res.data[0];
	 detailData.value = res.data[0].menu;
	 minData.value = detailData.value.map((item)=>{
		 return {
			 goodList: item.goodList.slice(0,3),
			 //作为每个数据源折叠的标识,要在数据源里添加,不要另外声明状态,因为这样数据循环渲染起来不是一个for中
			 //要保持同for 还要传index
			 max:item.goodList.length
		 }
	 })
	 
	totalCount(); 
 })
</script>

<style>
page{background-color: #f4f4f4;}
.details-view{position: relative;}
.order-top{
	background:linear-gradient(to bottom, #f7d45f,#f7d562,#f8d561,#f9db76, #f9de80);
	height: 300rpx;
}
.order-remind view:nth-child(1){
	font-size: 35rpx;
	font-weight: bold;
	padding-bottom: 20rpx;
}
.order-remind{
	height: 200rpx;
	padding: 50rpx 0 0 50rpx;
}
.food-list{
	position: absolute;
	top: 200rpx;
	left: 20rpx;
	right: 20rpx;
}
.foot-back{
	background-color: #fefefe;
	border-radius: 10rpx;
	padding: 0 20rpx;
	margin-bottom: 30rpx;
}
.foot-til{
	height: 100rpx;
	color: #999999;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.foot-deta image{
	display: block;
	width: 130rpx;
	height: 130rpx;
	border-radius: 10rpx;
}
.foot-deta{
	display: flex;
	justify-content: space-between;
	height: 130rpx;
	margin: 40rpx 0;
}
.foot-name{
	flex: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 0 20rpx;
	font-size: 30rpx;
}
.foot-name text:nth-child(1){font-size: 31rpx !important;font-weight: bold;}
.foot-name text:nth-child(2){color: #666666;}
.foot-total{font-weight: bold;}
/* 展开更多 */
.expand-more image{
	width: 25rpx;
	height: 25rpx;
	display: block;
	padding-left: 10rpx;
}
.expand-more{
	display: flex;
	align-items: center;
	justify-content: center;
	color: #999999;
	font-size: 25rpx;
	padding: 30rpx 0;
	border-bottom: 1rpx solid #f1f1f2;
}
/* 总计 */
.total-price{
	display: flex;
	align-items: center;
	color: #333333;
	padding-left: 40rpx;
}
.total-price text:nth-child(2){
	font-size: 35rpx;
	font-weight: bold;
	padding-left: 30rpx;
	}
.total-view{
	display: flex;
	justify-content: flex-end;
	align-items: center;
	padding: 30rpx 0;
}
.total-view view:nth-child(1){
	color: #999999;
}
/* 订单号 */
.order-number text{
	display: block;
	padding: 15rpx 0;
	font-size: 28rpx;
	color: #999999;
}
/* 加菜 */
.add-a-dish{
	background-color: #fefefe;
	height: 120rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	box-shadow: 0rpx -1.9rpx 1rpx 1rpx #f9f9f9;
	padding: 0 20rpx;
	z-index: 9;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.add-a-dish view{
	background:linear-gradient(to right,#f8da81,#f8d771,#f7d362,#f6cb4a);
	width: 200rpx;
	height: 75rpx;
	line-height: 75rpx;
	text-align: center;
	border-radius: 50rpx;
	font-weight: bold;
}
</style>
