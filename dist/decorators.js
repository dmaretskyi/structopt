"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Option = exports.StructOpt = void 0;
require("reflect-metadata");
var param_case_1 = require("param-case");
var StructOptImpl_1 = require("./StructOptImpl");
var structOptRegistry_1 = require("./registries/structOptRegistry");
var thunkRegistry_1 = require("./registries/thunkRegistry");
var utils_1 = require("./utils");
function StructOpt(args) {
    if (args === void 0) { args = {}; }
    return function (constructor) {
        var structOpt = new StructOptImpl_1.StructOptImpl(__assign(__assign({}, args), { key: constructor.name, name: args.name }));
        structOptRegistry_1.addStructOpt(structOpt);
        thunkRegistry_1.flushThunk(structOpt);
    };
}
exports.StructOpt = StructOpt;
function Option(args) {
    if (args === void 0) { args = {}; }
    return function (target, propertyKey) {
        if (args.short === true) {
            args.short = "-" + propertyKey[0];
        }
        if (args.long === true) {
            args.long = "--" + param_case_1.paramCase(propertyKey);
        }
        var typeInstance = Reflect.getMetadata('design:type', target, propertyKey);
        if (utils_1.isArrayType(typeInstance) !== !!args.type) {
            throw new Error('Value types must be specified for and only for repeated options.');
        }
        thunkRegistry_1.addThunk(function (structOpt) {
            structOpt.addOption(__assign(__assign({}, args), { key: propertyKey, type: utils_1.isArrayType(typeInstance) ? args.type : utils_1.instanceToPrimitiveType(typeInstance), repeated: utils_1.isArrayType(typeInstance) }));
        });
    };
}
exports.Option = Option;
//# sourceMappingURL=decorators.js.map