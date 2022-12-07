import { Author } from './author';
export interface Book{

     id?:string;
     title?:string;
     isbn?:string;
     situation?:string;
     language?:string;
     registrationDate?:string;
     datePublication?:string;
     authors?: Author[];
}
