class ValidationError extends Error {
    status = 400;
    err = null;
    constructor(mesg, status, err) {
        super(mesg);
        this.status = status ?? 400;
        this.err = err;
    }
}
export default ValidationError;
//# sourceMappingURL=ValidationError.js.map