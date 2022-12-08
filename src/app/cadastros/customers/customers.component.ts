import { ConsultaCepService } from './../../shared/services/consulta-cep.service';
import { Component, OnInit } from '@angular/core';
import { Customer } from '../../shared/models/customer';
import { CustomersService } from 'src/app/shared/services/customers.service';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {

    endereco: any = {};
    customer: Customer;
    submitted: boolean = false;
    customers: Customer[] = [];
    showLoading: boolean = false;
    selectedCustomers: any[] = [];
    displayModalCadastro: boolean = false;

    constructor(private customersService: CustomersService,
                private consultaCepService: ConsultaCepService) {
        this.customer = {};

        this.endereco = {
            cep: null,
            logradouro: null,
            complemento: null,
            bairro: null,
            localidade: null,
            uf: null
        }
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
                this.showLoading = false;
                this.showToast('warn', error.message);
            }
        );
    }

    onSubmit() {

        this.customersService
            .save(this.customer)
            .subscribe((result) => {
                if (this.customer.id)
                    this.customers[this.findIndexById(this.customer.id)] = this.customer;
                else
                    this.customers.push(result);

            });

        this.submitted = true;
        this.customers = [...this.customers];
        this.displayModalCadastro = false;

    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.customers.length; i++) {
            if (this.customers[i].id === id) {
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
        this.submitted = false;
        this.displayModalCadastro = true;
        this.customer = {};
    }

    hideModalAddDialog() {
        this.displayModalCadastro = false;
        this.submitted = false;
        this.customer = {};
    }

    private showToast(severity: string, detail: any) {
        setTimeout(() => { }, 300);
    }

    consultaCep(event: any){
        if(this.customer.zip != null && this.customer.zip){
            this.consultaCepService.consultaCEP(this.customer.zip).
            subscribe(retorno =>{
                this.endereco = retorno;
                this.customer.street = this.endereco.logradouro;
                this.customer.neighborhood = this.endereco.bairro;
                this.customer.city = this.endereco.localidade;
                this.customer.state = this.endereco.uf;
            }),
            (error: any) => {
                this.showLoading = false;
                this.showToast('warn', error.message);
            };
        }
    }




}
