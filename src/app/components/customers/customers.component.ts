import { Table } from 'primeng/table';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../shared/models/customer';
import { CustomersService } from 'src/app/shared/services/customers.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {


    customer: Customer;
    customers: Customer[] = [];
    showLoading: boolean = false;
    selectedCustomers: any[] = [];
    displayModalCadastro: boolean = false;

    constructor(private customersService: CustomersService,
        private messageService: MessageService) {
        this.customer = {};
    }

    ngOnInit(): void {
        this.findAllCustomer();
    }

    findAllCustomer() {
        this.customersService.findAll().subscribe(
            (dados) => {
                this.customers = dados;
                this.showLoading = false;
            },
            (error) => {
                console.log(error)
                this.showLoading = false;
                this.showToast('error', error.message);
            }
        );
    }

    onSubmit() {

        try {
            this.validationForm();
            console.log(this.customer);
            this.customersService
                .save(this.customer)
                .subscribe((result : Customer) => {
                    if (this.customer.customerId)

                        this.customers[this.findIndexById(this.customer.customerId)] = this.customer;
                    else
                        this.customers.push(result);
                });

            this.customers = [...this.customers];
            this.displayModalCadastro = false;

        } catch (error) {
            this.showToast('warn', error);
        }
    }

    validationForm() {
        if (!this.customer.name)
            throw new Error('O campo nome é obrigatório!');
        if (!this.customer.email)
            throw new Error('O campo email é obrigatório!');
        if (!this.customer.cpf)
            throw new Error('O campo CPF é obrigatório!');
        if (!this.customer.contact1)
            throw new Error('O campo contato 1 é obrigatório!');

        if (!this.customer.street)
            throw new Error('O campo logradouro é obrigatório!');
        if (!this.customer.neighborhood)
            throw new Error('O campo bairro é obrigatório!');
        if (!this.customer.zip)
            throw new Error('O campo CEP é obrigatório!');
        if (!this.customer.city)
            throw new Error('O campo cidade é obrigatório!');
        if (!this.customer.state)
            throw new Error('O campo estado é obrigatório!');
    }

    private showToast(severity: string, detail: any) {
        this.messageService.clear();
        this.messageService.add({ severity: severity, detail: detail, life: 3000 });
    }

    findIndexById(customerId: number): number {
        let index = -1;
        for (let i = 0; i < this.customers.length; i++) {
            if (this.customers[i].customerId === customerId) {
                index = i;
                break;
            }
        }
        return index;
    }

    onEdit(customer: Customer) {
        this.showDialogCadastro();
        this.customer = { ...customer };
    }

    showDialogCadastro() {
        this.displayModalCadastro = true;
        this.customer = {};
    }

    hideModalAddDialog() {
        this.displayModalCadastro = false;
        this.customer = {};
    }

    findAddressByCep(event: any) {

        if (this.customer.zip) {
            this.customersService.findAddressByCep(this.customer.zip).
                subscribe(retorno => {

                    this.customer.street = retorno.street;
                    this.customer.neighborhood = retorno.neighborhood;
                    this.customer.city = retorno.city;
                    this.customer.state = retorno.state;
                }),
                (error: any) => {
                    this.showToast('error', error.message);
                };
        }
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }


}
