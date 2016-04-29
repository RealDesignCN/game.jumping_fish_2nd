/**
 * Created by zhaojm on 15/3/14.
 */

game.WelcomeScene = cc.Scene.extend({
    onEnter:function(){
        this._super();

        var layer = new game.WelcomeLayer();
        this.addChild(layer);

    },
});