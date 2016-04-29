/**
 * Created by zhaojm on 15/3/17.
 */

game.GameScene = cc.Scene.extend({

    _uiLayer : null,
    _gameLayer : null,
    _space : null,

    _score : null,
    _heart : null,


    _initSpace: function () {
        var winSize = cc.winSize;
        var space = new cp.Space();
        space.gravity = cp.v(0, game._Config.physics.gravity);

        var wallBottom = new cp.SegmentShape(
            space.staticBody,
            // Start point
            cp.v(0, game._Config.physics.groundHeight),
            // MAX INT:4294967295
            cp.v(4294967295, game._Config.physics.groundHeight),
            // thickness of wall
            0);
        wallBottom.setCollisionType(game._Enum.spriteTag.ground);
        wallBottom.setElasticity(0);
        space.addStaticShape(wallBottom);



        return space;
    },

    onEnter:function () {
        this._super();
        var self = this;
        this._score = 0;
        this._heart = game._Globals.fish_type.heart;
        game._Camera = game.Camera();

        var space = this._space = this._initSpace();

        this.addChild(new game.BGLayer([
            res.bg_jpg
            //res.bg2_jpg
        ]));


        this._gameLayer = new game.GameLayer(space);
        this.addChild(this._gameLayer);

        this._uiLayer = new game.UILayer();
        this.addChild(this._uiLayer);


        space.addCollisionHandler(
            game._Enum.spriteTag.hero,
            game._Enum.spriteTag.ground,
            function (arbiter, space) {
                var shapes = arbiter.getShapes();
                var hero = shapes[0];
                hero.body._spriteObj.running();
                //self._gameLayer._hubLayer.setTouchEnabled(true);

                return true;
            }, null, null, null);

        space.addCollisionHandler(
            game._Enum.spriteTag.hero,
            game._Enum.spriteTag.coin,
            function (arbiter, space) {
                //cc.log('collide with coin');
                var shapes = arbiter.getShapes();
                var coin = shapes[1];
                space.addPostStepCallback(function(){
                    //cc.log("post step callback 2");
                    //space.removeStaticShape(coin);
                    coin.body._spriteObj.removeFromLayer();


                    self._score += (1 * 10);
                    self._uiLayer.setScore(self._score);
                });

            }, null, null, null);


        space.addCollisionHandler(
            game._Enum.spriteTag.hero,
            game._Enum.spriteTag.moster,
            function (arbiter, space) {
                //cc.log('collide with moster');

                var shapes = arbiter.getShapes();
                var moster = shapes[1];
                var hero = shapes[0];
                space.addPostStepCallback(function(){
                    space.removeStaticShape(moster);
                    moster.body._spriteObj._isHaveShape = false;

                    self._heart--;
                    self._uiLayer.setHeart(self._heart);


                    if(self._heart <= 0){
                        // game over...
                        self.unscheduleUpdate();
                        hero.body._spriteObj.die(function(){

                            var scene = new game.GameOverScene();
                            scene.setData({
                                score : self._score,
                            });
                            cc.director.runScene(scene);

                        });
                        //return false;

                    }else{
                        hero.body._spriteObj.hit();
                    }



                });

                return true;

            }, null, null, null);



        this.scheduleUpdate();

    },

    update:function(dt){
        this._super(dt);
        this._space.step(dt);
        //this._camera.update(dt);
        game._Camera.update(dt);

        this._gameLayer.update(dt);
    },

    onExit:function(){
        cc.log('on exit...');
        this._space.removeCollisionHandler(game._Enum.spriteTag.hero, game._Enum.spriteTag.ground);
        this._space.removeCollisionHandler(game._Enum.spriteTag.hero, game._Enum.spriteTag.coin);
        this._space.removeCollisionHandler(game._Enum.spriteTag.hero, game._Enum.spriteTag.moster);
        //this._space.removeCollisionHandler(game._Enum.spriteTag.leftWall, game._Enum.spriteTag.gold);
        //cp.spaceFree( this._space );
        this.unscheduleUpdate();
        this._super();
    },



});