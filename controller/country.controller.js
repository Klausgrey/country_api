import { getCountries, getByRegion } from "../models/country.model.js";

export const getAllCountries = async (req, res, next) => {
	try {
		const { region } = req.query;
		let result;

		if (region) result = await getByRegion(region);
		else result = await getCountries();
		res.status(200).json({ result });
	} catch (err) {
		next(err);
	}
};
