"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findStructOpt = exports.addStructOpt = void 0;
var registry;
function getRegistry() {
    if (!registry) {
        registry = new Map();
    }
    return registry;
}
function addStructOpt(structOpt) {
    getRegistry().set(structOpt.key, structOpt);
}
exports.addStructOpt = addStructOpt;
function findStructOpt(key) {
    return getRegistry().get(key);
}
exports.findStructOpt = findStructOpt;
//# sourceMappingURL=structOptRegistry.js.map