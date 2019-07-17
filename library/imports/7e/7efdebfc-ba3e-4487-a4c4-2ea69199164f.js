"use strict";
cc._RF.push(module, '7efdev8uj5Eh6TELqaRmRZP', 'Star');
// scripts/Star.ts

Object.defineProperty(exports, "__esModule", { value: true });
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
var Star = /** @class */ (function (_super) {
    __extends(Star, _super);
    function Star() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.label = null;
        _this.text = 'hello';
        _this.pickRadius = 0;
        _this.game = null;
        return _this;
    }
    Star.prototype.init = function (game) {
        this.game = game;
    };
    Star.prototype.getPlayerDistance = function () {
        var playerPos = this.game.player.getPosition();
        var dist = cc.pDistance(this.node.position, playerPos);
        return dist;
    };
    Star.prototype.onPicked = function () {
        this.game.newStar();
        this.game.gainscore();
        this.node.destroy();
    };
    // LIFE-CYCLE CALLBACKS:
    // onLoad () {}
    // start () {}
    Star.prototype.update = function (dt) {
        if (this.getPlayerDistance() < this.pickRadius) {
            this.onPicked();
            return;
        }
        var opacityRatio = 1 - this.game.timer / this.game.starDuration;
        var minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    };
    __decorate([
        property(cc.Label)
    ], Star.prototype, "label", void 0);
    __decorate([
        property
    ], Star.prototype, "text", void 0);
    __decorate([
        property(cc.Integer)
    ], Star.prototype, "pickRadius", void 0);
    Star = __decorate([
        ccclass
    ], Star);
    return Star;
}(cc.Component));
exports.default = Star;

cc._RF.pop();