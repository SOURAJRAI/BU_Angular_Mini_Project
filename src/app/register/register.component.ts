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
  countries:any[]=[];

  selectedCountryObj: any = { code: '+91', flag: 'https://flagcdn.com/w320/in.png' }; // Default to India
  showDropdown = false;
  // searchCountry="";
  filterCountries:any[]=[];



  constructor(
    private fb: FormBuilder,
    private service: FormServiceService,
    private toastr:ToastrService
  ) {
    this.form = this.fb.group({
      country:['',Validators.required],
      searchCountry:['']
    });
  }

  ngOnInit(): void {
    this.fields = this.service.getConfiguration();
    this.createFormFields();
    this.fetchCountryCodes();
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

  fetchCountryCodes():void{
    this.service.getAllCountries().subscribe((data)=>
    {
      this.countries=data.map((country)=>(
      {
        name:country.name.common,
        code:country.idd?.root ? country.idd.root +(country.idd.suffixes ? country.idd.suffixes[0]: ''):'',
        flag: country.flags.png,

      }));
      this.filterCountries=[...this.countries];
    });
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.form.get('searchCountry')?.setValue(''); 
      // this.filterCountries = [...this.countries]; 
    }
  }

  selectCountry(country: any) {
    this.selectedCountryObj = country;
    this.showDropdown = false;
  }

  FilterCountry(){
    if(this.form.get('searchCountry'))
    {
      this.filterCountries=this.countries.filter((country)=>
        country.name.toLowerCase().includes(this.form.get('searchCountry')?.value.toLowerCase()) || country.code.includes(this.form.get('searchCountry')?.value));
    }
    else{
      this.filterCountries = this.countries;
    }
  }




}
