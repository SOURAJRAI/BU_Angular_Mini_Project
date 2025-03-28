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
  countries: any[] = [];

  selectedCountryObj: any = { code: '+91', flag: 'https://flagcdn.com/w320/in.png' };
  showDropdown = false;
  filterCountries: any[] = [];
  firstSectionFields: any[] = [];
  secondSectionFields: any[] = [];
  currentSection: number = 1;

  constructor(
    private fb: FormBuilder,
    private service: FormServiceService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      country: ['', Validators.required],
      searchCountry: ['']
    });
  }

  ngOnInit(): void {
    this.fields = this.service.getConfiguration();
    this.splitFields();
    this.createFormFields();
    this.fetchCountryCodes();
    console.log(this.selectedCountryObj);
    this.onEmailInput();
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
        if (field.label === 'Mobile') {
          validators.push(Validators.pattern('^[0-9]{10}$'));
        }
        if (field.label === 'Name') {
          validators.push(Validators.pattern('^[a-zA-Z]+$'));
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

  goToNextSection() {
    this.currentSection = 2;
  }

  goToPreviousSection() {
    this.currentSection = 1;
  }

  visibleFieldSection() {
    const filter = this.secondSectionFields.filter(field => field.visible);
    return filter;
  }

  fetchCountryCodes(): void {
    this.service.getAllCountries().subscribe((data) => {
      this.countries = data.map((country) => (
        {
          name: country.name.common,
          code: country.idd?.root ? country.idd.root + (country.idd.suffixes ? country.idd.suffixes[0] : '') : '',
          flag: country.flags.png,
        }));
      this.filterCountries = [...this.countries];
    });
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
    if (this.showDropdown) {
      this.form.get('searchCountry')?.setValue('');
    }
  }

  selectCountry(country: any) {
    this.selectedCountryObj = country;
    this.samplecode = country.code;
    this.showDropdown = false;
    this.updateEmailSuggestions();
    console.log(this.samplecode);
  }

  samplecode: string = '';

  FilterCountry() {
    if (this.form.get('searchCountry')) {
      this.filterCountries = this.countries.filter((country) =>
        country.name.toLowerCase().includes(this.form.get('searchCountry')?.value.toLowerCase()) || country.code.includes(this.form.get('searchCountry')?.value));
    } else {
      this.filterCountries = this.countries;
    }
  }

  splitFields() {
    this.firstSectionFields = this.fields.slice(0, 4);
    this.secondSectionFields = this.fields.slice(4);
  }

  countryEmailDomains: { [key: string]: string[] } = {
    "+91": ["gmail.com", "yahoo.co.in", "rediffmail.com"],
    "+1": ["gmail.com", "yahoo.com", "outlook.com"],
    "+44": ["gmail.co.uk", "yahoo.co.uk", "outlook.co.uk"],
    "+61": ["gmail.com.au", "hotmail.com.au", "outlook.com.au"],
    "+49": ["gmail.de", "web.de", "gmx.de"],
    "+33": ["gmail.fr", "yahoo.fr", "orange.fr"],
    "+81": ["gmail.co.jp", "yahoo.co.jp", "hotmail.co.jp"],
    "+86": ["gmail.cn", "qq.com", "163.com"],
    "+39": ["gmail.it", "yahoo.it", "libero.it"],
    "+55": ["gmail.com.br", "yahoo.com.br", "bol.com.br"],
    "+7": ["mail.ru", "yandex.ru", "rambler.ru"],
    "+34": ["gmail.es", "yahoo.es", "hotmail.es"],
    "+52": ["gmail.com.mx", "hotmail.com.mx", "yahoo.com.mx"],
    "+27": ["gmail.co.za", "yahoo.co.za", "hotmail.co.za"],
    "+82": ["gmail.co.kr", "naver.com", "daum.net"],
    "+62": ["gmail.co.id", "yahoo.co.id", "outlook.co.id"],
    "+60": ["gmail.com.my", "yahoo.com.my", "hotmail.com.my"],
    "+65": ["gmail.com.sg", "yahoo.com.sg", "hotmail.com.sg"],
    "+46": ["gmail.se", "yahoo.se", "outlook.se"],
    "+48": ["gmail.pl", "o2.pl", "wp.pl"],
    "+31": ["gmail.nl", "hotmail.nl", "yahoo.nl"],
    "+351": ["gmail.pt", "hotmail.pt", "sapo.pt"],
  };

  emailSuggestions: string[] = [];
  email: string = '';
  updateEmailSuggestions(): void {
    this.emailSuggestions = this.countryEmailDomains[this.samplecode] || [];
  }

  onEmailInput(): void {
    this.email = this.form.get('Email')?.value || '';
    if (this.email.includes('@')) {
      this.emailSuggestions = [];
    }
  }

  applyEmailSuggestion(suggestion: string): void {
    const emailWithoutDomain = this.email.split('@')[0];
    this.form.get('Email')?.setValue(emailWithoutDomain + '@' + suggestion);
    this.emailSuggestions = [];
  }
}
