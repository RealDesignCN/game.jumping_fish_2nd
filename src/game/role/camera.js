/**
 * Created by zhaojm on 15/3/31.
 */
//game.Camera = cc.Class.extend({
//    /**
//     * TODO
//     * 遇到问题，当camera声明为 {}时，advanced编译报错，
//     * 当camera声明为cc.Class.extend();将camera new为gameLayer的this._camera时，报错，好像被渲染了
//     * **/
//
//    _pos : null,
//    _parentObject : null,
//    _layer : null,
//    ctor:function(layer, obj){
//        //this._super();
//        this._layer = layer;
//        this._parentObject = obj;
//        this._pos = cc.p(0, 0);
//    },
//
//
//    //setFollowObject : function(object){
//    //    this._parentObject = object;
//    //},
//    //setLayer : function(layer){
//    //    this._layer = layer;
//    //},
//
//    update : function(dt){
//        //cc.log(this._parentObject);
//        var x = this._parentObject.getPositionX() - this._parentObject.getContentSize().width;
//        this._pos.x = x;
//        this._layer.setPositionX(- this._pos.x);
//        //this._layer.runAction(new cc.MoveTo(cc.p(-this._pos.x, 0), dt));
//    },
//
//});


game.Camera = function () {
    var winSize = cc.winSize;
    var centerPos = cc.p(0, 0);
    //var destPos = null;
    var listeners = [];
    var dirty = false;
    return {
        addListener: function (listener) {
            listeners.push(listener);
        },
        set x(x) {
            centerPos.x = x;
            dirty = true;
        },
        get x() {
            return centerPos.x;
        },
        set y(y) {
            centerPos.y = y;
            dirty = true;
        },
        get y() {
            return centerPos.y;
        },
        set pos(pos) {
            centerPos.x = pos.x;
            centerPos.y = pos.y;
            dirty = true;
        },
        get pos(){
            return centerPos;
        },
        update: function (dt) {
            if (dirty) {
                listeners.forEach(function (listener) {
                    listener(centerPos);
                });
                dirty = false;
            }
        }
    };
};