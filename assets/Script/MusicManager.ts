// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, AudioSourceComponent } from "Cocos3D";
import { music1 } from "./data";
import { Pointer } from "./Pointer";

const { ccclass, property } = _decorator;

enum GameState {
    STOP,
    PLAY,
    PAUSE
}

@ccclass("MusicManager")
export class MusicManager extends Component {
    
    @property(AudioSourceComponent)
    audio = null;

    @property(cc.Node)
    pointer = null;

    @property(cc.Node)
    target = null;

    @property(cc.Node)
    begin = null;
    @property(cc.Node)
    pointerParent = null;

    state = GameState.STOP;
    musicData = [];
    musicIndex = 0;
    curTime = 0;
    offset = 0;

    pool = new cc.NodePool();

    start () {
        // Your initialization goes here.
    }

    play () {
        this.musicIndex = 0;
        this.curTime = 0;
        this.audio.play();
        this.musicData = music1;
        this.state = GameState.PLAY;
    }

    update (dt) {
        if (this.state != GameState.PLAY) {
            return;
        }
        
        this.curTime += dt;
        let tTime = this.musicData[this.musicIndex] / 1000;
        if (this.curTime >= tTime + this.offset / 1000) {
            this.musicIndex += 2;
            this.movePointer();
        }

        if (this.musicIndex >= this.musicData.length) {
            this.state = GameState.STOP;
        }
    }

    movePointer () {
        let pointer = null;
        if (this.pool.size() > 0) { 
            pointer = this.pool.get();
        } else { 
            pointer = cc.instantiate(this.pointer);
        }

        this.pointerParent.addChild(pointer);
        let comp = pointer.getComponent(Pointer);
        comp.reuse(this.begin.getPosition(), this.target.getPosition(), 1000, this.recycle.bind(this));
    }

    recycle (node) {
        this.pool.put(node);
    }

    isMatch () {

    }
}
