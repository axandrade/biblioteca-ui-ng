import { ItensLoan } from './itensloan';
import { Book } from './book';
import { Customer } from './customer';

export interface Loan{
        loanId?:number;
        dateLoan?:string;
        returnLimitDate?:string;
        customer?: Customer
        observation?:string;
        status?:string;
        itensLoan?: ItensLoan[];
        numberDaysLate?: number;
        fineAmount?: number;
}
