import { AuthorsService } from '../../shared/services/authors.service';
import { Author } from '../../shared/models/author';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-authors',
    templateUrl: './authors.component.html',
    styleUrls: ['./authors.component.scss'],
})
export class AuthorsComponent implements OnInit {
    displayModalCadastro: boolean = false;
    author: Author;
    authors: Author[] = [];
    selectedAuthors: any[] = [];
    showLoading: boolean = false;
    submitted: boolean = false;

    constructor(
        private authorsService: AuthorsService,
        private router: Router,
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
        this.authorsService
            .save(this.author)
            .subscribe((result) => {
                if (this.author.id)
                    this.authors[this.findIndexById(this.author.id)] = this.author;
                else
                    this.authors.push(result);

            });

        this.submitted = true;
        this.authors = [...this.authors];
        this.displayModalCadastro = false;

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
        this.submitted = false;
        this.displayModalCadastro = true;
        this.author = {};
    }

    hideModalAddDialog() {
        this.displayModalCadastro = false;
        this.submitted = false;
        this.author = {};
    }

    private showToast(severity: string, detail: any) {
        setTimeout(() => { }, 300);
    }
}
