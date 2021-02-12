import { BaseDatabase } from "./BaseDatabase";
import { Show } from "../business/entities/Show";
import { CustomError } from "../business/error/CustomError";

export class ShowDatabase extends BaseDatabase {

   private static TABLE_NAME = "lama_shows";

   private static toUserModel(show: any): Show {
      return new Show(
         show.id,
         show.week_day,
         show.start_time,
         show.end_time,
         show.band_id
      );
   }

   public async createShow(
      id: string,
      week_day: string,
      start_time: number,
      end_time: number,
      band_id: string
   ): Promise<void> {
      try {
         await BaseDatabase.connection
            .insert({
               id,
               week_day,
               start_time,
               end_time,
               band_id
            })
            .into(ShowDatabase.TABLE_NAME);
      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }


   public async getShowByDay(week_day: string): Promise<Show> {
      try {
         const result = await BaseDatabase.connection.raw(`
            SELECT bands.name, bands.music_genre FROM '${ShowDatabase.TABLE_NAME} shows'
            INNER JOIN lama_bands bands ON bands.id = shows.band_id
            WHERE shows.week_day = '${week_day}'
            ORDER BY shows.start_time ASC;
         `)
        
         return result[0][0];

      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }

   public async verifyShowOfDay(week_day: string): Promise<any> {
      try {
         const result = await BaseDatabase.connection.raw(`
            SELECT * FROM '${ShowDatabase.TABLE_NAME}'
            WHERE week_day = '${week_day}';
         `)
        
         return result[0][0];

      } catch (error) {
         throw new CustomError(500, "An unexpected error ocurred");
      }
   }
}