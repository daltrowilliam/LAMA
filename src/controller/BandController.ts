import { Request, Response } from "express";
import { BandInputDTO } from "../business/entities/Band";
import { Authenticator } from "../business/services/Authenticator";
import { HashManager } from "../business/services/HashManager";
import { IdGenerator } from "../business/services/IdGenerator";
import { BandBusiness } from "../business/BandBusiness";
import { BandDatabase } from "../data/BandDatabase";

const bandBusiness = new BandBusiness(
   new IdGenerator(),
   new HashManager,
   new Authenticator(),
   new BandDatabase()
);

export class BandController {
   async registry(req: Request, res: Response) {
      try {

         const { authorization } = req.headers

         const input: BandInputDTO = {
            name: req.body.name,
            music_genre: req.body.music_genre,
            responsible: req.body.responsible
         }

         const registry = await bandBusiness.registryBand(input, authorization);

         res.status(200).send({ registry });

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }

   async getProfile(req: Request, res: Response) {

      try {

         const input = req.params.id;

         const band = await bandBusiness.getProfile(input);

         res.status(200).send({ band });

      } catch (error) {
         res
            .status(error.statusCode || 400)
            .send({ error: error.message });
      }
   }

}