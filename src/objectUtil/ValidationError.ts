class ValidationError extends Error {
	status: number = 400;
	err?: Error = null;

	constructor(mesg?: string, status?: number, err?: Error) {
		super(mesg);
		this.status = status ?? 400;
		this.err = err;
	}

}

export default ValidationError;
