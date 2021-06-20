"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidationError extends Error {
    constructor(mesg, status, err) {
        super(mesg);
        this.status = 400;
        this.err = null;
        this.status = status !== null && status !== void 0 ? status : 400;
        this.err = err;
    }
}
exports.default = ValidationError;
//# sourceMappingURL=ValidationError.js.map