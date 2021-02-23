import { Request, Response } from "express";
import { ShowInputDTO } from "../business/entities/Show";
import { Authenticator } from "../business/services/Authenticator";
import { HashManager } from "../business/services/HashManager";
import { IdGenerator } from "../business/services/IdGenerator";
import { ShowBusiness } from "../business/ShowBusiness";
import { ShowDatabase } from "../data/ShowDatabase";

const showBusiness = new ShowBusiness(
   new IdGenerator(),
   new HashManager,
   new Authenticator(),
   new ShowDatabase()
);

export class ShowController {
   async createShow(req: Request, res: Response) {
      try {

         const input: ShowInputDTO = {
            week_day: req.body.week_day,
            start_time: req.body.start_time,
            end_time: req.body.end_time,
            band_id: req.body.band_id
         }

         const result = await showBusiness.createShow(input);

         res.status(200).send({ result });

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }

   async getShowByDay(req: Request, res: Response) {

      try {

         const week_day = req.params.week_day;

         const shows = await showBusiness.getShowByDay(week_day);

         res.status(200).send({ shows });

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }

}