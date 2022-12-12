import { Book } from './book';
import { Customer } from './customer';

export interface Loan{
        id?:number;
        dateLoan?:string;
        returnDate?:string;
        customerName?: string;
        customer?: Customer
        observation?:string;
        status?:boolean;
        books?: Book[];

}
