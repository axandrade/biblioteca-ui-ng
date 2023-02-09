import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/home'] }
                ]
            },
            {
                label: 'Cadastros',
                items: [
                    { label: 'Autores', icon: 'pi pi-user-edit', routerLink: ['/home/cadastros/authors'] },
                    { label: 'Categorias', icon: 'pi pi-table', routerLink: ['/home/cadastros/categories'] },
                    { label: 'Livros', icon: 'pi pi-book', routerLink: ['/home/cadastros/books'] },
                    { label: 'Usuários', icon: 'pi pi-user-plus', routerLink: ['/home/cadastros/customers'] }
                ]
            },
            {
                label: 'Processos',
                items: [
                    { label: 'Emprestimos', icon: 'pi pi-cart-plus', routerLink: ['/process/loans'] },
                ]
            }

        ];
    }
}
