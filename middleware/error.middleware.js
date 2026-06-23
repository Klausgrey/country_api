export const errorHandler = (err, req, res, next) => {
	console.error(err.stack);
	const status = err.statusCode || 500;
	return (err, req, res, next) => {
		res.status(status).json({
			status: "error",
			message: err.message || "An unexpected error has ocurred",
		});
	};
};

export default errorHandler