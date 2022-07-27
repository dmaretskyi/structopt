"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnexpectedArgsError = exports.ValidationError = void 0;
var ValidationError = /** @class */ (function (_super) {
    __extends(ValidationError, _super);
    function ValidationError(message, properties) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        _this.properties = properties;
        Object.setPrototypeOf(_this, ValidationError.prototype);
        return _this;
    }
    return ValidationError;
}(Error));
exports.ValidationError = ValidationError;
var UnexpectedArgsError = /** @class */ (function (_super) {
    __extends(UnexpectedArgsError, _super);
    function UnexpectedArgsError(message) {
        var _this = _super.call(this, message) || this;
        _this.message = message;
        Object.setPrototypeOf(_this, UnexpectedArgsError.prototype);
        return _this;
    }
    return UnexpectedArgsError;
}(Error));
exports.UnexpectedArgsError = UnexpectedArgsError;
//# sourceMappingURL=errors.js.map