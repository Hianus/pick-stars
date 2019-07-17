import {Player} from './Player'

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;
    @property
    text: string = 'hello';

    //引用星星的预制资源
    @property(cc.Prefab)
    private starPrefab:cc.Prefab = null;
    @property(cc.Label)
    private scoreLab:cc.Label = null;
    //星星的消失时间范围
    @property(cc.Integer)
    private minStarDuration:number = 0;
    @property(cc.Integer)
    private maxStarDuration:number = 0;
    //地面节点
    @property(cc.Node)
    private ground:cc.Node = null;
    //角色节点
    @property(cc.Node)
    public player:cc.Node = null;

    //地面y轴坐标
    private groundY:number;
    //定时器
    public timer:number;
    //星星存在的持续时间
    public starDuration:number;
    //当前分数
    private score:number;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        // this.groundY = this.ground.y;
        this.timer = 0;
        this.starDuration = 0;
        //生成新星星
        this.newStar();
        this.score = 0;
    }
    //生成新星星
    public newStar(){
        let newstar = cc.instantiate(this.starPrefab);
        this.node.addChild(newstar);
        newstar.setPosition(this.getNewStarPosition());
        newstar.getComponent('Star').game = this;
        newstar.getComponent('Star').init(this);
        this.starDuration = this.minStarDuration + cc.random0To1() * (this.maxStarDuration - this.minStarDuration);
        this.timer = 0;
    }
    //新星星的位置
    public getNewStarPosition(){
        let ranX = 0;
        let ranY = this.ground.y + cc.random0To1() * this.player.getComponent('Player').jumpHeight;
        let maxX = this.node.width/2;
        ranX = cc.randomMinus1To1() * maxX;
        return cc.v2(ranX,ranY);
    }
    // start () {}

    update (dt:number) {
        if(this.timer > this.starDuration){
            this.gameover();
            return;
        }
        this.timer += dt;
    }
    public gainscore(){
        this.score += 1;
        this.scoreLab.string = 'score:' + this.score.toString();
    }
    public gameover(){
        this.player.stopAllActions();
        cc.director.loadScene('myfir');
    }
}
