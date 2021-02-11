import { AuthenticationData, BandInputDTO } from "./entities/Band";
import { BandDatabase } from "../data/BandDatabase";
import { IdGenerator } from "./services/IdGenerator";
import { HashManager } from "./services/HashManager";
import { Authenticator } from "./services/Authenticator";
import { CustomError } from "./error/CustomError";
import { UserRole } from "./entities/User";

export class BandBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private hashManager: HashManager,
      private authenticator: Authenticator,
      private bandDatabase: BandDatabase,
   ) { }

   async registryBand(band: BandInputDTO, authorization: string | undefined) {

      const tokenData: AuthenticationData = this.authenticator.getData(authorization!)

      if (!tokenData) {
         throw new CustomError(403, "Invalid Token")
      }

      if (
         tokenData.role !== UserRole.ADMIN) {
         throw new CustomError(403, "Invalid Role. User must be ADMIN to registry a band")
      }
      
      if (
         !band.name ||
         !band.music_genre ||
         !band.responsible
     ) {
      throw new CustomError(400, "'name', 'music_genre', and 'responsible' must be informed!");
     }

      const id = this.idGenerator.generate();

      await this.bandDatabase.registryBand(
         id,
         band.name,
         band.music_genre,
         band.responsible
      );

      return "Registry Done!";
   }

   async getProfile(input: string) {

      const band = await this.bandDatabase.getProfile(input);

      if (!band) {
         throw new CustomError(404, "Band Not Found!");
      }

      return band;
   }
}