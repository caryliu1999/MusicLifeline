// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, AudioSourceComponent, Vec3 } from "Cocos3D";
const { ccclass, property } = _decorator;

@ccclass("Pointer")
export class Pointer extends Component {
    begin:Vec3 = null;
    end:Vec3 = null;
    totalTime = 3;
    callback = null;
    curTime = 0;
    unuse () {
        this.node.active = false;
        this.begin = null;
        this.end = null;
        this.totalTime = 3000;
        this.curTime = 0;
        this.callback = null;
    }

    reuse (begin, end, time: number = 1000, callback) {
        this.begin = begin;
        this.end = end;
        this.totalTime = time;
        this.curTime = 0;
        this.callback = callback;
        this.play();
    }

    play () {
        this.node.setPosition(this.begin);
        this.node.active = true;
    }

    update (dt) {
        let totalTime = this.totalTime / 1000;
        if (this.curTime >= totalTime) {
            return
        }
        this.curTime += dt;
        this.curTime = Math.min(this.curTime, totalTime);
        // x
        let dirxX = (this.end.x - this.begin.x) > 0 ? 1 : -1;
        let totalX = Math.abs(this.end.x - this.begin.x);
        let offsetX = (this.curTime / totalTime) * totalX * dirxX;
        let positionX = this.begin.x + offsetX;
        // y
        let dirY = (this.end.y - this.begin.y) > 0 ? 1 : -1;
        let totalY = Math.abs(this.end.y - this.begin.y);
        let offsetY = (this.curTime / totalTime) * totalY * dirY;
        let positionY = this.begin.y + offsetY;

        this.node.setPosition(positionX, positionY, 0);

        if (this.curTime >= totalTime) {
            this.callback(this.node);
        }
    }
}
