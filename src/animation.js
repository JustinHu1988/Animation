/**
 * Created by JustinHu on 10/24/16.
 */
'use strict';

var loadImage = require('./imageloader');

//初始化状态
var STATE_INITIAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;

//同步任务
var TASK_SYNC = 0;
//异步任务
var TASK_ASYNC = 1;

/**
 * 帧动画库类
 * @constructor
 */
function Animation() {
    this.taskQueue = [];
    this.index = 0;
    this.state = STATE_INITIAL;
}

/**
 * 添加一个同步任务，去预加载图片
 * @param imglist 图片数组
 */
Animation.prototype.loadImage = function (imglist) {
    var taskFn = function (next) {
        loadImage(imglist.slice(), next); //这里用slice()方法复制imglist数组，保持原数组数据不受改动
    };
    var type = TASK_SYNC;

    return this._add(taskFn, type);
};

/**
 * 添加一个异步定时任务，通过定时改变image标签的src属性，实现帧动画
 * @param ele dom对象
 * @param postions 北京位置数组
 * @param imageUrl 图片地址
 */
Animation.prototype.changePostion = function (ele, postions, imageUrl) {

};

/**
 * 添加一个异步定时任务，通过定时改变image标签的src属性，实现帧动画
 * @param ele image标签
 * @param imglist 图片数组
 */
Animation.prototype.changeSrc = function (ele, imglist) {

};

/**
 * 高级用法，添加一个异步定时执行的任务，
 * 该任务自定义动画每帧执行的任务函数
 * @param taskFn 自定义每帧执行的任务函数
 */
Animation.prototype.enterFrame = function (taskFn) {

};

/**
 * 添加一个同步任务，可以在上一个任务完成后执行回调函数
 * @param callback 回调函数
 */
Aniamtion.prototype.then = function (callback) {

};

/**
 * 开始执行任务 异步定义任务执行的间隔
 * @param interval
 */
Animation.prototype.start = function (interval) {
    if(this.state === STATE_START){
        return this;
    }
    //如果任务链中没有任务，则返回
    if(!this.taskQueue.length){
        return this;
    }
    this.state = STATE_START;
    this.interval = interval;
    this._runTask();
    return this;
};

/**
 * 添加一个同步任务，该任务就是回退到上一个任务中，
 * 实现重复上一个任务的效果，可以定义重复的次数
 * @param times 重复次数
 */
Animation.prototype.repeat = function (times) {

};

/**
 * 添加一个同步任务，相当于repeat()更友好的接口，无限循环上一次任务
 */
Animation.prototype.repeatForever = function () {

};

/**
 * 设置当前任务执行结束后 到下一个任务开始前的等待时间
 * @param time 等待时长
 */
Animation.prototype.wait = function (time) {

};

/**
 * 暂停当前异步定时任务
 */
Animation.prototype.pause = function () {

};

/**
 * 重新执行上一次暂停的异步任务
 */
Aniamtion.prototype.restart = function () {

};

/**
 * 释放资源
 */
Animation.prototype.dispose = function () {

};

/**
 * 添加一个任务到任务队列
 * @param taskFn 任务方法
 * @param type  任务类型
 * @private
 */
Animation.prototype._add = function(taskFn, type){ //方法命名前加下划线，表示方法是私有方法，用于类内部使用
    this.taskQueue.push({
        taskFn: taskFn,
        type: type
    });

    return this;
};

/**
 * 执行任务
 * @private
 */
Animation.prototype._runTask = function(){
    if(!this.taskQueue || this.state !== STATE_START){
        return;
    }
    //任务执行完毕
    if(this.index === this.taskQueue.length){
        this.dispose();
        return;
    }
    //获得任务链上的当前任务
    var task = this.taskQueue[this.index];
    if(task.type === TASK_SYNC){
        this._syncTask(task);
    } else {
        this._asyncTask(task);
    }
};

/**
 * 同步任务
 * @param task 执行的任务对象
 * @private
 */
Animation.prototype._syncTask = function(task){
    var me = this; //存储this对象，因为下面的内层函数初始this指向window，因此要想使用方法层的this对象，需要先用变量存储
    var next = function(){
        //切换到下一个任务
        me._next();
    };

    var taskFn = task.taskFn;
    taskFn(next);
};

/**
 * 异步任务
 * @param task 执行的任务对象
 * @private
 */
Animation.prototype._asyncTask = function(task){
    
}

/**
 * 切换到下一个任务
 * @private
 */
Animation.prototype._next = function(){
    this.index++;
    this._runTask();
};
