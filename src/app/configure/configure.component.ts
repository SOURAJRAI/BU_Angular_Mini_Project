import { Component, OnInit, ViewChild } from '@angular/core';
import { FormServiceService } from '../services/form-service.service';
import { RowReorderEvent } from '@progress/kendo-angular-grid';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { DropTargetContainerDirective } from '@progress/kendo-angular-utils';
import {DragTargetContainerDirective} from '@progress/kendo-angular-utils';
import { DropTargetEvent } from '@progress/kendo-angular-utils';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.component.html',
  styleUrls: ['./configure.component.css']
})
export class ConfigureComponent implements OnInit {
  fields: any[] = [];

  constructor(private formConfigService: FormServiceService,private toastr:ToastrService) {}

  ngOnInit(): void {

    this.fields=structuredClone(this.formConfigService.getConfiguration());
    // this.fields=this.formConfigService.getConfiguration();
  
  }
  toggleVisibility(field: any): void {

    if (!field.visible) {
      field.required = false; 
    }   
    
    if(field.label==='Address')
      {
        this.fields.forEach(f=>{
          if(f.label==='State' || f.label==='City' || f.label === 'Pincode'){
            f.visible=field.visible;
          }
        })
      }
  

    } 

    isAddressFieldHidden() {
      const addressField = this.fields.find(f => f.label === 'Address');
      return !addressField.visible; // Disable if Address is hidden
    }


  saveConfiguration(): void {
    
    const filter=this.fields.some((field)=>field.visible);
    const requiredFields=this.fields.filter((field)=>field.required && field.visible);
    if(!filter){
      this.toastr.error('Please add fields to save configuration');
    }else if(requiredFields.length<1){
      this.toastr.error('At least one field should be required');
    }else if(filter && requiredFields.length>0){ 
    this.formConfigService.saveConfiguration(this.fields);
    this.toastr.success('Configuration saved successfully'); 
  }
}


  public dragData = ({ dragTarget }: { dragTarget: any }) => {
    return Number(dragTarget.getAttribute('data-kendo-grid-item-index'));
  };


  public onDrop(e: DropTargetEvent): void {
    const fromIndex = e.dragData; 
    const destinationIndex = this.calculateDestinationIndex(e); 

    this.updateFieldsData(fromIndex, destinationIndex);

  }

  
  private calculateDestinationIndex(e: DropTargetEvent): number {
    const dropIndex = Number(e.dropTarget.getAttribute('data-kendo-grid-item-index'));
    return isNaN(dropIndex) ? this.fields.length - 1 : dropIndex;
  }


  private updateFieldsData(fromIndex: number, toIndex: number): void {
    const movedField = this.fields.splice(fromIndex, 1)[0];
    this.fields.splice(toIndex, 0, movedField); 
    
 

  }
  
}
