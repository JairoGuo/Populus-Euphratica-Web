var timeago = require('timeago.js');


const filters = {

    changeTime(val) {
        let time = new Date(val); //先将接收到的json格式的日期数据转换成可用的js对象日期
        return timeago.format(time, 'zh_CN'); //转换成类似于几天前的格式
    },

    wordLimit(value, num) {
        const nums = num || '100';
        if (!value) return '';
        if (value.length > nums) {
            return value.slice(0, nums) + '...';
        }
        return value;

    },

    commentNum(value) {
        return value.length
    },
}



export default filters
