class ApiResponse {
	constructor(statusCode, data = { success: true }, message) {
		this.success = statusCode < 400;
		this.statusCode = statusCode;
		this.data = data;
		this.message = message;
	}
}

export default ApiResponse;
