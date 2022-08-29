import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';

@Directive({
  selector: '[appFormEditingTemplate]'
})
export class FormEditingTemplateDirective {
  @Input() appFormEditingTemplate: UntypedFormGroup;
  constructor(public template: TemplateRef<any>, private viewContainer: ViewContainerRef) {
    this.viewContainer.createEmbeddedView(this.template);
   }

}
