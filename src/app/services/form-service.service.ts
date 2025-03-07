
import { Injectable } from '@angular/core';
import { BehaviorSubject, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormServiceService {
  private fields: any[] = [
    { label: 'Name', visible: true, required: true },
    { label: 'Mobile', visible: true, required: true },
    { label: 'Email', visible: true, required: true },
    { label: 'Address', visible: true, required: false }
  ];

  constructor() {
    const savedControl = localStorage.getItem('formConfiguration');

    if (savedControl) {
      this.fields = JSON.parse(savedControl);
    } else {

      localStorage.setItem('formConfiguration', JSON.stringify(this.fields));
    }

  }


  saveConfiguration(config: any[]) {
    this.fields = config;
    localStorage.setItem('formConfiguration', JSON.stringify(config));
  }

  getConfiguration(): any[] {
    return this.fields;
  }

}
