/**
 * Created by zhaojm on 15/3/31.
 */
game.MosterGenerator = cc.Class.extend({
    _layer : null,

    _timeInterval : null,

    _mosterArr : null,
    ctor:function(layer){
        this._layer = layer;
        this._mosterArr = [];
        this._timeInterval = this._getTimeInterval();
    },
    _getTimeInterval :function(){
        var max = 4;
        var min = 1;
        return Math.random() * (max - min) + min;
    },

    generate : function(){

        var x = game._Camera.x + cc.winSize.width + 100;
        var max_y = cc.winSize.height * game._Config.walter_height_percent;
        var min_y = cc.winSize.height * 0.2;
        var y = Math.random() * (max_y - min_y) + min_y;


        var moster = new game.Moster(x, y);
        this._mosterArr.push(moster);
        this._layer.addRole(moster);

    },

    update : function(dt){
        this._timeInterval -= dt;
        //cc.log(this._timeInterval);
        if(this._timeInterval < 0){
            this._timeInterval = this._getTimeInterval();
            this.generate();
        }

        // TODO 删除判断
        var i = 0;
        while(1){
            if(i >= this._mosterArr.length){
                break;
            }
            var moster = this._mosterArr[i];
            if(moster.getPosition().x < game._Camera.x){
                moster.removeFromLayer();
                this._mosterArr.remove(moster);
            }else{
                i++;
            }
        }



    },

});