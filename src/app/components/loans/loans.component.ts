import { Table } from 'primeng/table';
import { LoansService } from './../../shared/services/loans.service';
import { Loan } from './../../shared/models/loan';
import { Component, OnInit } from '@angular/core';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { Customer } from 'src/app/shared/models/customer';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.scss']
})
export class LoansComponent implements OnInit {

  loan: Loan;
  loans: Loan[] = [];
  selectedLoans: any[] = [];
  customers: Customer[] = [];
  customerSelecionado: Customer;
  showLoading: boolean = false;
  displayModalCadastro: boolean = false;

  customerMsn = undefined;

  constructor(private loanService: LoansService,
    private customerService: CustomersService) {
    this.loan = {};
    this.customerSelecionado = {};
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

  findCustomerByNameOrCpf(evento: any) {

    this.customerService.findCustomerByNameOrCpf(evento.query)
    .subscribe(
      (dados) => {
        console.log(dados);
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

    this.loanService
      .save(this.loan)
      .subscribe((result) => { });

    if (this.loan.id)
      this.loans[this.findIndexById(this.loan.id)] = this.loan;
    else
      this.loans.push(this.loan);

    this.loans = [...this.loans];
    this.displayModalCadastro = false;
    this.loan = {};
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
    this.loan = { ...this.loan };
  }

  showDialogCadastro() {
    this.displayModalCadastro = true;
    this.loan = {};
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

}
