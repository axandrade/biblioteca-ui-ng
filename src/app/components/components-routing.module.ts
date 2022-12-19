import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        {
            path: 'authors', loadChildren: () =>
                import('./authors/authors.module').then((m) => m.AuthorsModule)

        },
        {
            path: 'categories', loadChildren: () =>
                import('./categories/categories.module').then((m) => m.CategoriesModule)

        },
        {
            path: 'books', loadChildren: () =>
                import('./books/books.module').then((m) => m.BooksModule)

        },
        {
            path: 'customers', loadChildren: () =>
                import('./customers/customers.module').then((m) => m.CustomersModule)

        },
        {
            path: 'loans', loadChildren: () =>
                import('./loans/loans.module').then((m) => m.LoansModule)

        }
    ])],
    exports: [RouterModule]
})
export class ComponentRoutingModule { }
