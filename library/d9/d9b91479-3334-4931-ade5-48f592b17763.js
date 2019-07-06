"use strict";

System.register("project:///assets/Script/third-person-camera.ts", [], function (_export, _context) {
  "use strict";

  var _dec, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _temp, _cc$vmath, vec3, quat, clamp, _cc$_decorator, ccclass, property, v3_1, v3_2, qt_1, id_forward, ThirdPersonCamera;

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and set to use loose mode. ' + 'To use proposal-class-properties in spec mode with decorators, wait for ' + 'the next major version of decorators in stage 2.'); }

  _export({
    _dec: void 0,
    _class: void 0,
    _class2: void 0,
    _descriptor: void 0,
    _descriptor2: void 0,
    _descriptor3: void 0,
    _descriptor4: void 0,
    _descriptor5: void 0,
    _descriptor6: void 0,
    _temp: void 0
  });

  return {
    setters: [],
    execute: function () {
      cc._RF.push(window.module || {}, "d9b91R5MzRJMa3lSPWSsXdj", "third-person-camera"); // begin third-person-camera


      _cc$vmath = cc.vmath;
      vec3 = _cc$vmath.vec3;
      quat = _cc$vmath.quat;
      clamp = _cc$vmath.clamp;
      _cc$_decorator = cc._decorator;
      ccclass = _cc$_decorator.ccclass;
      property = _cc$_decorator.property;
      v3_1 = cc.v3();
      v3_2 = cc.v3();
      qt_1 = cc.quat();
      id_forward = cc.v3(0, 0, 1);
      /**
       * Third person camera component.
       * Follows the target node using given rotation, distance and offset.
       */

      _export("ThirdPersonCamera", ThirdPersonCamera = (_dec = property(cc.Node), ccclass(_class = (_class2 = (_temp =
      /*#__PURE__*/
      function (_cc$Component) {
        _inherits(ThirdPersonCamera, _cc$Component);

        function ThirdPersonCamera() {
          var _getPrototypeOf2;

          var _this;

          _classCallCheck(this, ThirdPersonCamera);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ThirdPersonCamera)).call.apply(_getPrototypeOf2, [this].concat(args)));

          _initializerDefineProperty(_this, "target", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "minDistance", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "maxDistance", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_distance", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_targetOffset", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "_euler", _descriptor6, _assertThisInitialized(_this));

          _this._rotating = false;
          return _this;
        }

        _createClass(ThirdPersonCamera, [{
          key: "onLoad",
          value: function onLoad() {
            cc.systemEvent.on(cc.SystemEvent.EventType.MOUSE_WHEEL, this.onMouseWheel, this); // mouse events included

            cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_START, this.onTouchBegin, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
          }
        }, {
          key: "onDestroy",
          value: function onDestroy() {
            cc.systemEvent.off(cc.SystemEvent.EventType.MOUSE_WHEEL, this.onMouseWheel, this);
            cc.systemEvent.off(cc.SystemEvent.EventType.TOUCH_START, this.onTouchBegin, this);
            cc.systemEvent.off(cc.SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
            cc.systemEvent.off(cc.SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
          } // update camera after others

        }, {
          key: "lateUpdate",
          value: function lateUpdate() {
            if (!this.target) return; // get view direction

            quat.fromEuler(qt_1, this._euler.x, this._euler.y, this._euler.z);
            vec3.transformQuat(v3_1, id_forward, qt_1);
            vec3.scale(v3_1, v3_1, this.distance); // get target look at point

            this.target.getWorldPosition(v3_2);
            vec3.add(v3_2, v3_2, this._targetOffset); // update camera transform

            vec3.sub(v3_1, v3_2, v3_1);
            this.node.setWorldPosition(v3_1);
            this.node.lookAt(v3_2);
          }
        }, {
          key: "onMouseWheel",
          value: function onMouseWheel(e) {
            var delta = -e.getScrollY() / 120; // delta is positive when scroll down

            this.distance = this._distance + delta;
          }
        }, {
          key: "onTouchBegin",
          value: function onTouchBegin(e) {
            var startX = e._startPoint.x;

            if (startX > cc.winSize.width / 2) {
              cc.game.canvas.requestPointerLock();
              this._rotating = true;
            }
          }
        }, {
          key: "onTouchMove",
          value: function onTouchMove(e) {
            if (!this._rotating) return; // ENGINE-TEAM: no clean public way to prevent object allocation (#470)

            var curX = e.getLocationX(),
                curY = e.getLocationY();
            var preX = e._prevPoint.x,
                preY = e._prevPoint.y;
            var dx = curX - preX,
                dy = curY - preY;
            this._euler.x += -dy * 0.2;
            this._euler.y += -dx * 0.2;
          }
        }, {
          key: "onTouchEnd",
          value: function onTouchEnd(e) {
            var startX = e._startPoint.x;

            if (startX > cc.winSize.width / 2) {
              document.exitPointerLock();
              this._rotating = false;
            }
          }
        }, {
          key: "rotation",

          /**
           * Camera rotation, in euler angles
           */
          set: function set(val) {
            vec3.copy(this._euler, val);
          },
          get: function get() {
            return this._euler;
          }
          /**
           * How far away from the target
           */

        }, {
          key: "distance",
          set: function set(val) {
            this._distance = clamp(val, this.minDistance, this.maxDistance);
          },
          get: function get() {
            return this._distance;
          }
          /**
           * The offset between target node position and the actual point the camera is looking at
           */

        }, {
          key: "targetOffset",
          set: function set(val) {
            vec3.copy(this._targetOffset, val);
          },
          get: function get() {
            return this._targetOffset;
          }
        }]);

        return ThirdPersonCamera;
      }(cc.Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "minDistance", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "maxDistance", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 30;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "_distance", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 2;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "_targetOffset", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return cc.v3(0, 0.5, 0);
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "_euler", [property], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return cc.v3();
        }
      }), _applyDecoratedDescriptor(_class2.prototype, "rotation", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "rotation"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "distance", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "distance"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "targetOffset", [property], Object.getOwnPropertyDescriptor(_class2.prototype, "targetOffset"), _class2.prototype)), _class2)) || _class));

      cc._RF.pop(); // end third-person-camera

    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3Q6Ly8vYXNzZXRzL1NjcmlwdC90aGlyZC1wZXJzb24tY2FtZXJhLnRzIl0sIm5hbWVzIjpbImNjIiwidm1hdGgiLCJ2ZWMzIiwicXVhdCIsImNsYW1wIiwiX2RlY29yYXRvciIsImNjY2xhc3MiLCJwcm9wZXJ0eSIsInYzXzEiLCJ2MyIsInYzXzIiLCJxdF8xIiwiaWRfZm9yd2FyZCIsIlRoaXJkUGVyc29uQ2FtZXJhIiwiTm9kZSIsIl9yb3RhdGluZyIsInN5c3RlbUV2ZW50Iiwib24iLCJTeXN0ZW1FdmVudCIsIkV2ZW50VHlwZSIsIk1PVVNFX1dIRUVMIiwib25Nb3VzZVdoZWVsIiwiVE9VQ0hfU1RBUlQiLCJvblRvdWNoQmVnaW4iLCJUT1VDSF9NT1ZFIiwib25Ub3VjaE1vdmUiLCJUT1VDSF9FTkQiLCJvblRvdWNoRW5kIiwib2ZmIiwidGFyZ2V0IiwiZnJvbUV1bGVyIiwiX2V1bGVyIiwieCIsInkiLCJ6IiwidHJhbnNmb3JtUXVhdCIsInNjYWxlIiwiZGlzdGFuY2UiLCJnZXRXb3JsZFBvc2l0aW9uIiwiYWRkIiwiX3RhcmdldE9mZnNldCIsInN1YiIsIm5vZGUiLCJzZXRXb3JsZFBvc2l0aW9uIiwibG9va0F0IiwiZSIsImRlbHRhIiwiZ2V0U2Nyb2xsWSIsIl9kaXN0YW5jZSIsInN0YXJ0WCIsIl9zdGFydFBvaW50Iiwid2luU2l6ZSIsIndpZHRoIiwiZ2FtZSIsImNhbnZhcyIsInJlcXVlc3RQb2ludGVyTG9jayIsImN1clgiLCJnZXRMb2NhdGlvblgiLCJjdXJZIiwiZ2V0TG9jYXRpb25ZIiwicHJlWCIsIl9wcmV2UG9pbnQiLCJwcmVZIiwiZHgiLCJkeSIsImRvY3VtZW50IiwiZXhpdFBvaW50ZXJMb2NrIiwidmFsIiwiY29weSIsIm1pbkRpc3RhbmNlIiwibWF4RGlzdGFuY2UiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzBGQUV5RTs7O2tC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QSxROzs7OztpQkFDYSxFOztvRkFFYkEsUTs7Ozs7aUJBQ1EsQzs7d0ZBRVhBLFE7Ozs7O2lCQUNlUCxFQUFFLENBQUNTLEVBQUgsQ0FBTSxDQUFOLEVBQVMsR0FBVCxFQUFjLENBQWQsQzs7aUZBRWZGLFE7Ozs7O2lCQUNRUCxFQUFFLENBQUNTLEVBQUgsRTs7b0VBS1JGLFEsaUpBV0FBLFEscUpBV0FBLFE7O29CQXpEZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCB7IHZlYzMsIHF1YXQsIGNsYW1wIH0gPSBjYy52bWF0aDtcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IGNjLl9kZWNvcmF0b3I7XG5cbmNvbnN0IHYzXzEgPSBjYy52MygpO1xuY29uc3QgdjNfMiA9IGNjLnYzKCk7XG5jb25zdCBxdF8xID0gY2MucXVhdCgpO1xuXG5jb25zdCBpZF9mb3J3YXJkID0gY2MudjMoMCwgMCwgMSk7XG5cbi8qKlxuICogVGhpcmQgcGVyc29uIGNhbWVyYSBjb21wb25lbnQuXG4gKiBGb2xsb3dzIHRoZSB0YXJnZXQgbm9kZSB1c2luZyBnaXZlbiByb3RhdGlvbiwgZGlzdGFuY2UgYW5kIG9mZnNldC5cbiAqL1xuQGNjY2xhc3NcbmV4cG9ydCBjbGFzcyBUaGlyZFBlcnNvbkNhbWVyYSBleHRlbmRzIGNjLkNvbXBvbmVudCB7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICB0YXJnZXQgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5XG4gICAgbWluRGlzdGFuY2UgPSAxO1xuXG4gICAgQHByb3BlcnR5XG4gICAgbWF4RGlzdGFuY2UgPSAzMDtcblxuICAgIEBwcm9wZXJ0eVxuXHRfZGlzdGFuY2UgPSAyO1xuXG5cdEBwcm9wZXJ0eVxuXHRfdGFyZ2V0T2Zmc2V0ID0gY2MudjMoMCwgMC41LCAwKTtcblxuXHRAcHJvcGVydHlcblx0X2V1bGVyID0gY2MudjMoKTtcblxuXHQvKipcblx0ICogQ2FtZXJhIHJvdGF0aW9uLCBpbiBldWxlciBhbmdsZXNcblx0ICovXG5cdEBwcm9wZXJ0eVxuXHRzZXQgcm90YXRpb24gKHZhbCkge1xuXHRcdHZlYzMuY29weSh0aGlzLl9ldWxlciwgdmFsKTtcblx0fVxuXHRnZXQgcm90YXRpb24gKCkge1xuXHRcdHJldHVybiB0aGlzLl9ldWxlcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBIb3cgZmFyIGF3YXkgZnJvbSB0aGUgdGFyZ2V0XG5cdCAqL1xuXHRAcHJvcGVydHlcblx0c2V0IGRpc3RhbmNlICh2YWwpIHtcbiAgICAgICAgdGhpcy5fZGlzdGFuY2UgPSBjbGFtcCh2YWwsIHRoaXMubWluRGlzdGFuY2UsIHRoaXMubWF4RGlzdGFuY2UpO1xuXHR9XG5cdGdldCBkaXN0YW5jZSAoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2Rpc3RhbmNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRoZSBvZmZzZXQgYmV0d2VlbiB0YXJnZXQgbm9kZSBwb3NpdGlvbiBhbmQgdGhlIGFjdHVhbCBwb2ludCB0aGUgY2FtZXJhIGlzIGxvb2tpbmcgYXRcblx0ICovXG5cdEBwcm9wZXJ0eVxuXHRzZXQgdGFyZ2V0T2Zmc2V0ICh2YWwpIHtcblx0XHR2ZWMzLmNvcHkodGhpcy5fdGFyZ2V0T2Zmc2V0LCB2YWwpO1xuXHR9XG5cdGdldCB0YXJnZXRPZmZzZXQgKCkge1xuXHRcdHJldHVybiB0aGlzLl90YXJnZXRPZmZzZXQ7XG5cdH1cblxuXHRfcm90YXRpbmcgPSBmYWxzZTtcblxuXHRvbkxvYWQgKCkge1xuXHRcdGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5NT1VTRV9XSEVFTCwgdGhpcy5vbk1vdXNlV2hlZWwsIHRoaXMpO1xuICAgICAgICAvLyBtb3VzZSBldmVudHMgaW5jbHVkZWRcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLlRPVUNIX1NUQVJULCB0aGlzLm9uVG91Y2hCZWdpbiwgdGhpcyk7XG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9uKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLm9uVG91Y2hNb3ZlLCB0aGlzKTtcblx0XHRjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuXHR9XG5cblx0b25EZXN0cm95ICgpIHtcblx0XHRjYy5zeXN0ZW1FdmVudC5vZmYoY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLk1PVVNFX1dIRUVMLCB0aGlzLm9uTW91c2VXaGVlbCwgdGhpcyk7XG4gICAgICAgIGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaEJlZ2luLCB0aGlzKTtcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5UT1VDSF9NT1ZFLCB0aGlzLm9uVG91Y2hNb3ZlLCB0aGlzKTtcblx0XHRjYy5zeXN0ZW1FdmVudC5vZmYoY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLlRPVUNIX0VORCwgdGhpcy5vblRvdWNoRW5kLCB0aGlzKTtcblx0fVxuXG5cdC8vIHVwZGF0ZSBjYW1lcmEgYWZ0ZXIgb3RoZXJzXG5cdGxhdGVVcGRhdGUgKCkge1xuICAgICAgICBpZiAoIXRoaXMudGFyZ2V0KSByZXR1cm47XG5cdFx0Ly8gZ2V0IHZpZXcgZGlyZWN0aW9uXG5cdFx0cXVhdC5mcm9tRXVsZXIocXRfMSwgdGhpcy5fZXVsZXIueCwgdGhpcy5fZXVsZXIueSwgdGhpcy5fZXVsZXIueik7XG5cdFx0dmVjMy50cmFuc2Zvcm1RdWF0KHYzXzEsIGlkX2ZvcndhcmQsIHF0XzEpO1xuICAgICAgICB2ZWMzLnNjYWxlKHYzXzEsIHYzXzEsIHRoaXMuZGlzdGFuY2UpO1xuXHRcdC8vIGdldCB0YXJnZXQgbG9vayBhdCBwb2ludFxuXHRcdHRoaXMudGFyZ2V0LmdldFdvcmxkUG9zaXRpb24odjNfMik7XG5cdFx0dmVjMy5hZGQodjNfMiwgdjNfMiwgdGhpcy5fdGFyZ2V0T2Zmc2V0KTtcblx0XHQvLyB1cGRhdGUgY2FtZXJhIHRyYW5zZm9ybVxuICAgICAgICB2ZWMzLnN1Yih2M18xLCB2M18yLCB2M18xKTtcbiAgICAgICAgdGhpcy5ub2RlLnNldFdvcmxkUG9zaXRpb24odjNfMSk7XG4gICAgICAgIHRoaXMubm9kZS5sb29rQXQodjNfMik7XG4gICAgfVxuXG5cdG9uTW91c2VXaGVlbCAoZSkge1xuICAgICAgICBjb25zdCBkZWx0YSA9IC1lLmdldFNjcm9sbFkoKSAvIDEyMDsgLy8gZGVsdGEgaXMgcG9zaXRpdmUgd2hlbiBzY3JvbGwgZG93blxuXHRcdHRoaXMuZGlzdGFuY2UgPSB0aGlzLl9kaXN0YW5jZSArIGRlbHRhO1xuXHR9XG5cblx0b25Ub3VjaEJlZ2luIChlKSB7XG5cdFx0Y29uc3Qgc3RhcnRYID0gZS5fc3RhcnRQb2ludC54O1xuXHRcdGlmIChzdGFydFggPiBjYy53aW5TaXplLndpZHRoIC8gMikge1xuICAgICAgICBcdGNjLmdhbWUuY2FudmFzLnJlcXVlc3RQb2ludGVyTG9jaygpO1xuXHRcdFx0dGhpcy5fcm90YXRpbmcgPSB0cnVlO1xuXHRcdH1cblx0fVxuXG5cdG9uVG91Y2hNb3ZlIChlKSB7XG5cdFx0aWYgKCF0aGlzLl9yb3RhdGluZykgcmV0dXJuO1xuXHRcdC8vIEVOR0lORS1URUFNOiBubyBjbGVhbiBwdWJsaWMgd2F5IHRvIHByZXZlbnQgb2JqZWN0IGFsbG9jYXRpb24gKCM0NzApXG5cdFx0Y29uc3QgY3VyWCA9IGUuZ2V0TG9jYXRpb25YKCksIGN1clkgPSBlLmdldExvY2F0aW9uWSgpO1xuXHRcdGNvbnN0IHByZVggPSBlLl9wcmV2UG9pbnQueCwgcHJlWSA9IGUuX3ByZXZQb2ludC55O1xuXHRcdGNvbnN0IGR4ID0gY3VyWCAtIHByZVgsIGR5ID0gY3VyWSAtIHByZVk7XG5cblx0XHR0aGlzLl9ldWxlci54ICs9IC1keSAqIDAuMjtcblx0XHR0aGlzLl9ldWxlci55ICs9IC1keCAqIDAuMjtcblx0fVxuXG5cdG9uVG91Y2hFbmQgKGUpIHtcblx0XHRjb25zdCBzdGFydFggPSBlLl9zdGFydFBvaW50Lng7XG5cdFx0aWYgKHN0YXJ0WCA+IGNjLndpblNpemUud2lkdGggLyAyKSB7XG4gICAgICAgIFx0ZG9jdW1lbnQuZXhpdFBvaW50ZXJMb2NrKCk7XG5cdFx0XHR0aGlzLl9yb3RhdGluZyA9IGZhbHNlO1xuXHRcdH1cblx0fVxufVxuIl19