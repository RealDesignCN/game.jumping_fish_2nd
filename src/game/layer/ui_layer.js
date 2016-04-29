/**
 * Created by zhaojm on 15/3/18.
 */
game.UILayer = cc.Layer.extend({
    numScore : null,
    numHeart : null,

    //heartList : null,



    ctor:function(){
        this._super();
        cc.log("uilayer....ctor");
        this.initHeart(game._Globals.fish_type.heart);



        var coin = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('coin.png'));
        this.addChild(coin);
        coin.setAnchorPoint(cc.p(1, 0.5));
        coin.setPosition(cc.p(cc.winSize.width * 0.3, cc.winSize.height * 0.95));
        coin.setScale(0.5);

        this.numScore = cc.LabelTTF.create('00000', 'Arial', 12);
        this.numScore.setPosition(cc.p(coin.getPositionX() + 10, cc.winSize.height * 0.95));
        this.numScore.setAnchorPoint(cc.p(0, 0.5));
        this.addChild(this.numScore);


        var logoItem = new cc.MenuItemImage(res.logo_2_png, res.logo_2_png, res.logo_2_png, this.onLogo, this);

        if(game._Config.language == game._Enum.language.en){
            logoItem.setScale(0.3);
        }

        var menu = new cc.Menu(logoItem);
        //menu.alignItemsVertically();
        //menu.alignItemsHorizontally();
        this.addChild(menu);
        menu.setPosition(cc.p(0, 0));
        logoItem.setPosition(cc.p(cc.winSize.width * 0.85, cc.winSize.height * 0.93));



        var load_bar_bg = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('power_bg.png'));
        this.addChild(load_bar_bg);
        load_bar_bg.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.08));

        this._loadingBar = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('power_front.png'));
        this.addChild(this._loadingBar);
        this._loadingBar.setAnchorPoint(cc.p(0, 0.5));
        this._loadingBar.setPosition(cc.p(cc.winSize.width / 2 - this._loadingBar.getContentSize().width / 2, cc.winSize.height * 0.08));
        this._loadingBar.setScaleX(0);



    },

    onLogo:function(){

        if(game._Config.language == game._Enum.language.cn) {
            window.location.href = "http://www.59600.com";
        }else if(game._Config.language == game._Enum.language.en){
            window.location.href = "http://ookor.com";
        }
    },



    setScore:function(num){
        var score = num;
        var strScore = score + "";
        var l = strScore.length;

        var needZero = 5 - l;

        var result = '';
        for(var i = 0; i < needZero; i++){
            result += "0";
        }

        result += strScore;


        this.numScore.setString(result);
    },

    initHeart:function(num){

        this.numHeart = num;

        var heart = new cc.Sprite(cc.spriteFrameCache.getSpriteFrame('heart.png'));
        heart.setAnchorPoint(cc.p(1, 0.5));
        var startLeft = cc.winSize.width * 0.1;
        var defaultHeight = cc.winSize.height * 0.95;
        heart.setPosition(startLeft, defaultHeight);
        this.addChild(heart);
        heart.setScale(0.5);

        this.numHeart = cc.LabelTTF.create('X' + num, 'Arial', 12);
        this.numHeart.setPosition(cc.p(heart.getPositionX() + 10, cc.winSize.height * 0.95));
        this.numHeart.setAnchorPoint(cc.p(0, 0.5));
        this.addChild(this.numHeart);

    },

    setHeart:function(num){
        this.numHeart.setString('X' + num);
    },


    setPercent : function(percent){
        this._loadingBar.setScaleX(percent);
    },



});