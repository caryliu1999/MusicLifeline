// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Enum, ColliderComponent, BoxColliderComponent, SphereColliderComponent, ModelComponent, Color } from "Cocos3D";
import { ModelType } from "./Enums";
import { Actor } from "./Actor";
const { ccclass, property } = _decorator;

@ccclass("Energy")
export class Energy extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property
    modelType = 0;

    @property
    color = new Color();

    collider = null;

    callback = null;
    begin = null;
    end = null;
    totalTime = 0;
    curTime = 0;

    beginY = 0;
    endY = 0;


    onLoad () {
        if (this.modelType == ModelType.RECT) {
            this.collider = this.node.getComponent(BoxColliderComponent);
        } else {
            this.collider = this.node.getComponent(SphereColliderComponent);
        }
        //碰撞事件
        this.collider.on("onTriggerEnter", this.onCollisionEnter, this);
        const mat = this.node.getComponentInChildren(ModelComponent).material;
        mat.setProperty('color', this.color);
        const v4 = mat.getProperty('intensitySize');
        v4.x = 2000;
        mat.setProperty('intensitySize', v4);
    }
    
    onDestroy () {
        //碰撞事件
        this.collider.off("onTriggerEnter", this.onCollisionEnter, this);
    }
    
    onCollisionEnter (e) {
        let target: Actor = e.otherCollider.node.getComponent(Actor);
        if (target) {
            if (target.modelType == this.modelType) {
                this.playPerfect();
            } else {
                this.playFail();
            }
        }
    }

    unuse () {
        this.callback = null;
        this.node.active = false;
        this.begin = null;
        this.end = null;
        this.totalTime = 0;
        this.curTime = 0;
    }

    reuse (begin, end, time: number = 1000, callback) {
        this.node.active = true;
        this.callback = callback;
        this.begin = begin;
        this.end = end;
        this.totalTime = time;
        this.curTime = 0;
        this.move();
    }

    move () {
        let position = this.node.getPosition();
        this.beginY = position.y;
        this.endY = Math.random() * 640;
        this.node.setPosition(this.begin, position.y, position.z);
        this.node.active = true;
    }

    playPerfect () {
        this.curTime = this.totalTime / 1000;
        this.callback(this.modelType, this.node);
    }

    playFail () {
        this.curTime = this.totalTime / 1000;
        this.callback(this.modelType, this.node);
    }

    update (dt) {
        let totalTime = this.totalTime / 1000;
        if (this.curTime >= totalTime) {
            return
        }
        this.curTime += dt;
        this.curTime = Math.min(this.curTime, totalTime);
        // x
        let dirxX = (this.end - this.begin) > 0 ? 1 : -1;
        let totalX = Math.abs(this.end - this.begin);
        let offsetX = (this.curTime / totalTime) * totalX * dirxX;
        let positionX = this.begin + offsetX;
        // y
        let dirY = (this.endY - this.beginY) > 0 ? 1 : -1;
        let totalY = Math.abs(this.endY - this.beginY);
        let offsetY = (this.curTime / totalTime) * totalY * dirY;
        let positionY = this.beginY + offsetY;

        let position = this.node.getPosition();
        this.node.setPosition(positionX, positionY, position.z);

        if (this.curTime >= totalTime) {
            this.callback(this.modelType, this.node);
        }

        this.node.eulerAngles.z
        this.node.setRotationFromEuler(0, 0, this.node.eulerAngles.z + 1);
    }
}
