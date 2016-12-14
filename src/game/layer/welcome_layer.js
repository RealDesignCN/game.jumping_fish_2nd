/**
 * Created by zhaojm on 15/3/30.
 */
game.WelcomeLayer = cc.Layer.extend({

    _fishItemList : null,
    _fishHeart : null,

    _spriteSheet : null,

    ctor:function(){
        this._super();

        var self = this;

        var background = new cc.Sprite(res.welcome_bg_jpg);
        background.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));
        this.addChild(background);


        cc.spriteFrameCache.addSpriteFrames(res.welcome_plist);
        this._spriteSheet = new cc.SpriteBatchNode(res.welcome_png);
        this.addChild(this._spriteSheet);




        var fishframe1 = cc.spriteFrameCache.getSpriteFrame('fish0.png');
        var fish1 = new cc.MenuItemImage(fishframe1, fishframe1, fishframe1, function(){

            game._Globals.fish_type = game._Enum.fishType.type1;
            self.refreshUI();

        }, this);
        fish1.setPosition(cc.p(cc.winSize.width * 0.3, cc.winSize.height * 0.45));


        var fishframe2 = cc.spriteFrameCache.getSpriteFrame('fish1.png');
        var fish2 = new cc.MenuItemImage(fishframe2, fishframe2, fishframe2, function(sender){

            game._Globals.fish_type = game._Enum.fishType.type2;
            self.refreshUI();

        }, this);
        fish2.setPosition(cc.p(cc.winSize.width * 0.7, cc.winSize.height * 0.45));


        this._fishItemList = [fish1, fish2];



        var menu = new cc.Menu(fish1, fish2);
        this.addChild(menu);
        menu.setPosition(cc.p(0, 0));


        this._fishHeart = new cc.Sprite('#fish_heart_0.png');
        this._spriteSheet.addChild(this._fishHeart);
        this._fishHeart.setPosition(cc.p(cc.winSize.width * 0.5, cc.winSize.height * 0.3));


        this.refreshUI();


        //
        var startframe = cc.spriteFrameCache.getSpriteFrame("start.png");
        this._startItem = new cc.MenuItemImage(startframe,startframe, startframe, this.onMenuStart, this);
        this._startItem.setPosition(cc.p(cc.winSize.width * 0.5, cc.winSize.height * 0.1));


        var moreframe = cc.spriteFrameCache.getSpriteFrame("home.png");
        var moreitem = new cc.MenuItemImage(moreframe,moreframe, moreframe, this.onMore, this);
        moreitem.setPosition(cc.p(cc.winSize.width * 0.9, cc.winSize.height * 0.9));
        moreitem.setScale(0.5);

        var menu2 = new cc.Menu(this._startItem, moreitem);
        //menu.alignItemsVertically();
        //menu2.alignItemsHorizontally();
        this.addChild(menu2);
        menu2.setPosition(cc.p(0, 0));





    },
    onMore:function(){
        window.location.href="http://mingz.me";
    },
    onMenuStart:function(){
        var scene = new game.GameScene();
        //scene.setFishType(game.Config.fishType.a)
        cc.director.runScene(scene);
    },

    refreshUI : function(){
        var self = this;
        if(game._Globals.fish_type == game._Enum.fishType.type1){
            frame.Utils.setMenuItemImg(self._fishItemList[0], cc.spriteFrameCache.getSpriteFrame('fishlight0.png'));
            frame.Utils.setMenuItemImg(self._fishItemList[1], cc.spriteFrameCache.getSpriteFrame('fish1.png'));
            var spriteFrame = cc.spriteFrameCache.getSpriteFrame('fish_heart_0.png');
            self._fishHeart.setSpriteFrame(spriteFrame);
        }else if(game._Globals.fish_type == game._Enum.fishType.type2){
            frame.Utils.setMenuItemImg(self._fishItemList[0], cc.spriteFrameCache.getSpriteFrame('fish0.png'));
            frame.Utils.setMenuItemImg(self._fishItemList[1], cc.spriteFrameCache.getSpriteFrame('fishlight1.png'));
            self._fishHeart.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame('fish_heart_1.png'));
        }
    },







});