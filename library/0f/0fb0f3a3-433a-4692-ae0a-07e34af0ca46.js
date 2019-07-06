"use strict";

System.register("project:///assets/Script/Game.ts", ["./MusicManager"], function (_export, _context) {
  "use strict";

  var MusicManager, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, _cc, _decorator, Component, CameraComponent, SphereColliderComponent, _cc$geometry, intersect, ray, vec3, ccclass, property, Game;

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
    _dec2: void 0,
    _dec3: void 0,
    _dec4: void 0,
    _class: void 0,
    _class2: void 0,
    _descriptor: void 0,
    _descriptor2: void 0,
    _descriptor3: void 0,
    _temp: void 0
  });

  return {
    setters: [function (_MusicManager) {
      MusicManager = _MusicManager.MusicManager;
    }],
    execute: function () {
      cc._RF.push(window.module || {}, "0fb0fOjQzpGkq4KB+NK8MpG", "Game"); // begin Game


      // Learn cc.Class:
      //  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
      //  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
      // Learn Attribute:
      //  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
      //  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
      // Learn life-cycle callbacks:
      //  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
      //  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
      _cc = cc;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      CameraComponent = _cc.CameraComponent;
      SphereColliderComponent = _cc.SphereColliderComponent;
      _cc$geometry = cc.geometry;
      intersect = _cc$geometry.intersect;
      ray = _cc$geometry.ray;
      vec3 = cc.vmath.vec3;
      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("Game", Game = (_dec = ccclass("Game"), _dec2 = property(CameraComponent), _dec3 = property(SphereColliderComponent), _dec4 = property(MusicManager), _dec(_class = (_class2 = (_temp =
      /*#__PURE__*/
      function (_Component) {
        _inherits(Game, _Component);

        function Game() {
          var _getPrototypeOf2;

          var _this;

          _classCallCheck(this, Game);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Game)).call.apply(_getPrototypeOf2, [this].concat(args)));

          _initializerDefineProperty(_this, "mainCamera", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "collider", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "musicMgr", _descriptor3, _assertThisInitialized(_this));

          _this._touch = false;
          return _this;
        }

        _createClass(Game, [{
          key: "onLoad",
          value: function onLoad() {
            // mouse events included
            cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_START, this.onTouchBegin, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
            cc.systemEvent.on(cc.SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
          }
        }, {
          key: "onDestroy",
          value: function onDestroy() {
            cc.systemEvent.off(cc.SystemEvent.EventType.TOUCH_START, this.onTouchBegin, this);
            cc.systemEvent.off(cc.SystemEvent.EventType.TOUCH_MOVE, this.onTouchMove, this);
            cc.systemEvent.off(cc.SystemEvent.EventType.TOUCH_END, this.onTouchEnd, this);
          }
        }, {
          key: "onTouchBegin",
          value: function onTouchBegin(e) {
            var point = e._startPoint;
            var ray = this.mainCamera.screenPointToRay(point.x, point.y);
            var sphere = this.collider.node;
            var num = intersect.ray_sphere(ray, {
              radius: this.collider.radius * sphere.getScale().x,
              center: sphere.getWorldPosition()
            });

            if (num !== 0) {
              this._touch = true;
            }
          }
        }, {
          key: "onTouchMove",
          value: function onTouchMove(e) {
            // ENGINE-TEAM: no clean public way to prevent object allocation (#470)
            var curX = e.getLocationX(),
                curY = e.getLocationY();
            var touchPos = this.mainCamera.screenToWorld(vec3.create(curX, curY, 0));

            if (this._touch) {
              var wp = this.collider.node.getWorldPosition();
              this.collider.node.setWorldPosition(touchPos.x, touchPos.y, wp.z);
            }
          }
        }, {
          key: "onTouchEnd",
          value: function onTouchEnd(e) {
            this._touch = false;
          }
        }, {
          key: "onStart",
          value: function onStart() {
            this.musicMgr.play();
          }
        }]);

        return Game;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "mainCamera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "collider", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "musicMgr", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cc._RF.pop(); // end Game

    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3Q6Ly8vYXNzZXRzL1NjcmlwdC9HYW1lLnRzIl0sIm5hbWVzIjpbIk11c2ljTWFuYWdlciIsImNjIiwiZ2VvbWV0cnkiLCJpbnRlcnNlY3QiLCJyYXkiLCJ2ZWMzIiwidm1hdGgiLCJjY2NsYXNzIiwiX2RlY29yYXRvciIsInByb3BlcnR5IiwiR2FtZSIsIkNhbWVyYUNvbXBvbmVudCIsIlNwaGVyZUNvbGxpZGVyQ29tcG9uZW50IiwiX3RvdWNoIiwic3lzdGVtRXZlbnQiLCJvbiIsIlN5c3RlbUV2ZW50IiwiRXZlbnRUeXBlIiwiVE9VQ0hfU1RBUlQiLCJvblRvdWNoQmVnaW4iLCJUT1VDSF9NT1ZFIiwib25Ub3VjaE1vdmUiLCJUT1VDSF9FTkQiLCJvblRvdWNoRW5kIiwib2ZmIiwiZSIsInBvaW50IiwiX3N0YXJ0UG9pbnQiLCJtYWluQ2FtZXJhIiwic2NyZWVuUG9pbnRUb1JheSIsIngiLCJ5Iiwic3BoZXJlIiwiY29sbGlkZXIiLCJub2RlIiwibnVtIiwicmF5X3NwaGVyZSIsInJhZGl1cyIsImdldFNjYWxlIiwiY2VudGVyIiwiZ2V0V29ybGRQb3NpdGlvbiIsImN1clgiLCJnZXRMb2NhdGlvblgiLCJjdXJZIiwiZ2V0TG9jYXRpb25ZIiwidG91Y2hQb3MiLCJzY3JlZW5Ub1dvcmxkIiwiY3JlYXRlIiwid3AiLCJzZXRXb3JsZFBvc2l0aW9uIiwieiIsIm11c2ljTWdyIiwicGxheSIsIkNvbXBvbmVudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVdTQSxNQUFBQSxZLGlCQUFBQSxZOzs7MkVBVGdFOzs7QUFGekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7cUJBSzJCQyxFQUFFLENBQUNDLFE7QUFBdEJDLE1BQUFBLFMsZ0JBQUFBLFM7QUFBWUMsTUFBQUEsRyxnQkFBQUEsRztBQUNaQyxNQUFBQSxJLEdBQVNKLEVBQUUsQ0FBQ0ss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QixDQUFvQ0osUUFBUSxDQUFDZixDQUE3QyxFQUFnRGUsUUFBUSxDQUFDZCxDQUF6RCxFQUE0RGlCLEVBQUUsQ0FBQ0UsQ0FBL0Q7QUFDSDtBQUNKOzs7cUNBRVF6QixDLEVBQUc7QUFDZCxpQkFBS1osTUFBTCxHQUFjLEtBQWQ7QUFDRzs7O29DQUVVO0FBQ1AsaUJBQUtzQyxRQUFMLENBQWNDLElBQWQ7QUFDSDs7OztRQTFEcUJDLFM7Ozs7O2lCQVFULEk7Ozs7Ozs7aUJBR0YsSTs7Ozs7OztpQkFHQSxJOzs7O29CQTlCRyIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCB7IF9kZWNvcmF0b3IsIENvbXBvbmVudCwgRXZlbnRUb3VjaCwgQ2FtZXJhQ29tcG9uZW50LCBTcGhlcmVDb2xsaWRlckNvbXBvbmVudCwgdXRpbHMsIE1vZGVsQ29tcG9uZW50fSBmcm9tIFwiQ29jb3MzRFwiO1xuaW1wb3J0IHsgTXVzaWNNYW5hZ2VyIH0gZnJvbSBcIi4vTXVzaWNNYW5hZ2VyXCI7XG5cbmNvbnN0IHsgaW50ZXJzZWN0ICwgcmF5fSA9IGNjLmdlb21ldHJ5O1xuY29uc3QgeyB2ZWMzIH0gPSBjYy52bWF0aDtcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzKFwiR2FtZVwiKVxuZXhwb3J0IGNsYXNzIEdhbWUgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIC8qIGNsYXNzIG1lbWJlciBjb3VsZCBiZSBkZWZpbmVkIGxpa2UgdGhpcyAqL1xuICAgIC8vIGR1bW15ID0gJyc7XG5cbiAgICAvKiB1c2UgYHByb3BlcnR5YCBkZWNvcmF0b3IgaWYgeW91ciB3YW50IHRoZSBtZW1iZXIgdG8gYmUgc2VyaWFsaXphYmxlICovXG4gICAgLy8gQHByb3BlcnR5XG4gICAgLy8gc2VyaWFsaXphYmxlRHVtbXkgPSAwO1xuICAgIEBwcm9wZXJ0eShDYW1lcmFDb21wb25lbnQpXG4gICAgbWFpbkNhbWVyYSA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoU3BoZXJlQ29sbGlkZXJDb21wb25lbnQpXG4gICAgY29sbGlkZXIgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KE11c2ljTWFuYWdlcilcbiAgICBtdXNpY01nciA9IG51bGw7XG5cbiAgICBfdG91Y2ggPSBmYWxzZTtcblxuICAgIG9uTG9hZCAoKSB7XG4gICAgICAgIC8vIG1vdXNlIGV2ZW50cyBpbmNsdWRlZFxuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuVE9VQ0hfU1RBUlQsIHRoaXMub25Ub3VjaEJlZ2luLCB0aGlzKTtcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub24oY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmUsIHRoaXMpO1xuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vbihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuXHR9XG5cblx0b25EZXN0cm95ICgpIHtcbiAgICAgICAgY2Muc3lzdGVtRXZlbnQub2ZmKGNjLlN5c3RlbUV2ZW50LkV2ZW50VHlwZS5UT1VDSF9TVEFSVCwgdGhpcy5vblRvdWNoQmVnaW4sIHRoaXMpO1xuICAgICAgICBjYy5zeXN0ZW1FdmVudC5vZmYoY2MuU3lzdGVtRXZlbnQuRXZlbnRUeXBlLlRPVUNIX01PVkUsIHRoaXMub25Ub3VjaE1vdmUsIHRoaXMpO1xuXHRcdGNjLnN5c3RlbUV2ZW50Lm9mZihjYy5TeXN0ZW1FdmVudC5FdmVudFR5cGUuVE9VQ0hfRU5ELCB0aGlzLm9uVG91Y2hFbmQsIHRoaXMpO1xuICAgIH1cbiAgICBcblxuXHRvblRvdWNoQmVnaW4gKGUpIHtcblx0XHRjb25zdCBwb2ludCA9IGUuX3N0YXJ0UG9pbnQ7XG4gICAgICAgIGxldCByYXkgPSB0aGlzLm1haW5DYW1lcmEuc2NyZWVuUG9pbnRUb1JheShwb2ludC54LCBwb2ludC55KTtcbiAgICAgICAgbGV0IHNwaGVyZSA9IHRoaXMuY29sbGlkZXIubm9kZTtcbiAgICAgICAgbGV0IG51bSA9IGludGVyc2VjdC5yYXlfc3BoZXJlKHJheSwge3JhZGl1czogdGhpcy5jb2xsaWRlci5yYWRpdXMgKiBzcGhlcmUuZ2V0U2NhbGUoKS54LCBjZW50ZXI6IHNwaGVyZS5nZXRXb3JsZFBvc2l0aW9uKCl9KTtcbiAgICAgICAgaWYgKG51bSAhPT0gMCkge1xuICAgICAgICAgICAgdGhpcy5fdG91Y2ggPSB0cnVlO1xuICAgICAgICB9XG5cdH1cblxuXHRvblRvdWNoTW92ZSAoZSkge1xuXHRcdC8vIEVOR0lORS1URUFNOiBubyBjbGVhbiBwdWJsaWMgd2F5IHRvIHByZXZlbnQgb2JqZWN0IGFsbG9jYXRpb24gKCM0NzApXG4gICAgICAgIGNvbnN0IGN1clggPSBlLmdldExvY2F0aW9uWCgpLCBjdXJZID0gZS5nZXRMb2NhdGlvblkoKTtcbiAgICAgICAgbGV0IHRvdWNoUG9zID0gdGhpcy5tYWluQ2FtZXJhLnNjcmVlblRvV29ybGQodmVjMy5jcmVhdGUoY3VyWCwgY3VyWSwgMCkpIFxuICAgICAgICBpZiAodGhpcy5fdG91Y2gpIHtcbiAgICAgICAgICAgIGxldCB3cCA9IHRoaXMuY29sbGlkZXIubm9kZS5nZXRXb3JsZFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB0aGlzLmNvbGxpZGVyLm5vZGUuc2V0V29ybGRQb3NpdGlvbih0b3VjaFBvcy54LCB0b3VjaFBvcy55LCB3cC56KTtcbiAgICAgICAgfVxuICAgIH1cblxuXHRvblRvdWNoRW5kIChlKSB7XG5cdFx0dGhpcy5fdG91Y2ggPSBmYWxzZTtcbiAgICB9XG4gICAgXG4gICAgb25TdGFydCAoKSB7XG4gICAgICAgIHRoaXMubXVzaWNNZ3IucGxheSgpO1xuICAgIH1cbn1cbiJdfQ==