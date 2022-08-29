import { AfterViewInit, Directive, ElementRef } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Directive({
	selector: '[matTooltip][appTooltipIfTruncated]'
})
export class EllipsifyMeDirective implements AfterViewInit {
constructor(private matTooltip: MatTooltip, private elementRef: ElementRef<HTMLElement>) {}
	ngAfterViewInit(): void {
		const element = this.elementRef.nativeElement;
		this.matTooltip.disabled = element.scrollHeight === 0 || element.scrollHeight - element.clientHeight - 2 <= 0;
	}
}