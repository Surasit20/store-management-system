class RequestHandler {

	throwIf(fn, status, errorType, errorMessage) {
		return result => (fn(result) ? this.throwError(status, errorType, errorMessage)() : result);
	}

	throwError(status, errorType, errorMessage) {
		return (e) => {
			if (!e) e = new Error(errorMessage || 'Default Error');
			e.status = status;
			e.errorType = errorType;
			throw e;
		};
	}

	catchError(res, error) {
		if (!error) error = new Error('Default error');
		res.status(error.status || 500).json({ type: 'error', message: error.message || 'Unhandled error', error });
	}

	sendSuccess(res, message, status) {
		return (data, globalData) => {
			if (status == undefined) {
				status = 200;
			}
			res.status(status).json({
				type: 'success', message: message || 'Success result', data, ...globalData,
			});
		};
	}

	sendError(req, res, error) {
		return res.status(error.status || 500).json({
			type: 'error', message: error.message || error.message || 'Unhandled Error', error,
		});
	}
}
module.exports = RequestHandler;