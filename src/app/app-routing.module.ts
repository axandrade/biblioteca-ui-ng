import { AuthenticationModule } from './components/authentication/authentication.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'teste', component: AppLayoutComponent,
                children: [
                    { path: 'cadastros', loadChildren: () => import('./components/components.module').then(m => m.ComponentModule)},
                    { path: 'process', loadChildren: () => import('./components/components.module').then(m => m.ComponentModule)}
                ]
            },
            {
                path: '', loadChildren: () => import('./components/authentication//authentication.module').then(m => m.AuthenticationModule)
            }
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
