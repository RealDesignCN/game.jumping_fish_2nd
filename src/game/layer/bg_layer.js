/**
 * Created by zhaojm on 15/3/30.
 */
game.BGLayer = cc.Layer.extend({

    backgroundImgList:null,


    backgroundList : null,


    ctor:function(imgList){
        this._super();
        var size = cc.winSize;

        this.backgroundList = [];

        this.backgroundImgList = imgList;


        for(;;){
            var w = this.addOneBackground();
            if( this.backgroundList.length * w >= size.width * 2 && this.backgroundList.length >= 2){
                break;
            }
        }

        var self = this;

        game._Camera.addListener(function (pos) {
            var eyeX = pos.x, eyeY = pos.y;
            self.refresh(eyeX, eyeY);
            self.setPosition(-eyeX, -eyeY);
        });




        //this.scheduleUpdate();
        //this.schedule(this.checkBg, 1);
    },

    addOneBackground:function(){
        //cc.log('addOneBackground');

        var bg = null;
        if(this.backgroundList.length == 0){

            bg = this.createBackgroundByIndex(0);

            bg.setPosition(cc.p(0, 0));

        }else{

            var lastBackground = this.backgroundList[this.backgroundList.length - 1];
            var lastIndex = lastBackground.backgroundImgIndex;
            lastIndex = (lastIndex + 1) % this.backgroundImgList.length;
            bg = this.createBackgroundByIndex(lastIndex);
            bg.setPosition(cc.p(lastBackground.getPositionX() + lastBackground.getContentSize().width - 2 , 0));
        }
        this.addChild(bg, 1);
        this.backgroundList.push(bg);


        return bg.getContentSize().width;
    },

    createBackgroundByIndex:function(index){

        var bg = new cc.Sprite(this.backgroundImgList[index]);

        bg.setAnchorPoint(cc.p(0, 0));
        bg.backgroundImgIndex = index;
        return bg;
    },

    refresh:function(eyeX, eyeY){
        //this._super(dt);
        var size = cc.winSize;
        while(true){

            if(this.backgroundList[0].getPositionX() + this.backgroundList[0].getContentSize().width  <= eyeX - 100){
                //cc.log('removeBackground');
                //this.removeChild(this.backgroundList[0]);
                var bg = this.backgroundList[0];

                this.backgroundList.splice(0, 1);

                var lastbg = this.backgroundList[this.backgroundList.length - 1];
                bg.setPositionX(lastbg.getPositionX() + lastbg.getContentSize().width  - 2);

                this.backgroundList.push(bg);
                //this.addOneBackground();

            }else{
                break;
            }
        }

    },
});