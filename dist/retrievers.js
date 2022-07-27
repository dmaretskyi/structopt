"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromArray = exports.fromArgs = void 0;
var chalk_1 = __importDefault(require("chalk"));
var errors_1 = require("./errors");
var structOptRegistry_1 = require("./registries/structOptRegistry");
var printHelp_1 = require("./formatters/printHelp");
var printVersion_1 = require("./formatters/printVersion");
function fromArgs(Opt) {
    return fromArray(Opt, process.argv.slice(2));
}
exports.fromArgs = fromArgs;
function fromArray(Opt, array) {
    var structOpt = structOptRegistry_1.findStructOpt(Opt.name);
    if (!structOpt) {
        throw new Error("Can't find StructOpt by name: " + Opt.name);
    }
    if (array.includes('-h') || array.includes('--help')) {
        console.log(printHelp_1.printHelp(structOpt));
        process.exit(0);
    }
    if (array.includes('-V') || array.includes('--version')) {
        console.log(printVersion_1.printVersion(structOpt));
        process.exit(0);
    }
    try {
        var result = structOpt.parse(array);
        structOpt.validate(result);
        return result;
    }
    catch (e) {
        if (e instanceof errors_1.ValidationError) {
            console.log(chalk_1.default.red(templateObject_1 || (templateObject_1 = __makeTemplateObject(["error: ", ""], ["error: ", ""])), e.message));
            for (var _i = 0, _a = e.properties; _i < _a.length; _i++) {
                var prop = _a[_i];
                console.log(chalk_1.default.red(templateObject_2 || (templateObject_2 = __makeTemplateObject(["    - ", ""], ["    - ", ""])), prop));
            }
            console.log('');
            console.log(printHelp_1.printHelp(structOpt));
            process.exit(1);
        }
        if (e instanceof errors_1.UnexpectedArgsError) {
            console.log(chalk_1.default.red(templateObject_3 || (templateObject_3 = __makeTemplateObject(["error: ", ""], ["error: ", ""])), e.message));
            console.log('');
            console.log(printHelp_1.printHelp(structOpt));
            process.exit(1);
        }
        throw e;
    }
}
exports.fromArray = fromArray;
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=retrievers.js.map