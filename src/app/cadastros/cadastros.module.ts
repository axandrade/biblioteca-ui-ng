import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { CadastroRoutingModule } from './cadastros-routing.module';

@NgModule({
    imports: [
        CommonModule,
        CadastroRoutingModule
    ],
    exports: [
        ToastModule,
        TableModule,
        DialogModule,
        ButtonModule,
        InputTextModule,
        ConfirmDialogModule,
        ToolbarModule,
        InputMaskModule,
        DropdownModule
    ],
    providers: [MessageService, ConfirmationService]
})
export class CadastroModule { }
