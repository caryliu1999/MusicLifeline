// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, EventTouch, CameraComponent, LabelComponent, SphereColliderComponent} from "Cocos3D";
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

    @property(LabelComponent)
    connection = null;

    _touch = false;

    //_modelType = ModelType.SPHERE;
    _modelType = null;

    time = 0;

    connectionNum = 0;

    connections = {};

    vec3 = vec3.create(0, 0, 0);

    onLoad () {
        // mouse events included
        cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_START, this.onTouchBegin, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);

        cc.director._physicsSystem.enabled = true;
        cc.profiler.hideStats();
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
        if (this._touch) {
            const location = e.getLocation();
            const curX = location.x, curY = location.y;
            this.vec3.x = curX;
            this.vec3.y = curY;
            let touchPos = this.mainCamera.screenToWorld(this.vec3);
            let wp = this.collider.node.getWorldPosition();
            this.collider.node.setWorldPosition(touchPos.x, touchPos.y, wp.z);
        }
    }

	onTouchEnd (e) {
		this._touch = false;
    }

    start () {
        const serverUrl = 'ws://127.0.0.1:8080';
		const connection = new WebSocket(serverUrl);
		connection.onmessage = (event: any) => {
			// clap
            //console.log('clap ++ ' + event.data);
            let i = event.data.split(event.data);
            let id = i[0] || Math.floor(Math.random() * 4);
            let have = this.connections[i];
            if (!have) {
                this.connections[i] = true;
                this.connectionNum++;
                this.connection.string = "connection: " + this.connectionNum;
            }

            this.dispatchMessage(parseInt(id), 0);
		};
		
		connection.onopen = () => {
            //this.startNode.active = false;
			//this.musicMgr.play();
		}
    }
    
    onStart () {
        // const serverUrl = 'ws://127.0.0.1:8080';
		// const connection = new WebSocket(serverUrl);
		// connection.onmessage = (event: any) => {
		// 	// clap
        //     //console.log('clap ++ ' + event.data);
        //     let i = event.data.split(event.data);
        //     let id = i[0] || Math.floor(Math.random() * 4);
        //     let have = this.connections[i];
        //     if (!have) {
        //         this.connections[i] = true;
        //         this.connectionNum++;
        //         this.connection.string = "connection: " + this.connectionNum;
        //     }

        //     this.dispatchMessage(parseInt(id), 0);
		// };
		
		// connection.onopen = () => {
        //     this.startNode.active = false;
		// 	this.musicMgr.play();
		// }
        // game start

        this.startNode.active = false;
		this.musicMgr.play();
    }

    dispatchMessage (id, time) {
        if (id > 20) {
            return
        }
        let index = id % 4;
        if (index < 4 && index > 0) {
            this.musicMgr.recordMsg(index, time);
        }

        if (this.connectionNum < 4) {
            for (let i = 0; i < 4; i ++) {
                if (i != index) {
                    //this.musicMgr.recordMsg(i, time);
                }
            }
        }
    }

    update (dt) {
        if (this.debug == 0 || this.musicMgr.state != GameState.PLAY) {
            return
        }

        this.time += dt;
        if (this.time < 0.4) return;
        this.time = 0;
        this.musicMgr.recordMsg(0, 0);
        this.musicMgr.recordMsg(1, 0);
        this.musicMgr.recordMsg(2, 0);
        this.musicMgr.recordMsg(3, 0);
    }
}
