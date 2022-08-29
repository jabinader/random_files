import { PipeTransform, QueryList } from '@angular/core';
import { CustomColsDirective } from '../directive/custom-template.directive';
import * as i0 from "@angular/core";
export declare class CustomTemplatePipe implements PipeTransform {
    transform(customTamplates: QueryList<CustomColsDirective>, columnDef: string): unknown;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomTemplatePipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<CustomTemplatePipe, "customTemplate", false>;
}
