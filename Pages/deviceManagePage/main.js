/**
 * Created by cse on 2016/3/7.
 */
//require("./js/Jquery/jquery.min");
//require("./js/screen_util");
var ReactDom=require('react-dom');
var React=require('react');

require("../../ComComponents/extend_echart/pie/factoryPie");
require("../../ComComponents/extend_echart/bar/factorybar");
require("../../ComComponents/extend_echart/line/factoryLine");
require("../../ComComponents/extend_echart/map/factoryMap");
require("../../ComComponents/list/factorylist");
var fDays=require("../../ComComponents/monitorDays/factoryDays");
require("../../ComComponents/deviceMonitor/factoryMonitor");

var getAll=function(){
    count++;
    screenUtil.ajax({
        url: "config/deviceManageData.json",
        type:'post',
        data:{para:["twoCoachOneHazardousStatus",
        "devNumInFence",
        "devOnlineRate",
        "taxiResultData",
        "notDailyExcDevs",
        "taxiStatus", 
        "busStatus", 
        "shipBusNumChart", 
        "monitorday"]},
        successfn: function (alldata) {

       var monitorDayCount=alldata.monitorday;  //已监控天数
       var tbodan=alldata.twoCoachOneHazardousStatus; /*两客一危状态占比*/ 
       var devOnlineRate=alldata.devOnlineRate;/*设备在线率  + 设备在线率均值*/
       var notDailyExcDevs=alldata.notDailyExcDevs;/*设备异常情况 + 设备异常情况数量*/
       var devNumInFence=alldata.devNumInFence;//关注区域两客一危数
       var shipBusNumChart=alldata.shipBusNumChart; /*船舶和公交车数量波动图*/

       var taxiStatus=alldata.taxiStatus;/*出租车各状态占比*/
       var taxiResultData=alldata.taxiResultData;/*出租车空间分布*/
       var busStatus=alldata.busStatus; /*公交车运营情况*/
       

       //已监控天数
        fDays.createDays("monitorDays", function (monitorDays) {
            screenUtil.ajax({
                url: "./config/list/monitorDays.json",
                successfn: function (data) {
                    var newData=data;
                    //构造数据开始
                    monitorDayCount.day=monitorDayCount.day+count;
                    //构造数据结束
                    newData.monitorValue=monitorDayCount.day;
                    ReactDom.render(monitorDays({data:newData}),s_day_num);
                }
            });
        });

       /*两客一危状态占比*/ 
       fPie.createpie("highlight",function(hightPie){
            screenUtil.ajax({
                url: "./config/pie/hightLightPie.json",
                successfn: function (data) {
                    var newData=data;
                    //数据构造开始
                    tbodan.other=parseInt(Math.random()*40+40);
                    tbodan.offline=parseInt(Math.random()*20);
                    //数据构造结束
                    newData.series[0].data[0].value=tbodan.other;
                    newData.series[0].data[1].value=tbodan.offline;
                    hightPie.showPie(newData);
                }
            });
        });

       //关注区域两客一危数
       fList.createList("GraphList", function (GraphList) {
            screenUtil.ajax({
                url: "./config/list/graphList.json",
                successfn: function (data) {
                    var newData=data;
                    var areaArr=[];

                    $.each(devNumInFence,function(index,area){
                        //数据构造开始
                        area.quantity=parseInt(Math.random()*50+10);
                        //数据构造结束
                        areaArr.push({
                             areaName:area.areaName,quantity:area.quantity,id:"graph"+index
                        });

                    //var random=parseInt(Math.random()*100);
                    // areaArr.push({
                    //          areaName:area.areaName,quantity:random,id:"graph"+index
                    //     });
                    })
                    newData.content=areaArr;
                    ReactDom.render(GraphList({data:newData}),s_rate_area);
                }
            });
        });

       //船舶数量波动图
        fLine.createLine("highlightLine",function(highlightLine){
            screenUtil.ajax({
                url:"./config/line/hightLightLine.json",
                successfn: function (data) {
                    var newData=data;
                    var xAxis=shipBusNumChart.shipkey;
                    //数据构造开始
                    if(count%24>0){
                        var shipvaluearr=[];
                        for(var i=0;i<(count%24)*2;i++){
                            shipvaluearr.push(shipBusNumChart.shipvalue[i]);
                        }
                        shipBusNumChart.shipvalue=shipvaluearr;
                    }
                    //数据构造结束
                    var yAxis=shipBusNumChart.shipvalue;
                    newData.xAxis.data=xAxis;
                    newData.series[0].data=yAxis;
                    highlightLine.showLine(newData);
                }
            });
        });
        //公交车运载人数波动图
        fLine.createLine("highlightLine",function(highlightLine){
            screenUtil.ajax({
                url:"./config/line/LineBus.json",
                successfn: function (data) {
                    var newData=data;
                    //数据构造开始
                    if(count%24>0){
                        var busvaluearr=[];
                        for(var i=0;i<(count%24)*2;i++){
                            busvaluearr.push(shipBusNumChart.busvalue[i]);
                        }
                        shipBusNumChart.busvalue=busvaluearr;
                    }
                    //数据构造结束
                    var xAxis=shipBusNumChart.buskey;
                    var yAxis=shipBusNumChart.busvalue;
                    newData.xAxis.data=xAxis;
                    newData.series[0].data=yAxis;
                    highlightLine.showLine(data);
                }
            });
        });
        
       //设备在线率
       fBar.createBar("highlight",function(hightBar){
            screenUtil.ajax({
                url:"./config/bar/hightLightBar.json",
                successfn: function (data) {
                    var newData=data;
                    newData.xAxis.data=devOnlineRate.name;
                    //构造数据开始
                    devOnlineRate.value=[]
                    for(var i=0;i<devOnlineRate.name.length;i++){
                        devOnlineRate.value[i]=(Math.random()*60+40).toFixed(2);
                    }
                    //构造数据结束
                    newData.series[0].data=devOnlineRate.value;
                    hightBar.showBar(newData);
                }
            });
        });

       //设备在线率均值
        fMonitor.createMonitor("deviceMonitor", function (deviceMonitor) {
            screenUtil.ajax({
                url: "./config/list/averageMonitor.json",
                successfn: function (data) {
                    var newData=data;
                    var totalRate=devOnlineRate.totalRate;//在线率均值
                    newData.value=totalRate+'%';
                    ReactDom.render(deviceMonitor({data:newData}),s_average_monitor);
                }
            });
        });

        //设备异常情况
        fMap.createMap("highlight",function(highlightMap){
            screenUtil.ajax({
                url:"./config/map/hightLightMapError.json",
                successfn: function (data) {
                    var newData=data;
                    var deviceArr=[];
                    var devs=notDailyExcDevs.devs;
                    $.each(devs,function(index,device){
                        deviceArr.push(device);
                    })
                    //数据构造开始
                    deviceArr=getArrayItems(deviceArr,8);
                    deviceArr.sort(compare("sort")); 
                    //数据构造结束
                    newData.errordata=deviceArr;
                    highlightMap.showMap(newData);
                    highlightMap.showList(newData);
                }
            });
        });

        //设备异常数
        fMonitor.createMonitor("deviceMonitor", function (deviceMonitor) {
            screenUtil.ajax({
                url: "./config/list/abnormalDavice.json",
                successfn: function (data) {
                    var newData=data;
                    var devExceptionNum=notDailyExcDevs.devExceptionNum;
                    newData.value=devExceptionNum;
                    ReactDom.render(deviceMonitor({data:data}),s_abnormal_davice);
                }
            });
        });

        //出租车
        fPie.createpie("proport",function(proport){
            screenUtil.ajax({
                url: "./config/pie/proportionPie.json",
                successfn: function (data) {
                    var newData=data;
                    var zPercent=taxiStatus.online;//重车百分比
                    var kPercent=taxiStatus.stop;//空车百分比
                    var lPercent=taxiStatus.offline;//离线百分比
                    //构造数据开始
                    zPercent=parseInt(Math.random()*10)+55;
                    lPercent=parseInt(Math.random()*8)+1;
                    kPercent=100-zPercent-lPercent;
                    //构造数据结束

                    newData.content[0].percent=zPercent;
                    newData.content[1].percent=kPercent;
                    newData.content[2].percent=lPercent;

                    newData.content[0].data[0].value=zPercent;
                    newData.content[1].data[0].value=kPercent;
                    newData.content[2].data[0].value=lPercent;

                    newData.content[0].data[1].value=100-zPercent;
                    newData.content[1].data[1].value=100-kPercent;
                    newData.content[2].data[1].value=100-lPercent;
                    
                    ReactDom.render(proport({data:newData}),s_dev_proportion);
                }
            });
        });

        //出租车空间分布
        fMap.createMap("highlight",function(highlightMap){
            screenUtil.ajax({
                url:"./config/map/hightLightMapTaxi.json",
                successfn: function (data) {
                    var newData=data;
                    //数据构造开始
                    if(count%12>0){
                        var taxiResultDataarr=[];
                        for(var i=0;i<(count%12)*348;i++){
                            taxiResultDataarr.push(taxiResultData[i]);
                        }
                        taxiResultData=taxiResultDataarr;
                    }
                    //数据构造结束
                    newData.errordata=taxiResultData;
                    highlightMap.showMap(newData);
                }
            });
        });

        //公交车运营情况
        fList.createList("LineList", function (LineList) {
            screenUtil.ajax({
                url: "./config/list/LineList.json",
                successfn: function (data) {
                    var newData=data;
                    //数据构造开始
                    busStatus[0].quantity=parseInt(Math.random()*150+480);
                    busStatus[2].quantity=parseInt(Math.random()*5000+35000);
                    //数据构造结束
                    newData.content=busStatus;
                    ReactDom.render(LineList({data:newData}),s_bus_situation);
                }
            });
        });
    }
});

}

var count=0;  //循环次数
var interval=5;
getAll();
setInterval(getAll, interval*1000);



function getArrayItems(arr, num) {
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    var return_array = new Array();
    for (var i = 0; i<num; i++) {
        if (temp_array.length>0) {
            var arrIndex = Math.floor(Math.random()*temp_array.length);
            return_array[i] = temp_array[arrIndex];
            temp_array.splice(arrIndex, 1);
        } else {
            break;
        }
    }
    return return_array;
}

function compare(propertyName) { 
    return function (object1, object2) { 
        var value1 = object1[propertyName]; 
        var value2 = object2[propertyName]; 
        if (value2 < value1) { 
            return -1; 
        } 
        else if (value2 > value1) { 
            return 1; 
        } 
        else { 
            return 0; 
        } 
    } 
}