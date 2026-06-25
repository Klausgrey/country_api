import { getCountries, getByRegion, getByPopulation } from "../models/country.model.js";

export const getAllCountries = async (req, res, next) => {
	try {
		const { region, population_gte } = req.query;
		let result;

		if (region) result = await getByRegion(region);
		else if (population_gte) result = await getByPopulation(population_gte)
		else result = await getCountries();
		res.status(200).json({ result });
	} catch (err) {
		next(err);
	}
};
