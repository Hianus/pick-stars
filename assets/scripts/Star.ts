import {Game} from './Game'

const {ccclass, property} = cc._decorator;

@ccclass
export default class Star extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property
    text: string = 'hello';

    @property(cc.Integer)
    private pickRadius:number = 0;
    private game:Game = null;

    public init(game:Game){
        this.game = game;
    }
    getPlayerDistance(){
        let playerPos = this.game.player.getPosition();
        let dist = cc.pDistance(this.node.position,playerPos);
        return dist;
    }

    onPicked(){
        this.game.newStar();
        this.game.gainscore();
        this.node.destroy();
    }

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    // start () {}

    update (dt:number) {
        if(this.getPlayerDistance() < this.pickRadius){
            this.onPicked();
            return;
        }
        let opacityRatio = 1 - this.game.timer/this.game.starDuration;
        let minOpacity = 50;
        this.node.opacity = minOpacity + Math.floor(opacityRatio * (255 - minOpacity));
    }
}
