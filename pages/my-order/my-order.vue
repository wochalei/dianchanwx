<template>
	<!-- 我的订单 -->
	<view>
		
		<view class="my-order-view" v-for="(item,index) in data">
			<view class="my-order-name">
				<text>云南耿哥餐饮店</text>
				<text>{{item.transacStatus==='success'? '已完成':"未结账"}}</text>
			</view>
			<view class="my-order-number">
				<view>
					<view>
						<text>桌台名称 ：</text>
						<text>{{item.tableName}}</text>
					</view>
					<view class="my-order-time">
						<text>下单时间 ：</text>
						<text>{{item.orderTime}}</text>
					</view>
				</view>
				<view class="my-order-price">¥{{item.totalPrice}}</view>
			</view>
		</view>
		
		<view style="height: 100rpx;"></view>
	</view>
</template>

<script setup>
	import {
		onMounted,
		ref,
	} from 'vue'
import {
		db,
		_
	} from '@/utils/db.js'
	const data = ref([]);
	onMounted(async()=>{
     const	res =await db.collection('order').orderBy('orderTime','desc').get();
	 data.value = res.data;
	})
</script>

<style>
page{background-color: #f4f4f4;}
.my-order-view{
	background-color: #FFFFFF;
	border-radius: 10rpx;
	margin: 20rpx;
	padding: 20rpx;
}
.my-order-name{
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 20rpx;
	border-bottom: 1rpx solid #e5e5e5;
}
.my-order-name text:nth-child(1){
	font-weight: bold;
}
.my-order-number{
	padding-top: 20rpx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: #999999;
}
.my-order-time{
	padding-top: 20rpx;
}
.my-order-price{
	color: #000000 !important;
	font-weight: bold;
}
</style>
