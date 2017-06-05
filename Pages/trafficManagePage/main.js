/**
 * Created by cse on 2016/4/21.
 */
var ReactDom=require('react-dom');
var React=require('react');
require("../../ComComponents/extend_echart/line/factoryLine");
require("../../ComComponents/extend_echart/line/lineGradient");
require("../../ComComponents/extend_echart/bar/factorybar");
require("../../ComComponents/extend_echart/map/factoryMap");
require("../../ComComponents/list/factorylist");

//初始化reender
//杭州市拥堵指数分布图
var reactDistributionList=null;
fList.createList("DistributionList", function (distributionList) {
    window.screenUtil.ajax({
        url: "./test_data/list/crowdDistributionList.json",
        successfn: function (data) {
            reactDistributionList=ReactDom.render(distributionList({data:data}),t_crowd_distribution);
        }
    });
});
//杭州全城实时拥堵指数排名
var reactRankList=null;
fList.createList("RankList", function (RankList) {
    window.screenUtil.ajax({
        url: "./test_data/list/rankList.json",
        successfn: function (data) {
            reactRankList=ReactDom.render(RankList({data:data}),t_crowd_sort);
        }
    });
});
//运力数量统计
var reactNumList=null;
fList.createList("NumList", function (NumList) {
    window.screenUtil.ajax({
        url: "./test_data/list/runNumkList.json",
        successfn: function (data) {
            for(var i=0;i<3;i++){
                data[i].runnum=Math.round(Math.random()*100);
                data[i].count=100+Math.round(Math.random()*10100);
            }
            reactNumList=ReactDom.render(NumList({data:data}),t_run_num);
        }
    });
});
//过往七天运力趋势
fLine.createLine("xAxisLine",function(XAxisLine){
    window.screenUtil.ajax({
        url:"./test_data/line/weekTrend.json",
        successfn: function (data) {
            var week = new Date().getDay(); 
            console.log(week)
            var arr=data.xAxis.data;
            var dataarr=[];
            for(var i in data.series){
                dataarr=data.series[i];
            }
            dataarr=dataarr.data;
            for(var i=0;i<week;i++){
                arr.splice(arr.length,0,arr[0]);
                arr.shift();
                dataarr.splice(dataarr.length,0,dataarr[0]);
                dataarr.shift();
            }
            data.xAxis.data=arr;
            for(i in data.series){
                data.series[i].data=dataarr;
            }
            XAxisLine.showLine(data);
        }
    });
});


//实时刷新
var getAll=function(){
    //基础建设-公路
    fBar.createBar("stack",function(Bar){
        window.screenUtil.ajax({
            url:"./test_data/bar/roadStackBar.json",
            successfn: function (data) {
                var data=randomstack(data);
                Bar.showBar(data);
            }
        });
    });
    //基础建设-对外交通
    fBar.createBar("stack",function(Bar){
        window.screenUtil.ajax({
            url:"./test_data/bar/outTrafficStackBar.json",
            successfn: function (data) {
                var data=randomstack(data);
                Bar.showBar(data);
            }
        });
    });
    //基础建设-运行车辆
    fBar.createBar("stack",function(Bar){
        window.screenUtil.ajax({
            url:"./test_data/bar/runCarStackBar.json",
            successfn: function (data) {
                var data=randomstack(data);
                Bar.showBar(data);
            }
        });
    });
    //基础建设-停车场
    fBar.createBar("stack",function(Bar){
        window.screenUtil.ajax({
            url:"./test_data/bar/parkStackBar.json",
            successfn: function (data) {
                var data=randomstack(data);
                Bar.showBar(data);
            }
        });
    });
    //站点运力统计
    fMap.createMap("count",function(countPointMap){
        window.screenUtil.ajax({
            url:"./test_data/map/stationRunCountPointMap.json",
            successfn: function (data) {
                for(var i in data.data){
                    data.data[i].passengernum=data.data[i].passengernum-1000+parseInt(Math.random()*1000);
                }
                countPointMap.showMap(data);
            }
        });
    });
    //过往七天运力趋势
    // fLine.createLine("xAxisLine",function(XAxisLine){
    //     window.screenUtil.ajax({
    //         url:"./test_data/line/weekTrend.json",
    //         successfn: function (data) {
    //             var arr=data.xAxis.data;
    //             var dataarr=[];
    //             for(var i in data.series){
    //                 dataarr=data.series[i];
    //             }
    //             dataarr=dataarr.data;
    //             for(var i=0;i<count%8;i++){
    //                 arr.splice(arr.length,0,arr[0]);
    //                 arr.shift();
    //                 dataarr.splice(dataarr.length,0,dataarr[0]);
    //                 dataarr.shift();
    //             }
    //             data.xAxis.data=arr;
    //             for(var i in data.series){
    //                 data.series[i].data=dataarr;
    //             }
    //             XAxisLine.showLine(data);
    //         }
    //     });
    // });
    //杭州市拥堵指数走势图
    fLine.createLine("lineGradient",function(lineGradient){
        window.screenUtil.ajax({
            url:"./test_data/line/lineGradient.json",
            successfn: function (data) {
                var linearr=[];
                if(count%24>0){
                    for(var i=0;i<count%24;i++){
                        linearr.push(data.series[0].data[i])
                    }
                    data.series[0].data=linearr;
                }
                lineGradient.showLine(data);
            }
        });
    });
    //杭州市拥堵指数分布图
    window.screenUtil.ajax({
        url: "./test_data/list/crowdDistributionList.json",
        successfn: function (data) {
            data.sort(function(){return 0.5-Math.random();});
            for(var i in data){
                if(i==5){
                    data[i].state=1;
                }else{
                    data[i].state=5-i;
                }
            }
            reactDistributionList.getPath(data);
        }
    });
    //运力数量统计
    window.screenUtil.ajax({
        url: "./test_data/list/runNumkList.json",
        successfn: function (data) {
            for(var i=0;i<3;i++){
                data[i].runnum=data[i].runnum-50+parseInt(Math.random()*50);
            }
            reactNumList.updateScroller(data);
        }
    });
    //杭州全城实时拥堵指数排名
    window.screenUtil.ajax({
        url: "./test_data/list/rankList.json",
        successfn: function (data) {
            data.content=[];
            for(var i=0;i<3;i++){
                var obj=data.contentsource[parseInt(Math.random()*(2.5))+i*3];
                data.content.push(obj);
            }
            reactRankList.showdata(data);
        }
    });
    //设备情况-运管设备在线率
    fBar.createBar("stackIsometric",function(Bar){
        window.screenUtil.ajax({
            url:"./test_data/bar/transportOnlinestackIsometricBar.json",
            successfn: function (data) {
                var data=randomstackIsometric(data);
                Bar.showBar(data);
            }
        });
    });
    //设备情况-港航设备在线率
    fBar.createBar("stackIsometric",function(Bar){
        window.screenUtil.ajax({
            url:"./test_data/bar/pmbOnlinestackIsometricBar.json",
            successfn: function (data) {
                var data=randomstackIsometric(data);
                Bar.showBar(data);
            }
        });
    });
    //设备情况-公路设备在线率
    fBar.createBar("stackIsometric",function(Bar){
        window.screenUtil.ajax({
            url:"./test_data/bar/roadOnlinestackIsometricBar.json",
            successfn: function (data) {
                var data=randomstackIsometric(data);
                Bar.showBar(data);
            }
        });
    });
    count++;
}
function randomstackIsometric(data){
    for(var i in data.series[0].data){
        var num=Math.random();
        if(num<0.5){
            num+=0.5;
        }
        data.series[0].data[i]=Math.round(num*data.series[0].data[i]);
    }
    return data;
}
function randomstack(data){
    for(var i=0;i<data.yAxis.data.length-1;i++){
        var before=data.series[0].data[i]+parseInt(Math.random()*2*(count%10));
        var now=data.series[1].data[i]-parseInt(Math.random()*(count%10));
        if(!((before+now)>data.series[2].data[i]) && before>0 && now>0){
            data.series[0].data[i]=before;
            data.series[1].data[i]=now;
        }
    }
    return data;
}
var count=0;
var interval=5;
getAll();
setInterval(getAll, interval*1000);






