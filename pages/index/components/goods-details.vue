<template>
	<!-- 单个商品详情 -->
	<view class="details-back">
		<view class="goods-details coup-anim">
			<view class="goods-image">
				<image src="/static/tab/gouwuche.png" mode="aspectFill"></image>
				<image @click="toCloseDetail" src="/static/tab/guanbi.png" mode="widthFix"></image>
			</view>
			<view class="details-padd">
				<view class="details-name">{{detailItemData.item.name}}</view>
				<view class="details-Thinning">已售{{detailItemData.item.monthlySale}}</view>
				<view class="describe">
					<view class="details-unit-price">
						<text>¥</text>
						<text>{{detailItemData.item.unitPrice}}</text>
						<text>/{{detailItemData.item.unit}}</text>
					</view>
					<view class="details-quantity">
						<view @click="delCount(detailItemData)"><image src="/static/tab/jianhao.png"></image></view>
						<view><text >{{detailItemData.item.count}}</text></view>
						<view @click="addCount(detailItemData)"><image src="/static/tab/jia.png"></image></view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>

 defineProps({
	 detailItemData:{
		 type:Object,
		 default:{}
	 },
 })
const emits= defineEmits(["toCloseDetail",'addCount',"delCount"])
const addCount = ({item,index})=>{
	
	emits('addCount',item,index);
} 
const delCount = ({item,index})=>{
	emits('delCount',item,index);
}
const toCloseDetail = ()=>{
	emits('toCloseDetail');
}
</script>

<style scoped>
@import '../../../style/shadow.css';
.goods-image{
	width: 100%;
	height: 500rpx;
	position: relative;
}
.goods-image image:nth-child(1){
	display: block;
	width: 100%;
	height: 500rpx;
	border-top-left-radius: 20rpx;
	border-top-right-radius: 20rpx;
}
.goods-image image:nth-child(2){
	display: block;
	width: 50rpx;
	height: 50rpx;
	position: absolute;
	top: 20rpx;
	right: 20rpx;
	border-radius: 50%;
}
.details-padd{
	padding: 20rpx 20rpx 0 20rpx;
}
.describe{
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.details-quantity image{
	width: 50rpx;
	height: 50rpx;
	display: block;
}
.details-quantity{
	display: flex;
	align-items: center;
	width: 200rpx;
	justify-content: space-between;
}
.details-name{
	font-size: 35rpx;
	font-weight: bold;
}
.details-Thinning{
	font-size: 30rpx;
	color: #a4a4a4;
	padding: 20rpx 0;
}
.details-unit-price{
	font-size: 30rpx;
	color: #ec702d;
	display: flex;
	align-items: baseline;
}
.details-unit-price text:nth-child(2){
	font-size: 35rpx;
}
.details-unit-price text:nth-child(3){
	color: #999999 !important;
}
</style>
