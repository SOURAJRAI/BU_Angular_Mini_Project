import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigureComponent } from './configure/configure.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { CheckBoxModule, InputsModule } from '@progress/kendo-angular-inputs';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragTargetContainerDirective, DropTargetContainerDirective, DropTargetEvent } from '@progress/kendo-angular-utils';



@NgModule({
  declarations: [
    AppComponent,
    ConfigureComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    GridModule,
    CheckBoxModule,
    InputsModule,
    DragTargetContainerDirective,
    DropTargetContainerDirective,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
        timeOut:3000,
        progressBar:true,
        progressAnimation:'decreasing'
      }),
    BrowserAnimationsModule
  

    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
