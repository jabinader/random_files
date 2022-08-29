import { SortDirection } from "@angular/material/sort";
export interface SirenTableFilterModel {
    sortColumn?: string;
    sortDirection?: SortDirection;
    page?: number;
    size?: number;
    keyword?: string;
}
