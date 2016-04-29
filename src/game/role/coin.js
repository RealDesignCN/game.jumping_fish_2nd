/**
 * Created by zhaojm on 15/3/17.
 */
game.Coin = cc.Class.extend({

    _sprite:null,
    _layer : null,
    _body : null,
    _shape : null,
    _space : null,
    _spriteSheet : null,
    _pos : null,
    _generator : null,
    ctor:function(matrix_origin_x, matrix_origin_y, col, row, generator){
        this._generator = generator;
        this._sprite = new cc.PhysicsSprite("#coin.png");

        var contentSize = this._sprite.getContentSize();

        this._pos = cc.p(matrix_origin_x + col * contentSize.width, matrix_origin_y + row * contentSize.height);


        this._body = new cp.StaticBody();
        this._body.setPos(this._pos);
        this._body._spriteObj = this;
        this._sprite.setBody(this._body);

        //this._shape = new cp.BoxShape(this._body, contentSize.width, contentSize.height );
        this._shape = new cp.CircleShape(this._body, contentSize.width / 2, cp.v(0,0));
        this._shape.setElasticity(0);
        this._shape.setCollisionType(game._Enum.spriteTag.coin);
        this._shape.setSensor(true);

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

        this._space.removeShape(this._shape);

        //this._space.removeShape(this._shape);
        //this._space.removeStaticShape(this._shape);
//		this.shape = null;
//
//        this._sprite.removeFromParent();
//		this.platform.release();
//
//        this._spriteSheet.removeFromParent();
        var self = this;

        if(!self._sprite){
            return;
        }
        var px = self._sprite.getPositionX();
        var py = self._sprite.getPositionY();
        var action = cc.MoveTo.create(0.8, cc.p(px-200,py+350)).easing(cc.easeBackIn());

        this._sprite.runAction(new cc.Sequence(action, new cc.CallFunc(
            function(){
                self._sprite.removeFromParent();
                self._sprite = null;
            }
        )));


        this._generator._coinArr.remove(this);

    },

    getPosition:function(){
        return this._pos;
    },




});

