(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/scripts/Star.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '7efdev8uj5Eh6TELqaRmRZP', 'Star', __filename);
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
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=Star.js.map
        