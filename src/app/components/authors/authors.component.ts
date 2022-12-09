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
        private authorsService: AuthorsService

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
                this.showLoading = false;
            },
            (error) => {
                this.showLoading = false;
                this.showToast('warn', error.message);
            }
        );
    }

    onSubmit() {

        this.authorsService
            .save(this.author)
            .subscribe((result) => { });

        if (this.author.id)
            this.authors[this.findIndexById(this.author.id)] = this.author;
        else
            this.authors.push(this.author);

        this.authors = [...this.authors];
        this.displayModalCadastro = false;
        this.author = {};
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

    onDelete(author: Author) { }

    showDialogCadastro() {
        this.displayModalCadastro = true;
        this.author = {};
    }

    hideModalAddDialog() {
        this.displayModalCadastro = false;
        this.author = {};
    }

    private showToast(severity: string, detail: any) {
        setTimeout(() => { }, 300);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
}
