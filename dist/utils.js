"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArrayType = exports.instanceToPrimitiveType = void 0;
function instanceToPrimitiveType(instance) {
    if (instance === Number) {
        return 'number';
    }
    if (instance === String) {
        return 'string';
    }
    if (instance === Boolean) {
        return 'boolean';
    }
    throw new Error("Can't infer type: " + instance);
}
exports.instanceToPrimitiveType = instanceToPrimitiveType;
function isArrayType(instance) {
    return instance === Array;
}
exports.isArrayType = isArrayType;
//# sourceMappingURL=utils.js.map