export class Band {
   constructor(
      public readonly id: string,
      public readonly name: string,
      public readonly music_genre: string,
      public readonly responsible: string
   ) { }

}

export interface BandInputDTO {
   name: string;
   music_genre: string;
   responsible: string;
}

export interface AuthenticationData {
   id: string;
   role?: string;
}