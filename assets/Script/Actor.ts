// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, Enum, SphereColliderComponent } from "Cocos3D";
import { Energy } from "./Energy";
import { ModelType } from "./Enums";

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

    modelType = ModelType.SPHERE;

    scaleFactor = 1;

    onLoad () {
        //碰撞事件
        this.collider.on("onTriggerEnter", this.onCollisionEnter, this);
    }
    
    onDestroy () {
        //碰撞事件
        this.collider.off("onTriggerEnter", this.onCollisionEnter, this);
    }
    
    onCollisionEnter (e) {
        let target: Energy = e.otherCollider.node.getComponent(Energy);
        if (target.modelType == this.modelType) {
            let scale = this.node.getScale();
            scale.add(vec3.create(this.scaleFactor, this.scaleFactor, this.scaleFactor));
            this.node.setScale(scale);
        } else {
            let scale = this.node.getScale();
            scale.subtract(vec3.create(this.scaleFactor, this.scaleFactor, this.scaleFactor));
            this.node.setScale(scale);
        }
    }
}
