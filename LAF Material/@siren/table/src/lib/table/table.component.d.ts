import { OnInit, AfterViewInit, EventEmitter, OnDestroy, OnChanges, SimpleChanges, QueryList } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, SortDirection } from '@angular/material/sort';
import { SirenTableColumns } from './interfaces/siren-table-columns.model';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { MatTable } from '@angular/material/table';
import { SirenDataSource } from './data-source/siren-datasource';
import { SirenTableConfig, SirenTableData } from './interfaces/data-table.model';
import { CustomColsDirective } from './directive/custom-template.directive';
import { SirenTableAction } from './enums/siren-table-action.enum';
import { MatCheckboxChange } from '@angular/material/checkbox';
import * as i0 from "@angular/core";
export declare class SirenTableComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    paginator: MatPaginator;
    sort: MatSort;
    table: MatTable<any>;
    onSubmitClick: EventEmitter<SirenTableData[]>;
    onRowClick: EventEmitter<SirenTableData>;
    onDeleteClick: EventEmitter<{
        row: SirenTableData;
        index: number;
    }>;
    onReorder: EventEmitter<any>;
    displayedColumns: SirenTableColumns<any>[];
    baseCols: SirenTableColumns<any>[];
    dataSource: SirenDataSource;
    readonly sirenTableAction: typeof SirenTableAction;
    allowFiltering: boolean;
    allowMultiSelection: boolean;
    allowSingleSelection: boolean;
    allowReordering: boolean;
    withDelete: boolean;
    allowPagination: boolean;
    labels: SirenTableConfig;
    private readonly _onDestroy;
    clickedRow: string | number;
    displayedColumnsWithAction: string[];
    expandedCols: SirenTableColumns<SirenTableData>[];
    expandedElement: any;
    searchString: string;
    innerHeight: number;
    isAllSelected: boolean;
    selectedRowCounter: number;
    partialSelection: boolean;
    count: number;
    customTemplates: QueryList<CustomColsDirective>;
    page: number;
    size: number;
    sortDirection: SortDirection;
    sortColumn: string;
    private previousKeyword;
    onResize(event: any): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngOnInit(): void;
    private loadColumns;
    ngAfterViewInit(): void;
    private checkDataSourcePaginatorAndSort;
    private connectToDatasource;
    /**
     * Updates sortColumn and sortDirection
     * @param changes chosen sortCOlumn and sortDirection
     */
    updateSortParams(changes: {
        active: string;
        direction: SortDirection;
    }): void;
    /**
     * Updates page and size
     * @param changes chosen page and size
     */
    updatePaginationParams(changes: {
        pageSize: number;
        pageIndex: number;
    }): void;
    private updateParams;
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(event: MatCheckboxChange): void;
    get searchChanged(): string;
    set searchChanged(input: string);
    /**
     * Selects row
     * @param event check's event
     * @param row selected row
     */
    selectRowTable(event: MatCheckboxChange, row: SirenTableData): void;
    /**
     * These function is used to update checkbox status
     */
    private updateSelectionStatus;
    /**
     * Filters table's data based on given keyword
     * @param keyword keyword in search box input
     */
    quickSearchChanged(keyword: string): void;
    /**
     * @param row Emits the row to be deleted and its index through `onDeleteClick` listener
     */
    deleteBtnClicked(row: SirenTableData): void;
    /**
     * Emits clicked row through `onRowClick` listener
     * @param row clicked row
     */
    onRowClickClicked(row: SirenTableData): void;
    /**
     * Swaps table's rows
     * @param event emitted when the user drops a draggable item inside a drop container.
     */
    swapRows(event: CdkDragDrop<SirenTableColumns<any>[]>): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<SirenTableComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<SirenTableComponent, "siren-table", never, { "displayedColumns": "displayedColumns"; "dataSource": "dataSource"; "allowFiltering": "allowFiltering"; "allowMultiSelection": "allowMultiSelection"; "allowSingleSelection": "allowSingleSelection"; "allowReordering": "allowReordering"; "withDelete": "withDelete"; "allowPagination": "allowPagination"; "labels": "labels"; }, { "onSubmitClick": "onSubmitClick"; "onRowClick": "onRowClick"; "onDeleteClick": "onDeleteClick"; "onReorder": "onReorder"; }, ["customTemplates"], never, false>;
}
