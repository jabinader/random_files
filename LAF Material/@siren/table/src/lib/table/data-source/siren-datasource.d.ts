import { DataSource } from '@angular/cdk/collections';
import { SortDirection } from '@angular/material/sort';
import { Observable } from 'rxjs';
import { SirenTableData } from '../interfaces/data-table.model';
import { SirenTableFilterModel } from '../interfaces/siren-table-filter.model';
export declare abstract class SirenDataSource implements DataSource<SirenTableData> {
    abstract updatePaginationParams(data: SirenTableFilterModel): void;
    abstract updateSortParams(data: SirenTableFilterModel): void;
    abstract connect(): Observable<readonly SirenTableData[]>;
    abstract disconnect(): void;
    /**
     * Filters data based on the keywords
     * @param keywords current value of the search box
     */
    abstract filter(keywords: string): void;
    protected abstract sendDataToTable(): void;
    /**
     * Selects all rows in the current page.
     */
    abstract selectAllRows(): void;
    /**
     * Deselects all rows
     * @param onlyPaginated true by default.
     */
    abstract deselectAllRows(onlyPaginated?: boolean): void;
    /**
     * Returns last chosen size of paginator. Default is 20
     */
    abstract getSize(): number;
    /**
     * Returns last chosen page of pagination. Default is 0
     */
    abstract getPage(): number;
    /**
     * Returns last keyword written in search box when allowFiltering input is true
     */
    abstract getKeyword(): string;
    /**
     * Returns the last chosen column to sort data.
     * @returns columnDef of the column
     */
    abstract getSortColumn(): string;
    /**
     * Returns last chosen direction to sort data
     */
    abstract getSortDirection(): SortDirection;
    /**
     * Returns length of data array
     */
    abstract getCount(): number;
    /**
     * Returns true if all data in the current page is selected
     */
    abstract isAllRowsSelected(): boolean;
    protected selectedRows: Map<string | number, SirenTableData>;
    protected data: SirenTableData[];
    /**
     * Swap items when reordering features is enabled.
     * Calling this function outside SirenTableComponent doesn't re-render the new order of data
     * @param previousIndex
     * @param currentIndex
     */
    swapRows(previousIndex: number, currentIndex: number): void;
    /**
     * Returns an array that represent all table's data
     */
    getData(): SirenTableData[];
    /**
     * Returns the index of a row in the table based on selectionId
     * @param row an element provided in loadData function of SirenFeDataSource or handleData of SirenDataService
     * @returns index of the first element in data array
     */
    getIndexOf(row: SirenTableData): number;
    /**
     * Returns number of selected rows
     */
    getSelectionCounter(): number;
    /**
     * Returns selected rows
     */
    getSelectedRows(): SirenTableData[];
    /**
     * Selects a row based on selectionId
     */
    selectRow(row: SirenTableData): void;
    /**
     * Deselects a row based on selectionId
     */
    deselectRow(row: SirenTableData): void;
    /**
     * Returns `true` if a row is selected and `false` otherwise
     */
    protected checkSelectedRows(): void;
}
