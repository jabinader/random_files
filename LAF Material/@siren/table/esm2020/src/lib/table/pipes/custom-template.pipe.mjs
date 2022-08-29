import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
export class CustomTemplatePipe {
    transform(customTamplates, columnDef) {
        return customTamplates.find(customTamplate => customTamplate.appCustomColsColumnDef === columnDef).template;
    }
}
CustomTemplatePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.1", ngImport: i0, type: CustomTemplatePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
CustomTemplatePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "14.1.1", ngImport: i0, type: CustomTemplatePipe, name: "customTemplate" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.1", ngImport: i0, type: CustomTemplatePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'customTemplate'
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLXRlbXBsYXRlLnBpcGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy90YWJsZS9zcmMvbGliL3RhYmxlL3BpcGVzL2N1c3RvbS10ZW1wbGF0ZS5waXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxJQUFJLEVBQTRCLE1BQU0sZUFBZSxDQUFDOztBQU0vRCxNQUFNLE9BQU8sa0JBQWtCO0lBRTdCLFNBQVMsQ0FBQyxlQUErQyxFQUFFLFNBQWlCO1FBQzFFLE9BQU8sZUFBZSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLGNBQWMsQ0FBQyxzQkFBc0IsS0FBSyxTQUFTLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDOUcsQ0FBQzs7K0dBSlUsa0JBQWtCOzZHQUFsQixrQkFBa0I7MkZBQWxCLGtCQUFrQjtrQkFIOUIsSUFBSTttQkFBQztvQkFDSixJQUFJLEVBQUUsZ0JBQWdCO2lCQUN2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0sIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ3VzdG9tQ29sc0RpcmVjdGl2ZSB9IGZyb20gJy4uL2RpcmVjdGl2ZS9jdXN0b20tdGVtcGxhdGUuZGlyZWN0aXZlJztcblxuQFBpcGUoe1xuICBuYW1lOiAnY3VzdG9tVGVtcGxhdGUnXG59KVxuZXhwb3J0IGNsYXNzIEN1c3RvbVRlbXBsYXRlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIHRyYW5zZm9ybShjdXN0b21UYW1wbGF0ZXM6IFF1ZXJ5TGlzdDxDdXN0b21Db2xzRGlyZWN0aXZlPiwgY29sdW1uRGVmOiBzdHJpbmcpOiB1bmtub3duIHtcbiAgICByZXR1cm4gY3VzdG9tVGFtcGxhdGVzLmZpbmQoY3VzdG9tVGFtcGxhdGUgPT4gY3VzdG9tVGFtcGxhdGUuYXBwQ3VzdG9tQ29sc0NvbHVtbkRlZiA9PT0gY29sdW1uRGVmKS50ZW1wbGF0ZTtcbiAgfVxuXG59XG4iXX0=