/**
 * Created by zhaojm on 14/11/17.
 */
game.MyLoaderScene = cc.Scene.extend({

    onEnter: function () {
        var self = this;
        cc.Node.prototype.onEnter.call(self);

        var layer = new game.MyLoaderLayer();
        this.addChild(layer);
    },

});



