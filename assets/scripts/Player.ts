const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    //跳跃高度
    @property(cc.Integer)
    private jumpHeight:number = 0;
    //跳跃持续时间
    @property(cc.Integer)
    private jumpDuration:number = 0;
    //最大移动速度
    @property(cc.Integer)
    private maxMoveSpeed:number = 0;
    //加速度
    @property(cc.Integer)
    private accel:number = 0;
    //跳跃音效
    @property(cc.AudioClip)
    private jumpAudio:cc.AudioClip = null;

    @property
    text: string = 'hello';


    private xSpeed:number = 0;
    private accLeft:boolean = false;
    private accRight:boolean = false;
    private jumpAction:cc.Action = null;

    //player跳跃方法
    private setJumpAction() {
        let jumpUp = cc.moveBy(this.jumpDuration,cc.v2(0,this.jumpHeight)).easing(cc.easeCubicActionOut());
        let jumpDown = cc.moveBy(this.jumpDuration,cc.v2(0,-this.jumpHeight)).easing(cc.easeCubicActionIn());
        let callback = cc.callFunc(this.playJumpAudio,this);
        return cc.repeatForever(cc.sequence(jumpUp,jumpDown));
    };
    private playJumpAudio(){
        //调用声音引擎播放声音
        cc.audioEngine.play(this.jumpAudio as any,false,1)
    }
    private addEventListeners(){
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
        // cc.find("Canvas").on(cc.Node.EventType.TOUCH_START, this.onScreenTouchStart,this);
        // cc.find("Canvas").on(cc.Node.EventType.TOUCH_CANCEL, this.onScreenTouchEnd, this);
        // cc.find("Canvas").on(cc.Node.EventType.TOUCH_END, this.onScreenTouchEnd,this);
    }
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
    private moveLeft(){
        this.accLeft = true;
        this.accRight = false;
    }
    private moveRight(){
        this.accLeft = false;
        this.accRight = true;
    }
    private stopMove(){
        this.accLeft = false;
        this.accRight = false;
    }
    private onKeyDown(event){
        switch(event.keyCode){
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
    private onKeyUp(event){
        switch(event.keyCode){
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
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
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
    }
    onDestroy(){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_UP,this.onKeyUp,this);
    }
    //start () {}
    update(dt:number){
        //根据当前加速度方向每帧更新速度
        if(this.accLeft){
            this.xSpeed -= this.accel * dt;
        }else if(this.accRight){
            this.xSpeed += this.accel * dt;
        }

        console.log(this.xSpeed);

        //限制角色的速度不能超过最大值
        if(Math.abs(this.xSpeed) > this.maxMoveSpeed){
            this.xSpeed = this.maxMoveSpeed * this.xSpeed/Math.abs(this.xSpeed);
        }
        //根据当前速度更新角色位置
        this.node.x += this.xSpeed * dt;
        if (this.node.x - this.node.width/2 <= -this.node.parent.width / 2) {
            this.xSpeed = 0;
            this.stopMove();
        }
        if (this.node.x + this.node.width/2 >= this.node.parent.width / 2) {
            this.xSpeed = 0;
            
        }
    }


}
