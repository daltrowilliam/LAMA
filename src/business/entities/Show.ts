import { CustomError } from "../error/CustomError";

export class Show {
   constructor(
      public readonly id: string,
      public readonly week_day: ShowDay,
      public readonly start_time: number,
      public readonly end_time: number,
      public readonly band_id: string
   ) { }


   static stringToShowDay(input: string): ShowDay {
      switch (input) {
         case "FRIDAY":
            return ShowDay.FRIDAY;
         case "SATURDAY":
            return ShowDay.SATURDAY;
         case "SATURDAY":
            return ShowDay.SUNDAY;
         default:
            throw new CustomError(422,"Invalid show day");
      }
   }
}

export interface ShowInputDTO {
   week_day: ShowDay;
   start_time: number;
   end_time: number;
   band_id: string;
}

export enum ShowDay {
   FRIDAY = "FRIDAY",
   SATURDAY = "SATURDAY",
   SUNDAY = "SUNDAY"
}
