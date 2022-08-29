import { OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import * as i0 from "@angular/core";
export declare class CustomColsDirective implements OnInit {
    template: TemplateRef<any>;
    private viewContainer;
    constructor(template: TemplateRef<any>, viewContainer: ViewContainerRef);
    appCustomColsColumnDef: string;
    appCustomCols: string;
    ngOnInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomColsDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<CustomColsDirective, "[appCustomCols]", never, { "appCustomColsColumnDef": "appCustomColsColumnDef"; "appCustomCols": "appCustomCols"; }, {}, never, never, false>;
}
