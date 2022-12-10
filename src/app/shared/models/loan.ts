import { Customer } from './customer';
export class Loan{
    constructor(
        public id?:number,
        public dateLoan?:string,
        public returnDate?:string,
        public customerName?: string,
        public observation?:string,
        public status?:boolean
    ){}
}
