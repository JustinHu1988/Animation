/**
 * Created by JustinHu on 10/24/16.
 */
'use strict';

/**
 * 预加载图片函数
 * @param images 加载图片的数组或者对象
 * @param callback 全部图片加载完毕后调用的回调函数
 * @param timeout 加载超时的时长
 */
function loadImage(images, callback, timeout) {
    //加载完成图片的计数器
    var count = 0;
    //全部图片加载成功的一个标志位
    var success = true;
    //超时timer的id
    var timeoutId = 0;
    //是否加载超时的标志位
    var isTimeout = false;

    //对图片数组（或对象）进行遍历
    for (var key in images) {
        //过滤prototype上的属性
        if (!images.hasOwnProperty(key)) {
            continue;
        }
        //获得每个图片元素
        //期望格式是个object: {src:xxx}
        var item = images[key];

        if (typeof item === 'string') {
            item = images[key] = {
                src: item
            };
        }

        //如果格式不满足期望，则丢弃此条数据进行下一次遍历
        if (!item || !item.src) {
            continue;
        }

        //计数+1
        count++;
        //设置图片元素的id
        item.id = '__img__' + key + getId();
        //设置图片元素的img，它是一个Image对象
        item.img = window[item.id] = new Image(); //window[item.id]：独一无二的id，用来给window创建每个img对象，用于完成后清理对象时引用。

        doLoad(item);
    }

    /**
     * 真正进行图片加载的函数
     * @param item 图片元素对象
     */
    function doLoad(item) {
        item.status = 'loading';

        var img = item.img;
        //定义图片加载成功的回调函数
        img.onload = function () {
            success = success && true; // 只有每次的success均为成功时，才算是最终成功。
            item.status = 'loaded';
            done();
        };
        //定义图片加载失败的回调函数
        img.onerror = function () {
            success = false;
            item.status = 'error';
            done();
        };

        //遍历完成如果计数为0，则直接调用callback。??这里是否有必要？如果遍历完成计数为0，似乎根本不会执行doLoad()函数，也就无法执行回调或者超时函数，应该在loadImage()函数中加入判断图片地址全部获取失败和一张图片也没有的情况下执行回调的判断??
        if (!count) {
            callback(success);
        } else if (timeout) {
            timeoutId = getTimeout(onTimeout, timeout);
        }

        //发起了一个http(s)的请求，图片在此步进行加载
        img.src = item.src;

        /**
         * 每张图片加载完成的回调函数
         */
        function done() {
            img.onload = img.onerror = null; // 解除事件绑定

            try {
                delete window[item.id];
            } catch (e) {

            }

            if (!--count && !isTimeout) { //检测条件前给count递减，当count为0且没有超时，条件为true
                clearTimeout(timeoutId); //清除计时器
                callback(success); //当所有图片都检测完毕，返回最终的success值给回调函数。
            }
        }
    }

    /**
     * 超时函数
     */
    function onTimeout(){
        isTimeout = true;
        callback(false);
    }
}

var __id = 0;
function getId() {
    return ++__id;
}

module.exports = loadImage;