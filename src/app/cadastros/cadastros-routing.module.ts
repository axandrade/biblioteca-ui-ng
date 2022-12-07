import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'authors', loadChildren: () =>
                import('./authors/authors.module').then((m) => m.AuthorsModule)

        },
        {
            path: 'books', loadChildren: () =>
                import('./books/books.module').then((m) => m.BooksModule)

        },
        {
            path: 'customers', loadChildren: () =>
                import('./customers/customers.module').then((m) => m.CustomersModule)

        }
    ])],
    exports: [RouterModule]
})
export class CadastroRoutingModule { }
