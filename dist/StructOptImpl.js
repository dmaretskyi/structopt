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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StructOptImpl = void 0;
var errors_1 = require("./errors");
var StructOptImpl = /** @class */ (function () {
    function StructOptImpl(_a) {
        var key = _a.key, name = _a.name, about = _a.about, version = _a.version, allowTrailing = _a.allowTrailing;
        this.options = [];
        this.key = key;
        this.name = name || key;
        this.about = about || '';
        this.version = version || '';
        this.allowTrailing = allowTrailing !== null && allowTrailing !== void 0 ? allowTrailing : false;
    }
    StructOptImpl.prototype.allPositionalsFilled = function (parsed) {
        return this.options.every(function (o) { return o.short || !o.long || o.repeated && !o.required || !Object.keys(parsed).includes(o.key); });
    };
    StructOptImpl.prototype.addOption = function (option) {
        this.options.push(option);
    };
    StructOptImpl.prototype.parse = function (_a, parsed) {
        var _b, _c, _d, _e, _f, _g;
        var x = _a[0], xs = _a.slice(1);
        if (parsed === void 0) { parsed = {}; }
        validateOptionConfig(this.options);
        if (x === undefined) {
            for (var _i = 0, _h = this.options; _i < _h.length; _i++) {
                var option = _h[_i];
                if (parsed[option.key] === undefined) {
                    if (option.defaultValue !== undefined) {
                        ;
                        parsed[option.key] = option.defaultValue;
                    }
                    if (option.repeated) {
                        ;
                        parsed[option.key] = [];
                    }
                }
            }
            return parsed;
        }
        var longMatched = /^--[a-z|A-Z|0-9|-|_]+/.test(x);
        var shortMatched = /^-[a-z|A-Z|0-9]/.test(x);
        if (shortMatched || longMatched) {
            var option = this.options.find(function (o) {
                if (longMatched) {
                    return o.long === x;
                }
                else {
                    return o.short === x;
                }
            });
            if (!option) {
                if (this.allowTrailing && this.allPositionalsFilled(parsed)) {
                    return this.parse(xs, __assign(__assign({}, parsed), { '_': arrayAppend(parsed['_'], x) }));
                }
                throw new errors_1.UnexpectedArgsError("Found argument '" + x + "' which wasn't expected, or isn't valid in this context");
            }
            var value = xs[0], rest = xs.slice(1);
            if (option.type === 'boolean') {
                if (value === 'false') {
                    return this.parse(rest, __assign(__assign({}, parsed), (_b = {}, _b[option.key] = false, _b)));
                }
                return this.parse(xs, __assign(__assign({}, parsed), (_c = {}, _c[option.key] = true, _c)));
            }
            if (option.type === 'string') {
                return this.parse(rest, __assign(__assign({}, parsed), (_d = {}, _d[option.key] = value, _d)));
            }
            if (option.type === 'number') {
                return this.parse(rest, __assign(__assign({}, parsed), (_e = {}, _e[option.key] = Number(value), _e)));
            }
        }
        var positionOption = this.options.filter(function (o) { return !o.short && !o.long && (o.repeated || !Object.keys(parsed).includes(o.key)); })[0];
        if (positionOption) {
            if (positionOption.repeated && !parsed['_']) {
                return this.parse(xs, __assign(__assign({}, parsed), (_f = {}, _f[positionOption.key] = arrayAppend(parsed[positionOption.key], x), _f)));
            }
            else {
                return this.parse(xs, __assign(__assign({}, parsed), (_g = {}, _g[positionOption.key] = x, _g)));
            }
        }
        if (this.allowTrailing) {
            return this.parse(xs, __assign(__assign({}, parsed), { '_': arrayAppend(parsed['_'], x) }));
        }
        return this.parse(xs, parsed);
    };
    StructOptImpl.prototype.validate = function (result) {
        validateOptionConfig(this.options);
        for (var _i = 0, _a = this.options; _i < _a.length; _i++) {
            var option = _a[_i];
            if (result[option.key] === undefined) {
                if (option.required) {
                    throw new errors_1.ValidationError("The following required arguments were not provided", [
                        option.key,
                    ]);
                }
                if (option.requiredIf && option.requiredIf(result)) {
                    throw new errors_1.ValidationError("The following required arguments were not provided", [
                        option.key,
                    ]);
                }
            }
            if (option.repeated && option.required && result[option.key].length === 0) {
                throw new errors_1.ValidationError("The following required arguments were not provided", [
                    option.key,
                ]);
            }
        }
    };
    return StructOptImpl;
}());
exports.StructOptImpl = StructOptImpl;
function validateOptionConfig(options) {
    var repeatedPositionalReached = false;
    for (var _i = 0, options_1 = options; _i < options_1.length; _i++) {
        var option = options_1[_i];
        if (!option.short && !option.long) {
            if (repeatedPositionalReached) {
                throw new Error("Only a single repeated positional option is allowed provided that it is the last one.");
            }
            if (option.repeated) {
                repeatedPositionalReached = true;
            }
        }
    }
}
var arrayAppend = function (existing, x) { return __spreadArray(__spreadArray([], (existing !== null && existing !== void 0 ? existing : [])), [x]); };
//# sourceMappingURL=StructOptImpl.js.map