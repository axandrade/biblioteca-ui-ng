import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputMaskModule } from 'primeng/inputmask';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MultiSelectModule } from 'primeng/multiselect';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { CheckboxModule } from 'primeng/checkbox';
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
        BadgeModule,
        AutoCompleteModule,
        InputTextareaModule,
        ProgressBarModule,
        CheckboxModule,


    ],
    providers: [MessageService, ConfirmationService]

})
export class ComponentModule { }
