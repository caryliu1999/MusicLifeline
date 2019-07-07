import { _decorator, Component, AudioSourceComponent, systemEvent, SystemEvent, EventKeyboard, LabelComponent } from "Cocos3D";
const { ccclass, property } = _decorator;

@ccclass("Recorder")
export class Recorder extends Component {

    @property(LabelComponent)
    public label = null;

    public data = [];
    protected source = null;

    start () {
        this.source = this.node.getComponent(AudioSourceComponent);
    }

	onLoad () {
		systemEvent.on(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
	}

	onDestroy () {
		systemEvent.off(SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown (e: EventKeyboard) {
        if (e.keyCode !== cc.macro.KEY.space) return;
        const cur = this.source.currentTime;
        this.data = this.data.filter((n) => n < cur * 1000);
        this.data.push(Math.round(cur * 1000));
        this.label.string = `latest at ${cur.toFixed(3)}s, total of ${this.data.length} keys`;
    }

    // cc.director.getScene().getComponentInChildren('Recorder').string
    get string () {
        return `export const beats = ${this.data}];`;
    }
}
