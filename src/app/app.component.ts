import { Component ,OnInit} from '@angular/core';
import { Route, Router, NavigationEnd, Event } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'sample2';
  isRegisterPage = false;
  isConfigurePage = false;

  constructor(private router: Router) {}



 
}
