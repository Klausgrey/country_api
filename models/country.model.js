import pool from "../config/db.js"


export const createTable = async () => {
	const query = pool.createTable(`
		CREATE IF NOT EXISTS countries (

		)

		`)
}