// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

import { _decorator, Component, AudioSourceComponent, Enum } from "Cocos3D";
import { music1 } from "./data";
import { Pointer } from "./Pointer";
import { Energy } from "./Energy";
import { GameState , MatchState, ModelType} from "./Enums";

const { ccclass, property } = _decorator;


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

    @property([cc.Node])
    modelLayer = [];

    @property([cc.Node])
    models = [];

    @property
    endX = 0;

    @property
    beginX = 0;

    state = GameState.STOP;
    musicData = [];
    musicIndex = 0;
    curTime = 0;
    offset = 0;
    actorNum = 4;
    pool = new cc.NodePool();
    modelPool = [];
    actorInputData = [];
    mistake = 50; // 允许误差 50 ms

    start () {
        // init pool
        for (let i = 0; i < this.models.length; i++) {
            this.modelPool[i] = new cc.NodePool();
        }
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
        comp.reuse(this.begin.getPosition(), this.target.getPosition(), 1000, this.complete.bind(this));
    }

    complete (node) {
        this.pool.put(node);

        for (let i = 0; i < this.actorNum; i++) {
            //this.emission(i, this.isMatch(i));
            this.recordMsg(i, 0);
        }
    }

    recordMsg (id, time) {
        this.actorInputData[id] = this.curTime;
        this.emission(id, this.isMatch(id));
    }

    isMatch (id) {
        let match = (this.musicData[this.musicIndex] / 1000 - this.curTime) < this.mistake;
        return match ? MatchState.PERFECT : MatchState.FAIL;
    }

    emission (id, type) {
        let modelType;
        switch(type) {
            case MatchState.PERFECT :
            {
                modelType = ModelType.SPHERE;
                break;
            }
            case MatchState.FAIL :
            {
                modelType = ModelType.RECT;
                break;
            }
        }

        let energy = this.models[modelType];
        let model = this.modelPool[modelType].get();
        if (!model) {
            model = cc.instantiate(energy);
        }
        let layer = this.modelLayer[id];
        layer.addChild(model);
        let comp = model.getComponent(Energy);
        comp.reuse(this.beginX, this.endX, 3000, this.modelEnd.bind(this));
    }

    modelEnd (modelType, node) {
        this.modelPool[modelType].put(node);
    }
}
