/**
 * utils
 */

const utils = {
    /**
     * 获取页面宽度
     * @return {[type]} [description]
     */
    pageWidth: function() {
        return Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
    },

    /**
     * 获取页面高度
     * @return {[type]} [description]
     */
    pageHeight: function() {
        return Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
    },

    /**
     * 根据参数名获取URL数据
     * @param  {[type]} name [description]
     * @param  {[type]} url  [description]
     * @return {[type]}      [description]
     */
    getParameterByName: function(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    /**
     * 获取图片的Base64格式
     * @param  {[type]}   img      [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    getBase64: function(img, callback) {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    },
    
    /**
     * 百分比转换
     * @param  {[type]} num       [description]
     * @param  {[type]} precision [description]
     * @return {[type]}           [description]
     */
    percent: function(num, precision) {
        if (!num || num === Infinity) return 0 + '%';
        if (num > 1) num = 1;
        precision = precision ? precision : 2;
        precision = Math.pow(10, precision);
        return Math.round(num * precision * 100) / precision + '%'
    },

    getCssText: function(object) {
        var str = "";
        for (var attr in object) {
            str += attr + ":" + object[attr] + ";";
        }
        return str;
    },

    /**
     * 去除空串
     */
    trim: function(str) {
        return typeof str === 'string' ? str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '') : str;        
    }
}

export default utils