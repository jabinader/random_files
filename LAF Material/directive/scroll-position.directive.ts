import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[appScrollPosition]'
})
export class ScrollPositionDirective {
    previousScrollHeightMinusTop: number;
    readyFor: string;
    toReset = false;

    constructor(private elementRef: ElementRef) {
        this.previousScrollHeightMinusTop = 0;
        this.readyFor = 'up';
        this.restore();
    }

    /**
     * This function is used to reset the scroll position to bottom because that is where chats start.
     */
    public reset(): void {
        this.previousScrollHeightMinusTop = 0;
        this.readyFor = 'up';
        this.elementRef.nativeElement.scrollTop = this.elementRef.nativeElement.scrollHeight;
    }

    /**
     * This function is used to restore the scroll position to the one stored earlier
     */
    public restore(): void {
        if (this.toReset) {
            if (this.readyFor === 'up') {
                this.elementRef.nativeElement.scrollTop = this.previousScrollHeightMinusTop < window.innerHeight ?
                    ((this.elementRef.nativeElement.scrollHeight * 65) / 100) :
                    this.elementRef.nativeElement.scrollHeight - this.previousScrollHeightMinusTop;
            }
            this.toReset = false;
        }
    }

    /**
     * This function is used to store the current position before loading new messages
     * @param direction scroll
     */
    public prepareFor(direction: string): void {
        this.toReset = true;
        this.readyFor = direction || 'up';
        // check for scrollTop is zero or not
        this.elementRef.nativeElement.scrollTop = !this.elementRef.nativeElement.scrollTop
            ? this.elementRef.nativeElement.scrollTop + 1
            : this.elementRef.nativeElement.scrollTop;
        this.previousScrollHeightMinusTop =
            this.elementRef.nativeElement.scrollHeight - this.elementRef.nativeElement.scrollTop;
    }
}
