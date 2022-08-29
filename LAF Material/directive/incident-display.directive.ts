import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';

@Directive({
  selector: '[appIncidentDisplay]'
})
export class IncidentDisplayDirective implements OnInit {
  constructor(public template: TemplateRef<any>, private viewContainer: ViewContainerRef,
    private router: Router) { 
        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.onRouteChange();
        }});
    }

  ngOnInit(): void {}

    public onRouteChange(): void {
        if(window.location.href.includes('/map-view') || 
            (window.location.href.includes('/chat-view/chat') ) ||

            (window.location.href.includes('/incident') && 
            !window.location.href.includes('/add-incident') && 
            !window.location.href.includes('/table-incident'))){
                if(this.viewContainer.length == 0){
                    this.viewContainer.createEmbeddedView(this.template);
                }
            }
            else {
                this.viewContainer.clear();
            }
    }
}
