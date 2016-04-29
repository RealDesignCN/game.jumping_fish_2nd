/**
 * Created by zhaojm on 15/3/21.
 */

game.LoaderScene = cc.Scene.extend({
    _interval : null,
    _label : null,
    _className:"game.LoaderScene",

    init : function(){
        var self = this;

        var winSize = cc.winSize;

        var layer = new cc.LayerColor(new cc.Color(43, 43, 43));
        this.addChild(layer);


        cc.loader.load(loadingRes.loading_png, function(err, results){
            if(err){
                cc.log("Failed to load %s.", loadingRes.loading_png);
                return;
            }
            cc.log(loadingRes.loading_png + "--->");
            cc.log(results[0]);
            var logo = new cc.Sprite(loadingRes.loading_png);
            layer.addChild(logo);
            logo.x = winSize.width/2;
            logo.y = winSize.height/2;
        });


        return true;
    },

    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);
        self.schedule(self._startLoading, 0.3);
    },
    /**
     * custom onExit
     */
    onExit: function () {
        cc.Node.prototype.onExit.call(this);
        //var tmpStr = "Loading... 0%";
        //this._label.setString(tmpStr);
    },


    initWithResources: function (resources, cb) {
        if(cc.isString(resources))
            resources = [resources];
        this.resources = resources || [];
        this.cb = cb;
    },

    _startLoading: function () {
        var self = this;
        self.unschedule(self._startLoading);
        var res = self.resources;
        cc.loader.load(res,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                //self._label.setString("Loading... " + percent + "%");
            }, function () {
                if (self.cb)
                    self.cb();
            });
    }
});


game.LoaderScene.preload = function(resources, cb){
    var _game = game;
    if(!_game.loaderScene) {
        _game.loaderScene = new _game.LoaderScene();
        _game.loaderScene.init();
    }
    _game.loaderScene.initWithResources(resources, cb);

    cc.director.runScene(_game.loaderScene);
    return _game.loaderScene;
};