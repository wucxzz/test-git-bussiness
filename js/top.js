
/**
 * @file 点击按钮回到顶部，页面滚动处理头部样式
 */

var BackTop = (function() {
    var ObjProvite = (function() {
        return {
            _setPara: function(options) {
                // 按钮
                this.topObj = options.topObj;
                // 页面头部
                this.header = options.header;
                // 页面头部logo
                this.headChildLogo = options.headChildLogo || null;
                // 页面头部导航栏
                this.headChildNav = options.headChildNav || null;
                // 页面左侧导航栏
                this.aside = options.aside || null;
                // 事件类型
                this.evType = options.evType || 'click';
                // 回调函数
                this.callback = options.callback || null;

                if (!this.topObj || !this.header) {
                    throw new Error('组件传参有误~~~');
                }
            }
        };
    })();
    var Obj = function(options) {
        if (this instanceof Obj) {
            ObjProvite._setPara.call(this, options);
        } 
        else {
            return new Obj(options);
        }
    };
    Obj.prototype = {
        constructor: Obj,
        install: function() {
            this.headerDisplay();
            this.btnDisplay();
            this.bindEvent();
        },
        // 处理头部显示，页面滚动时头部高度改变
        headerDisplay: function() {
            var _this = this;
            window.addEventListener(_this.evType, function() {
                var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollT > 10){
                    _this.header.style.height = '64px';
                    _this.headChildLogo.style.paddingTop = '12px';
                    _this.headChildNav.style.marginTop = '23px';
                    _this.aside.style.top = '88px';
                }
                else {
                    _this.header.style.height = '84px';
                    _this.headChildLogo.style.paddingTop = '25px';
                    _this.headChildNav.style.marginTop = '33px';
                    _this.aside.style.top = '108px';
                }
            }, false)
        },
        // 处理按钮的显示与隐藏
        btnDisplay: function() {
            var _this = this;
            window.addEventListener(_this.evType, function() {
                var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
                if(scrollT > window.innerHeight) {
                    _this.topObj.style.display = 'block';
                }
                else {
                    _this.topObj.style.display = 'none';
                }
            }, false)
        },
        // 绑定点击事件
        bindEvent: function() {
            var _this = this;
            this.topObj.addEventListener('click', function() {
                document.documentElement.scrollTop = 0;
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
