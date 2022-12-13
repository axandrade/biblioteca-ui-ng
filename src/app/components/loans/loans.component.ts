import { ItensLoan } from './../../shared/models/itensloan';
import { BooksService } from './../../shared/services/books.service';
import { Table } from 'primeng/table';
import { LoansService } from './../../shared/services/loans.service';
import { Loan } from './../../shared/models/loan';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { Customer } from 'src/app/shared/models/customer';
import { Book } from 'src/app/shared/models/book';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {

  loan: Loan;
  books: Book[] = [];
  booksSelected: Book[] = [];
  loans: Loan[] = [];
  selectedLoans: any[] = [];
  customers: Customer[] = [];
  showLoading: boolean = false;
  displayModalCadastro: boolean = false;
  title: string = '';
  customerMsn = undefined;
  qtdBooksDisponiveis: number;

  constructor(private loanService: LoansService,
    private customerService: CustomersService,
    private booksService: BooksService) {

    this.loan = {};
    this.qtdBooksDisponiveis = 0;
  }

  ngOnInit(): void {

    this.findAllLoans();
  }

  findAllLoans() {
    this.loanService.findAll().subscribe(
      (dados) => {
        this.loans = dados;
        this.showLoading = false;
      },
      (error) => {
        this.showLoading = false;
        this.showToast('warn', error.message);
      }
    );
  }

  findBooksByStatus() {
    this.booksService.findBooksByStatus().subscribe(
      (dados) => {
        this.books = dados;
        this.showLoading = false;
      },
      (error) => {
        this.showLoading = false;
        this.showToast('warn', error.message);
      }
    );
  }

  findCustomerByNameOrCpf(evento: any) {
    this.customerService.findCustomerByNameOrCpf(evento.query)
      .subscribe(
        (dados) => {
          this.customers = dados;
          this.showLoading = false;
        },
        (error) => {
          this.showLoading = false;
          this.showToast('warn', error.message);
        }
      );
  }

  onSubmit() {

    var itensLoan: ItensLoan[] = [];

    itensLoan = this.prepareLoanForSave(this.loan);
    this.loan.itensLoan = itensLoan;

    this.loanService
      .save(this.loan)
      .subscribe((result) => { debugger; console.log(result) });

    if (this.loan.id)
      this.loans[this.findIndexById(this.loan.id)] = this.loan;
    else
      this.loans.push(this.loan);

    this.loans = [...this.loans];
    this.displayModalCadastro = false;
    this.loan = {};

  }

  prepareLoanForSave(loan: Loan) {

    var itemLoan: ItensLoan;
    var itensLoan: ItensLoan[] = [];

    for( var b of this.booksSelected){
      itemLoan = {};
      itemLoan.bookId = b.id;
      itensLoan.push(itemLoan);
    }
    return itensLoan;
  }

  findIndexById(id: number): number {

    let index = -1;
    for (let i = 0; i < this.loans.length; i++) {
      if (this.loans[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  onEdit(loan: Loan) {
    this.showDialogCadastro();
    this.loan = { ...loan };
  }

  showDialogCadastro() {
    this.findBooksByStatus();
    this.displayModalCadastro = true;
    this.loan = {
      dateLoan: new Date().toLocaleString(),
      returnDate: new Date(new Date().setMonth(0)).toLocaleDateString()
    };

  }

  hideModalAddDialog() {
    this.displayModalCadastro = false;
    this.loan = {};
  }

  private showToast(severity: string, detail: any) {
    setTimeout(() => { }, 300);
  }

  onGlobalFilter(table: Table, event: Event) {
    table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
  }

  public changeDocente(event: any) {
    this.customerMsn = undefined;
  }

  findLoansByCustomer() {
    let loansCostumer: Loan;
    let x: number;

    if (this.loan?.customer?.id) {
      this.loanService.findLoansByCustomer(this.loan.customer.id)
        .subscribe(
          (resultado) => {
            loansCostumer = resultado;
            if (loansCostumer.itensLoan!.length === 0) {
              this.qtdBooksDisponiveis = 2;
            }
            if (loansCostumer.itensLoan!.length === 1) {
              this.qtdBooksDisponiveis = 1;
            }
            if (loansCostumer.itensLoan!.length === 2) {
              this.qtdBooksDisponiveis = 0;
            }
          }
        );

    }
  }

}
