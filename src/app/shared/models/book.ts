import { Author } from './author';
export interface Book{

     id?:number;
     title?:string;
     isbn?:string;
     situation?:number;
     codLanguage?:string;
     descLanguage?: string;
     datePublication?:string;
     authors?: Author[];
}
