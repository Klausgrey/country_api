import express from "express";
import { seedCountries } from "./seed.js";
import countryRouter from "./routes/countries.route.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();
app.use(express.json());
app.use(errorHandler);
app.use("/countries", countryRouter);
// app.use();
seedCountries();

app.listen(3000, () => {
	console.log("server running...");
});
