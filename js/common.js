/**
 * Created by Administrator on 2016/7/27.
 */
/**
 * Created by Administrator on 2016/7/21.
 *
 * 次文件来自  很牛x的程序员 .
 *
 * 作者:无名
 */

/*
 * 该函数是返回的是指定格式的日期,是字符串类型
 * 参数:date ----日期
 * 返回值: 字符串类型的日期
 * */
function getDatetoString(date) {
    var strDate;//存储日期的字符串
    //获取年
    var year=date.getFullYear();
    //获取月
    var month=date.getMonth()+1;
    //获取日
    var day=date.getDate();
    //获取小时
    var hour=date.getHours();
    //获取分钟
    var minute=date.getMinutes()
    //获取秒
    var second=date.getSeconds();
    hour=hour<10?"0"+hour:hour;
    minute=minute<10?"0"+minute:minute;
    second=second<10?"0"+second:second;
    //拼接
    strDate=year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;//隐藏问题,关于变量声明的位置
    return strDate;
}

//根据id获取元素对象
function my$(id) {
    return document.getElementById(id);
}

//获取任意一个元素的任意一个属性的当前的值---当前属性的位置值
function getStyle(element, attr) {
    return window.getComputedStyle ? window.getComputedStyle(element, null)[attr] : element.currentStyle[attr] || 0;
}

//为任意的一个元素,绑定任意的一个事件
function addEventListener(element, type, fn) {
    //判断浏览器是否支持这个方法
    if (element.addEventListener) {
        element.addEventListener(type, fn, false);
    } else if (element.attachEvent) {
        element.attachEvent('on' + type, fn);
    } else {
        element['on' + type] = fn;
    }
}

//为任意的一个元素,解绑任意的一个事件
function removeEventListener(element,type,fnName) {
    //判断浏览器是否支持
    if(element.removeEventListener){
        element.removeEventListener(type,fnName,false);
    }else if(element.detachEvent){
        element.detachEvent('on'+type,fnName);
    }else{
        element['on'+type]=null;
    }
}

//匀速动画函数
function animateSpeed(element, target) {
    //先干掉定时器
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        //获取元素的当前的位置:offsetLeft
        var current = element.offsetLeft;
        //每次移动的步数
        var step = 10;
        //如果当前的位置小于目标位置则走正数,否则负数
        step = current < target ? step : -step;
        //现在的位置
        current += step;
        //判断是否到达目标了
        if (Math.abs(current - target) > Math.abs(step)) {
            element.style.left = current + 'px';
        } else {
            clearInterval(element.timeId);//bug
            element.style.left = target + 'px';
        }
    }, 10);
}

//缓动动画函数
/**
 * 缓动动画函数
 * @param element---任意的一个元素对象
 * @param json----键值对对象----样式属性:值
 * @param fn--函数,需要就传函数,不需要就不传
 */
function animate(element, json, fn) {
    clearInterval(element.timeId);//清理定时器
    //定时器,返回的是定时器的id
    element.timeId = setInterval(function () {
        var flag = true;//默认,假设,全部到达目标
        //遍历json对象中的每个属性还有属性对应的目标值
        for (var attr in json) {
            //判断这个属性attr中是不是opacity
            if (attr == "opacity") {
                //获取元素的当前的透明度,当前的透明度放大100倍
                var current = getStyle(element, attr) * 100;
                //目标的透明度放大100倍
                var target = json[attr] * 100;
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;//移动后的值
                element.style[attr] = current / 100;
            } else if (attr == "zIndex") { //判断这个属性attr中是不是zIndex
                //层级改变就是直接改变这个属性的值
                element.style[attr] = json[attr];
            } else {
                //普通的属性
                //获取元素这个属性的当前的值
                var current = parseInt(getStyle(element, attr));
                //当前的属性对应的目标值
                var target = json[attr];
                //移动的步数
                var step = (target - current) / 10;
                step = step > 0 ? Math.ceil(step) : Math.floor(step);
                current += step;//移动后的值
                element.style[attr] = current + "px";
            }
            //是否到达目标
            if (current != target) {
                flag = false;
            }
        }
        if (flag) {
            //清理定时器
            clearInterval(element.timeId);
            //所有的属性到达目标才能使用这个函数,前提是用户传入了这个函数
            if (fn) {
                fn();
            }
        }
    }, 20);
}

//封装到对象中
//封装事件参数对象,,可视区域的横坐标,获取页面向上卷曲出去的距离,获取相对于页面的纵坐标
var Evt = {
    //封装事件参数对象
    getEvt: function (e) {
        return window.event || e;
    },
    //可视区域的横坐标
    getClientX: function (e) {
        return this.getEvt(e).clientX;
    },
    //可视区域的纵坐标
    getClientY: function (e) {
        return this.getEvt(e).clientY;
    },
    //获取页面向上卷曲出去的距离
    getScrollTop: function () {
        return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    },
    //获取页面向左卷曲出去的距离
    getScrollLeft: function () {
        return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
    },
    //如果浏览器支持pageY,那么就用pgeY,否则就是:向上卷曲出去的距离+可视区域的纵坐标
    //获取相对于页面的纵坐标
    getPageY: function (e) {
        return this.getEvt(e).pageY ? this.getEvt(e).pageY : this.getScrollTop() + this.getClientY(e);
    },
    //获取相对于页面的横坐标
    getPageX: function (e) {
        return this.getEvt(e).pageX ? this.getEvt(e).pageX : this.getScrollLeft() + this.getClientX(e);
    }

};

/*
 * innerText属性IE中支持
 * textContent火狐中支持
 *设置innerText属性的值
 * element-----为某个元素设置属性值
 * content-----设置的值
 * */
function setInnerText(element,content) {
    if(typeof element.textContent==="undefined"){
        //IE浏览器
        element.innerText=content;
    }else{
        element.textContent=content;
    }
}

/*
 * 获取innerText属性的值
 * element 要获取的元素
 * 返回的是该元素的innerText值
 * */
function getInnerText(element) {
    if(typeof element.textContent==="undefined"){
        //IE浏览器
        return element.innerText;
    }else{
        return element.textContent;
    }
}

//获取当前元素前一个元素
function getPreviousElement(element) {
    if(element.previousElementSibling){
        return element.previousElementSibling;
    }else{
        var ele=element.previousSibling;
        while (ele&&ele.nodeType!==1){
            ele=ele.previousSibling;
        }
        return ele;
    }
}
//获取当前元素的后一个元素
function getNextElement(element) {
    if(element.nextElementSibling){
        return element.nextElementSibling;
    }else{
        var ele=element.nextSibling;
        while(ele&&ele.nodeType!==1){
            ele=ele.nextSibling;
        }
        return ele;
    }
}

//获取父元素中的第一个元素
function getFirstElementByParent(parent) {
    if(parent.firstElementChild){
        return parent.firstElementChild;
    }else{
        var ele=parent.firstChild;
        while (ele&&ele.nodeType!==1){
            ele=ele.nextSibling;
        }
        return ele;
    }
}
//获取父元素中的最后一个元素
function getLastElementByParent(parent) {
    if(parent.lastElementChild){
        return parent.lastElementChild;
    }else{
        var ele=parent.lastChild;
        while(ele&&ele.nodeType!==1){
            ele=ele.previousSibling;
        }
        return ele;
    }
}

//获取兄弟元素
function getsiblings(ele) {
    if(!ele)return;//判断当前的ele这个元素是否存在
    var elements=[];//定义数组的目的就是存储当前这个元素的所有的兄弟元素
    var el=ele.previousSibling;//当前元素的前一个节点
    while (el){
        if (el.nodeType===1){//元素
            elements.push(el);//加到数组中
        }
        el=el.previousSibling;
    }
    el=ele.nextSibling;
    while(el){
        if(el.nodeType===1){
            elements.push(el);
        }
        el=el.nextSibling;
    }
    return elements;
}
//    //能力检测多个浏览器为同一个对象注册多个事件
var EventTools= {
    //为对象添加注册事件
    addEventListener: function (element, eventName, listener) {
        if (element.addEventListener) {
            element.addEventListener(eventName, listener, false);
        } else if (element.attachEvent) {
            element.attachEvent("on" + eventName, listener)
        } else {
            element["on" + eventName] = listener;
        }
    },
    //为对象移除事件
    removeEventListener: function (element, eventName, listener) {
        if (element.removeEventListener) {
            element.removeEventListener(eventName, listener, false);
        } else if (element.detachEvent) {
            element.detachEvent("on" + eventName, listener);
        } else {
            element["on" + eventName] = null;
        }
    },
    //获取参数e
    getEvent: function (e) {
        return e || window.event;
    },
    getPageX: function (e) {
        if (e.pageX) {
            return e.pageX;
        } else {
            //有的浏览器把高度设计在了文档的第一个元素中了
            //有的浏览器把高度设计在了body中了
            //document.documentElement.scrollTop;//文档的第一个元素
            //document.body.scrollTop;
            var scrollLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
            return e.clientX + scrollLeft;
        }
    },
    getPageY: function (e) {
        if (e.pageY) {
            return e.pageY;
        } else {
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            return e.clientY + scrollTop;
        }
    }
};



