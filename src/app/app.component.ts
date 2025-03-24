import { Component ,OnInit} from '@angular/core';
import { Route, Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs';
import { FormServiceService } from './services/form-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'sample2';
  isRegisterPage = false;
  isConfigurePage = false;

  constructor(private router: Router,public service:FormServiceService,private toaster:ToastrService) {}

  

  Logout(){
    localStorage.removeItem('Token');
    this.router.navigateByUrl('/login')
  }

  showMsg(){
    if(!this.service.isLoggedIn()){
      this.toaster.info('403 Forbidden','Only Admin has access');
    }
  }
 
}
