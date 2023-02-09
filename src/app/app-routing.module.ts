import { LoginComponent } from './components/authentication/login/login.component';
import { AuthenticationModule } from './components/authentication/authentication.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            { path: '', component: LoginComponent },
            {
                path: 'home', component: AppLayoutComponent,
                children: [
                    { path: 'cadastros', loadChildren: () => import('./components/components.module').then(m => m.ComponentModule) },
                    { path: 'process', loadChildren: () => import('./components/components.module').then(m => m.ComponentModule) }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
