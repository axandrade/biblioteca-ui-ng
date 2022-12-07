import { Author } from './../../shared/models/author';
import { AuthorsService } from './../../shared/services/authors.service';
import { BooksService } from '../../shared/services/books.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Book } from '../../shared/models/book';
import { Component, OnInit } from '@angular/core';

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
    submitted: boolean = false;
    autorNomeFiltro: string = "";
    showLoading: boolean = false;
    displayModalCadastro: boolean = false;
    displayModalFiltroAutor: boolean = false;
    selectedAuthors: Author[] = [];
    constructor(
        private booksService: BooksService,
        private authorsService: AuthorsService,
        private router: Router,
        private messageService: MessageService
    ) {
        this.book = {};
        this.languages = [
            {id: 1, description: 'Português'},
            {id: 2, description: 'Inglês'},
            {id: 3, description: 'Espanhol'},
            {id: 4, description: 'Alemão'},
            {id: 5, description: 'Francês'},
            {id: 6, description: 'Italiano'},
            {id: 7, description: 'Russo'},
            {id: 8, description: 'Japonês'}
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
            .subscribe((result) => {
                if (this.book.id)
                    this.books[this.findIndexById(this.book.id!)] = this.book;
                else
                    this.books.push(result);

            });

        this.submitted = true;
        this.books = [...this.books];
        this.displayModalCadastro = false;

    }

    findIndexById(id: string): number {
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
        this.submitted = false;
        this.displayModalCadastro = true;
        this.book = {};
    }

    showDialogFiltroAutor() {
        this.displayModalFiltroAutor = true;
        this.autorNomeFiltro = "";
    }

    hideModalAddDialog() {
        this.displayModalCadastro = false;
        this.submitted = false;
        this.book = {};
    }

    private showToast(severity: string, detail: any) {
        setTimeout(() => { }, 300);
    }



}
