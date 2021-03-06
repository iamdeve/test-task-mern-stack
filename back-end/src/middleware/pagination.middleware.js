export const paginatedResults = (model) => {
	return async (req, res, next) => {
		const page = parseInt(req.query.page);
		const limit = parseInt(req.query.limit);
		const startIndex = (page - 1) * limit;
		const endIndex = page * limit;
		const results = {};
		const total = await model.countDocuments().exec();
		if (endIndex < total) {
			results.next = {
				page: page + 1,
				limit: limit,
				total: total,
			};
		}
		if (startIndex > 0) {
			results.previous = {
				page: page - 1,
				limit: limit,
				total: total,
			};
		}
		try {
			results.results = await model.find().limit(limit).skip(startIndex).exec();
			res.paginatedResults = results;
			next();
		} catch (e) {
			res.status(500).json({ message: e.message });
		}
	};
};
