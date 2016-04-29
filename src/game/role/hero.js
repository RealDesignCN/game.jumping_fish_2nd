/**
 * Created by zhaojm on 15/3/17.
 */
//
game.Hero = cc.Class.extend({

    _action : null,
    _sprite : null,

    _speedX : 2000,
    _speedY : 5000,

    _body : null,
    _space : null,
    _shape : null,

    _status : null,


    //_isCanRotated : null,
    //_isCanJump : null,
    ctor:function(x, y){
        //this._isCanRotated = true;
        //this._isCanJump = true;

        var tag = game._Globals.fish_type.tag;

        this._sprite = new cc.PhysicsSprite('#fish' + tag + '/0.png');

        this._action = new cc.RepeatForever(new cc.Animate(
            new cc.Animation([0, 1, 2, 3].map(function (i) {
                return cc.spriteFrameCache.getSpriteFrame("fish" + tag + "/" + i + ".png");
            }), 0.1)
        ));

        var contentSize = this._sprite.getContentSize();

        var body = new cp.Body(5, cp.momentForBox(Number.POSITIVE_INFINITY, contentSize.width, contentSize.height));
        body.setPos(cc.p(x, y));
        body.applyImpulse(cp.v(this._speedX, 0), cp.v(0, 0)); // 给一个速度
        //body.applyForce(cp.v(0, 7500), cp.v(0, 0));   // 给一个力
        body._spriteObj = this;
        this._body = body;
        this._sprite.setBody(body);

        var shape = new cp.BoxShape(body, contentSize.width , contentSize.height);
        this._shape = shape;
        this._shape.setCollisionType(game._Enum.spriteTag.hero);
        this._shape.setElasticity(0);   // 反弹系数

        this._sprite.runAction(this._action);

        //this._status = game._Enum.heroStatus.running;
        this.running();

    },

    addToLayer : function(layer, space, spriteSheet){
        this._layer = layer;
        this._space = space;
        this._spriteSheet = spriteSheet;
        //layer.addChild(this._spriteSheet, 2);
        this._spriteSheet.addChild(this._sprite);

        this._space = space;
        space.addBody(this._body);
        space.addShape(this._shape);

    },
    removeFromLayer : function(){
        //this._sprite.removeFromParent();
    },


    update:function(dt){

        var vel = this._body.getVel();
        //cc.log(vel.x);


        if(this._status != game._Enum.heroStatus.die && this._status != game._Enum.heroStatus.hit){
            var a = Math.atan(vel.y / vel.x) * 180 / Math.PI;
            //cc.log('a=', a);
            this._sprite.setRotation(-a);
        }

    },

    running:function(){
        //cc.log('running, status=', this._status);
        if(this._status != game._Enum.heroStatus.die){
            this._status = game._Enum.heroStatus.running;
            var vel = this._body.getVel();
            if(vel.x != 400){
                this._body.setVel(cp.v(0, 0));
                this._body.applyImpulse(cp.v(this._speedX, 0), cp.v(0, 0)); // 给一个速度
            }
        }
    },

    jump : function(speed_percent){
        cc.log('jump, this._status=', this._status, 'percent...', speed_percent);
        if(this._status == game._Enum.heroStatus.running){

            this._status = game._Enum.heroStatus.jump;
            if(this._sprite.getPositionY() <= game._Config.walter_height_percent * cc.winSize.height){
                this._body.setVel(cp.v(this._body.getVel().x, 0));
                this._body.applyImpulse(cp.v(0, this._speedY * speed_percent), cp.v(0, 0));

            }
        }

    },

    hit : function(){
        cc.log('hit, status=', this._status);
        if(this._status != game._Enum.heroStatus.die){
            this._status = game._Enum.heroStatus.hit;
            var self = this;
            this._sprite.runAction(new cc.Sequence(
                new cc.DelayTime(2),
                new cc.CallFunc(function(){
                    //cc.log('hit action callback');
                    self.running();
                })
            ));
        }

    },

    die : function(callback){
        cc.log('die...status=', this._status);
        this._status = game._Enum.heroStatus.die;
        //this._sprite.stopAllActions();
        //this._sprite._ignoreBodyRotation = true;
        //this._sprite._rotation = 0;

        this._sprite.runAction(
            new cc.Spawn(
                //new cc.Repeat(new cc.RotateBy(2, 180), 2),
                new cc.Sequence(
                    new cc.MoveTo(1, cc.p(cc.winSize.width + game._Camera.x, -20)),
                    new cc.CallFunc(callback)
                )
            )
        );
    },

    getPositionX:function(){
        return this._sprite.getPositionX();
    },

    getPositionY:function(){
        return this._sprite.getPositionY();
    },



});
