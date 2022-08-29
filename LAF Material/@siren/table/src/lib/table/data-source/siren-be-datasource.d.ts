import { Observable } from 'rxjs';
import { SirenTableService } from '../interfaces/siren-data-service';
import { SirenTableFilterModel } from '../interfaces/siren-table-filter.model';
import { SirenDataSource } from './siren-datasource';
import { SirenTableData } from '../interfaces/data-table.model';
import { SortDirection } from '@angular/material/sort';
export declare class SirenBeDataSource<T> extends SirenDataSource {
    service: SirenTableService<T>;
    private readonly dataSubject;
    private params;
    private count;
    constructor(service: SirenTableService<T>);
    connect(): Observable<SirenTableData[]>;
    disconnect(): void;
    getSize(): number;
    getPage(): number;
    getKeyword(): string;
    getSortColumn(): string;
    getSortDirection(): SortDirection;
    getCount(): number;
    isAllRowsSelected(): boolean;
    /**
     * Loads the data fetched from the backend into Siren data table.
     * It is invoked on each pagination and sorting change event.
     * @param params an object that can be a filter's field to fetch data based on speicific condition, usually it represents the request header
     * @param showLoader useful while using spinner interceptor to show/hide the spinner.
     */
    loadData(params: SirenTableFilterModel, showLoader?: boolean): void;
    private fetchData;
    /**
     * Loads last data in the table's.
     */
    resetData(): void;
    filter(keywords: string): void;
    private setCountAndData;
    protected sendDataToTable(): void;
    selectAllRows(): void;
    deselectAllRows(onlyPaginated?: boolean): void;
    /**
     * Sets current page, size and invoke fetchData accordingly
     * @param data a model that contain current page, size
     */
    updatePaginationParams(data: SirenTableFilterModel): void;
    /**
     * Sets sortColumn and sortDirection and invoke fetchData accordingly
     * @param data a model that contain sortColumn and sortDirection
     */
    updateSortParams(data: SirenTableFilterModel): void;
}
