"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.printHelp = void 0;
var path_1 = require("path");
function printHelp(structOptImpl) {
    var flags = structOptImpl.options.filter(function (o) { return o.type === 'boolean' && (o.short || o.long); });
    var options = structOptImpl.options.filter(function (o) { return (o.type === 'string' || o.type === 'number') && (o.short || o.long); });
    var optionsMaxLength = getPrintedMaxLength(options);
    var args = structOptImpl.options.filter(function (o) { return o.short === undefined && o.long === undefined; });
    var requiredArgs = args.filter(function (o) { return o.required; });
    var optionalArgs = args.filter(function (o) { return !o.required; });
    var argsMaxLength = getPrintedMaxLength(args);
    return structOptImpl.name + " " + (structOptImpl.version || '') + "\n" + structOptImpl.about + "\n\nUSAGE:\n  " + path_1.basename(process.argv[1]) + (flags.length > 0 ? ' [FLAGS]' : '') + (options.length > 0 ? ' [OPTIONS]' : '') + requiredArgs.map(function (a) { return " <" + a.key + ">"; }).join('') + (optionalArgs.length > 0 ? ' [ARGS]' : '') + "\n\n" + (flags.length > 0
        ? "FLAGS:\n" + flags.map(function (flag) { return printFlagsLeft(flag) + "    " + (flag.description || ''); }).join('\n')
        : '') + "\n" + (options.length > 0
        ? "\nOPTIONS:\n" + options
            .map(function (option) {
            return "" + printOptionLeft(option) + ' '.repeat(optionsMaxLength - printOptionLeft(option).length) + "    " + (option.description || '') + (option.defaultValue ? " [default: " + option.defaultValue + "]" : '');
        })
            .join('\n')
        : '') + "\n" + (args.length > 0
        ? "\nARGS:\n" + args
            .map(function (arg) {
            return "" + printArgLeft(arg) + ' '.repeat(argsMaxLength - printOptionLeft(arg).length) + "    " + (arg.description || '');
        })
            .join('\n') + "\n"
        : '');
}
exports.printHelp = printHelp;
function printFlagsLeft(option) {
    return "    " + (option.short ? option.short + ", " : '    ') + (option.long || '');
}
function printOptionLeft(option) {
    return "    " + (option.short ? option.short + ", " : '    ') + (option.long || '') + " <" + option.key + ">";
}
function printArgLeft(option) {
    return "    <" + option.key + ">";
}
function getPrintedMaxLength(options) {
    return options.reduce(function (max, option) {
        if (max < printOptionLeft(option).length) {
            return printOptionLeft(option).length;
        }
        else {
            return max;
        }
    }, 0);
}
//# sourceMappingURL=printHelp.js.map