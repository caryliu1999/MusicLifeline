"use strict";

System.register("project:///assets/Script/Pointer.ts", [], function (_export, _context) {
  "use strict";

  var _dec, _class, _temp, _cc, _decorator, Component, ccclass, property, Pointer;

  function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  _export({
    _dec: void 0,
    _class: void 0,
    _temp: void 0
  });

  return {
    setters: [],
    execute: function () {
      cc._RF.push(window.module || {}, "efb45+Ga2tJBIeSDoTAJGVE", "Pointer"); // begin Pointer


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
      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("Pointer", Pointer = (_dec = ccclass("Pointer"), _dec(_class = (_temp =
      /*#__PURE__*/
      function (_Component) {
        _inherits(Pointer, _Component);

        function Pointer() {
          var _getPrototypeOf2;

          var _this;

          _classCallCheck(this, Pointer);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Pointer)).call.apply(_getPrototypeOf2, [this].concat(args)));
          _this.begin = null;
          _this.end = null;
          _this.totalTime = 3;
          _this.callback = null;
          _this.curTime = 0;
          return _this;
        }

        _createClass(Pointer, [{
          key: "unuse",
          value: function unuse() {
            this.node.active = false;
            this.begin = null;
            this.end = null;
            this.totalTime = 3000;
            this.curTime = 0;
            this.callback = null;
          }
        }, {
          key: "reuse",
          value: function reuse(begin, end) {
            var time = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1000;
            var callback = arguments.length > 3 ? arguments[3] : undefined;
            this.begin = begin;
            this.end = end;
            this.totalTime = time;
            this.curTime = 0;
            this.callback = callback;
            this.play();
          }
        }, {
          key: "play",
          value: function play() {
            this.node.setPosition(this.begin);
            this.node.active = true;
          }
        }, {
          key: "update",
          value: function update(dt) {
            var totalTime = this.totalTime / 1000;

            if (this.curTime >= totalTime) {
              return;
            }

            this.curTime += dt;
            this.curTime = Math.min(this.curTime, totalTime); // x

            var dirxX = this.end.x - this.begin.x > 0 ? 1 : -1;
            var totalX = Math.abs(this.end.x - this.begin.x);
            var offsetX = this.curTime / totalTime * totalX * dirxX;
            var positionX = this.begin.x + offsetX; // y

            var dirY = this.end.y - this.begin.y > 0 ? 1 : -1;
            var totalY = Math.abs(this.end.y - this.begin.y);
            var offsetY = this.curTime / totalTime * totalY * dirY;
            var positionY = this.begin.y + offsetY;
            this.node.setPosition(positionX, positionY, 0);

            if (this.curTime >= totalTime) {
              this.callback(this.node);
            }
          }
        }]);

        return Pointer;
      }(Component), _temp)) || _class));

      cc._RF.pop(); // end Pointer

    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3Q6Ly8vYXNzZXRzL1NjcmlwdC9Qb2ludGVyLnRzIl0sIm5hbWVzIjpbImNjY2xhc3MiLCJfZGVjb3JhdG9yIiwicHJvcGVydHkiLCJQb2ludGVyIiwiYmVnaW4iLCJlbmQiLCJ0b3RhbFRpbWUiLCJjYWxsYmFjayIsImN1clRpbWUiLCJub2RlIiwiYWN0aXZlIiwidGltZSIsInBsYXkiLCJzZXRQb3NpdGlvbiIsImR0IiwiTWF0aCIsIm1pbiIsImRpcnhYIiwieCIsInRvdGFsWCIsImFicyIsIm9mZnNldFgiLCJwb3NpdGlvblgiLCJkaXJZIiwieSIsInRvdGFsWSIsIm9mZnNldFkiLCJwb3NpdGlvblkiLCJDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OEVBRXlFOzs7QUFGekU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBR1FBLE1BQUFBLE8sR0FBc0JDLFUsQ0FBdEJELE87QUFBU0UsTUFBQUEsUSxHQUFhRCxVLENBQWJDLFE7O3lCQUdKQyxPLFdBRFpILE9BQU8sQ0FBQyxTQUFELEM7Ozs7Ozs7Ozs7Ozs7Ozs7O2dCQUVKSSxLLEdBQWEsSTtnQkFDYkMsRyxHQUFXLEk7Z0JBQ1hDLFMsR0FBWSxDO2dCQUNaQyxRLEdBQVcsSTtnQkFDWEMsTyxHQUFVLEM7Ozs7OztrQ0FDRDtBQUNMLGlCQUFLQyxJQUFMLENBQVVDLE1BQVYsR0FBbUIsS0FBbkI7QUFDQSxpQkFBS04sS0FBTCxHQUFhLElBQWI7QUFDQSxpQkFBS0MsR0FBTCxHQUFXLElBQVg7QUFDQSxpQkFBS0MsU0FBTCxHQUFpQixJQUFqQjtBQUNBLGlCQUFLRSxPQUFMLEdBQWUsQ0FBZjtBQUNBLGlCQUFLRCxRQUFMLEdBQWdCLElBQWhCO0FBQ0g7OztnQ0FFTUgsSyxFQUFPQyxHLEVBQW9DO0FBQUEsZ0JBQS9CTSxJQUErQix1RUFBaEIsSUFBZ0I7QUFBQSxnQkFBVkosUUFBVTtBQUM5QyxpQkFBS0gsS0FBTCxHQUFhQSxLQUFiO0FBQ0EsaUJBQUtDLEdBQUwsR0FBV0EsR0FBWDtBQUNBLGlCQUFLQyxTQUFMLEdBQWlCSyxJQUFqQjtBQUNBLGlCQUFLSCxPQUFMLEdBQWUsQ0FBZjtBQUNBLGlCQUFLRCxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLGlCQUFLSyxJQUFMO0FBQ0g7OztpQ0FFTztBQUNKLGlCQUFLSCxJQUFMLENBQVVJLFdBQVYsQ0FBc0IsS0FBS1QsS0FBM0I7QUFDQSxpQkFBS0ssSUFBTCxDQUFVQyxNQUFWLEdBQW1CLElBQW5CO0FBQ0g7OztpQ0FFT0ksRSxFQUFJO0FBQ1IsZ0JBQUlSLFNBQVMsR0FBRyxLQUFLQSxTQUFMLEdBQWlCLElBQWpDOztBQUNBLGdCQUFJLEtBQUtFLE9BQUwsSUFBZ0JGLFNBQXBCLEVBQStCO0FBQzNCO0FBQ0g7O0FBQ0QsaUJBQUtFLE9BQUwsSUFBZ0JNLEVBQWhCO0FBQ0EsaUJBQUtOLE9BQUwsR0FBZU8sSUFBSSxDQUFDQyxHQUFMLENBQVMsS0FBS1IsT0FBZCxFQUF1QkYsU0FBdkIsQ0FBZixDQU5RLENBT1I7O0FBQ0EsZ0JBQUlXLEtBQUssR0FBSSxLQUFLWixHQUFMLENBQVNhLENBQVQsR0FBYSxLQUFLZCxLQUFMLENBQVdjLENBQXpCLEdBQThCLENBQTlCLEdBQWtDLENBQWxDLEdBQXNDLENBQUMsQ0FBbkQ7QUFDQSxnQkFBSUMsTUFBTSxHQUFHSixJQUFJLENBQUNLLEdBQUwsQ0FBUyxLQUFLZixHQUFMLENBQVNhLENBQVQsR0FBYSxLQUFLZCxLQUFMLENBQVdjLENBQWpDLENBQWI7QUFDQSxnQkFBSUcsT0FBTyxHQUFJLEtBQUtiLE9BQUwsR0FBZUYsU0FBaEIsR0FBNkJhLE1BQTdCLEdBQXNDRixLQUFwRDtBQUNBLGdCQUFJSyxTQUFTLEdBQUcsS0FBS2xCLEtBQUwsQ0FBV2MsQ0FBWCxHQUFlRyxPQUEvQixDQVhRLENBWVI7O0FBQ0EsZ0JBQUlFLElBQUksR0FBSSxLQUFLbEIsR0FBTCxDQUFTbUIsQ0FBVCxHQUFhLEtBQUtwQixLQUFMLENBQVdvQixDQUF6QixHQUE4QixDQUE5QixHQUFrQyxDQUFsQyxHQUFzQyxDQUFDLENBQWxEO0FBQ0EsZ0JBQUlDLE1BQU0sR0FBR1YsSUFBSSxDQUFDSyxHQUFMLENBQVMsS0FBS2YsR0FBTCxDQUFTbUIsQ0FBVCxHQUFhLEtBQUtwQixLQUFMLENBQVdvQixDQUFqQyxDQUFiO0FBQ0EsZ0JBQUlFLE9BQU8sR0FBSSxLQUFLbEIsT0FBTCxHQUFlRixTQUFoQixHQUE2Qm1CLE1BQTdCLEdBQXNDRixJQUFwRDtBQUNBLGdCQUFJSSxTQUFTLEdBQUcsS0FBS3ZCLEtBQUwsQ0FBV29CLENBQVgsR0FBZUUsT0FBL0I7QUFFQSxpQkFBS2pCLElBQUwsQ0FBVUksV0FBVixDQUFzQlMsU0FBdEIsRUFBaUNLLFNBQWpDLEVBQTRDLENBQTVDOztBQUVBLGdCQUFJLEtBQUtuQixPQUFMLElBQWdCRixTQUFwQixFQUErQjtBQUMzQixtQkFBS0MsUUFBTCxDQUFjLEtBQUtFLElBQW5CO0FBQ0g7QUFDSjs7OztRQXBEd0JtQixTOztvQkFaWCIsInNvdXJjZXNDb250ZW50IjpbIi8vIExlYXJuIGNjLkNsYXNzOlxuLy8gIC0gW0NoaW5lc2VdIGh0dHA6Ly9kb2NzLmNvY29zLmNvbS9jcmVhdG9yL21hbnVhbC96aC9zY3JpcHRpbmcvY2xhc3MuaHRtbFxuLy8gIC0gW0VuZ2xpc2hdIGh0dHA6Ly93d3cuY29jb3MyZC14Lm9yZy9kb2NzL2NyZWF0b3IvZW4vc2NyaXB0aW5nL2NsYXNzLmh0bWxcbi8vIExlYXJuIEF0dHJpYnV0ZTpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL3JlZmVyZW5jZS9hdHRyaWJ1dGVzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9yZWZlcmVuY2UvYXR0cmlidXRlcy5odG1sXG4vLyBMZWFybiBsaWZlLWN5Y2xlIGNhbGxiYWNrczpcbi8vICAtIFtDaGluZXNlXSBodHRwOi8vZG9jcy5jb2Nvcy5jb20vY3JlYXRvci9tYW51YWwvemgvc2NyaXB0aW5nL2xpZmUtY3ljbGUtY2FsbGJhY2tzLmh0bWxcbi8vICAtIFtFbmdsaXNoXSBodHRwOi8vd3d3LmNvY29zMmQteC5vcmcvZG9jcy9jcmVhdG9yL2VuL3NjcmlwdGluZy9saWZlLWN5Y2xlLWNhbGxiYWNrcy5odG1sXG5cbmltcG9ydCB7IF9kZWNvcmF0b3IsIENvbXBvbmVudCwgQXVkaW9Tb3VyY2VDb21wb25lbnQsIFZlYzMgfSBmcm9tIFwiQ29jb3MzRFwiO1xuY29uc3QgeyBjY2NsYXNzLCBwcm9wZXJ0eSB9ID0gX2RlY29yYXRvcjtcblxuQGNjY2xhc3MoXCJQb2ludGVyXCIpXG5leHBvcnQgY2xhc3MgUG9pbnRlciBleHRlbmRzIENvbXBvbmVudCB7XG4gICAgYmVnaW46VmVjMyA9IG51bGw7XG4gICAgZW5kOlZlYzMgPSBudWxsO1xuICAgIHRvdGFsVGltZSA9IDM7XG4gICAgY2FsbGJhY2sgPSBudWxsO1xuICAgIGN1clRpbWUgPSAwO1xuICAgIHVudXNlICgpIHtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmJlZ2luID0gbnVsbDtcbiAgICAgICAgdGhpcy5lbmQgPSBudWxsO1xuICAgICAgICB0aGlzLnRvdGFsVGltZSA9IDMwMDA7XG4gICAgICAgIHRoaXMuY3VyVGltZSA9IDA7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBudWxsO1xuICAgIH1cblxuICAgIHJldXNlIChiZWdpbiwgZW5kLCB0aW1lOiBudW1iZXIgPSAxMDAwLCBjYWxsYmFjaykge1xuICAgICAgICB0aGlzLmJlZ2luID0gYmVnaW47XG4gICAgICAgIHRoaXMuZW5kID0gZW5kO1xuICAgICAgICB0aGlzLnRvdGFsVGltZSA9IHRpbWU7XG4gICAgICAgIHRoaXMuY3VyVGltZSA9IDA7XG4gICAgICAgIHRoaXMuY2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgICAgICAgdGhpcy5wbGF5KCk7XG4gICAgfVxuXG4gICAgcGxheSAoKSB7XG4gICAgICAgIHRoaXMubm9kZS5zZXRQb3NpdGlvbih0aGlzLmJlZ2luKTtcbiAgICAgICAgdGhpcy5ub2RlLmFjdGl2ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgdXBkYXRlIChkdCkge1xuICAgICAgICBsZXQgdG90YWxUaW1lID0gdGhpcy50b3RhbFRpbWUgLyAxMDAwO1xuICAgICAgICBpZiAodGhpcy5jdXJUaW1lID49IHRvdGFsVGltZSkge1xuICAgICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJUaW1lICs9IGR0O1xuICAgICAgICB0aGlzLmN1clRpbWUgPSBNYXRoLm1pbih0aGlzLmN1clRpbWUsIHRvdGFsVGltZSk7XG4gICAgICAgIC8vIHhcbiAgICAgICAgbGV0IGRpcnhYID0gKHRoaXMuZW5kLnggLSB0aGlzLmJlZ2luLngpID4gMCA/IDEgOiAtMTtcbiAgICAgICAgbGV0IHRvdGFsWCA9IE1hdGguYWJzKHRoaXMuZW5kLnggLSB0aGlzLmJlZ2luLngpO1xuICAgICAgICBsZXQgb2Zmc2V0WCA9ICh0aGlzLmN1clRpbWUgLyB0b3RhbFRpbWUpICogdG90YWxYICogZGlyeFg7XG4gICAgICAgIGxldCBwb3NpdGlvblggPSB0aGlzLmJlZ2luLnggKyBvZmZzZXRYO1xuICAgICAgICAvLyB5XG4gICAgICAgIGxldCBkaXJZID0gKHRoaXMuZW5kLnkgLSB0aGlzLmJlZ2luLnkpID4gMCA/IDEgOiAtMTtcbiAgICAgICAgbGV0IHRvdGFsWSA9IE1hdGguYWJzKHRoaXMuZW5kLnkgLSB0aGlzLmJlZ2luLnkpO1xuICAgICAgICBsZXQgb2Zmc2V0WSA9ICh0aGlzLmN1clRpbWUgLyB0b3RhbFRpbWUpICogdG90YWxZICogZGlyWTtcbiAgICAgICAgbGV0IHBvc2l0aW9uWSA9IHRoaXMuYmVnaW4ueSArIG9mZnNldFk7XG5cbiAgICAgICAgdGhpcy5ub2RlLnNldFBvc2l0aW9uKHBvc2l0aW9uWCwgcG9zaXRpb25ZLCAwKTtcblxuICAgICAgICBpZiAodGhpcy5jdXJUaW1lID49IHRvdGFsVGltZSkge1xuICAgICAgICAgICAgdGhpcy5jYWxsYmFjayh0aGlzLm5vZGUpO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19