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
    selectedBooks: any[] = [];
    autorNomeFiltro: string = "";
    showLoading: boolean = false;
    displayModalCadastro: boolean = false;
    displayModalFiltroAutor: boolean = false;
    selectedAuthors: Author[] = [];

    constructor(
        private booksService: BooksService,
        private authorsService: AuthorsService
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


    }

    ngOnInit(): void {
        this.findAllBooks();
    }

    findAllBooks() {

        this.booksService.findAll().subscribe(
            (dados) => {
                this.books = dados;
                this.showLoading = false;
                console.log(dados);
            },
            (error) => {
                this.showLoading = false;
                this.showToast('warn', error.message);
            }
        );
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
        this.booksService
            .save(this.book)
            .subscribe((result) => {console.log(result)});

        if (this.book.id)
            this.books[this.findIndexById(this.book.id)] = this.book;
        else
            this.books.push(this.book);

        this.books = [...this.books];
        this.displayModalCadastro = false;
        this.book = {};
    }

    findIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.books.length; i++) {
            if (this.books[i].id === id) {
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

    private showToast(severity: string, detail: any) {
        setTimeout(() => { }, 300);
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
