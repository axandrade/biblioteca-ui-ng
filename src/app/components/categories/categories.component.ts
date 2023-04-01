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
                this.showLoading = false;
            },
            (error) => {
                this.showLoading = false;
                this.showToast('error', error);
            }
        );
    }

    onSubmit() {
        try {
          this.validationForm();
          this.categoriesService.save(this.category).subscribe(
            (result: Category) => {
              if (this.category.categoryId) {
                this.updateCategory(result);
              } else {
                this.createCategory(result);
              }
            },
            error => {
              this.showLoading = false;
              this.showToast('warn', error);
              this.categories = [];
            }
          );
          this.displayModalCadastro = false;
        } catch (error) {
          this.showToast('warn', error);
        }
      }

      updateCategory(updatedAuthor: Category) {
        const index = this.findIndexById(updatedAuthor.categoryId!);
        const updatedAuthors = [...this.categories];
        updatedAuthors[index] = updatedAuthor;
        this.categories = updatedAuthors;
      }

      createCategory(newCategory: Category) {
        this.categories = [...this.categories, newCategory];
      }

      findIndexById(categoryId: number): number {
        return this.categories.findIndex(category => category.categoryId === categoryId);
      }

    validationForm() {
        if (!this.category.description)
            throw new Error('O campo descrição é obrigatório!');
    }


    private showToast(severity: string, detail: any) {

        this.messageService.clear();
        this.messageService.add({ severity: severity, detail: detail, life: 3000 });

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
