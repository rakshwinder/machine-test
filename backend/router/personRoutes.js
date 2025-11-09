import express from "express";
import { getAllPersons, PersonSeedData } from "../controller/personController.js";
import auth from "../middlewear/auth,js";

const personRoutes = express.Router();

personRoutes.post("/seed", PersonSeedData);
personRoutes.get('/getAllPersons',auth, getAllPersons)

export default personRoutes;
