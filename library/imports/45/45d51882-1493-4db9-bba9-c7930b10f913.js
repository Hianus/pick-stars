"use strict";
cc._RF.push(module, '45d51iCFJNNubupx5MLEPkT', 'Game');
// scripts/Game.ts

// import Player, {Player} from './Player'
Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Game = /** @class */ (function (_super) {
    __extends(Game, _super);
    function Game() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = 'hello';
        //引用星星的预制资源
        _this.starPrefab = null;
        _this.gameoverPrefab = null;
        _this.buttonPrefab = null;
        _this.scoreLab = null;
        //星星的消失时间范围
        _this.minStarDuration = 0;
        _this.maxStarDuration = 0;
        //地面节点
        _this.ground = null;
        //角色节点
        _this.player = null;
        return _this;
    }
    // LIFE-CYCLE CALLBACKS:
    Game.prototype.onLoad = function () {
        // this.groundY = this.ground.y;
        this.timer = 0;
        this.starDuration = 0;
        //生成新星星
        this.newStar();
        this.score = 0;
    };
    //生成新星星
    Game.prototype.newStar = function () {
        var newstar = cc.instantiate(this.starPrefab);
        this.node.addChild(newstar);
        newstar.setPosition(this.getNewStarPosition());
        newstar.getComponent('Star').init(this);
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    };
    //新星星的位置
    Game.prototype.getNewStarPosition = function () {
        var ranX = 0;
        var ranY = this.ground.y + cc.random0To1() * this.player.getComponent('Player').jumpHeight;
        var maxX = this.node.width / 2;
        ranX = cc.randomMinus1To1() * maxX;
        return cc.v2(ranX, ranY);
    };
    // start () {}
    Game.prototype.update = function (dt) {
        if (this.timer > this.starDuration) {
            this.gameover();
            return;
        }
        this.timer += dt;
    };
    Game.prototype.gainscore = function () {
        this.score += 1;
        this.scoreLab.string = 'score:' + this.score.toString();
    };
    Game.prototype.gameover = function () {
        this.player.stopAllActions();
        this.player.getComponent('Player').xSpeed = 0;
        this.player.getComponent('Player').onDestroy();
        var gameoverlab = cc.instantiate(this.gameoverPrefab);
        this.node.addChild(gameoverlab);
        gameoverlab.color = cc.color(241, 0, 29);
        var playbutton = cc.instantiate(this.buttonPrefab);
        this.node.addChild(playbutton);
        playbutton.color = cc.color(0, 153, 255);
        playbutton.on('click', this.callback, this);
    };
    Game.prototype.callback = function () {
        cc.director.loadScene('myfir');
    };
    __decorate([
        property(cc.Label)
    ], Game.prototype, "label", void 0);
    __decorate([
        property
    ], Game.prototype, "text", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "starPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "gameoverPrefab", void 0);
    __decorate([
        property(cc.Prefab)
    ], Game.prototype, "buttonPrefab", void 0);
    __decorate([
        property(cc.Label)
    ], Game.prototype, "scoreLab", void 0);
    __decorate([
        property(cc.Integer)
    ], Game.prototype, "minStarDuration", void 0);
    __decorate([
        property(cc.Integer)
    ], Game.prototype, "maxStarDuration", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "ground", void 0);
    __decorate([
        property(cc.Node)
    ], Game.prototype, "player", void 0);
    Game = __decorate([
        ccclass
    ], Game);
    return Game;
}(cc.Component));
exports.default = Game;

cc._RF.pop();