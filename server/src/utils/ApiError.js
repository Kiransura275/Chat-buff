class ApiError extends Error {
	constructor(statusCode = 400, message = "", errors = [], stack = "") {
		super(message);
		this.success = false;
		this.statusCode = statusCode;
		this.message = message;
		this.data = null;
		this.errors = errors;

		if (stack) {
			this.stack = stack;
		} else {
			Error.captureStackTrace(this, this.constructor);
		}
	}
}

export default ApiError;
