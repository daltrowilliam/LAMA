import express from "express";
import { BandController } from "../BandController";


export const bandRouter = express.Router();

const bandController = new BandController();

bandRouter.post("/registry", bandController.registry);
bandRouter.get("/:input", bandController.getProfile);
