import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
    selector: '[activeSection]'
})

export class ActiveSectionDirective implements  OnChanges {
    @Input() activeSection: string;
    @Input() activeLinkArray: string[];

    constructor(private readonly el: ElementRef) {
    }

    ngOnChanges(_changes: SimpleChanges): void {
        if (this.activeLinkArray.find(link => link === this.activeSection) ) {
            this.el.nativeElement.style.borderInline = '3px solid #FFFFFF';
            this.el.nativeElement.style.opacity = '1 ';
            this.el.nativeElement.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
        }
        else {
            this.el.nativeElement.style.opacity = '0.3';
            this.el.nativeElement.style.borderInline = '0.1px';
            this.el.nativeElement.style.backgroundColor='transparent';
        }
	}

}