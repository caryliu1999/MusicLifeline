"use strict";

System.register("project:///assets/Script/MusicManager.ts", ["./data", "./Pointer"], function (_export, _context) {
  "use strict";

  var music1, Pointer, _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _temp, _cc, _decorator, Component, AudioSourceComponent, ccclass, property, GameState, MusicManager;

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
    _dec5: void 0,
    _dec6: void 0,
    _class: void 0,
    _class2: void 0,
    _descriptor: void 0,
    _descriptor2: void 0,
    _descriptor3: void 0,
    _descriptor4: void 0,
    _descriptor5: void 0,
    _temp: void 0,
    GameState: void 0
  });

  return {
    setters: [function (_data) {
      music1 = _data.music1;
    }, function (_Pointer) {
      Pointer = _Pointer.Pointer;
    }],
    execute: function () {
      cc._RF.push(window.module || {}, "82aa70ZYpdK4Zk8giCpF4sX", "MusicManager"); // begin MusicManager


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
      AudioSourceComponent = _cc.AudioSourceComponent;
      ccclass = _decorator.ccclass;
      property = _decorator.property;

      (function (GameState) {
        GameState[GameState["STOP"] = 0] = "STOP";
        GameState[GameState["PLAY"] = 1] = "PLAY";
        GameState[GameState["PAUSE"] = 2] = "PAUSE";
      })(GameState || (GameState = {}));

      _export("MusicManager", MusicManager = (_dec = ccclass("MusicManager"), _dec2 = property(AudioSourceComponent), _dec3 = property(cc.Node), _dec4 = property(cc.Node), _dec5 = property(cc.Node), _dec6 = property(cc.Node), _dec(_class = (_class2 = (_temp =
      /*#__PURE__*/
      function (_Component) {
        _inherits(MusicManager, _Component);

        function MusicManager() {
          var _getPrototypeOf2;

          var _this;

          _classCallCheck(this, MusicManager);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MusicManager)).call.apply(_getPrototypeOf2, [this].concat(args)));

          _initializerDefineProperty(_this, "audio", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pointer", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "target", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "begin", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "pointerParent", _descriptor5, _assertThisInitialized(_this));

          _this.state = GameState.STOP;
          _this.musicData = [];
          _this.musicIndex = 0;
          _this.curTime = 0;
          _this.offset = 0;
          _this.pool = new cc.NodePool();
          return _this;
        }

        _createClass(MusicManager, [{
          key: "start",
          value: function start() {// Your initialization goes here.
          }
        }, {
          key: "play",
          value: function play() {
            this.musicIndex = 0;
            this.curTime = 0;
            this.audio.play();
            this.musicData = music1;
            this.state = GameState.PLAY;
          }
        }, {
          key: "update",
          value: function update(dt) {
            if (this.state != GameState.PLAY) {
              return;
            }

            this.curTime += dt;
            var tTime = this.musicData[this.musicIndex] / 1000;

            if (this.curTime >= tTime + this.offset / 1000) {
              this.musicIndex += 2;
              this.movePointer();
            }

            if (this.musicIndex >= this.musicData.length) {
              this.state = GameState.STOP;
            }
          }
        }, {
          key: "movePointer",
          value: function movePointer() {
            var pointer = null;

            if (this.pool.size() > 0) {
              pointer = this.pool.get();
            } else {
              pointer = cc.instantiate(this.pointer);
            }

            this.pointerParent.addChild(pointer);
            var comp = pointer.getComponent(Pointer);
            comp.reuse(this.begin.getPosition(), this.target.getPosition(), 1000, this.recycle.bind(this));
          }
        }, {
          key: "recycle",
          value: function recycle(node) {
            this.pool.put(node);
          }
        }, {
          key: "isMatch",
          value: function isMatch() {}
        }]);

        return MusicManager;
      }(Component), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "audio", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "pointer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "begin", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "pointerParent", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cc._RF.pop(); // end MusicManager

    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3Q6Ly8vYXNzZXRzL1NjcmlwdC9NdXNpY01hbmFnZXIudHMiXSwibmFtZXMiOlsibXVzaWMxIiwiUG9pbnRlciIsImNjY2xhc3MiLCJfZGVjb3JhdG9yIiwicHJvcGVydHkiLCJHYW1lU3RhdGUiLCJNdXNpY01hbmFnZXIiLCJBdWRpb1NvdXJjZUNvbXBvbmVudCIsImNjIiwiTm9kZSIsInN0YXRlIiwiU1RPUCIsIm11c2ljRGF0YSIsIm11c2ljSW5kZXgiLCJjdXJUaW1lIiwib2Zmc2V0IiwicG9vbCIsIk5vZGVQb29sIiwiYXVkaW8iLCJwbGF5IiwiUExBWSIsImR0IiwidFRpbWUiLCJtb3ZlUG9pbnRlciIsImxlbmd0aCIsInBvaW50ZXIiLCJzaXplIiwiZ2V0IiwiaW5zdGFudGlhdGUiLCJwb2ludGVyUGFyZW50IiwiYWRkQ2hpbGQiLCJjb21wIiwiZ2V0Q29tcG9uZW50IiwicmV1c2UiLCJiZWdpbiIsImdldFBvc2l0aW9uIiwidGFyZ2V0IiwicmVjeWNsZSIsImJpbmQiLCJub2RlIiwicHV0IiwiQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFXU0EsTUFBQUEsTSxTQUFBQSxNOztBQUNBQyxNQUFBQSxPLFlBQUFBLE87OzttRkFWZ0U7OztBQUZ6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7O0FBTVFDLE1BQUFBLE8sR0FBc0JDLFUsQ0FBdEJELE87QUFBU0UsTUFBQUEsUSxHQUFhRCxVLENBQWJDLFE7O2lCQUVaQyxTO0FBQUFBLFFBQUFBLFMsQ0FBQUEsUztBQUFBQSxRQUFBQSxTLENBQUFBLFM7QUFBQUEsUUFBQUEsUyxDQUFBQSxTO1NBQUFBLFMsS0FBQUEsUzs7OEJBT1FDLFksV0FEWkosT0FBTyxDQUFDLGNBQUQsQyxVQUdIRSxRQUFRLENBQUNHLG9CQUFELEMsVUFHUkgsUUFBUSxDQUFDSSxFQUFFLENBQUNDLElBQUosQyxVQUdSTCxRQUFRLENBQUNJLEVBQUUsQ0FBQ0MsSUFBSixDLFVBR1JMLFFBQVEsQ0FBQ0ksRUFBRSxDQUFDQyxJQUFKLEMsVUFFUkwsUUFBUSxDQUFDSSxFQUFFLENBQUNDLElBQUosQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztnQkFHVEMsSyxHQUFRTCxTQUFTLENBQUNNLEk7Z0JBQ2xCQyxTLEdBQVksRTtnQkFDWkMsVSxHQUFhLEM7Z0JBQ2JDLE8sR0FBVSxDO2dCQUNWQyxNLEdBQVMsQztnQkFFVEMsSSxHQUFPLElBQUlSLEVBQUUsQ0FBQ1MsUUFBUCxFOzs7Ozs7a0NBRUUsQ0FDTDtBQUNIOzs7aUNBRU87QUFDSixpQkFBS0osVUFBTCxHQUFrQixDQUFsQjtBQUNBLGlCQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBLGlCQUFLSSxLQUFMLENBQVdDLElBQVg7QUFDQSxpQkFBS1AsU0FBTCxHQUFpQlosTUFBakI7QUFDQSxpQkFBS1UsS0FBTCxHQUFhTCxTQUFTLENBQUNlLElBQXZCO0FBQ0g7OztpQ0FFT0MsRSxFQUFJO0FBQ1IsZ0JBQUksS0FBS1gsS0FBTCxJQUFjTCxTQUFTLENBQUNlLElBQTVCLEVBQWtDO0FBQzlCO0FBQ0g7O0FBRUQsaUJBQUtOLE9BQUwsSUFBZ0JPLEVBQWhCO0FBQ0EsZ0JBQUlDLEtBQUssR0FBRyxLQUFLVixTQUFMLENBQWUsS0FBS0MsVUFBcEIsSUFBa0MsSUFBOUM7O0FBQ0EsZ0JBQUksS0FBS0MsT0FBTCxJQUFnQlEsS0FBSyxHQUFHLEtBQUtQLE1BQUwsR0FBYyxJQUExQyxFQUFnRDtBQUM1QyxtQkFBS0YsVUFBTCxJQUFtQixDQUFuQjtBQUNBLG1CQUFLVSxXQUFMO0FBQ0g7O0FBRUQsZ0JBQUksS0FBS1YsVUFBTCxJQUFtQixLQUFLRCxTQUFMLENBQWVZLE1BQXRDLEVBQThDO0FBQzFDLG1CQUFLZCxLQUFMLEdBQWFMLFNBQVMsQ0FBQ00sSUFBdkI7QUFDSDtBQUNKOzs7d0NBRWM7QUFDWCxnQkFBSWMsT0FBTyxHQUFHLElBQWQ7O0FBQ0EsZ0JBQUksS0FBS1QsSUFBTCxDQUFVVSxJQUFWLEtBQW1CLENBQXZCLEVBQTBCO0FBQ3RCRCxjQUFBQSxPQUFPLEdBQUcsS0FBS1QsSUFBTCxDQUFVVyxHQUFWLEVBQVY7QUFDSCxhQUZELE1BRU87QUFDSEYsY0FBQUEsT0FBTyxHQUFHakIsRUFBRSxDQUFDb0IsV0FBSCxDQUFlLEtBQUtILE9BQXBCLENBQVY7QUFDSDs7QUFFRCxpQkFBS0ksYUFBTCxDQUFtQkMsUUFBbkIsQ0FBNEJMLE9BQTVCO0FBQ0EsZ0JBQUlNLElBQUksR0FBR04sT0FBTyxDQUFDTyxZQUFSLENBQXFCL0IsT0FBckIsQ0FBWDtBQUNBOEIsWUFBQUEsSUFBSSxDQUFDRSxLQUFMLENBQVcsS0FBS0MsS0FBTCxDQUFXQyxXQUFYLEVBQVgsRUFBcUMsS0FBS0MsTUFBTCxDQUFZRCxXQUFaLEVBQXJDLEVBQWdFLElBQWhFLEVBQXNFLEtBQUtFLE9BQUwsQ0FBYUMsSUFBYixDQUFrQixJQUFsQixDQUF0RTtBQUNIOzs7a0NBRVFDLEksRUFBTTtBQUNYLGlCQUFLdkIsSUFBTCxDQUFVd0IsR0FBVixDQUFjRCxJQUFkO0FBQ0g7OztvQ0FFVSxDQUVWOzs7O1FBeEU2QkUsUzs7Ozs7aUJBR3RCLEk7Ozs7Ozs7aUJBR0UsSTs7Ozs7OztpQkFHRCxJOzs7Ozs7O2lCQUdELEk7Ozs7Ozs7aUJBRVEsSTs7OztvQkFuQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBMZWFybiBjYy5DbGFzczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9jbGFzcy5odG1sXG4vLyBMZWFybiBBdHRyaWJ1dGU6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvcmVmZXJlbmNlL2F0dHJpYnV0ZXMuaHRtbFxuLy8gTGVhcm4gbGlmZS1jeWNsZSBjYWxsYmFja3M6XG4vLyAgLSBbQ2hpbmVzZV0gaHR0cDovL2RvY3MuY29jb3MuY29tL2NyZWF0b3IvbWFudWFsL3poL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG4vLyAgLSBbRW5nbGlzaF0gaHR0cDovL3d3dy5jb2NvczJkLXgub3JnL2RvY3MvY3JlYXRvci9lbi9zY3JpcHRpbmcvbGlmZS1jeWNsZS1jYWxsYmFja3MuaHRtbFxuXG5pbXBvcnQgeyBfZGVjb3JhdG9yLCBDb21wb25lbnQsIEF1ZGlvU291cmNlQ29tcG9uZW50IH0gZnJvbSBcIkNvY29zM0RcIjtcbmltcG9ydCB7IG11c2ljMSB9IGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCB7IFBvaW50ZXIgfSBmcm9tIFwiLi9Qb2ludGVyXCI7XG5cbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbmVudW0gR2FtZVN0YXRlIHtcbiAgICBTVE9QLFxuICAgIFBMQVksXG4gICAgUEFVU0Vcbn1cblxuQGNjY2xhc3MoXCJNdXNpY01hbmFnZXJcIilcbmV4cG9ydCBjbGFzcyBNdXNpY01hbmFnZXIgZXh0ZW5kcyBDb21wb25lbnQge1xuICAgIFxuICAgIEBwcm9wZXJ0eShBdWRpb1NvdXJjZUNvbXBvbmVudClcbiAgICBhdWRpbyA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBwb2ludGVyID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShjYy5Ob2RlKVxuICAgIHRhcmdldCA9IG51bGw7XG5cbiAgICBAcHJvcGVydHkoY2MuTm9kZSlcbiAgICBiZWdpbiA9IG51bGw7XG4gICAgQHByb3BlcnR5KGNjLk5vZGUpXG4gICAgcG9pbnRlclBhcmVudCA9IG51bGw7XG5cbiAgICBzdGF0ZSA9IEdhbWVTdGF0ZS5TVE9QO1xuICAgIG11c2ljRGF0YSA9IFtdO1xuICAgIG11c2ljSW5kZXggPSAwO1xuICAgIGN1clRpbWUgPSAwO1xuICAgIG9mZnNldCA9IDA7XG5cbiAgICBwb29sID0gbmV3IGNjLk5vZGVQb29sKCk7XG5cbiAgICBzdGFydCAoKSB7XG4gICAgICAgIC8vIFlvdXIgaW5pdGlhbGl6YXRpb24gZ29lcyBoZXJlLlxuICAgIH1cblxuICAgIHBsYXkgKCkge1xuICAgICAgICB0aGlzLm11c2ljSW5kZXggPSAwO1xuICAgICAgICB0aGlzLmN1clRpbWUgPSAwO1xuICAgICAgICB0aGlzLmF1ZGlvLnBsYXkoKTtcbiAgICAgICAgdGhpcy5tdXNpY0RhdGEgPSBtdXNpYzE7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBHYW1lU3RhdGUuUExBWTtcbiAgICB9XG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlICE9IEdhbWVTdGF0ZS5QTEFZKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgICAgIHRoaXMuY3VyVGltZSArPSBkdDtcbiAgICAgICAgbGV0IHRUaW1lID0gdGhpcy5tdXNpY0RhdGFbdGhpcy5tdXNpY0luZGV4XSAvIDEwMDA7XG4gICAgICAgIGlmICh0aGlzLmN1clRpbWUgPj0gdFRpbWUgKyB0aGlzLm9mZnNldCAvIDEwMDApIHtcbiAgICAgICAgICAgIHRoaXMubXVzaWNJbmRleCArPSAyO1xuICAgICAgICAgICAgdGhpcy5tb3ZlUG9pbnRlcigpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubXVzaWNJbmRleCA+PSB0aGlzLm11c2ljRGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RhdGUgPSBHYW1lU3RhdGUuU1RPUDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVQb2ludGVyICgpIHtcbiAgICAgICAgbGV0IHBvaW50ZXIgPSBudWxsO1xuICAgICAgICBpZiAodGhpcy5wb29sLnNpemUoKSA+IDApIHsgXG4gICAgICAgICAgICBwb2ludGVyID0gdGhpcy5wb29sLmdldCgpO1xuICAgICAgICB9IGVsc2UgeyBcbiAgICAgICAgICAgIHBvaW50ZXIgPSBjYy5pbnN0YW50aWF0ZSh0aGlzLnBvaW50ZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5wb2ludGVyUGFyZW50LmFkZENoaWxkKHBvaW50ZXIpO1xuICAgICAgICBsZXQgY29tcCA9IHBvaW50ZXIuZ2V0Q29tcG9uZW50KFBvaW50ZXIpO1xuICAgICAgICBjb21wLnJldXNlKHRoaXMuYmVnaW4uZ2V0UG9zaXRpb24oKSwgdGhpcy50YXJnZXQuZ2V0UG9zaXRpb24oKSwgMTAwMCwgdGhpcy5yZWN5Y2xlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIHJlY3ljbGUgKG5vZGUpIHtcbiAgICAgICAgdGhpcy5wb29sLnB1dChub2RlKTtcbiAgICB9XG5cbiAgICBpc01hdGNoICgpIHtcblxuICAgIH1cbn1cbiJdfQ==