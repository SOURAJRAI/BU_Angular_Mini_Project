import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigureComponent } from './configure/configure.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { loginGuard } from './login.guard';

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'configure', component: ConfigureComponent,canActivate:[loginGuard]},
  {path: 'register', component: RegisterComponent},
  {path:'',redirectTo:'/register',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
