import pool from "../config/db.js";
// (name, capital, region, population, currency)

export const createTable = async () => {
	try {
		await pool.query(
			`
		CREATE TABLE IF NOT EXISTS countries (
		id SERIAL PRIMARY KEY,
		name VARCHAR NOT NULL,
		capital VARCHAR NOT NULL,
		region VARCHAR NOT NULL,
		population INT NOT NULL,
		currency VARCHAR NOT NULL
		)
			`,
		);
		console.log("country table ready...");
	} catch (err) {
		console.error(err);
	}
};
createTable();

export const saveCountries = async (
	name,
	capital,
	region,
	population,
	currency,
) => {
	try {
		const result = await pool.query(
			`
		INSERT INTO countries
		(name, capital, region, population, currency)
		VALUES ($1, $2, $3, $4, $5)
		RETURNING *
			`,
			[name, capital, region, population, currency],
		);
		return result.rows[0];
	} catch (err) {
		console.error(err);
	}
};

export const getCountries = async () => {
	try {
		const result = await pool.query(
			`
			SELECT *
			FROM countries
			`,
		);
		return result.rows;
	} catch (err) {
		console.error(err);
	}
};

export const getByRegion = async (region) => {
	try {
		const result = await pool.query(
			`
			SELECT * FROM countries WHERE region = $1
			`,
			[region],
		);
		return result.rows;
	} catch (err) {
		console.error(err);
	}
};
