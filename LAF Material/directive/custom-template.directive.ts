import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appCustomCols]'
})
export class CustomColsDirective implements OnInit {
  constructor(public template: TemplateRef<any>, private viewContainer: ViewContainerRef) { }
  @Input() appCustomColsColumnDef: string;
  @Input() appCustomCols: string;
  ngOnInit(): void {
    if (this.appCustomCols) {
      this.viewContainer.createEmbeddedView(this.template);
    }
  }
}
