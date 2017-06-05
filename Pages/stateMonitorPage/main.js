/**
 * Created by cse on 2016/3/16.
 */
var ReactDom=require('react-dom');
var React=require('react');

require("../../ComComponents/extend_echart/line/factoryLine");
require("../../ComComponents/extend_echart/line/lineGradient");
require("../../ComComponents/extend_echart/bar/factorybar");
require("../../ComComponents/extend_echart/map/factoryMap");
require("../../ComComponents/extend_echart/pie/factoryPie");
require("../../ComComponents/extend_echart/pie/hightColorPie");
require("../../ComComponents/list/factorylist");

var ConPoints=require('../../ComComponents/list/congestionList/index.react');

//array polyfill for echart3 heatmap in old browser
var TA = require('typedarray');
if(!window.Uint8ClampedArray){
   window.Uint8ClampedArray=TA.Uint8ClampedArray; 
}

var isFirst=true;
var reactRankList=null;

var getAllData=function(){
    screenUtil.ajax({
            url: "config/stateMonitorData.json",
            data:{para:
                [
                "scatterdata",
                "realdata",
                "congestionpoint",
                "congestionpct",
                "indexrank",
                "linechart",
                "barchart"]},

            successfn: function(alldata) {
                //散点图数据
                var scatter=alldata.scatterdata;
                //数据构造开始
                if(count%12>0){
                    var scatterarr=[];
                    for(var i=0;i<(count%12)*31;i++){
                        scatterarr.push(scatter[i]);
                    }
                    scatter=scatterarr;
                }
                //数据构造结束
                fMap.createMap("highlight",function(highlightMap){
                    screenUtil.ajax({
                        url:"./config/map/hightLightMapTaxi.json",
                        successfn: function (data) {
                            var newData=data;
                            newData.errordata=scatter;
                            highlightMap.showMap(newData);
                        }
                    });
                });

                ////热力图数据
                //var heatdata=alldata.heatdata;
                //fMap.createMap("heat", function(highlightMap) {
                //        screenUtil.ajax({
                //            url: "./config/map/hangzhouCrowdHeatMap.json",
                //            successfn: function(configData) {
                //                var heatmapData = [];
                //                for(var i=0;i<heatdata.length;i++){
                //                    var heatPoint=heatdata[i];
                //                    heatmapData.push({
                //                        name: "",
                //                        lonlat: [heatPoint.lng, heatPoint.lat],
                //                        value: heatPoint.count
                //                    })
                //                }
                //                var newData=configData;
                //                newData.errordata = heatmapData;
                //                highlightMap.showMap(newData);
                //            }
                //        })
                //    });

                //排名
                var congestionIndexRankArr=alldata.indexrank.split(';');
                //构造数据开始
                var indexrankarr=["严重拥堵,上塘路-大关路-香积寺路,11.7;严重拥堵,延安路-西湖大道-高银街,11.0;严重拥堵,中河路-上仓桥路-望江路,12.0;严重拥堵,秋涛北路-凤起东路-庆春东路,11.5;严重拥堵,庆春路-浣纱路-中河中路,12.6",
                "严重拥堵,凤起东路-新塘路-秋涛北路,11.7;严重拥堵,秋涛路-杭海路-解放东路,12.2;中度拥堵,莫干山路-文二路-文一路,27.6;中度拥堵,莫干山路-文一路-教工路,26.5;中度拥堵,上塘路-德胜立交桥-潮王路,14.3",
                "严重拥堵,凤起路-建国北路-环城东路,11.7;严重拥堵,凤起东路-秋涛北路-新塘路,11.0;严重拥堵,天目山路-玉古路-万塘路,12.0;严重拥堵,秋涛北路-凤起东路-庆春东路,11.5;严重拥堵,天目山路-黄龙路-保俶路,10.2"
                ];
                congestionIndexRankArr=indexrankarr[Math.round(Math.random()*2)].split(';');
                //构造数据结束
                var content=[];
                $.each(congestionIndexRankArr,function(i,rank){
                    if(i<5){
                        if(rank){
                            var list=rank.split(',');
                            content.push({
                                name: list[1].split('-')[0],
                                roadName: list[1],
                                value:list[0]
                            })
                        }
                    }
                });
                var congestionIndexRankArr_option={
                    title: "杭州全城实时拥堵状态排名",
                    content:content
                }
                congestionIndexRankArr_option.limargin="8.5% 0";
                if(isFirst){
                    isFirst=false;
                    fList.createList("RankList", function (RankList) {
                        reactRankList=ReactDom.render(RankList({data:congestionIndexRankArr_option}),document.getElementById("s_crowd_sort"));
                    });
                }else{
                    congestionIndexRankArr_option.upymove=-536;
                    congestionIndexRankArr_option.downymove=650;
                    congestionIndexRankArr_option.tweentime=1;
                    reactRankList.showdata(congestionIndexRankArr_option);
                }

                //饼状图
                fPie.createpie("highColor",function(hightColor){
                    var congestionStatus=alldata.congestionpct.split(';');
                    //构造数据开始
                    var congestionpctarr=["222,0;191,0;82,0;28,0;17,0","182,0;111,0;66,0;55,0;38,0","255,0;91,0;50,0;14,0;7,0"];
                    congestionStatus=congestionpctarr[Math.round(Math.random()*2)].split(';');
                    //构造数据结束
                    window.screenUtil.ajax({
                        url: "./config/pie/hightColorPie.json",
                        successfn: function (data) {
                            var newData=data;
                            for(var i=0;i<congestionStatus.length;i++){
                                if(congestionStatus[i]){
                                    var value=parseInt(congestionStatus[i].split(',')[0]);
                                    newData.series[0].data[i].value=value;
                                }
                            }
                            hightColor.showPie(data);
                        }
                    });
                });

                //顶部状态列表
                fList.createList("StatusList", function (StatusList) {
                    screenUtil.ajax({
                        url: "./config/list/statusList.json",
                        successfn: function (data) {
                            var newData=data;
                            $.each(newData,function(i,indexdata){
                                if(indexdata.name=='拥堵指数'){
                                    //数据构造开始
                                    alldata.realdata.congestionIndex=(Math.random()+2.6).toFixed(1);
                                    //数据构造结束
                                    newData[i].value=alldata.realdata.congestionIndex;
                                    newData[i].unitName=screenUtil.five_color(newData[i].value)[1];
                                }
                                else if(indexdata.name=='总体流量'){
                                    //数据构造开始
                                    alldata.realdata.bulkFlow=parseInt(Math.random()*100000+2000000);
                                    //数据构造结束
                                    newData[i].value=alldata.realdata.bulkFlow;
                                }
                                else if(indexdata.name=='拥堵里程比例'){
                                    //数据构造开始
                                    alldata.realdata.congestionMileage=(Math.random()+4).toFixed(1);
                                    //数据构造结束
                                    newData[i].value=alldata.realdata.congestionMileage;
                                }
                                else if(indexdata.name=='平均行驶速度'){
                                    //数据构造开始
                                    alldata.realdata.avgSpeed=(Math.random()+30).toFixed(1);
                                    //数据构造结束
                                    newData[i].value=alldata.realdata.avgSpeed;
                                }
                            });
                            ReactDom.render(StatusList({data:newData}),document.getElementById("s_table_crowd"));
                        }
                    });
                });

                //颜色渐变折线图
                fLine.createLine("lineGradient",function(lineGradient){
                    var todayData=alldata.linechart.congestionIndexChart.split(';');
                    var lastData=alldata.linechart.pre_congestion_index.split(';');
                    //构造数据开始
                    if(count%24>0){
                        var linearr=[];
                        for(var i=0;i<(count%24)*12;i++){
                            linearr.push(todayData[i])
                        }
                        todayData=linearr;
                    }
                    //构造数据结束
                    screenUtil.ajax({
                        url:"./config/line/lineGradient.json",
                        successfn: function (data) {
                            var xAxis=[];
                            for(var i=0;i<288;i++){
                                var time=screenUtil.getTimeStr(i*5);
                                xAxis.push(time);
                            }
                            
                            var newData=data;
                            newData.xAxis.data=xAxis;
                            newData.series[0].data=todayData;
                            newData.series[1].data=lastData;
                            lineGradient.showLine(newData);
                        }
                    });
                });

                //拥堵点
                if(alldata.congestionpoint!=""){
                    var congestionTime=alldata.congestionpoint.split(';');
                    //数据构造开始
                    var congestionpointarr=["60,体育场路-凯旋路-环城东路,08:10-09:05;361,解放路-建国中路-中河中路,08:05-09:00;287,莫干山路-萍水东路-登云路,08:15-09:05;403,文一路-保俶北路-莫干山路,08:15-09:05",
                    "60,学院路-天目山路-文三路,09:10-09:45;361,凤起路-延安路-中河北路,08:45-09:20;287,莫干山路-萍水东路-登云路,08:15-09:05;403,庆春东路-钱江路-新塘路,08:15-09:05",
                    "60,文晖路-上塘路-建国北路,08:10-09:05;361,上塘路-登云路-大关路,08:05-09:00;287,庆春路-建国中路-中河中路,08:15-09:05;403,庆春路-环城西路-延安路,08:15-09:05"];
                    congestionTime=congestionpointarr[Math.round(Math.random()*2)].split(';');
                    //数据构造结束
                    var congestionArr=congestionTime.map(function(data,index){
                        return {roadname:data.split(',')[1],time:data.split(',')[2]}
                    });
                    ReactDom.render(<ConPoints conPoint={congestionArr}/>,document.getElementById("congestionPoints"));
                }
                

                //右侧三个柱状图
                fBar.createBar("radius",function(Bar){
                    window.screenUtil.ajax({
                        url:"./config/bar/aAreaRediusBar.json",
                        successfn: function (option) {
                            var areaIndexBar=alldata.barchart.areaIndexBar;//行政区域
                            option.xAxis.data=areaIndexBar.x;
                            //数据构造开始
                            radiusTestData(areaIndexBar.y1);
                            radiusTestData(areaIndexBar.y2);
                            //数据构造结束
                            option.series[0].data=areaIndexBar.y1;
                            option.series[1].data=areaIndexBar.y2;
                            console.log()
                            Bar.showBar(option);
                        }
                    });
                });
                fBar.createBar("radius",function(Bar){
                    window.screenUtil.ajax({
                        url:"./config/bar/iAreaRediusBar.json",
                        successfn: function (option) {
                            var cbdIndexBar=alldata.barchart.cbdIndexBar;//商圈
                            option.xAxis.data=cbdIndexBar.x;
                            //数据构造开始
                            radiusTestData(cbdIndexBar.y1);
                            radiusTestData(cbdIndexBar.y2);
                            //数据构造结束
                            option.series[0].data=cbdIndexBar.y1;
                            option.series[1].data=cbdIndexBar.y2;
                            Bar.showBar(option);
                        }
                    });
                });

                fBar.createBar("radius",function(Bar){
                    window.screenUtil.ajax({
                        url:"./config/bar/iRoadRediusBar.json",
                        successfn: function (option) {
                            var roadIndexBar=alldata.barchart.roadIndexBar;//路段
                            option.xAxis.data=roadIndexBar.x;
                            //数据构造开始
                            radiusTestData(roadIndexBar.y1);
                            radiusTestData(roadIndexBar.y2);
                            //数据构造结束
                            option.series[0].data=roadIndexBar.y1;
                            option.series[1].data=roadIndexBar.y2;
                            Bar.showBar(option);
                        }
                    });
                });

            }
        });
}

var count=0;  //循环的次数，用于构造数据
var timeInterval=5;//时间间隔
getAllData();
setInterval(function(){
    count++;
    getAllData();
}, timeInterval*1000);

//拥堵指数柱状图构造数据函数
function radiusTestData(data){
    for(var i in data){
        data[i]=Math.random()*10;
        data[i]=data[i].toFixed(2);
    }
}