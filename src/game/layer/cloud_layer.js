/**
 * Created by zhaojm on 15/3/30.
 */
game.CloudLayer = cc.Layer.extend({

    _barrierList : null,

    _timeCount : null,

    //_defaultTime : 0.1,

    ctor:function(){
        this._super();

        this._barrierList = [];
        //this._timeCount = 0;

        var size = cc.winSize;

        //that = this;


        for(;;){
            var barrier = this.addOneBarrier();
            if(barrier.getPositionX() > size.width){
                break;
            }
        }

        //this.scheduleUpdate();
        this.schedule(this.checkCloud, 3);
    },

    checkCloud:function(){
        //this._super();
        //this._timeCount += 2;

        //if(this._timeCount >= this._defaultTime){
            // TODO 检查 障碍物的 删除和创建
            if(this._barrierList[this._barrierList.length - 1].getPositionX() + this.parent.getPositionX() < cc.winSize.width + 10){
                this.addOneBarrier();
            }
            while(true){

                if(this._barrierList[0].getPositionX() + this._barrierList[0].getContentSize().width <= -this.parent.getPositionX()){
                    //cc.log('removeBarrier');
                    this.removeChild(this._barrierList[0]);

                    this._barrierList.splice(0, 1);

                }else{
                    break;
                }
            }


        //}




    },



    addOneBarrier:function(){
        //cc.log('addOneBarrier');

        var barrier = this.createOneBarrier();


        if(this._barrierList.length == 0){
            barrier.setPositionX(0);
        }else{
            var lastBarrier = this._barrierList[this._barrierList.length - 1];
            barrier.setPositionX(lastBarrier.getPositionX() + lastBarrier.getContentSize().width + game.ConfigHelper.getCloudInterval());
        }

        this.addChild(barrier);
        this._barrierList.push(barrier);

        return barrier;
    },


    createOneBarrier:function() {

        //return new game.BaseBarrier();
        var type = this.getBarrierType();
        var sprite = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('yun/' + type + '.png'));
        sprite.setAnchorPoint(cc.p(0.5, 0));
        switch (type){
            case 0:
                sprite.setPositionY(cc.winSize.height * game.Config.walter_height_percent);
                break;
            case 1:
                sprite.setPositionY(cc.winSize.height * (game.Config.walter_height_percent + 0.15));
                break;
            case 2:
                sprite.setPositionY(cc.winSize.height * (game.Config.walter_height_percent + 0.25));
                break;
            default:break;
        }

        return sprite;



    },

    getBarrierType : function(){
        return Math.floor(Math.random()*3);  // 0-2
    },


});