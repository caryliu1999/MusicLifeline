const { vec3, quat, clamp } = cc.vmath;
const { ccclass, property } = cc._decorator;

const v3_1 = cc.v3();
const v3_2 = cc.v3();
const qt_1 = cc.quat();

const id_forward = cc.v3(0, 0, 1);

/**
 * Third person camera component.
 * Follows the target node using given rotation, distance and offset.
 */
@ccclass
export class ThirdPersonCamera extends cc.Component {

    @property(cc.Node)
    target = null;

    @property
    minDistance = 1;

    @property
    maxDistance = 30;

    @property
	_distance = 2;

	@property
	_targetOffset = cc.v3(0, 0.5, 0);

	@property
	_euler = cc.v3();

	/**
	 * Camera rotation, in euler angles
	 */
	@property
	set rotation (val) {
		vec3.copy(this._euler, val);
	}
	get rotation () {
		return this._euler;
	}

	/**
	 * How far away from the target
	 */
	@property
	set distance (val) {
        this._distance = clamp(val, this.minDistance, this.maxDistance);
	}
	get distance () {
		return this._distance;
	}

	/**
	 * The offset between target node position and the actual point the camera is looking at
	 */
	@property
	set targetOffset (val) {
		vec3.copy(this._targetOffset, val);
	}
	get targetOffset () {
		return this._targetOffset;
	}

	_rotating = false;

	onLoad () {
		cc.systemEvent.on(cc.SystemEvent.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
        // mouse events included
        cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_START, this.onTouchBegin, this);
        cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
		cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
	}

	onDestroy () {
		cc.systemEvent.off(cc.SystemEvent.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.TOUCH_START, this.onTouchBegin, this);
        cc.systemEvent.off(cc.SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
		cc.systemEvent.off(cc.SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
	}

	// update camera after others
	lateUpdate () {
        if (!this.target) return;
		// get view direction
		quat.fromEuler(qt_1, this._euler.x, this._euler.y, this._euler.z);
		vec3.transformQuat(v3_1, id_forward, qt_1);
        vec3.scale(v3_1, v3_1, this.distance);
		// get target look at point
		this.target.getWorldPosition(v3_2);
		vec3.add(v3_2, v3_2, this._targetOffset);
		// update camera transform
        vec3.sub(v3_1, v3_2, v3_1);
        this.node.setWorldPosition(v3_1);
        this.node.lookAt(v3_2);
    }

	onMouseWheel (e) {
        const delta = -e.getScrollY() / 120; // delta is positive when scroll down
		this.distance = this._distance + delta;
	}

	onTouchBegin (e) {
		const startX = e._startPoint.x;
		if (startX > cc.winSize.width / 2) {
        	cc.game.canvas.requestPointerLock();
			this._rotating = true;
		}
	}

	onTouchMove (e) {
		if (!this._rotating) return;
		// ENGINE-TEAM: no clean public way to prevent object allocation (#470)
		const curX = e.getLocationX(), curY = e.getLocationY();
		const preX = e._prevPoint.x, preY = e._prevPoint.y;
		const dx = curX - preX, dy = curY - preY;

		this._euler.x += -dy * 0.2;
		this._euler.y += -dx * 0.2;
	}

	onTouchEnd (e) {
		const startX = e._startPoint.x;
		if (startX > cc.winSize.width / 2) {
        	document.exitPointerLock();
			this._rotating = false;
		}
	}
}
