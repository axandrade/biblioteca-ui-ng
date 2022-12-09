import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { ComponentRoutingModule } from './components-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ComponentRoutingModule
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
        DropdownModule,
        MultiSelectModule,
        InputSwitchModule,
        BadgeModule

    ],
    providers: [MessageService, ConfirmationService],
    declarations: [
    ]
})
export class ComponentModule { }
