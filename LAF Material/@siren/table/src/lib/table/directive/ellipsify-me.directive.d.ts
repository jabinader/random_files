import { AfterViewInit, ElementRef } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import * as i0 from "@angular/core";
export declare class EllipsifyMeDirective implements AfterViewInit {
    private matTooltip;
    private elementRef;
    constructor(matTooltip: MatTooltip, elementRef: ElementRef<HTMLElement>);
    ngAfterViewInit(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<EllipsifyMeDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<EllipsifyMeDirective, "[matTooltip][appTooltipIfTruncated]", never, {}, {}, never, never, false>;
}
