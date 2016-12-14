/**
 * Created by zhaojm on 15/3/30.
 */

game.GameOverLayer = cc.Layer.extend({
    _spriteSheet : null,
    _scorelbl : null,
    _bestScorelbl : null,
    ctor:function(data){
        this._super();
        var self = this;



        var background = new cc.Sprite(res.gameover_bg_jpg);
        this.addChild(background);
        background.setPosition(cc.p(cc.winSize.width / 2, cc.winSize.height / 2));


        cc.spriteFrameCache.addSpriteFrames(res.gameover_plist);
        this._spriteSheet = new cc.SpriteBatchNode(res.gameover_png);
        this.addChild(this._spriteSheet);

        // TODO 构建界面


        var level = new cc.Sprite('#level1.png');
        level.setPosition(cc.p(cc.winSize.width * 0.5, cc.winSize.height * 0.65));
        this._spriteSheet.addChild(level);


        // 当前记录
        this._scorelbl = cc.LabelTTF.create('', 'Arial', 24);
        this._scorelbl.setColor(new cc.Color(190, 50, 0));
        this._scorelbl.setPosition(cc.p(cc.winSize.width * 0.5 + 20, cc.winSize.height * 0.54));
        this.addChild(this._scorelbl);
        this._scorelbl.setAnchorPoint(cc.p(0, 0.5));

        // 最高纪录
        this._bestScorelbl = cc.LabelTTF.create('', 'Arial', 24);
        this._bestScorelbl.setColor(new cc.Color(190, 50, 0));
        this._bestScorelbl.setPosition(cc.p(cc.winSize.width * 0.5 + 20, cc.winSize.height * 0.44));
        this.addChild(this._bestScorelbl);
        this._bestScorelbl.setAnchorPoint(cc.p(0, 0.5));


        var storage_key = 'fish_score';

        var temp = cc.sys.localStorage.getItem(storage_key);

        if(temp == null || temp == "" || temp == 'undefined'){
            cc.sys.localStorage.setItem(storage_key, JSON.stringify(data));
            level.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame('level0.png'));
            // TODO 第一次
            cc.log('first time...');
            this._scorelbl.setString(data.score);
            this._bestScorelbl.setString(data.score);

        }else{

            //将字符串转化为json
            temp = JSON.parse(temp);
            if(temp.score < data.score) {
                cc.sys.localStorage.setItem(storage_key, JSON.stringify(data));
                // TODO 覆盖 最高纪录
                cc.log('big score num ');
                this._scorelbl.setString(data.score);
                this._bestScorelbl.setString(data.score);
                // 最高
                level.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame('level0.png'));

            }else{
                level.setSpriteFrame(cc.spriteFrameCache.getSpriteFrame('level1.png'));
                this._scorelbl.setString(data.score);
                this._bestScorelbl.setString(temp.score);
            }

        }


        var shareFrame = cc.spriteFrameCache.getSpriteFrame("btn_1.png");
        var shareItem = new cc.MenuItemImage(shareFrame,shareFrame, shareFrame, this.onShare, this);
        shareItem.setAnchorPoint(cc.p(1, 0.5));
        shareItem.setPosition(cc.p(cc.winSize.width * 0.5 - 2, cc.winSize.height * 0.31));



        var againFrame = cc.spriteFrameCache.getSpriteFrame("btn_0.png");
        var againItem = new cc.MenuItemImage(againFrame,againFrame, againFrame, this.onAgain, this);
        againItem.setAnchorPoint(cc.p(0 ,0.5));
        againItem.setPosition(cc.p(cc.winSize.width * 0.5 + 2, cc.winSize.height * 0.31));



        var moreFrame = cc.spriteFrameCache.getSpriteFrame("home.png");
        var moreItem = new cc.MenuItemImage(moreFrame,moreFrame, moreFrame, this.onMore, this);
        moreItem.setPosition(cc.p(cc.winSize.width * 0.9, cc.winSize.height * 0.9));
        //moreItem.setScale(0.5);


        var menu = new cc.Menu(shareItem, againItem, moreItem);
        //menu.alignItemsVertically();
        this.addChild(menu);
        menu.setPosition( cc.p(0, 0));

    },

    onAgain:function(){
        cc.director.runScene(new game.GameScene());
    },

    onMore:function(){
        window.location.href="http://mingz.me";
    },

    onShare:function(){
        cc.log('on share...');

    },


});