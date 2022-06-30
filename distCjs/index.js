"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.object = exports.map = exports.array = void 0;
const index_js_1 = require("./array/index.js");
exports.array = index_js_1.default;
const index_js_2 = require("./map/index.js");
exports.map = index_js_2.default;
const index_js_3 = require("./object/index.js");
exports.object = index_js_3.default;
exports.default = {
    array: index_js_1.default,
    map: index_js_2.default,
    object: index_js_3.default
};
//# sourceMappingURL=index.js.map