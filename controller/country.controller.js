import {
	getCountries,
	getByRegion,
	getByPopulation,
} from "../models/country.model.js";
import redis from "../config/redis.js";
import { json } from "express";

export const getAllCountries = async (req, res, next) => {
	try {
		const cached = await redis.get("countries");
		const { region, population_gte } = req.query;
		let result = ""

		if (region) result = await getByRegion(region);
		else if (population_gte) result = await getByPopulation(population_gte);
		else {
			if (cached) return res.status(200).json({ result: JSON.parse(cached) });
			result = await getCountries();
			await redis.set("countries", JSON.stringify(result));
		}
		res.status(200).json({ result });
	} catch (err) {
		next(err);
	}
};
