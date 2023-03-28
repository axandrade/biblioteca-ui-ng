import { MessageService } from 'primeng/api';
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
    customers: Customer[] = [];
    showLoading: boolean = false;
    displayModalCadastro: boolean = false;
    displayModalDevolucoes: boolean = false;
    customerMsn = undefined;
    qtdBooksDisponiveis: number;
    tiposDeBusca: any[] = [];
    tipoBuscaSelected: string = 'TODOS';

    constructor(private loanService: LoansService,
        private customerService: CustomersService,
        private booksService: BooksService,
        private messageService: MessageService) {

        this.loan = {};
        this.qtdBooksDisponiveis = 0;

        this.tiposDeBusca = [
            { value: 'TODOS', description: 'Todos' },
            { value: 'ATIVOS', description: 'Ativos' },
            { value: 'ATRASADOS', description: 'Atrasados' }
        ];
    }

    ngOnInit(): void {

        this.findAllLoans();
    }

    findAllLoans() {
        this.loanService.findAll(this.tipoBuscaSelected).subscribe(
            (dados) => {
                debugger
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
        try {
            this.loan.itensLoan = this.prepareLoan(this.loan);
            this.validationForm();
            this.loanService
                .save(this.loan)
                .subscribe((retorno: Loan) => {
                    if (this.loan.loanId) {
                        //update
                        this.loans[this.findIndexById(this.loan.loanId)] = retorno;
                    }
                    else {
                        //create
                        this.loans.push(retorno);
                    }

                });

            this.loans = [...this.loans];
            this.displayModalCadastro = false;
            this.displayModalDevolucoes = false;
        } catch (error) {
            this.showToast('warn', error);
        }
    }

    prepareLoan(loan: Loan) {
        if (this.loan.loanId) {
            return this.itensLoanSelected;
        }
        else {
            //create
            let itemLoan: ItensLoan;
            let itensLoan: ItensLoan[] = [];

            loan.status = 'ATIVO';
            for (var b of this.booksSelected) {
                itemLoan = {};
                itemLoan.book = b;
                itensLoan.push(itemLoan);
            }
            return itensLoan;
        }
    }

    validationForm() {
        if (!this.loan.customer)
            throw new Error('Você deve selecionar um usuário cadastrado!');
        if (this.loan.itensLoan?.length! === undefined || this.loan.itensLoan?.length! === 0 ){
            throw new Error('Você deve selecionar no minimo um livro');
        }else{
            for (var il of this.loan.itensLoan!) {
                if(il.book?.authors?.length === 0){
                    throw new Error('O livro '+ il.book.title + ' nao possui nenhum autor cadastrado, vá ate a tela de cadastros de livros e inclua um autor na obra');
                }
            }
        }
    }

    private showToast(severity: string, detail: any) {
        this.messageService.clear();
        this.messageService.add({ severity: severity, detail: detail, life: 5000 });
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
        let date = new Date();
        date.setMonth(date.getMonth() + 1);

        this.displayModalCadastro = true;
        this.loan = {};
        this.findBooksByStatus();
        this.loan = {
            dateLoan: new Date().toLocaleString(),
            returnLimitDate: date.toLocaleDateString(),
        };
    }

    showDialogDevolucoes(loan: Loan) {
        this.loan = { ...loan };
        this.displayModalDevolucoes = true;
    }

    hideModalAddDialog() {
        this.displayModalCadastro = false;
        this.displayModalDevolucoes = false;
        this.itensLoanSelected = [];
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

        if (this.loan?.customer?.customerId) {
            this.loanService.findLoansByCustomer(this.loan.customer.customerId)
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
