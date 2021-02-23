import express from "express";
import { ShowController } from "../ShowController";


export const showRouter = express.Router();

const showController = new ShowController();

showRouter.post("/create", showController.createShow);
showRouter.post("/:day", showController.getShowByDay);