import { BaseDatabase } from "./BaseDatabase";
import { Band } from "../business/entities/Band";
import { CustomError } from "../business/error/CustomError";

export class BandDatabase extends BaseDatabase {

   private static TABLE_NAME = "lama_bands";

   private static toUserModel(band: any): Band {
      return new Band(
         band.id,
         band.name,
         band.music_genre,
         band.responsible
      );
   }

   public async registryBand(
      id: string,
      name: string,
      music_genre: string,
      responsible: string
   ): Promise<void> {
      try {
         await BaseDatabase.connection
            .insert({
               id,
               name,
               music_genre,
               responsible
            })
            .into(BandDatabase.TABLE_NAME);
      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }

   public async getProfile(input: string): Promise<Band> {
      try {
         const result = await BaseDatabase.connection.raw(`
            SELECT * FROM '${BandDatabase.TABLE_NAME}'
            WHERE id = '${input}' OR name = '${input}';
         `)

         return BandDatabase.toUserModel(result[0][0]);

      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }
}