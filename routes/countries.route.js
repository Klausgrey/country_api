import express from "express";
const router = express.Router();
import { getAllCountries } from "../controller/country.controller.js";

router.get("/", getAllCountries);

export default router;
