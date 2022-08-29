import { Directive, Input } from '@angular/core';
import * as i0 from "@angular/core";
export class CustomColsDirective {
    constructor(template, viewContainer) {
        this.template = template;
        this.viewContainer = viewContainer;
    }
    ngOnInit() {
        if (this.appCustomCols) {
            this.viewContainer.createEmbeddedView(this.template);
        }
    }
}
CustomColsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.1", ngImport: i0, type: CustomColsDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
CustomColsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.1", type: CustomColsDirective, selector: "[appCustomCols]", inputs: { appCustomColsColumnDef: "appCustomColsColumnDef", appCustomCols: "appCustomCols" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.1", ngImport: i0, type: CustomColsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appCustomCols]'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }]; }, propDecorators: { appCustomColsColumnDef: [{
                type: Input
            }], appCustomCols: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXRlbXBsYXRlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RhYmxlL3NyYy9saWIvdGFibGUvZGlyZWN0aXZlL2N1c3RvbS10ZW1wbGF0ZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXlDLE1BQU0sZUFBZSxDQUFDOztBQUt4RixNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFlBQW1CLFFBQTBCLEVBQVUsYUFBK0I7UUFBbkUsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFBVSxrQkFBYSxHQUFiLGFBQWEsQ0FBa0I7SUFBSSxDQUFDO0lBRzNGLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDdEQ7SUFDSCxDQUFDOztnSEFSVSxtQkFBbUI7b0dBQW5CLG1CQUFtQjsyRkFBbkIsbUJBQW1CO2tCQUgvQixTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSxpQkFBaUI7aUJBQzVCO2lJQUdVLHNCQUFzQjtzQkFBOUIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBJbnB1dCwgT25Jbml0LCBUZW1wbGF0ZVJlZiwgVmlld0NvbnRhaW5lclJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYXBwQ3VzdG9tQ29sc10nXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbUNvbHNEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4sIHByaXZhdGUgdmlld0NvbnRhaW5lcjogVmlld0NvbnRhaW5lclJlZikgeyB9XG4gIEBJbnB1dCgpIGFwcEN1c3RvbUNvbHNDb2x1bW5EZWY6IHN0cmluZztcbiAgQElucHV0KCkgYXBwQ3VzdG9tQ29sczogc3RyaW5nO1xuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5hcHBDdXN0b21Db2xzKSB7XG4gICAgICB0aGlzLnZpZXdDb250YWluZXIuY3JlYXRlRW1iZWRkZWRWaWV3KHRoaXMudGVtcGxhdGUpO1xuICAgIH1cbiAgfVxufVxuIl19