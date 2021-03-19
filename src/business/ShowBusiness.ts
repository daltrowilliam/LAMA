import { ShowInputDTO, ShowDay } from "./entities/Show";
import { ShowDatabase } from "../data/ShowDatabase";
import { IdGenerator } from "./services/IdGenerator";
import { HashManager } from "./services/HashManager";
import { Authenticator } from "./services/Authenticator";
import { CustomError } from "./error/CustomError";

export class ShowBusiness {

   constructor(
      private idGenerator: IdGenerator,
      private hashManager: HashManager,
      private authenticator: Authenticator,
      private showDatabase: ShowDatabase,
   ) { }

   async createShow(show: ShowInputDTO) {
           
      if (
         !show.week_day ||
         !show.start_time ||
         !show.end_time ||
         !show.band_id
     ) {
      throw new CustomError(400, "'week_day', 'start_time', 'end_time' and 'band_id' must be informed!");
     }

     if (
         show.week_day !== ShowDay.FRIDAY &&
         show.week_day !== ShowDay.SATURDAY &&
         show.week_day !== ShowDay.SUNDAY
      ) {
         throw new CustomError(400, "'week_day' must be 'FRIDAY', 'SATURDAY' or 'SUNDAY'")
      }

      if (!Number.isInteger(show.start_time) || !Number.isInteger(show.end_time)) {
         throw new CustomError(400, "'start_time' and 'end_time' must be a integer")
      }

      if (show.start_time < 8 || show.start_time >= 23 || show.end_time > 23 || show.start_time > show.end_time) {
         throw new CustomError(400, "A show can only be performed between 8 and 23 hours")
      }

      const showsOfDay: [] = await this.showDatabase.verifyShowOfDay(show.week_day);


      // Funcionalidade de verificação de conflitos a ser implementada.

      /* const conflictShows = showsOfDay.filter((bookedShow) => {
         if ((show.start_time >= bookedShow.start_time) && (show.start_time < bookedShow.end_time)) {
            return true
         } else {
            if ((show.start_time < bookedShow.start_time) && (show.end_time > bookedShow.start_time)) {
               return true
            }
         }
         return false
      })

      if (conflictShows.length !== 0) {
         throw new CustomError(400, "There is already a show scheduled at this time")
      } */

      const id = this.idGenerator.generate();

      await this.showDatabase.createShow(
         id,
         show.week_day,
         show.start_time,
         show.end_time,
         show.band_id
      );


      return "Show created with succes!";
   }

   async getShowByDay(week_day: string) {

      if (
         week_day !== ShowDay.FRIDAY &&
         week_day !== ShowDay.SATURDAY &&
         week_day !== ShowDay.SUNDAY
      ) {
         throw new CustomError(400, "'week_day' must be 'FRIDAY', 'SATURDAY' or 'SUNDAY'")
      }

      const result: [] = await this.showDatabase.getShowByDay(week_day);

      if (result.length === 0) {
         throw new CustomError(404, "There are no shows in this day!");
      }

      
      return result;
   }
}