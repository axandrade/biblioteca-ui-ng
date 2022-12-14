import { Loan } from './loan';
import { Book } from './book';

export interface ItensLoan {
    itemLoanId?: number;
    returnDateItem?: string;
    loanId?: number;
    book?: Book;
}
