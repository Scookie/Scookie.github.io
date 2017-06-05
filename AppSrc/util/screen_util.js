/**
 * Created by cse on 2016/3/10.
 */
(function (exports,$) {
    var screenUtil={};
    var error_log=function(msg){
        throw new Error(msg);
    };
    var define=screenUtil.define=function(name,fn){
        if(arguments.length!==2){error_log(name+"define arguement must have two lenght");}
        if(typeof fn !=="function"){error_log(name+"fn must a function");}
        fn.call(fn,arguments);
    };
    /**
     *ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Õ¹ï¿½ï¿½ï¿½ó·½·ï¿½
     *
     * */
    screenUtil.develop= function (target, source) {
        if(arguments.length !=2){error_log("develop must have two arguements");}
        //if(!(target instanceof Object)){throw  new Error("target must a Object");}
        if(!(source instanceof Object)){error_log("source must a Object");}
        for(var key in source){
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
        return target;
    };
    /**
     * Map Class
     *
     * */
    define("Map Class",function () {
        var _defalut={size:0, _mapArry:[]};
        screenUtil.Map=function(){this._size=_defalut.size;this._map=_defalut._mapArry;};
        /*
         * develope
         * */
        screenUtil.develop(screenUtil.Map.prototype,{
            constructor:screenUtil.Map,
            put:function(key,value){
                var _map=this._map;
                for(var i= 0,len=_map.length;i<len;i++){
                    if(_map[i].key===key){
                        _map[i].value=value;
                        return;
                    }
                }
                var data={key:key, value:value};
                _map.push(data);
                this._size++;
            },
            getValue: function (key) {
                var _map=this._map;
                for(var i= 0,len=_map.length;i<len;i++){
                    if(_map[i].key===key){
                        return _map[i].value;
                    }
                }
                return null;
            },
            remove: function (key) {
                var _map=this._map;
                for(var i= 0,len=_map.length;i<len;i++){
                    if(_map[i].key==key){
                        //_map[i].splice(i,1);
                        _map.splice(i,1);
                        this._size--;
                        return;
                    }
                }
            },
            size: function () {
                return this._size;
            },

        });
    });
    /**
     * ajaxï¿½ï¿½×°
     * url ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Äµï¿½Ö?
     * data ï¿½ï¿½ï¿½Íµï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Ý£ï¿½ï¿½ï¿½ï¿½ï¿½æ´¢ï¿½ï¿½ï¿½ç£º{"date": new Date().getTime(), "state": 1}
     * async Ä¬ï¿½ï¿½Öµ: trueï¿½ï¿½Ä¬ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Â£ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Îªï¿½ì²½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Òªï¿½ï¿½ï¿½ï¿½Í¬ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ë½«ï¿½ï¿½Ñ¡ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Îª falseï¿½ï¿½
     * ×¢ï¿½â£¬Í¬ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½×¡ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Ã»ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½È´ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½É²Å¿ï¿½ï¿½ï¿½Ö´ï¿½Ð¡ï¿?
     * timeout Ä¬ï¿½ï¿½Öµï¿½ï¿½5000 ï¿½ï¿½Ê±Ê±ï¿½ï¿½
     * type ï¿½ï¿½ï¿½ï¿½Ê½("POST" ï¿½ï¿½ "GET")ï¿½ï¿½ Ä¬ï¿½ï¿½Îª "GET"
     * dataType Ô¤ï¿½Ú·ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Øµï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½ï¿½Í£ï¿½ï¿½ï¿½ï¿½Ãµï¿½ï¿½ç£ºxmlï¿½ï¿½htmlï¿½ï¿½jsonï¿½ï¿½text
     * successfn ï¿½É¹ï¿½ï¿½Øµï¿½ï¿½ï¿½ï¿½ï¿½
     * errorfn Ê§ï¿½Ü»Øµï¿½ï¿½ï¿½ï¿½ï¿½
     */
    screenUtil.ajax=function(obj){
        var async = obj.async?  obj.async:"true" ;
        var timeout=obj.timeout?  obj.timeout:5000;
        var type = obj.type?  obj.type:"get" ;
        var dataType = obj.dataType?  obj.dataType:"json";
        var data = obj.data? obj.data:null;
        var ajax=$.ajax({
            type: type,
            async: async,
            data: data,
            timeout: timeout,
            url: obj.url,
            dataType: dataType,
            success: function(d){
                obj.successfn(d);
                //if(layer){
                //    layer.close(index_layer);
                //}
            },
            complete: function(XMLHttpRequest, status) {
                //if(layer){
                //    layer.close(index_layer);
                //}
                //if (status == 'timeout') {
                //    ajax.abort();
                //    layer.alert("ï¿½ï¿½ï¿½ï¿½Ê±...");
                //}
                //else if (status == 'error' ||status == 'parsererror') {
                //    errorfn();
                //}
                //var sessionstatus=XMLHttpRequest.getResponseHeader("sessionstatus"); //Í¨ï¿½ï¿½XMLHttpRequestÈ¡ï¿½ï¿½ï¿½ï¿½Ó¦Í·ï¿½ï¿½sessionstatusï¿½ï¿½
                //if(sessionstatus=="timeout"){
                //    layer.alert("ï¿½ï¿½Â¼ï¿½ï¿½Ê±,ï¿½ï¿½ï¿½ï¿½ï¿½Âµï¿½Â¼ï¿½ï¿½",function(){
                //        window.location.href=$('base').attr('href').replace('ui/', '')+"user/login";
                //    });
                //}
            }
        });
    }
    screenUtil.getTimeStr=function(minute){
        var date_pro=function(str){
            str<10?str='0'+str:'';
            return str;
        }
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour=parseInt(minute/60);
        var minu=minute-hour*60;
        return date_pro(hour)+':'+date_pro(minu);
    }

    screenUtil.five_color = function(num){
        if(isNaN(num)||num===null||num===""||typeof(num)=="undefined"){
            return ['#ccc','未知状态'];
        }
        var color,statusChar;
        if (num>=0&&num<2) {
            color = '#34b000';
            statusChar='通畅';
        } else if (num>=2&&num<4) {
            color = '#278002';
            statusChar='基本通畅';
        } else if (num>=4&&num<6) {
            color = '#ff7e00';
            statusChar='轻度拥堵';
        }else if (num>=6&&num<8) {
            color = '#ff0024';
            statusChar='中度拥堵';
        }else if (num>=8&&num<=10) {
            statusChar='严重拥堵';
            color = '#cc001d';
        }else{
            color = '#ccc';
            statusChar='未知状态';
        }
        return [color,statusChar];
    };
    exports.screenUtil=screenUtil;
    //var
})(window,$);