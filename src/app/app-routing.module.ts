import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigureComponent } from './configure/configure.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'configure', component: ConfigureComponent},
  {path: 'register', component: RegisterComponent},
  {path:'',redirectTo:'/register',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
