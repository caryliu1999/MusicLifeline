// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { _decorator, Component } from "Cocos3D";
const { ccclass, property } = _decorator;

@ccclass("connectserver")
export class connectserver extends Component {
    /* class member could be defined like this */
    // dummy = '';

    /* use `property` decorator if your want the member to be serializable */
    @property
    public serverAddress: string = '';

    start () {
        // Your initialization goes here.
    }

    onClick () {
		const serverUrl = 'ws://' + this.serverAddress + ':8080';
		const connection = new WebSocket(serverUrl);
		connection.onmessage = () => {
			// clap
			console.log('clap');
		};
		
		connection.onopen = () => {
			cc.director.loadScene('Game');
		}
	}
}
