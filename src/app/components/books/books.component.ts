import { CategoriesService } from './../../shared/services/categories.service';
import { Category } from './../../shared/models/category';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { Table } from 'primeng/table';

import { Book } from '../../shared/models/book';
import { BooksService } from '../../shared/services/books.service';
import { Author } from './../../shared/models/author';
import { AuthorsService } from './../../shared/services/authors.service';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
    book: Book;
    books: Book[] = [];
    languages: any[] = [];
    authors: Author[] = [];
    statusBook: any[] = [];
    selectedBooks: any[] = [];
    categories: Category[] = [];
    autorNomeFiltro: string = "";
    showLoading: boolean = false;
    selectedAuthors: Author[] = [];
    displayModalCadastro: boolean = false;
    displayModalFiltroAutor: boolean = false;



    constructor(
        private booksService: BooksService,
        private authorsService: AuthorsService,
        private messageService: MessageService,
        private categoriesService: CategoriesService
    ) {
        this.book = {};
        this.languages = [
            { id: 1, description: 'Português' },
            { id: 2, description: 'Inglês' },
            { id: 3, description: 'Espanhol' },
            { id: 4, description: 'Alemão' },
            { id: 5, description: 'Francês' },
            { id: 6, description: 'Italiano' },
            { id: 7, description: 'Russo' },
            { id: 8, description: 'Japonês' }
        ];
        this.statusBook = [
            { cod: 1, description: 'Disponivel' },
            { cod: 2, description: 'Emprestado' },
            { cod: 3, description: 'Avariado' },
            { cod: 4, description: 'Perdido' }
        ];
    }

    ngOnInit(): void {
        this.findAllBooks();
    }

    findAllBooks() {
        this.booksService.findAll().subscribe(
            (dados) => {
                this.books = dados;
                this.showLoading = false;
            },
            (error) => {
                this.showLoading = true;
                this.showToast('error', error);
            }
        );
    }

    findAllAuthors() {
        this.authorsService.findAll().subscribe(
            (dados) => {
                this.authors = dados;
            },
            (error) => {
                this.showToast('error', error.message);
            }
        );
    }

    findAllCategories() {
        this.categoriesService.findAll().subscribe(
            (dados) => {
                this.categories = dados;
                this.showLoading = false;
            },
            (error) => {
                this.showLoading = false;
                this.showToast('error', error.message);
            }
        );
    }

    onSubmit() {

        try {
            this.validationForm();
            this.booksService
                .save(this.book)
                .subscribe((result: Book) => {

                    if (this.book.bookId)
                        this.books[this.findIndexById(this.book.bookId)] = this.book;
                    else
                        this.books.push(result);
                });

            this.books = [...this.books];
            this.displayModalCadastro = false;


        } catch (error) {
            this.showToast('warn', error);
        }
    }

    validationForm() {
        if (!this.book.title)
            throw new Error('O campo titulo é obrigatório!');
        if (!this.book.isbn)
            throw new Error('O campo ISBN é obrigatório!');
        if (this.book.categories?.length === 0)
            throw new Error('O campo Categoria é obrigatório!');
        if (this.book.authors?.length === 0)
            throw new Error('O campo Autor é obrigatório!');
    }


    private showToast(severity: string, detail: any) {
        this.messageService.clear();
        this.messageService.add({ severity: severity, detail: detail, life: 3000 });

    }

    findIndexById(bookId: number): number {
        let index = -1;
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].bookId === bookId) {
                index = i;
                break;
            }
        }

        return index;
    }

    onEdit(book: Book) {
        this.showDialogCadastro();
        this.book = { ...book };
    }

    onDelete(book: Book) { }

    showDialogCadastro() {
        this.findAllAuthors();
        this.findAllCategories();
        this.displayModalCadastro = true;
        this.book = {};
    }

    showDialogFiltroAutor() {
        this.displayModalFiltroAutor = true;
        this.autorNomeFiltro = "";
    }

    hideModalAddDialog() {
        this.displayModalCadastro = false;
        this.book = {};
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    exportexcel(): void {

        /* pass here the table id */
        let element = document.getElementById('table-book');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        /* generate workbook and add the worksheet */
        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        /* save to file */
        XLSX.writeFile(wb, 'livros.xlsx');

    }




}
