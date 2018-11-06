
/**
 * @file 点击头部导航栏切换样式
 */

var Tab = (function(){
    var ObjProvite = (function(){
        return {
            _setPara: function(options){
                // 导航栏菜单列表
                this.tabList = options.tabList;
                // 索引，可选
                this.curIndex = options.curIndex || 0;
                // 事件类型
                this.evType = options.evType || 'click';
                // 回调函数
                this.callback = options.callback || null;

                if (!this.tabList){
                    throw new Error('组件传参有误~~~');
                }
            }
        };
    })();
    var Obj = function(options){
        if (this instanceof Obj){
            ObjProvite._setPara.call(this, options);
        } else {
            return new Obj(options);
        }
    };
    Obj.prototype = {
        constructor: Obj,
        // 入口
        install: function(){
            // 初始化菜单列表样式
            this.cutMenuStyle();
            this.bindEvevt();
        },
        // 切换菜单列表样式
        cutMenuStyle: function(){
            for (var i = 0; i < this.tabList.length; i++){
                this.tabList[i].children[0].className = '';
            }
            this.tabList[this.curIndex].children[0].className = 'nav-selected';
            // 追加节点，更改菜单列表样式
            this.appendLine(this.tabList[this.curIndex].children[0]);
        },
        // 绑定点击事件
        bindEvevt: function() {
            _this = this;
            for(var i = 0; i < this.tabList.length; i++) {
                this.tabList[i].index = i;
                this.tabList[i].addEventListener(_this.evType, function() {
                    _this.curIndex = this.index;
                    _this.cutMenuStyle();
                }, false)
            }
        },
        // 追加节点，更改菜单列表样式
        appendLine: function(parent) {
            var line = document.createElement('span')
            line.className = 'nav-selected-line';
            console.log(line)
            parent.appendChild(line);
        },
        update: function(options){
            ObjProvite._setPara.call(this, options);
        },
        remove: function(){
            // 释放内存
            for (var attr in this){
                this[attr] = null;
            }
        }
    };
    return Obj;
})();
