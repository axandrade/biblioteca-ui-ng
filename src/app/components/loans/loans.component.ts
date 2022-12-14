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
  itensLoanSelected: ItensLoan[] = [];
  loans: Loan[] = [];
  loansSelected: any[] = [];
  customers: Customer[] = [];
  showLoading: boolean = false;
  displayModalCadastro: boolean = false;
  displayModalDevolucoes: boolean = false;
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

    if (!this.loan.loanId)
      this.loan.itensLoan = this.prepareLoanForSave(this.loan);

    this.loanService
      .save(this.loan)
      .subscribe();

    if (this.loan.loanId)
      this.loans[this.findIndexById(this.loan.loanId)] = this.loan;
    else
      this.loans.push(this.loan);

    this.loans = [...this.loans];
    this.displayModalCadastro = false;
    this.displayModalDevolucoes = false;
    this.loan = {};
  }

  prepareLoanForSave(loan: Loan) {
    let itemLoan: ItensLoan;
    let itensLoan: ItensLoan[] = [];
    loan.status = true;
    for (var b of this.booksSelected) {
      itemLoan = {};
      itemLoan.itemLoanId = null || undefined,
        itemLoan.book = b;
      itensLoan.push(itemLoan);
      if (loan.loanId)
        itemLoan.returnDateItem = new Date().toLocaleString();
    }
    return itensLoan;
  }

  findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.loans.length; i++) {
      if (this.loans[i].loanId === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  showDialogCadastro() {
    this.displayModalCadastro = true;
    this.loan = {};
    this.findBooksByStatus();
    this.loan = {
      dateLoan: new Date().toLocaleString(),
      returnLimitDate: new Date(new Date().setMonth(0)).toLocaleDateString()
    };
  }

  showDialogDevolucoes(loan: Loan) {
    this.loan = { ...loan };
    this.displayModalDevolucoes = true;
    this.findLoansByCustomer();
    console.log(this.qtdBooksDisponiveis);
  }

  hideModalAddDialog() {
    this.displayModalCadastro = false;
    this.displayModalDevolucoes = false;
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
