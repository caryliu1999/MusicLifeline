// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, EventTouch, CameraComponent, SphereColliderComponent} from "Cocos3D";
import { MusicManager } from "./MusicManager";
import { ModelType, GameState } from "./Enums";

const { intersect } = cc.geometry;
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

    @property(cc.Node)
    startNode = null;

    @property(MusicManager)
    musicMgr = null;

    @property
    debug = 0;

    _touch = false;

    //_modelType = ModelType.SPHERE;
    _modelType = null;

    time = 0;

    onLoad () {
        // mouse events included
        cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_START, this.onTouchBegin, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);

        cc.director._physicsSystem.enabled = true;
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
        const serverUrl = 'ws://127.0.0.1:8080';
		const connection = new WebSocket(serverUrl);
		connection.onmessage = (event: any) => {
			// clap
            console.log('clap ++ ' + event.data);
            this.dispatchMessage(parseInt(event.data), 0);
		};
		
		connection.onopen = () => {
            this.startNode.active = false;
			this.musicMgr.play();
		}
        // game start
    }

    dispatchMessage (id, time) {
        if (id > 20) {
            return
        }
        let index = id % 4;
        if (index < 4 && index > 0) {
            this.musicMgr.recordMsg(index, time);
        }
    }

    update (dt) {
        if (this.debug == 0 || this.musicMgr.state != GameState.PLAY) {
            return
        }

        this.time += dt;
        if (this.time < 0.2) return;
        this.time = 0;
        this.musicMgr.recordMsg(0, 0);
        this.musicMgr.recordMsg(1, 0);
        this.musicMgr.recordMsg(2, 0);
        this.musicMgr.recordMsg(3, 0);
    }
}
