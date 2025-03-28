
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  private fields: any[] = [
    { label: 'Name', visible: true, required: true },
    { label: 'Mobile', visible: true, required: true },
    { label: 'Email', visible: true, required: true },
    { label: 'Address', visible: true, required: false },
    { label: 'City', visible: true, required: false },
    { label: 'State', visible: true, required: false },
    { label: 'Pincode', visible: true, required: false }
  ];

   private api=" https://restcountries.com/v3.1/all";

  constructor(private http:HttpClient) {
    const savedControl = localStorage.getItem('formConfiguration');

    if (savedControl) {
      this.fields = JSON.parse(savedControl);
    } else {

      localStorage.setItem('formConfiguration', JSON.stringify(this.fields));
    }

  }

  private users=[
    {
      username:'admin',
      password:'Admin@123'
    }
  ]


  saveConfiguration(config: any[]) {
    this.fields = config;
    localStorage.setItem('formConfiguration', JSON.stringify(config));
  }

  getConfiguration(): any[] {
    return this.fields;
  }

  Login(username:string,password:string){
    const token='LoggedIn';
    const users=this.users.find(u=>u.username.trim() == username.trim() && u.password.trim() == password.trim());
    if(users){
      localStorage.setItem('Token',token);
      return true;
    }
    return false;
  }

  isLoggedIn(){
    return localStorage.getItem('Token') != null;
  }

  getAllCountries():Observable<any[]>{
    return this.http.get<any[]>(this.api);

  }

  }

