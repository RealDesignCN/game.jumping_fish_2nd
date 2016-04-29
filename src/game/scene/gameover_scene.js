/**
 * Created by zhaojm on 15/3/15.
 */

game.GameOverScene = cc.Scene.extend({
    data:null,
    onEnter:function(){
        this._super();

        var layer = new game.GameOverLayer(this.data);
        this.addChild(layer);


    },

    setData:function(data){
        this.data = data;
    },
});