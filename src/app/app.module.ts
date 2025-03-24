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
import { DragTargetContainerDirective,DropTargetContainerDirective } from '@progress/kendo-angular-utils';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { from } from 'rxjs';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';




@NgModule({
  declarations: [
    AppComponent,
    ConfigureComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    CheckBoxModule,
    HttpClientModule,
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
    BrowserAnimationsModule,
    GridModule,
    DropDownsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
