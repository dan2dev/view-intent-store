"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_observable_1 = require("abstract-observable");
var Generic = /** @class */ (function (_super) {
    __extends(Generic, _super);
    function Generic(parent) {
        var _this = _super.call(this, parent) || this;
        _this.parent = parent;
        _this.setField.bind(_this);
        return _this;
    }
    Generic.prototype.setField = function (fieldName, value) {
        this[fieldName] = value;
    };
    return Generic;
}(abstract_observable_1.Observable));
exports.Generic = Generic;
exports.default = Generic;
//# sourceMappingURL=generic.js.map