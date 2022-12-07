import { Author } from './author';
export interface Book{

     id?:string;
     title?:string;
     isbn?:string;
     situation?:string;
     codLanguage?:string;
     descLanguage?: string;
     datePublication?:string;
     authors?: Author[];
}
