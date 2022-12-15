import { Author } from './author';
export interface Book {

    bookId?: number;
    title?: string;
    isbn?: string;
    statusBook?: number;
    codLanguage?: string;
    descLanguage?: string;
    datePublication?: string;
    authors?: Author[];
}
