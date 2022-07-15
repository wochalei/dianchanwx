<template>
	<!-- 购物车 -->
	<view>
		<view class="details-back" @click="toShowCart"></view>
		<view class="goods-details coup-anim">
			<view class="empty" @click="clearShopData">
				<image src="/static/tab/qingkong.svg" mode="widthFix"></image>
				<text>清空已点</text>
			</view>
			<!-- 商品列表 -->
			
			<view class="goods-list" v-for="(item) in shopCart">
				<view class="goods-list-image"><image src="/static/tab/gouwuche.png" mode="aspectFill"></image></view>
				<view class="goods-list-name">
					<view>{{item.name}}</view>
					<view class="list-text">
						<text>¥</text>
						<text>{{item.unitPrice * item.count}}</text>
					</view>
				</view>
				<view class="goods-quantity">
					<view @click="delCount(item)"><image src="/static/tab/jianhao.png" mode="widthFix"></image></view>
					<view>{{item.count}}</view>
					<view @click="addCount(item)"><image src="/static/tab/jia.png" mode="widthFix"></image></view>
				</view>
			</view>
			<view style="height: 100rpx;"></view>
		</view>
	</view>
</template>

<script setup>
defineProps({
	shopCart:{
		type: Array,
		defalut:[]
	}
})
const emits = defineEmits(["toShowCart",'addCount',"delCount","clearShopData"])
const toShowCart = ()=>{
	emits('toShowCart');
} 
const addCount = (item)=>{
	emits('addCount',item);
} 
const delCount = (item)=>{
	emits('delCount',item);
}
const clearShopData = ()=>{
	emits('clearShopData');
}
</script>

<style scoped>
@import '../../../style/shadow.css';
@import '../../../style/animat.css';
.empty image{
	width: 25rpx;
	height: 25rpx;
	display: block;
	padding-right: 10rpx;
}
.empty{
	font-size: 25rpx;
	color: #aaaaaa;
	height: 90rpx;
	border-bottom: 1rpx solid #f2f2f2;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin: 0 20rpx;
}
.goods-list-image image{
	display: block;
	width: 130rpx;
	height: 130rpx;
	border-radius: 10rpx;
}
.goods-quantity image{
	display: block;
	width: 50rpx;
	height: 50rpx;
}
.goods-quantity{
	display: flex;
	align-items: center;
	align-self: flex-end;
	width: 200rpx;
	justify-content: space-between;
}
.goods-list{
	display: flex;
	justify-content: space-between;
	padding: 0 20rpx;
	height: 130rpx;
	font-size: 30rpx;
	margin: 25rpx 0 45rpx 0;
}
.goods-list-name{
	flex: 1;
	position: relative;
	padding: 0 20rpx;
}
.list-text text{
	display: block;
}
.list-text{
	display: flex;
	align-items: center;
	position: absolute;
	bottom: 0;
}
.list-text text:nth-child(1){
	font-size: 25rpx;
	padding-right: 5rpx;
}
</style>
