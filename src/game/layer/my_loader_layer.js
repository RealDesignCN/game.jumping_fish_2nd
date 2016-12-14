/**
 * Created by zhaojm on 15/3/21.
 */
game.MyLoaderLayer = cc.LayerColor.extend({

    _loadingBar : null,
    _label : null,
    _spriteSheet : null,

    _startitem : null,

    ctor:function(){
        this._super(new cc.Color(43, 43, 43));

        var self = this;

        cc.spriteFrameCache.addSpriteFrames(loaderRes.loader_plist);
        this._spriteSheet = new cc.SpriteBatchNode(loaderRes.loader_png);
        this.addChild(this._spriteSheet, 2);

        //var www = new cc.Sprite('#59600.png');
        //www.setPosition(cc.p(cc.winSize.width * 0.95, cc.winSize.height * 0.95));
        //www.setAnchorPoint(cc.p(1, 1));
        //this._spriteSheet.addChild(www);
        //
        //
        //var logo = new cc.Sprite('#logo.png');
        //logo.setPosition(cc.p(cc.winSize.width * 0.5, cc.winSize.height * 0.7));
        //this._spriteSheet.addChild(logo);

        var bg = new cc.Sprite(loaderRes.loader_bg_jpg);
        bg.setPosition(cc.p(cc.winSize.width * 0.5, cc.winSize.height * 0.5));
        //this._spriteSheet.addChild(bg);
        this.addChild(bg);


        var load_bar_bg = new cc.Sprite('#bar_bg.png');
        this._spriteSheet.addChild(load_bar_bg);
        load_bar_bg.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height * 0.08));


        this._loadingBar = new cc.Sprite('#bar_front.png');
        this._spriteSheet.addChild(this._loadingBar);
        this._loadingBar.setAnchorPoint(cc.p(0, 0.5));
        this._loadingBar.setPosition(cc.p(cc.winSize.width / 2 - this._loadingBar.getContentSize().width / 2, cc.winSize.height * 0.08));
        this._loadingBar.setScaleX(0);



        var startframe = cc.spriteFrameCache.getSpriteFrame('btn_start.png');
        this._startitem = new cc.MenuItemImage(startframe, startframe, startframe,  function(){

            game.init();
            cc.director.runScene(new game.GameScene());


        }, this);

        this._startitem.setPosition(cc.winSize.width * 0.5, cc.winSize.height * 0.2);
        //this._startitem.setVisible(false);
        this._startitem.setScale(0.7);
        this._startitem.runAction(new cc.FadeOut(0.1));


        var moreframe = cc.spriteFrameCache.getSpriteFrame("home.png");
        var moreitem = new cc.MenuItemImage(moreframe,moreframe, moreframe, this.onMore, this);
        moreitem.setPosition(cc.p(cc.winSize.width - 20, cc.winSize.height - 20));
        moreitem.setAnchorPoint(cc.p(1,1));

        var menu = new cc.Menu();
        menu.addChild(this._startitem);
        menu.addChild(moreitem);
        this.addChild(menu);
        menu.setPosition(0, 0);




        cc.loader.load(g_resources,
            function (result, count, loadedCount) {
                var percent = (loadedCount / count * 100) | 0;
                percent = Math.min(percent, 100);
                //self._label.setString(percent + "%");
                //self.loadingBar.setPercentage(percent * 100);
                self._loadingBar.setScaleX(percent / 100);


            }, function () {
                //that._label.setString("100%");
                //that._startitem.setVisible(true);
                //that._loadingBar.stopAllActions();
                //self._loadingBar.setVisible(false);

                //cc.director.runScene(new game.HelloScene());
                self._loadingBar.setScaleX( 1);
                //self._loadingBar.runAction(
                //    new cc.Sequence(
                //        new cc.FadeOut(2),
                //        new cc.CallFunc(function(){
                //            //that._startitem.setVisible(true);
                self._startitem.runAction(new cc.FadeIn(2));
                //        })
                //    )
                //);
                ////
                //that._label.runAction(
                //    //new cc.Sequence(
                //        new cc.FadeOut(2)
                //        //new cc.CallFunc(that.onLoadingBarFadeIn)
                //    //)
                //);


            });
    },

    onMore:function(){
        window.location.href="http://mingz.me";
    },







});