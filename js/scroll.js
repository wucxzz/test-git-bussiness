
/**
 * @file 点击左侧选项卡切换选项卡样式，页面滚动切换左侧选项卡
 */

var Scroll = (function() {
    var ObjProvite = (function() {
        return {
            _setPara: function(options){
                // 选项卡列表
                this.tabList = options.tabList;
                // 业务体系列表
                this.contentList = options.contentList;
                // 时间类型
                this.evType = options.evType || 'click';
                // 选项卡索引
                this.curIndex = options.curIndex || 0;
                // 回调函数
                this.callback = options.callback || null;
                // 业务体系列表长度
                this.contentLen = this.contentList.length;

                if (!this.tabList && !this.contentList) {
                    throw new Error('组件传参有误~~~');
                }
            }
        };
    })();
    var Obj = function(options) {
        if (this instanceof Obj) {
            ObjProvite._setPara.call(this, options);
        } else {
            return new Obj(options);
        }
    };
    Obj.prototype = {
        constructor: Obj,
        // 入口
        install: function() {
            // 初始化选项卡
            this.contentPosition();
            this.bindScrollEvent();
            this.bindEvevt();
        },
        // 切换选项卡样式
        cutTabStyle: function() {
            for (var i = 0; i < this.tabList.length; i++){
                this.tabList[i].className = '';
            }
            this.tabList[this.curIndex].className = 'selected';
        },
        // 绑定点击选项卡事件
        bindEvevt: function() {
            _this = this;
            for(var i = 0; i < this.tabList.length; i++) {
                this.tabList[i].index = i;
                this.tabList[i].addEventListener(_this.evType, function() {
                    _this.curIndex = this.index;
                    _this.cutTabStyle();
                }, false)
            }
        },
        // 绑定页面滚动切换选项卡事件
        bindScrollEvent: function() {
            _this = this;
            window.addEventListener('scroll', function() {
                for(var i = 0; i < _this.contentLen; i++) {
                    _this.contentList[i].index = i;
                    var that = _this.contentList[i];
                    var winTop = that.offsetTop - document.documentElement.scrollTop;
                    if(winTop < 80 && winTop > 0){
                        _this.curIndex = that.index;
                        _this.cutTabStyle();
                    }
                }
            }, false)
        },
        // 判断页面位置，初始化选项卡
        contentPosition: function() {
            var _this = this;
            window.addEventListener('load', function() {
                for(var i = 0; i < _this.contentLen; i++) {
                    _this.contentList[i].index = i;
                    var that = _this.contentList[i];
                    var winTop = that.offsetTop - document.documentElement.scrollTop;
                    if(winTop < 150){
                        _this.curIndex = that.index;
                        _this.cutTabStyle();
                    }
                }
                _this.cutTabStyle();
            }, false)
        },
        update: function(options) {
            ObjProvite._setPara.call(this, options);
        },
        remove: function() {
            // 释放内存
            for (var attr in this) {
                this[attr] = null;
            }
        }
    };
    return Obj;
})();
