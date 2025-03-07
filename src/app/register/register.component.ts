import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormServiceService } from '../services/form-service.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  fields: any[] = [];

  constructor(
    private fb: FormBuilder,
    private formConfigService: FormServiceService,
    private toastr:ToastrService
  ) {
    this.form = this.fb.group({});
  }

  ngOnInit(): void {
    this.fields = this.formConfigService.getConfiguration();
    this.createFormFields();
  }

  createFormFields() {
    
    this.fields.forEach((field) => {
      if (field.visible) {
        
        const validators = [];

        if (field.required) {
          validators.push(Validators.required);
        }
        if (field.label === 'Email') {
          validators.push(Validators.email);
        }

        if(field.label === 'Mobile'){
          validators.push(Validators.pattern('^[0-9]{10}$'));
        }
        this.form.addControl(field.label, this.fb.control('', validators));
      }
    });
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.toastr.success('Form submitted successfully');
      this.form.reset();
      
    } else {
      console.error('Form is invalid');
      this.toastr.error('Fill the form correctly');
    }
  }
}
