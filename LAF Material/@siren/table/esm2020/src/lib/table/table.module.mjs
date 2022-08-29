import { SirenTableComponent } from './table.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CustomColsDirective } from './directive/custom-template.directive';
import { EllipsifyMeDirective } from './directive/ellipsify-me.directive';
import { CustomTemplatePipe } from './pipes/custom-template.pipe';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import * as i0 from "@angular/core";
export class SirenTableModule {
}
SirenTableModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.1", ngImport: i0, type: SirenTableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
SirenTableModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "14.1.1", ngImport: i0, type: SirenTableModule, declarations: [SirenTableComponent,
        EllipsifyMeDirective,
        CustomColsDirective,
        CustomTemplatePipe], imports: [CommonModule,
        FormsModule,
        MatTooltipModule,
        MatSortModule,
        DragDropModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule], exports: [SirenTableComponent,
        CustomColsDirective,
        CustomTemplatePipe] });
SirenTableModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "14.1.1", ngImport: i0, type: SirenTableModule, imports: [CommonModule,
        FormsModule,
        MatTooltipModule,
        MatSortModule,
        DragDropModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.1", ngImport: i0, type: SirenTableModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        SirenTableComponent,
                        EllipsifyMeDirective,
                        CustomColsDirective,
                        CustomTemplatePipe
                    ],
                    imports: [
                        CommonModule,
                        FormsModule,
                        MatTooltipModule,
                        MatSortModule,
                        DragDropModule,
                        MatCheckboxModule,
                        MatTableModule,
                        MatPaginatorModule,
                        MatFormFieldModule,
                        MatIconModule,
                        MatButtonModule,
                        MatInputModule
                    ],
                    exports: [
                        SirenTableComponent,
                        CustomColsDirective,
                        CustomTemplatePipe
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUubW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvdGFibGUvc3JjL2xpYi90YWJsZS90YWJsZS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDeEQsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDdkQsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDN0QsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDNUUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDMUUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDbEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDL0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDZCQUE2QixDQUFDO0FBQ2pFLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN2RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDM0QsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLHlCQUF5QixDQUFDOztBQThCekQsTUFBTSxPQUFPLGdCQUFnQjs7NkdBQWhCLGdCQUFnQjs4R0FBaEIsZ0JBQWdCLGlCQXpCekIsbUJBQW1CO1FBQ25CLG9CQUFvQjtRQUNwQixtQkFBbUI7UUFDbkIsa0JBQWtCLGFBR2xCLFlBQVk7UUFDWixXQUFXO1FBQ1gsZ0JBQWdCO1FBQ2hCLGFBQWE7UUFDYixjQUFjO1FBQ2QsaUJBQWlCO1FBQ2pCLGNBQWM7UUFDZCxrQkFBa0I7UUFDbEIsa0JBQWtCO1FBQ2xCLGFBQWE7UUFDYixlQUFlO1FBQ2YsY0FBYyxhQUdkLG1CQUFtQjtRQUNuQixtQkFBbUI7UUFDbkIsa0JBQWtCOzhHQUdULGdCQUFnQixZQW5CekIsWUFBWTtRQUNaLFdBQVc7UUFDWCxnQkFBZ0I7UUFDaEIsYUFBYTtRQUNiLGNBQWM7UUFDZCxpQkFBaUI7UUFDakIsY0FBYztRQUNkLGtCQUFrQjtRQUNsQixrQkFBa0I7UUFDbEIsYUFBYTtRQUNiLGVBQWU7UUFDZixjQUFjOzJGQVFMLGdCQUFnQjtrQkEzQjVCLFFBQVE7bUJBQUM7b0JBQ1IsWUFBWSxFQUFFO3dCQUNaLG1CQUFtQjt3QkFDbkIsb0JBQW9CO3dCQUNwQixtQkFBbUI7d0JBQ25CLGtCQUFrQjtxQkFDbkI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osV0FBVzt3QkFDWCxnQkFBZ0I7d0JBQ2hCLGFBQWE7d0JBQ2IsY0FBYzt3QkFDZCxpQkFBaUI7d0JBQ2pCLGNBQWM7d0JBQ2Qsa0JBQWtCO3dCQUNsQixrQkFBa0I7d0JBQ2xCLGFBQWE7d0JBQ2IsZUFBZTt3QkFDZixjQUFjO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDUCxtQkFBbUI7d0JBQ25CLG1CQUFtQjt3QkFDbkIsa0JBQWtCO3FCQUNuQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNpcmVuVGFibGVDb21wb25lbnQgfSBmcm9tICcuL3RhYmxlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBEcmFnRHJvcE1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9kcmFnLWRyb3AnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1hdFNvcnRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zb3J0JztcbmltcG9ydCB7IE1hdFRvb2x0aXBNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90b29sdGlwJztcbmltcG9ydCB7IEN1c3RvbUNvbHNEaXJlY3RpdmUgfSBmcm9tICcuL2RpcmVjdGl2ZS9jdXN0b20tdGVtcGxhdGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IEVsbGlwc2lmeU1lRGlyZWN0aXZlIH0gZnJvbSAnLi9kaXJlY3RpdmUvZWxsaXBzaWZ5LW1lLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDdXN0b21UZW1wbGF0ZVBpcGUgfSBmcm9tICcuL3BpcGVzL2N1c3RvbS10ZW1wbGF0ZS5waXBlJztcbmltcG9ydCB7IE1hdENoZWNrYm94TW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvY2hlY2tib3gnO1xuaW1wb3J0IHsgTWF0VGFibGVNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC90YWJsZSc7XG5pbXBvcnQgeyBNYXRQYWdpbmF0b3JNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9wYWdpbmF0b3InO1xuaW1wb3J0IHsgTWF0Rm9ybUZpZWxkTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvZm9ybS1maWVsZCc7XG5pbXBvcnQgeyBNYXRJY29uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvaWNvbic7XG5pbXBvcnQgeyBNYXRCdXR0b25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9idXR0b24nO1xuaW1wb3J0IHsgTWF0SW5wdXRNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9pbnB1dCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgU2lyZW5UYWJsZUNvbXBvbmVudCxcbiAgICBFbGxpcHNpZnlNZURpcmVjdGl2ZSxcbiAgICBDdXN0b21Db2xzRGlyZWN0aXZlLFxuICAgIEN1c3RvbVRlbXBsYXRlUGlwZVxuICBdLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIE1hdFRvb2x0aXBNb2R1bGUsXG4gICAgTWF0U29ydE1vZHVsZSxcbiAgICBEcmFnRHJvcE1vZHVsZSxcbiAgICBNYXRDaGVja2JveE1vZHVsZSxcbiAgICBNYXRUYWJsZU1vZHVsZSxcbiAgICBNYXRQYWdpbmF0b3JNb2R1bGUsXG4gICAgTWF0Rm9ybUZpZWxkTW9kdWxlLFxuICAgIE1hdEljb25Nb2R1bGUsXG4gICAgTWF0QnV0dG9uTW9kdWxlLFxuICAgIE1hdElucHV0TW9kdWxlXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBTaXJlblRhYmxlQ29tcG9uZW50LFxuICAgIEN1c3RvbUNvbHNEaXJlY3RpdmUsXG4gICAgQ3VzdG9tVGVtcGxhdGVQaXBlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgU2lyZW5UYWJsZU1vZHVsZSB7IH1cbiJdfQ==