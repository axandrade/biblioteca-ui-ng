import { ErrorService } from './core/services/error.service';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HtppInterceptor } from './core/interceptors/htpp-interceptor';
import { ErrorInterceptor } from './core/interceptors/error-interceptor';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule
    ],
    providers: [
        ErrorService,
        { provide: HTTP_INTERCEPTORS, useClass: HtppInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      ],
    bootstrap: [AppComponent]
})
export class AppModule { }
