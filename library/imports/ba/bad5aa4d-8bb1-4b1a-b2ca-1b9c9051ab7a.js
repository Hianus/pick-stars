"use strict";
cc._RF.push(module, 'bad5apNi7FLGrLKG5yQUat6', 'Player');
// scripts/Player.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        //跳跃高度
        _this.jumpHeight = 0;
        //跳跃持续时间
        _this.jumpDuration = 0;
        //最大移动速度
        _this.maxMoveSpeed = 0;
        //加速度
        _this.accel = 0;
        //跳跃音效
        _this.jumpAudio = null;
        _this.text = 'hello';
        _this.xSpeed = 0;
        _this.accLeft = false;
        _this.accRight = false;
        _this.jumpAction = null;
        return _this;
    }
    //player跳跃方法
    Player.prototype.setJumpAction = function () {
        var jumpUp = cc.moveBy(this.jumpDuration, cc.v2(0, this.jumpHeight)).easing(cc.easeCubicActionOut());
        var jumpDown = cc.moveBy(this.jumpDuration, cc.v2(0, -this.jumpHeight)).easing(cc.easeCubicActionIn());
        var callback = cc.callFunc(this.playJumpAudio, this);
        return cc.repeatForever(cc.sequence(jumpUp, jumpDown));
    };
    ;
    Player.prototype.playJumpAudio = function () {
        //调用声音引擎播放声音
        cc.audioEngine.play(this.jumpAudio, false, 1);
    };
    Player.prototype.addEventListeners = function () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
        // cc.find("Canvas").on(cc.Node.EventType.TOUCH_START, this.onScreenTouchStart,this);
        // cc.find("Canvas").on(cc.Node.EventType.TOUCH_CANCEL, this.onScreenTouchEnd, this);
        // cc.find("Canvas").on(cc.Node.EventType.TOUCH_END, this.onScreenTouchEnd,this);
    };
    // private onScreenTouchStart(event: cc.Event.EventTouch) {
    //     if (event.getLocationX() > cc.winSize.width/2) {
    //         this.moveRight();
    //     } else {
    //         this.moveLeft();
    //     }
    // }
    // private onScreenTouchEnd() {
    //     this.stopMove();
    // }
    Player.prototype.moveLeft = function () {
        this.accLeft = true;
        this.accRight = false;
    };
    Player.prototype.moveRight = function () {
        this.accLeft = false;
        this.accRight = true;
    };
    Player.prototype.stopMove = function () {
        this.accLeft = false;
        this.accRight = false;
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.moveLeft();
                this.accLeft = true;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.moveRight();
                this.accRight = true;
                break;
        }
    };
    ;
    Player.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
            case cc.KEY.a:
            case cc.KEY.left:
                this.stopMove();
                this.accLeft = false;
                break;
            case cc.KEY.d:
            case cc.KEY.right:
                this.stopMove();
                this.accRight = false;
                break;
        }
    };
    // LIFE-CYCLE CALLBACKS:
    Player.prototype.onLoad = function () {
        //初始化跳跃动作
        this.jumpAction = this.setJumpAction();
        this.node.runAction(this.jumpAction);
        //加速度方向开关
        this.accLeft = false;
        this.accRight = false;
        //当前水平方向速度
        this.xSpeed = 0;
        //初始化输入监听
        this.addEventListeners();
    };
    Player.prototype.onDestroy = function () {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this);
    };
    //start () {}
    Player.prototype.update = function (dt) {
        //根据当前加速度方向每帧更新速度
        if (this.accLeft) {
            this.xSpeed -= this.accel * dt;
        }
        else if (this.accRight) {
            this.xSpeed += this.accel * dt;
        }
        console.log(this.xSpeed);
        //限制角色的速度不能超过最大值
        if (Math.abs(this.xSpeed) > this.maxMoveSpeed) {
            this.xSpeed = this.maxMoveSpeed * this.xSpeed / Math.abs(this.xSpeed);
        }
        //根据当前速度更新角色位置
        this.node.x += this.xSpeed * dt;
        if (this.node.x - this.node.width / 2 <= -this.node.parent.width / 2) {
            this.xSpeed = 0;
            this.stopMove();
        }
        if (this.node.x + this.node.width / 2 >= this.node.parent.width / 2) {
            this.xSpeed = 0;
        }
    };
    __decorate([
        property(cc.Label)
    ], Player.prototype, "label", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "jumpHeight", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "jumpDuration", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "maxMoveSpeed", void 0);
    __decorate([
        property(cc.Integer)
    ], Player.prototype, "accel", void 0);
    __decorate([
        property(cc.AudioClip)
    ], Player.prototype, "jumpAudio", void 0);
    __decorate([
        property
    ], Player.prototype, "text", void 0);
    Player = __decorate([
        ccclass
    ], Player);
    return Player;
}(cc.Component));
exports.default = Player;

cc._RF.pop();