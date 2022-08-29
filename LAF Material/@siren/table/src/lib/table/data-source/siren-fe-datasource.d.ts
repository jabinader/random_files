import { MatPaginator } from "@angular/material/paginator";
import { MatSort, SortDirection } from "@angular/material/sort";
import { Observable } from "rxjs";
import { SirenTableData } from "../interfaces/data-table.model";
import { SirenTableFilterModel } from "../interfaces/siren-table-filter.model";
import { SirenDataSource } from './siren-datasource';
export declare class SirenFeDataSource extends SirenDataSource {
    private size;
    private page;
    private keyword;
    private sortColumn;
    private sortDirection;
    private dataSource;
    private paginatedData;
    constructor(data?: SirenTableData[], config?: SirenTableFilterModel);
    connect(): Observable<readonly SirenTableData[]>;
    disconnect(): void;
    getSize(): number;
    getPage(): number;
    getKeyword(): string;
    getSortColumn(): string;
    getSortDirection(): SortDirection;
    getCount(): number;
    isAllRowsSelected(): boolean;
    private loadParams;
    /**
     * Loads data in the table
     * @param data array of SirenTableData.
     * @param config optional object to set initial value for sorting and pagination.
     */
    loadData(data: SirenTableData[], config?: SirenTableFilterModel): void;
    /**
     * Sets the MatPaginator to enable client side pagination.
     */
    setPaginator(paginator: MatPaginator): void;
    /**
     * Sets MatSort to enable client side sorting.
     */
    setSort(sort: MatSort): void;
    /**
     * Sets page and size of the paginator. It doesn't trigger an ui change.
     * @param data object that contain page and size
     */
    updatePaginationParams(data: SirenTableFilterModel): void;
    /**
     * Sets sort colummn and sort direction. It doesn't trigger an ui change.
     * @param data object that contain sortColumn and sortDirection
     */
    updateSortParams(data: SirenTableFilterModel): void;
    filter(keywords: string): void;
    protected sendDataToTable(): void;
    selectAllRows(): void;
    /**
     *
     * @returns array filtered based on keyword in searchBox when allowFiltering input is true
     */
    getFilteredData(): SirenTableData[];
    /**
     * @returns array of current page data
     */
    getPaginatedData(): SirenTableData[];
    deselectAllRows(onlyPaginated?: boolean): void;
}
