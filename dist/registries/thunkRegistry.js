"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flushThunk = exports.addThunk = void 0;
var registry;
function getRegistry() {
    if (!registry) {
        registry = new Set();
    }
    return registry;
}
function addThunk(thunk) {
    getRegistry().add(thunk);
}
exports.addThunk = addThunk;
function flushThunk(structOpt) {
    getRegistry().forEach(function (thunk) { return thunk(structOpt); });
    getRegistry().clear();
}
exports.flushThunk = flushThunk;
//# sourceMappingURL=thunkRegistry.js.map