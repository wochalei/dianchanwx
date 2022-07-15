import GoEasy from 'goeasy'
const goeasy = GoEasy.getInstance({
    host:"hangzhou.goeasy.io",  //若是新加坡区域：singapore.goeasy.io
    appkey:"BC-ef177634c5e643c3ab3f33fa6fa25811",
    modules:['pubsub']//根据需要，传入‘pubsub’或'im’，或数组方式同时传入
});

export{goeasy}