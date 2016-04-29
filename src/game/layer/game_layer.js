/**
 * Created by zhaojm on 15/3/17.
 */
game.GameLayer = cc.Layer.extend({


    _hero:null,
    _myCamera : null,
    _debugNode : null,
    _spriteSheet : null,

    _hubLayer : null,


    _coinGenerator : null,
    _mosterGenerator : null,
  




    ctor : function(space){
        this._super();
        this._space = space;

        var winSize = cc.winSize;
        var self = this;
        // event
        game._Camera.addListener(function (pos) {
            self.setPosition(cc.p(-pos.x, -pos.y));
        });

        // test camera
        //var testCamera = new cc.Sprite(res.camera_png);
        //testCamera.setScale(0.5);
        //this.addChild(testCamera);
        //this._myCamera = testCamera;
        //
        ////physics debugNode
        //this._debugNode = cc.PhysicsDebugNode.create(space);
        //// Parallax ratio and offset
        //this.addChild(this._debugNode, 10);

        cc.spriteFrameCache.addSpriteFrames(res.gamelayer_plist);
        this._spriteSheet = new cc.SpriteBatchNode(res.gamelayer_png);
        this.addChild(this._spriteSheet);

        this._mosterGenerator = new game.MosterGenerator(this);
        this._coinGenerator = new game.CoinGenerator(this);


        var hero = game._Globals.hero = this._hero = new game.Hero(winSize.width * 0.2, winSize.height / 2);
        this.addRole(hero);


        this._hubLayer = new game.HubLayer();
        this.addChild(this._hubLayer);


    },





    update:function(dt){
        var winSize = cc.winSize;

        var hero = this._hero;

        // update the player.
        hero.update(dt);

        // update the camera.
        var camera = game._Camera;
        var cameradx = (hero.getPositionX() - winSize.width *0.2) - camera.x;    // hero移动的距离  - camera当前的距离 = camera需要移动的距离
        //cc.log(cameradx, camera.x, hero.getPositionX(), winSize.width / 2);
        camera.x += cameradx;
        //var camerady = Math.min(Math.max(hero.getPositionY() - winSize.height / 2, 0) - camera.y, winSize.height);
        //if (camerady > 0) {
        //    camera.y += Math.min(camerady, 1);
        //} else if (camerady < 0) {
        //    camera.y += Math.max(camerady, -2);
        //}
        //this._myCamera.setPosition(cc.p(camera.x, camera.y));



        this._coinGenerator.update(dt);
        this._mosterGenerator.update(dt);



    },

    addRole: function (role) {
        role.addToLayer(this, this._space, this._spriteSheet);
    },







});
