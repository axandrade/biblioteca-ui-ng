import { Author } from './author';
export interface Book {

    id?: number;

    name: string;

    email: string;

    cpfOrCnpj: string;

    contact1: string;

    contact2: string;

    birthDate: string;

    street: string;

    number: string;

    complement: string;

    neighborhood: string;

    zip: string;

    city: string;

    state: string;
}
