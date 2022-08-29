import { Directive } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "@angular/material/tooltip";
export class EllipsifyMeDirective {
    constructor(matTooltip, elementRef) {
        this.matTooltip = matTooltip;
        this.elementRef = elementRef;
    }
    ngAfterViewInit() {
        const element = this.elementRef.nativeElement;
        this.matTooltip.disabled = element.scrollHeight === 0 || element.scrollHeight - element.clientHeight - 2 <= 0;
    }
}
EllipsifyMeDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.1", ngImport: i0, type: EllipsifyMeDirective, deps: [{ token: i1.MatTooltip }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
EllipsifyMeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.1", type: EllipsifyMeDirective, selector: "[matTooltip][appTooltipIfTruncated]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.1", ngImport: i0, type: EllipsifyMeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matTooltip][appTooltipIfTruncated]'
                }]
        }], ctorParameters: function () { return [{ type: i1.MatTooltip }, { type: i0.ElementRef }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxsaXBzaWZ5LW1lLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL3RhYmxlL3NyYy9saWIvdGFibGUvZGlyZWN0aXZlL2VsbGlwc2lmeS1tZS5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFpQixTQUFTLEVBQWMsTUFBTSxlQUFlLENBQUM7OztBQU1yRSxNQUFNLE9BQU8sb0JBQW9CO0lBQ2pDLFlBQW9CLFVBQXNCLEVBQVUsVUFBbUM7UUFBbkUsZUFBVSxHQUFWLFVBQVUsQ0FBWTtRQUFVLGVBQVUsR0FBVixVQUFVLENBQXlCO0lBQUcsQ0FBQztJQUMxRixlQUFlO1FBQ2QsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7UUFDOUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEdBQUcsT0FBTyxDQUFDLFlBQVksS0FBSyxDQUFDLElBQUksT0FBTyxDQUFDLFlBQVksR0FBRyxPQUFPLENBQUMsWUFBWSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0csQ0FBQzs7aUhBTFcsb0JBQW9CO3FHQUFwQixvQkFBb0I7MkZBQXBCLG9CQUFvQjtrQkFIaEMsU0FBUzttQkFBQztvQkFDVixRQUFRLEVBQUUscUNBQXFDO2lCQUMvQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTWF0VG9vbHRpcCB9IGZyb20gJ0Bhbmd1bGFyL21hdGVyaWFsL3Rvb2x0aXAnO1xuXG5ARGlyZWN0aXZlKHtcblx0c2VsZWN0b3I6ICdbbWF0VG9vbHRpcF1bYXBwVG9vbHRpcElmVHJ1bmNhdGVkXSdcbn0pXG5leHBvcnQgY2xhc3MgRWxsaXBzaWZ5TWVEaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbmNvbnN0cnVjdG9yKHByaXZhdGUgbWF0VG9vbHRpcDogTWF0VG9vbHRpcCwgcHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50Pikge31cblx0bmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuXHRcdGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcblx0XHR0aGlzLm1hdFRvb2x0aXAuZGlzYWJsZWQgPSBlbGVtZW50LnNjcm9sbEhlaWdodCA9PT0gMCB8fCBlbGVtZW50LnNjcm9sbEhlaWdodCAtIGVsZW1lbnQuY2xpZW50SGVpZ2h0IC0gMiA8PSAwO1xuXHR9XG59Il19