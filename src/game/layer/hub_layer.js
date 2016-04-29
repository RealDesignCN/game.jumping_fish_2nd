game.HubLayer = cc.Layer.extend({



    _isTouch : null,

    _touchTime : null,

    _speed_percent : null,

    _touchListener:null,

    ctor:function(){
        this._super();
        var self = this;
        this._isTouch = false;
        this._touchTime = 0;
        this._speed_percent = 0;

        var listener = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true   ,       // true 为不向下传递
            onTouchBegan : function(){
                cc.log("onTouchBegan");
                self._isTouch = true;
                self._touchTime = 0;
                return true;
            },
            onTouchMoved:function(){
                //cc.log('onTouchMoved');
            },

            onTouchEnded : function(){
                cc.log("onTouchEnded");
                self._isTouch = false;
                self._touchTime = 0;
                self.parent._hero.jump(self._speed_percent);
                //self.setTouchEnabled(false);

            },
        });
        this._touchListener = listener;
        cc.eventManager.addListener(listener, this);

        this.scheduleUpdate();

    },


    update:function(dt){
        this._super(dt);

        if(this._isTouch){
            this._touchTime += dt;

        }
        this._speed_percent = this._touchTime / 0.5;
        if(this._speed_percent > 1){
            this._speed_percent = 1;
        }
        if(this._isTouch){
            cc.log(this._speed_percent);

        }

        // TODO 更新进度条
        this.parent.parent._uiLayer.setPercent(this._speed_percent);


    },


});