var option1={
    "title": {
        "text": "杭州市拥堵指数走势图",
        "left": "left",
        "textStyle": {
            "color": "#fff",
            "fontFamily": "微软雅黑",
            "fontWeight": 200,
            "fontSize": 20
        }
    },
    "tooltip": {
        "trigger": "axis"
    },
    "xAxis": {
        "type": "category",
        "boundaryGap": false,
        "splitLine": {
            "show": false
        },
        "axisTick": {
            "show": false
        },
        "axisLabel": {
            "interval": 1
        },
        "data":["0:00","1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"]
    },
    "yAxis": [
        {
            "type": "value",
            "axisLine": {
                "show": false
            },
            "axisTick": {
                "show": false
            },
            "splitLine": {
                "show": false
            },
            "max": 10
        }
    ],
    "grid": {
        "left": "1%",
        "right": "5%",
        "bottom": "3%",
        "containLabel": true
    },
    "series": [
        {
            "name": "当天拥堵指数",
            "type": "line",
            "smooth": true,
            "markPoint": {
                "data": [
                    {
                        "type": "max",
                        "name": "最高值"
                    }
                ]
            },
            "markLine": {
                "lineStyle": {
                    "normal": {
                        "color": "#ff0000"
                    }
                },
                "data": [
                    [
                        {
                            "coord": [
                                0,
                                6
                            ]
                        },
                        {
                            "coord": [
                                287,
                                6
                            ]
                        }
                    ]
                ]
            },
            "lineStyle": {
                "normal": {
                    "width": 4,
                    "color":{
                    	"x":0,"y":0,"x2":0,"y2":1,
                    	"colorStops":[{"offset":0,"color":"#db0302"},{"offset":0.5,"color":"#efff12"},{"offset":1,"color":"#1bab30"}]
                    }
                }
            },
            "areaStyle": {},
            "showSymbol": false,
            "data": [0.8,1.5,2,3.2,4.1,5.6,6.3,6.5,7,7.1,6.2,5.5,4.9,5.1,4.2,5.1,6.1,7.4,6.1,5.5,3.3]
        },
        {
            "name": "上周同期拥堵指数",
            "type": "line",
            "smooth": true,
            "markPoint": {},
            "markLine": {
                "lineStyle": {
                    "normal": {
                        "color": "#ff0000"
                    }
                },
                "data": [
                    [
                        {
                            "coord": [
                                0,
                                6
                            ]
                        },
                        {
                            "coord": [
                                287,
                                6
                            ]
                        }
                    ]
                ]
            },
            "lineStyle": {
                "normal": {
                    "width": 0
                }
            },
            "areaStyle": {
                "normal": {
                    "color": "#14276e",
                    "opacity": 0.8
                }
            },
            "showSymbol": false,
            "data":[0.6,1.1,1.6,2.4,3.6,4.2,5,5.6,6.9,7.2,6.3,5.8,5.5,4.6,5.2,5,6.5,7.5,6.7,5.4,3.9,2.5,1.2,1.1]
        }
    ]
};
var charts1=echarts.init(document.getElementById("t_crowd_trend"));
charts1.setOption(option1);