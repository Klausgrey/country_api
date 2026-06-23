import { saveCountries } from "./models/country.model.js";
import pool from "./config/db.js";

export const seedCountries = async () => {
	try {
		const existing = await pool.query(`
			SELECT COUNT(*) FROM countries`);
		if (existing.rows[0].count > 0) {
			console.log("already seeded...");
			return;
		}
		const response = await fetch(
			"https://countries-api.davegarvey.workers.dev/countries",
		);
		const data = await response.json();
		for (const country of data) {
			await saveCountries(
				country.name,
				country.capital,
				country.region,
				country.population,
				country.currency,
			);
		}
		console.log("seeded...");
	} catch (err) {
		console.error(err);
	}
};
