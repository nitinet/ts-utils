class ValidationError extends Error {
    constructor(mesg, status, err) {
        super(mesg);
        this.status = 400;
        this.err = null;
        this.status = status ?? 400;
        this.err = err;
    }
}
export default ValidationError;
//# sourceMappingURL=ValidationError.js.map