// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Enum, SphereColliderComponent, ProgressBarComponent } from "Cocos3D";
import { Energy } from "./Energy";
import { ModelType, GameState } from "./Enums";
import { MusicManager } from "./MusicManager";

const { ccclass, property } = _decorator;
const { vec3 } = cc.vmath;

@ccclass("Actor")
export class Actor extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(SphereColliderComponent)
    collider = null;
    @property(ProgressBarComponent)
    progress = null;
    @property(MusicManager)
    musicMgr = null;

    modelType = ModelType.SPHERE;

    scaleFactor = 1;
    maxScale = 1000;
    minScale = 30;

    time = 0;
    subTime = 2000;
    onLoad () {
        //碰撞事件
        this.collider.on("onTriggerEnter", this.onCollisionEnter, this);
    }
    
    onDestroy () {
        //碰撞事件
        this.collider.off("onTriggerEnter", this.onCollisionEnter, this);
    }
    
    onCollisionEnter (e) {
        if (this.musicMgr.state != GameState.PLAY) {
            return
        }  

        let target: Energy = e.otherCollider.node.getComponent(Energy);
        if (target.modelType == this.modelType) {
            let scale = this.node.getScale();
            if (scale.x < this.maxScale) {
                scale.add(vec3.create(this.scaleFactor, this.scaleFactor, this.scaleFactor));
                this.node.setScale(scale);
            }
        } else {
            let scale = this.node.getScale();
            if (scale.x > this.minScale) {
                let factor = this.scaleFactor * 5;
                scale.subtract(vec3.create(factor, factor, factor));
                this.node.setScale(scale);
            }
        }

        this.updateProgress();
    }

    updateProgress () {
        //let cur = (this.node.getScale().x - this.minScale) / (this.maxScale - this.minScale);
        if (this.node.getScale().x <= this.minScale) {
            //this.musicMgr.gameOver(false);
        }
        //this.progress.progress = cur;
    }

    update (dt) {
        if (this.musicMgr.state != GameState.PLAY) {
            return
        }   
        this.time += dt * 1000;
        if (this.time >= this.subTime) {
            let scale = this.node.getScale();
            if (scale.x > this.minScale) {
                let factor = this.scaleFactor;
                scale.subtract(vec3.create(factor, factor, factor));
                this.node.setScale(scale);
                this.updateProgress();
            }
            this.time = 0;
        }
    }
}
