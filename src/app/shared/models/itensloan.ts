import { Loan } from './loan';
import { Book } from './book';

export interface ItensLoan {
    id?: number;
    dateLoanItem?: string;
    returnDateItem?: string;
    loan?: Loan;
    book?: Book;
}
