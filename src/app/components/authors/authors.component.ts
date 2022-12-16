import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';

import { Author } from '../../shared/models/author';
import { AuthorsService } from '../../shared/services/authors.service';

@Component({
    selector: 'app-authors',
    templateUrl: './authors.component.html',
    styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {

    author: Author;
    authors: Author[] = [];
    selectedAuthors: any[] = [];
    showLoading: boolean = false;
    displayModalCadastro: boolean = false;

    constructor(
        private authorsService: AuthorsService,
        private messageService: MessageService

    ) {
        this.author = {};

    }

    ngOnInit(): void {
        this.findAllAuthors();
    }

    findAllAuthors() {
        this.authorsService.findAll().subscribe(
            (dados) => {
                this.authors = dados;
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

            this.authorsService
                .save(this.author)
                .subscribe((result: Author) => {
                    if (this.author.id)
                        //update
                        this.authors[this.findIndexById(this.author.id)] = this.author;
                    else
                        //create
                        this.authors.push(result);
                },
                    error => {
                        this.showLoading = false;
                        this.showToast('warn', error.message);
                        this.authors = [];
                    });

            this.authors = [...this.authors];
            this.displayModalCadastro = false;

        } catch (error) {
            this.showToast('warn', error);
        }
    }

    validationForm() {
        if (!this.author.name)
            throw new Error('O campo nome é obrigatório!');
    }


    private showToast(severity: string, detail: any) {

        this.messageService.clear();
        this.messageService.add({ severity: severity, detail: detail, life: 3000 });

    }

    findIndexById(id: number): number {

        let index = -1;
        for (let i = 0; i < this.authors.length; i++) {
            if (this.authors[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }


    onEdit(author: Author) {
        this.showDialogCadastro();
        this.author = { ...author };
    }

    showDialogCadastro() {
        this.displayModalCadastro = true;
        this.author = {};
    }

    hideModalAddDialog() {
        this.displayModalCadastro = false;
        this.author = {};
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
