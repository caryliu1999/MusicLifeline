// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, EventTouch, CameraComponent, SphereColliderComponent, utils, ModelComponent} from "Cocos3D";
import { MusicManager } from "./MusicManager";

const { intersect , ray} = cc.geometry;
const { vec3 } = cc.vmath;
const { ccclass, property } = _decorator;

@ccclass("Game")
export class Game extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    // @property
    // serializableDummy = 0;
    @property(CameraComponent)
    mainCamera = null;

    @property(SphereColliderComponent)
    collider = null;

    @property(MusicManager)
    musicMgr = null;

    _touch = false;

    onLoad () {
        // mouse events included
        cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_START, this.onTouchBegin, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
	}

	onDestroy () {
        cc.systemEvent.off(cc.SystemEvent.EventType.TOUCH_START, this.onTouchBegin, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
		cc.systemEvent.off(cc.SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
    }
    

	onTouchBegin (e) {
		const point = e._startPoint;
        let ray = this.mainCamera.screenPointToRay(point.x, point.y);
        let sphere = this.collider.node;
        let num = intersect.ray_sphere(ray, {radius: this.collider.radius * sphere.getScale().x, center: sphere.getWorldPosition()});
        if (num !== 0) {
            this._touch = true;
        }
	}

	onTouchMove (e) {
		// ENGINE-TEAM: no clean public way to prevent object allocation (#470)
        const curX = e.getLocationX(), curY = e.getLocationY();
        let touchPos = this.mainCamera.screenToWorld(vec3.create(curX, curY, 0)) 
        if (this._touch) {
            let wp = this.collider.node.getWorldPosition();
            this.collider.node.setWorldPosition(touchPos.x, touchPos.y, wp.z);
        }
    }

	onTouchEnd (e) {
		this._touch = false;
    }
    
    onStart () {
        this.musicMgr.play();
    }
}
