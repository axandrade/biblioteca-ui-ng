import { Category } from './../../shared/models/category';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';
import { CategoriesService } from 'src/app/shared/services/categories.service';


@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {

    category: Category;
    categories: Category[] = [];
    showLoading: boolean = false;
    displayModalCadastro: boolean = false;

    constructor(
        private categoriesService: CategoriesService,
        private messageService: MessageService

    ) {
        this.category = {};

    }

    ngOnInit(): void {
        this.findAllCategories();
    }

    findAllCategories() {
        this.categoriesService.findAll().subscribe(
            (dados) => {
                this.categories = dados;
                this.showLoading = true;
            },
            (error) => {
                this.showLoading = false;
                this.showToast('danger', error.message);
            }
        );
    }

    onSubmit() {
        try {
            this.validationForm();

            this.categoriesService
                .save(this.category)
                .subscribe((result: Category) => {
                    if (this.category.categoryId)
                        //update
                        this.categories[this.findIndexById(this.category.categoryId)] = this.category;
                    else
                        //create
                        this.categories.push(result);
                },
                    error => {
                        this.showLoading = false;
                        this.showToast('warn', error.message);
                        this.categories = [];
                    });

            this.categories = [...this.categories];
            this.displayModalCadastro = false;

        } catch (error) {
            this.showToast('warn', error);
        }
    }

    validationForm() {
        if (!this.category.description)
            throw new Error('O campo descrição é obrigatório!');
    }


    private showToast(severity: string, detail: any) {

        this.messageService.clear();
        this.messageService.add({ severity: severity, detail: detail, life: 3000 });

    }

    findIndexById(id: number): number {

        let index = -1;
        for (let i = 0; i < this.categories.length; i++) {
            if (this.categories[i].categoryId === id) {
                index = i;
                break;
            }
        }

        return index;
    }


    onEdit(category: Category) {
        this.showDialogCadastro();
        this.category = { ...category };
    }

    showDialogCadastro() {
        this.displayModalCadastro = true;
        this.category = {};
    }

    hideModalAddDialog() {
        this.displayModalCadastro = false;
        this.category = {};
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
