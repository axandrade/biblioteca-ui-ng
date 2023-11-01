import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';

import { Author } from '../../shared/models/author';
import { AuthorsService } from '../../shared/services/authors.service';
import { PageSort } from 'src/app/shared/models/pagesort';
import { Pageable } from 'src/app/shared/models/pageable';

@Component({
    selector: 'app-authors',
    templateUrl: './authors.component.html',
    styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent {

    author: Author;
    authors: Author[] = [];
    content: any;
    showLoading: boolean = true;
    displayModalCadastro: boolean = false;

    pageSortData: PageSort = {
        direction: 'ASC',
        field: 'authorId'
    };
    pageableData: Pageable = {
        page: 0,
        size: 10
    };

    constructor(
        private authorsService: AuthorsService,
        private messageService: MessageService

    ) {
        this.author = {};

    }

    loadDataLazy(event: LazyLoadEvent): void {
        //event.first representa o índice do primeiro item que será exibido na página atual.
        this.pageableData.page = event.first / event.rows;
        this.pageableData.size = event.rows;

       this.populateAuthorsPaginated(this.pageableData, this.pageSortData);

    }

    populateAuthorsPaginated(pageableData: Pageable, pageSortData: PageSort) {
        this.authorsService.getDataPaginated(pageableData, pageSortData).subscribe(
            (dados: any) => {
                this.authors = dados.content;
                this.content = dados;
                this.showLoading = false;
            },
            (error) => {
                this.showLoading = true;
                this.showToast('error', error);
            }
        );
    }

    onSubmit() {
        try {
            this.validationForm();
            this.authorsService.save(this.author).subscribe(
                (result: Author) => {
                    if (this.author.authorId) {
                        this.updateAuthor(result);
                    } else {
                        this.createAuthor(result);
                    }
                },
                error => {
                    this.showLoading = false;
                    this.showToast('warn', error);
                    this.authors = [];
                }
            );
            this.displayModalCadastro = false;
        } catch (error) {
            this.showToast('warn', error);
        }
    }

    updateAuthor(updatedAuthor: Author) {
        const index = this.findIndexById(updatedAuthor.authorId!);
        const updatedAuthors = [...this.authors];
        updatedAuthors[index] = updatedAuthor;
        this.authors = updatedAuthors;
    }

    createAuthor(newAuthor: Author) {

        this.populateAuthorsPaginated(this.pageableData, this.pageSortData);
    }

    findIndexById(authorId: number): number {
        return this.authors.findIndex(author => author.authorId === authorId);
    }

    validationForm() {
        if (!this.author.name)
            throw new Error('O campo nome é obrigatório!');
    }


    private showToast(severity: string, detail: any) {
        this.messageService.clear();
        this.messageService.add({ severity: severity, detail: detail, life: 6000 });

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
