import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { Component } from '@angular/core';
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
    authorFilter: Author;
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
        private messageService: MessageService,
        private confirmationService: ConfirmationService

    ) {
        this.author = new Author(null, null);
        this.authorFilter = new Author(null, null);
    }

    loadDataLazy(event: LazyLoadEvent): void {

        if (event.multiSortMeta) {
            event.multiSortMeta.forEach(sortElement => {
                this.pageSortData.field = sortElement.field;
                this.pageSortData.direction = sortElement.order == 1 ? 'ASC' : 'DESC';
            });
        }

        //event.first representa o índice do primeiro item que será exibido na página atual.
        this.pageableData.page = event.first / event.rows;
        this.pageableData.size = event.rows;

        if (event.filters != undefined && event.filters["authorId"] != undefined) {
            this.authorFilter.authorId = event.filters["authorId"].value;
        }
        if (event.filters != undefined && event.filters["name"] != undefined) {
            this.authorFilter.name = event.filters["name"].value;
        }
        debugger
        this.populateAuthorsPaginated(this.pageableData, this.pageSortData, this.authorFilter);

    }

    populateAuthorsPaginated(pageableData: Pageable, pageSortData: PageSort, authorFilter?: Author) {
        this.authorsService.getDataPaginated(pageableData, pageSortData, authorFilter).subscribe(
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

        if (!this.validationForm()) {
            return; // Se a validação falhar, não prossiga
        }


        this.authorsService.save(this.author).subscribe({
            next: (result: Author) => {
                if (this.author.authorId) {
                    this.updateAuthor(result);
                } else {
                    this.populateAuthorsPaginated(this.pageableData, this.pageSortData);
                }
                this.displayModalCadastro = false;
            },
            error: (error) => {
                this.showToast('error', 'Erro ao salvar o autor: ' + error);
                this.showLoading = false;
            },
        });
    }

    updateAuthor(updatedAuthor: Author) {
        const index = this.findIndexById(updatedAuthor.authorId!);
        const updatedAuthors = [...this.authors];
        updatedAuthors[index] = updatedAuthor;
        this.authors = updatedAuthors;
    }

    createAuthor(newAuthor: Author) {
        this.authors = [...this.authors, newAuthor];
        console.log(this.authors);
        //this.populateAuthorsPaginated(this.pageableData, this.pageSortData);
    }

    findIndexById(authorId: number): number {
        return this.authors.findIndex(author => author.authorId === authorId);
    }

    validationForm() {
        if (!this.author.name) {
            this.showToast('error', 'O campo nome é obrigatório!');
            return false;
        }
        return true;
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
        this.author = new Author(null, null);
    }

    hideModalAddDialog() {
        this.displayModalCadastro = false;
        this.author = new Author(null, null);
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    onDelete(author: Author) {

        this.confirmationService.confirm({
            message: 'Tem certeza que deseja excluir o autor: ' + author.name + '?',
            header: 'Confirmação',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.authorsService.delete(author);
            },
            reject: () => console.log('teste2')
        });
    }
}
