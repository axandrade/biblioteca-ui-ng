import { BooksService } from './../../shared/services/livros.service';
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

    displayModalCadastro: boolean = false;
    book: Book;
    books: Book[] = [];
    selectedBooks: any[] = [];
    showLoading: boolean = false;
    submitted: boolean = false;
    languages: any[] = [];

    constructor(
        private booksService: BooksService,
        private router: Router,
        private messageService: MessageService
    ) {
        this.book = {};
        this.languages = [
            {id: '1', description: 'Português'},
            {id: '2', description: 'Inglês'},
            {id: '3', description: 'Espanhol'},
            {id: '4', description: 'Alemão'},
            {id: '5', description: 'Francês'},
            {id: '6', description: 'Italiano'},
            {id: '7', description: 'Russo'},
            {id: '8', description: 'Japonês'}
        ];
    }

    ngOnInit(): void {
        this.buscaBooks();
    }

    buscaBooks() {
        this.booksService.buscaTodos().subscribe(
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

    onSubmit() {
        debugger;
        console.log(this.book);
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
        this.submitted = false;
        this.displayModalCadastro = true;
        this.book = {};
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
