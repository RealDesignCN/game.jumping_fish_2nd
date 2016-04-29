/**
 * Created by zhaojm on 15/3/31.
 */
game.CoinGenerator = cc.Class.extend({
    _layer : null,

    _timeInterval : null,
    _coinArr : null,
    ctor:function(layer){
        this._layer = layer;
        this._coinArr = [];

        this._timeInterval = this._getTimeInterval();
    },

    _getTimeInterval :function(){
        var max = 2;
        var min = 0.5;
        return Math.random() * (max - min) + min;
    },

    update : function(dt){
        this._timeInterval -= dt;
        //cc.log(this._timeInterval);
        if(this._timeInterval < 0){
            this._timeInterval = this._getTimeInterval();
            this.generateMatrix();
        }

        // TODO 删除超出边界的coin
        var i = 0;
        while(1){
            if(i >= this._coinArr.length){
                break;
            }
            var coin = this._coinArr[i];
            if(coin.getPosition().x < game._Camera.x){
                coin.removeFromLayer();
                this._coinArr.remove(coin);
            }else{
                i++;
            }
        }



    },

    generateCoin : function(matrix_origin_x, matrix_origin_y, x, y){
        var coin = new game.Coin(matrix_origin_x, matrix_origin_y, x, y, this);

        this._layer.addRole(coin);
        this._coinArr.push(coin);
    },


    generateMatrix : function(){

        var matrix_origin_x = game._Camera.x + cc.winSize.width + 100;
        var max_y = cc.winSize.height * game._Config.walter_height_percent;
        var min_y = cc.winSize.height * 0.2;
        var matrix_origin_y = Math.random() * (max_y - min_y) + min_y;

        var matrix = this.getMatrix();

        var numlist = matrix.numlist;
        var x = matrix.x;
        //var y = this._matrix.y;
        var y = 0;

        var zero = 0;
        for(var i = numlist.length - 1; i >= 0; i--){
            if(y < matrix.y) {
                if(x == 0) {
                    x = matrix.x;
                    y++;
                }

                //cc.log('x=', x, 'y=', y, 'i=', i);
                // TODO 判断 并 显示 numlist[i]
                // 坐标 (x, y)
                if(numlist[i] == 1){
                    this.generateCoin(matrix_origin_x, matrix_origin_y, x, y);
                }else{
                    zero++;
                    //cc.log('zero=', zero);
                }
                x--;

            }else {
                //cc.log('y <= 0');
                break;
            }
        }
    },

    getMatrix : function(){
        var index = Math.floor(Math.random() * 10 );
        return game._Config.getCoinMatrix(index);
    },

});