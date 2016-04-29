/**
 * Created by zhaojm on 15/3/17.
 */
// 障碍物
game.Moster = cc.Class.extend({
    _sprite:null,
    _type : null,
    _layer : null,
    _body : null,
    _shape : null,
    _space : null,
    _spriteSheet : null,
    _isHaveShape : null,
    ctor:function(x, y, type){
        if(type){
            this._type = type;
        }else{
            this._type = this._getMosterType();
        }


        this._sprite = new cc.PhysicsSprite("#moster/moster" + this._type + ".png");


        var contentSize = this._sprite.getContentSize();


        this._body = new cp.StaticBody();
        this._body.setPos(cc.p(x, y));
        this._body._spriteObj = this;
        this._sprite.setBody(this._body);


        this._shape = new cp.BoxShape(this._body, contentSize.width, contentSize.height );
        this._shape.setElasticity(0);
        this._shape.setCollisionType(game._Enum.spriteTag.moster);
        //this._shape.setSensor(true);



        if(this._type == 2){
            this._sprite.runAction(new cc.RepeatForever(new cc.Animate(
                new cc.Animation([0, 1, 2, 2, 1, 0].map(function (i) {
                    return cc.spriteFrameCache.getSpriteFrame("moster/moster2/" + i + ".png");
                }), 0.15)
            )));
        }

        this._isHaveShape = true;

    },



    addToLayer : function(layer, space, spriteSheet){
        this._layer = layer;
        this._space = space;
        this._spriteSheet = spriteSheet;
        //layer.addChild(this._spriteSheet);
        this._spriteSheet.addChild(this._sprite);
        space.addStaticShape(this._shape);  // 静态shape
    },

    removeFromLayer : function(){

        if(this._isHaveShape) {
            this._space.removeShape(this._shape);
		    this.shape = null;
        }
//
        this._sprite.removeFromParent();
//		this.platform.release();
//
//        this._spriteSheet.removeFromParent();
    },


    _getMosterType : function(){
        return Math.floor(Math.random()*3);  // 0-2
    },

    getPosition:function(){
        return this._sprite.getPosition();
    },



});