/**
 * Created by JustinHu on 10/25/16.
 */
'use strict';

var DEFAULT_INTERVAL = 1000 / 60;

//初始化状态
var STATE_INITIAL = 0;
//开始状态
var STATE_START = 1;
//停止状态
var STATE_STOP = 2;

/**
 * raf
 */
var requestAnimationFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (callback) {
            return window.setTimeout(callback, callback.interval || DEFAULT_INTERVAL);
        };
})(); //用立即执行函数包裹，是对取值的一种优化，（在这种情况下，不必再每次取值时都进行判断） ??为什么??

var cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame ||
        window.oCancelAnimationFrame ||
        function (id) {
            return clearTimeout(id);
        }
})();

/**
 * Timeline 时间轴类
 * @constructor
 */
function Timeline() {

}

/**
 * 时间轴上每一次回调执行的函数
 * @param time 从动画开始到当前执行的时间
 */
Timeline.prototype.onenterframe = function (time) {

};

/**
 * 动画开始
 * @param interval 每一次回调的间隔时间
 */
Timeline.prototype.start = function (interval) {
    if (this.state === STATE_START)
        return;
    this.state = STATE_START;

    this.interval = interval || DEFAULT_INTERVAL;
    startTimeline(this, +new Date()); //new Date().getTime()的优化写法 ??为什么??
};

/**
 * 动画停止
 */
Timeline.prototype.stop = function () {

};

/**
 * 重新开始动画
 */
Timeline.prototype.restart = function () {

};

/**
 * 时间轴动画启动函数
 * @param timeline 时间轴的实例
 * @param startTime 动画开始时间戳
 */
function startTimeline(timeline, startTime) {
    
}