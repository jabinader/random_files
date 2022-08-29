import * as i0 from '@angular/core';
import { Directive, Input, Pipe, EventEmitter, Component, ViewChild, Output, ContentChildren, HostListener, NgModule } from '@angular/core';
import * as i8 from '@angular/material/paginator';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import * as i4 from '@angular/material/sort';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { takeUntil } from 'rxjs/operators';
import { Subject, BehaviorSubject, of } from 'rxjs';
import * as i7 from '@angular/material/table';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import * as i5 from '@angular/cdk/drag-drop';
import { moveItemInArray, DragDropModule } from '@angular/cdk/drag-drop';
import { trigger, state, style, transition, animate } from '@angular/animations';
import * as i1$1 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i2 from '@angular/forms';
import { FormsModule } from '@angular/forms';
import * as i1 from '@angular/material/tooltip';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as i6 from '@angular/material/checkbox';
import { MatCheckboxModule } from '@angular/material/checkbox';
import * as i9 from '@angular/material/form-field';
import { MatFormFieldModule } from '@angular/material/form-field';
import * as i10 from '@angular/material/icon';
import { MatIconModule } from '@angular/material/icon';
import * as i11 from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';
import * as i12 from '@angular/material/input';
import { MatInputModule } from '@angular/material/input';

var DefaultFilterValue;
(function (DefaultFilterValue) {
    DefaultFilterValue["DEFAULT_SORT_DIRECTION"] = "";
    DefaultFilterValue["DEFAULT_SORT_COLUMN"] = "";
    DefaultFilterValue[DefaultFilterValue["DEFAULT_PAGE"] = 0] = "DEFAULT_PAGE";
    DefaultFilterValue[DefaultFilterValue["DEFAULT_PAGE_SIZE"] = 20] = "DEFAULT_PAGE_SIZE";
    DefaultFilterValue["DEFAULT_KEYWORD"] = "";
})(DefaultFilterValue || (DefaultFilterValue = {}));

class SirenDataSource {
    constructor() {
        this.selectedRows = new Map();
        this.data = [];
    }
    /**
     * Swap items when reordering features is enabled.
     * Calling this function outside SirenTableComponent doesn't re-render the new order of data
     * @param previousIndex
     * @param currentIndex
     */
    swapRows(previousIndex, currentIndex) {
        moveItemInArray(this.data, previousIndex, currentIndex);
        this.sendDataToTable();
    }
    /**
     * Returns an array that represent all table's data
     */
    getData() {
        return this.data;
    }
    /**
     * Returns the index of a row in the table based on selectionId
     * @param row an element provided in loadData function of SirenFeDataSource or handleData of SirenDataService
     * @returns index of the first element in data array
     */
    getIndexOf(row) {
        return this.data.findIndex(elem => elem.selectionId === row.selectionId);
    }
    /**
     * Returns number of selected rows
     */
    getSelectionCounter() {
        return this.selectedRows.size;
    }
    /**
     * Returns selected rows
     */
    getSelectedRows() {
        return [...this.selectedRows.values()];
    }
    /**
     * Selects a row based on selectionId
     */
    selectRow(row) {
        row.isSelected = true;
        this.selectedRows.set(row.selectionId, row);
    }
    /**
     * Deselects a row based on selectionId
     */
    deselectRow(row) {
        row.isSelected = false;
        this.selectedRows.delete(row.selectionId);
    }
    /**
     * Returns `true` if a row is selected and `false` otherwise
     */
    checkSelectedRows() {
        this.data.forEach(row => {
            if (this.selectedRows.has(row.selectionId)) { // We need to check if the selectionId is in the selectedRows to know if it is a selected row because isSelected field is set to false with server-side pagination
                row['isSelected'] = true;
            }
            else if (row.isSelected) { // A row that have isSelected true by default should be selected
                this.selectRow(row);
            }
        });
    }
}

class SirenFeDataSource extends SirenDataSource {
    constructor(data = [], config) {
        super();
        this.dataSource = new MatTableDataSource();
        if (data.length > 0) {
            this.loadData(data, config);
        }
        this.dataSource.connect().subscribe(data => {
            if (data) {
                this.paginatedData = data;
            }
        });
    }
    connect() {
        return this.dataSource.connect();
    }
    disconnect() {
        this.dataSource.disconnect();
    }
    getSize() {
        return this.size;
    }
    getPage() {
        return this.page;
    }
    getKeyword() {
        return this.keyword;
    }
    getSortColumn() {
        return this.sortColumn;
    }
    getSortDirection() {
        return this.sortDirection;
    }
    getCount() {
        return this.dataSource.filteredData.length;
    }
    isAllRowsSelected() {
        return this.paginatedData?.find(row => row.isSelected === false || row.isSelected === undefined) === undefined;
    }
    loadParams(config) {
        this.page = config?.page ?? DefaultFilterValue.DEFAULT_PAGE;
        this.size = config?.size ?? DefaultFilterValue.DEFAULT_PAGE_SIZE;
        this.sortColumn = config?.sortColumn ?? DefaultFilterValue.DEFAULT_SORT_COLUMN;
        this.sortDirection = config?.sortDirection ?? DefaultFilterValue.DEFAULT_SORT_DIRECTION;
        this.keyword = config?.keyword ?? DefaultFilterValue.DEFAULT_KEYWORD;
    }
    /**
     * Loads data in the table
     * @param data array of SirenTableData.
     * @param config optional object to set initial value for sorting and pagination.
     */
    loadData(data, config) {
        this.loadParams(config);
        this.data = data;
        this.checkSelectedRows();
        this.sendDataToTable();
        this.dataSource.filter = this.keyword;
    }
    /**
     * Sets the MatPaginator to enable client side pagination.
     */
    setPaginator(paginator) {
        this.dataSource.paginator = paginator;
    }
    /**
     * Sets MatSort to enable client side sorting.
     */
    setSort(sort) {
        this.dataSource.sort = sort;
    }
    /**
     * Sets page and size of the paginator. It doesn't trigger an ui change.
     * @param data object that contain page and size
     */
    updatePaginationParams(data) {
        this.page = data.page;
        this.size = data.size;
    }
    /**
     * Sets sort colummn and sort direction. It doesn't trigger an ui change.
     * @param data object that contain sortColumn and sortDirection
     */
    updateSortParams(data) {
        this.sortColumn = data.sortColumn;
        this.sortDirection = data.sortDirection;
    }
    filter(keywords) {
        this.page = DefaultFilterValue.DEFAULT_PAGE;
        this.keyword = keywords;
        this.dataSource.filter = keywords;
    }
    sendDataToTable() {
        this.dataSource.data = this.data;
    }
    selectAllRows() {
        this.paginatedData.forEach(row => {
            this.selectRow(row);
        });
    }
    /**
     *
     * @returns array filtered based on keyword in searchBox when allowFiltering input is true
     */
    getFilteredData() {
        return this.dataSource.filteredData;
    }
    /**
     * @returns array of current page data
     */
    getPaginatedData() {
        return this.paginatedData;
    }
    deselectAllRows(onlyPaginated = true) {
        const dataToDeleted = onlyPaginated ? this.paginatedData : this.data;
        dataToDeleted.forEach(row => this.deselectRow(row));
    }
}

class CustomColsDirective {
    constructor(template, viewContainer) {
        this.template = template;
        this.viewContainer = viewContainer;
    }
    ngOnInit() {
        if (this.appCustomCols) {
            this.viewContainer.createEmbeddedView(this.template);
        }
    }
}
CustomColsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.1", ngImport: i0, type: CustomColsDirective, deps: [{ token: i0.TemplateRef }, { token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
CustomColsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.1", type: CustomColsDirective, selector: "[appCustomCols]", inputs: { appCustomColsColumnDef: "appCustomColsColumnDef", appCustomCols: "appCustomCols" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.1", ngImport: i0, type: CustomColsDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[appCustomCols]'
                }]
        }], ctorParameters: function () { return [{ type: i0.TemplateRef }, { type: i0.ViewContainerRef }]; }, propDecorators: { appCustomColsColumnDef: [{
                type: Input
            }], appCustomCols: [{
                type: Input
            }] } });

var SirenTableAction;
(function (SirenTableAction) {
    SirenTableAction["DELETE"] = "DELETE";
    SirenTableAction["REORDER"] = "REORDER";
    SirenTableAction["SELECT"] = "SELECT";
    SirenTableAction["EXPAND"] = "EXPAND";
})(SirenTableAction || (SirenTableAction = {}));

class EllipsifyMeDirective {
    constructor(matTooltip, elementRef) {
        this.matTooltip = matTooltip;
        this.elementRef = elementRef;
    }
    ngAfterViewInit() {
        const element = this.elementRef.nativeElement;
        this.matTooltip.disabled = element.scrollHeight === 0 || element.scrollHeight - element.clientHeight - 2 <= 0;
    }
}
EllipsifyMeDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.1", ngImport: i0, type: EllipsifyMeDirective, deps: [{ token: i1.MatTooltip }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
EllipsifyMeDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "14.1.1", type: EllipsifyMeDirective, selector: "[matTooltip][appTooltipIfTruncated]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.1", ngImport: i0, type: EllipsifyMeDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[matTooltip][appTooltipIfTruncated]'
                }]
        }], ctorParameters: function () { return [{ type: i1.MatTooltip }, { type: i0.ElementRef }]; } });

class CustomTemplatePipe {
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

class SirenTableComponent {
    constructor() {
        this.onSubmitClick = new EventEmitter();
        this.onRowClick = new EventEmitter();
        this.onDeleteClick = new EventEmitter();
        this.onReorder = new EventEmitter();
        this.displayedColumns = [];
        this.baseCols = [];
        this.sirenTableAction = SirenTableAction;
        this.allowFiltering = false; // Displays search box input above the table
        this.allowMultiSelection = false;
        this.allowSingleSelection = false;
        this.allowReordering = false;
        this.withDelete = false;
        this.allowPagination = false;
        this._onDestroy = new Subject();
        this.displayedColumnsWithAction = [];
        this.expandedCols = [];
        this.expandedElement = null;
        this.searchString = '';
        this.innerHeight = 0;
        this.isAllSelected = false;
        this.selectedRowCounter = 0;
        this.partialSelection = false;
        this.count = 0;
        this.previousKeyword = '';
    }
    onResize(event) {
        this.innerHeight = window.innerHeight;
    }
    ngOnChanges(changes) {
        if (changes?.displayedColumns?.previousValue) {
            this.loadColumns();
        }
        if (changes?.dataSource?.previousValue) {
            this.connectToDatasource();
            this.checkDataSourcePaginatorAndSort();
        }
    }
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    ngOnInit() {
        this.innerHeight = window.innerHeight;
        this.loadColumns();
    }
    loadColumns() {
        this.expandedCols = this.displayedColumns.filter(column => column.expandedData);
        this.baseCols = this.displayedColumns.filter(column => !column.expandedData);
        this.displayedColumnsWithAction = this.baseCols.map(col => col.columnDef);
        if (this.expandedCols.length > 0 && !this.displayedColumnsWithAction?.includes(SirenTableAction.EXPAND)) {
            this.displayedColumnsWithAction?.push(SirenTableAction.EXPAND);
        }
        if ((this.allowSingleSelection || this.allowMultiSelection) && !this.displayedColumnsWithAction?.includes(SirenTableAction.SELECT)) {
            this.displayedColumnsWithAction?.unshift(SirenTableAction.SELECT);
        }
        if (this.withDelete && !this.displayedColumnsWithAction?.includes(SirenTableAction.DELETE)) {
            this.displayedColumnsWithAction?.push(SirenTableAction.DELETE);
        }
        if (this.allowReordering && !this.displayedColumnsWithAction?.includes(SirenTableAction.REORDER)) {
            this.displayedColumnsWithAction?.unshift(SirenTableAction.REORDER);
        }
    }
    ngAfterViewInit() {
        this.connectToDatasource();
        this.checkDataSourcePaginatorAndSort();
    }
    checkDataSourcePaginatorAndSort() {
        if (this.dataSource instanceof SirenFeDataSource) {
            if (this.allowPagination) {
                this.dataSource?.setPaginator(this.paginator);
            }
            this.dataSource?.setSort(this.sort);
        }
    }
    connectToDatasource() {
        this.dataSource?.connect()?.pipe(takeUntil(this._onDestroy)).subscribe(data => {
            if (data) {
                this.count = this.dataSource.getCount();
                this.updateParams();
                this.updateSelectionStatus();
            }
        });
    }
    /**
     * Updates sortColumn and sortDirection
     * @param changes chosen sortCOlumn and sortDirection
     */
    updateSortParams(changes) {
        this.sortColumn = changes.active;
        this.sortDirection = changes.direction;
        const data = { sortColumn: this.sortColumn, sortDirection: this.sortDirection };
        this.dataSource.updateSortParams(data);
    }
    /**
     * Updates page and size
     * @param changes chosen page and size
     */
    updatePaginationParams(changes) {
        if (this.allowPagination) { // updatePaginationParams is a public method => It can be called from the parent component.
            this.page = changes.pageIndex;
            this.size = changes.pageSize;
            const data = { page: this.page, size: this.size };
            this.dataSource.updatePaginationParams(data);
        }
    }
    updateParams() {
        if (this.allowPagination) {
            this.page = this.dataSource?.getPage();
            this.paginator.pageIndex = this.page;
            this.size = this.dataSource?.getSize();
            this.paginator.pageSize = this.size;
        }
        this.sortColumn = this.dataSource?.getSortColumn();
        this.sort.active = this.sortColumn;
        this.sortDirection = this.dataSource?.getSortDirection();
        this.sort.direction = this.sortDirection;
        this.searchString = this.dataSource?.getKeyword();
    }
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggle(event) {
        this.clickedRow = null;
        if (event.checked) {
            if (this.allowMultiSelection) {
                this.dataSource.selectAllRows();
            }
            else {
                this.dataSource.deselectAllRows(false);
                event.source.checked = false;
            }
        }
        else {
            this.dataSource.deselectAllRows();
        }
        this.updateSelectionStatus();
    }
    get searchChanged() {
        return this.searchString;
    }
    set searchChanged(input) {
        this.searchString = input?.trim();
    }
    /**
     * Selects row
     * @param event check's event
     * @param row selected row
     */
    selectRowTable(event, row) {
        this.clickedRow = null;
        if (event?.checked) {
            if (!this.allowMultiSelection) {
                this.dataSource.deselectAllRows(false);
            }
            this.dataSource.selectRow(row);
        }
        else {
            this.dataSource.deselectRow(row);
        }
        this.updateSelectionStatus();
    }
    /**
     * These function is used to update checkbox status
     */
    updateSelectionStatus() {
        this.isAllSelected = this.dataSource?.isAllRowsSelected();
        this.partialSelection = this.dataSource?.getSelectionCounter() > 0;
        this.selectedRowCounter = this.dataSource?.getSelectionCounter();
    }
    /**
     * Filters table's data based on given keyword
     * @param keyword keyword in search box input
     */
    quickSearchChanged(keyword) {
        keyword = keyword?.trim().toLowerCase();
        if (keyword !== this.previousKeyword && this.allowFiltering) {
            this.previousKeyword = keyword;
            if (this.allowPagination) {
                this.page = DefaultFilterValue.DEFAULT_PAGE;
                this.paginator.pageIndex = this.page;
            }
            keyword = keyword?.trim().toLowerCase(); // Remove whitespace
            this.dataSource.filter(keyword);
        }
    }
    /**
     * @param row Emits the row to be deleted and its index through `onDeleteClick` listener
     */
    deleteBtnClicked(row) {
        if (row.isSelected) {
            this.dataSource.deselectRow(row);
        }
        const index = this.dataSource.getIndexOf(row);
        this.onDeleteClick.emit({ row, index });
    }
    /**
     * Emits clicked row through `onRowClick` listener
     * @param row clicked row
     */
    onRowClickClicked(row) {
        if (this.onRowClick.observers.length > 0) { // check if the parent component is listening on row click event
            this.clickedRow = row.selectionId;
            this.onRowClick.emit(row);
        }
    }
    /**
     * Swaps table's rows
     * @param event emitted when the user drops a draggable item inside a drop container.
     */
    swapRows(event) {
        const previousIndex = this.allowPagination ? event.previousIndex + this.page * this.size : event.previousIndex;
        const currentIndex = this.allowPagination ? event.currentIndex + this.page * this.size : event.currentIndex;
        this.dataSource.swapRows(previousIndex, currentIndex);
        this.table.renderRows();
        this.onReorder.emit({ event, data: this.dataSource.getData() });
    }
}
SirenTableComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "14.1.1", ngImport: i0, type: SirenTableComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
SirenTableComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "14.1.1", type: SirenTableComponent, selector: "siren-table", inputs: { displayedColumns: "displayedColumns", dataSource: "dataSource", allowFiltering: "allowFiltering", allowMultiSelection: "allowMultiSelection", allowSingleSelection: "allowSingleSelection", allowReordering: "allowReordering", withDelete: "withDelete", allowPagination: "allowPagination", labels: "labels" }, outputs: { onSubmitClick: "onSubmitClick", onRowClick: "onRowClick", onDeleteClick: "onDeleteClick", onReorder: "onReorder" }, host: { listeners: { "window:resize": "onResize($event)" } }, queries: [{ propertyName: "customTemplates", predicate: CustomColsDirective }], viewQueries: [{ propertyName: "paginator", first: true, predicate: MatPaginator, descendants: true }, { propertyName: "sort", first: true, predicate: MatSort, descendants: true }, { propertyName: "table", first: true, predicate: ["table"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div class=\"siren-table-search-container\" >\n    <mat-form-field appearance=\"fill\" class=\"siren-table-search-field full-width-mobile\"  *ngIf=\"allowFiltering\" >\n        <button *ngIf=\"searchChanged !== ''\" mat-icon-button matSuffix (click)=\"searchChanged = ''; quickSearchChanged('')\">\n            <mat-icon class=\"siren-table-mat-icons\">clear</mat-icon>\n        </button>\n        <input autocomplete=\"off\" (keyup)=\"quickSearchChanged($event.target.value)\"\n            matInput [placeholder]=\"labels?.searchBoxLabel ?? '\u0628\u062D\u062B'\" [(ngModel)]=\"searchChanged\">\n        <button mat-icon-button matPrefix><mat-icon class=\"siren-table-mat-icons\">search</mat-icon></button>\n    </mat-form-field>\n</div>\n\n<div *ngIf=\"count === 0\" style=\"padding-inline-start: 10px;\">{{ labels?.noDataLabel ?? \"\u0644\u0627 \u064A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A\" }}</div>\n\n<div class=\"siren-table-container mat-elevation-z8\" [ngClass]=\"{'visibility-hidden': count === 0}\">\n    <div class=\"siren-table-data-container\" [ngStyle]=\"{ 'height': (innerHeight * 0.35) + 'px' }\">\n        <table mat-table #table multiTemplateDataRows [dataSource]=\"dataSource\" class=\"siren-table\" matSort [matSortActive]=\"sortColumn\" [matSortDirection]=\"sortDirection\" (matSortChange)=\"updateSortParams($event)\" cdkDropList [cdkDropListData]=\"dataSource\" (cdkDropListDropped)=\"swapRows($event)\">\n            <!-- Checkbox Column to select -->\n            <ng-container *ngIf=\"allowSingleSelection || allowMultiSelection\" matColumnDef={{sirenTableAction.SELECT}}>\n                <th mat-header-cell *matHeaderCellDef class=\"siren-table-checkbox-col siren-action-col\">\n                    <mat-checkbox  #selectAllCheckbox *ngIf=\"allowMultiSelection || partialSelection\" color=\"primary\" (change)=\"$event ? masterToggle($event) : null\"\n                        [checked]=\"isAllSelected\" (click)=\"$event.stopPropagation()\"\n                        [indeterminate]=\"partialSelection && !isAllSelected\" class=\"siren-table-checkbox\">\n                    </mat-checkbox>\n                </th>\n                <td mat-cell *matCellDef=\"let row\" class=\"siren-table-checkbox-col\" [ngStyle]=\"{'border-bottom-width': expandedCols.length > 0 ? 0 : inherit}\">\n                    <mat-checkbox color=\"primary\" (change)=\"$event ? selectRowTable($event, row) : null\"\n                        [checked]=\"row.isSelected || selectAllCheckbox?.checked\" class=\"siren-table-checkbox\">\n                    </mat-checkbox>\n                </td>\n            </ng-container>\n\n            <!-- Position Column -->\n            <ng-container *ngIf=\"allowReordering\" matColumnDef={{sirenTableAction.REORDER}} class=\"siren-action-col\">\n                <th mat-header-cell class=\"montserrat bold siren-action-col\" *matHeaderCellDef></th>\n                <td mat-cell class=\"openSans\" *matCellDef=\"let element\">\n                <mat-icon class=\"siren-table-mat-icons\" cdkDragHandle>reorder</mat-icon>\n                </td>\n            </ng-container>\n\n            <!-- show hide details -->\n            <ng-container *ngIf=\"expandedCols.length > 0\" matColumnDef={{sirenTableAction.EXPAND}} class=\"siren-action-col\">\n                <th mat-header-cell class=\"montserrat bold siren-action-col\" *matHeaderCellDef> </th>\n                <td mat-cell class=\"openSans\" *matCellDef=\"let element\" [ngStyle]=\"{'border-bottom-width': expandedCols.length > 0 ? 0 : inherit}\">\n                    <mat-icon class=\"siren-table-expand-btn siren-table-mat-icons\" (click)=\"expandedElement = expandedElement === element ? null : element\">{{expandedElement === element ? 'expand_less' : 'expand_more'}}</mat-icon>\n                </td>                \n            </ng-container>\n\n            <!-- Delete row action -->\n            <ng-container *ngIf=\"withDelete\" matColumnDef=\"{{ sirenTableAction.DELETE }}\" class=\"siren-action-col\">\n                <th mat-header-cell *matHeaderCellDef class=\"siren-action-col\"></th> \n                <td mat-cell *matCellDef=\"let element\" [ngStyle]=\"{'border-bottom-width': expandedCols.length > 0 ? 0 : inherit}\">\n                    <button mat-mini-fab class=\"siren-table-delete-btn\" (click)=\"deleteBtnClicked(element)\"><mat-icon class=\"siren-table-mat-icons\">delete</mat-icon></button>\n                </td>\n            </ng-container>\n\n            <!-- The base columns -->\n            <ng-container *ngFor=\"let column of baseCols\" matColumnDef={{column.columnDef}}>\n                <!-- default columns -->\n                <div *ngIf=\"!column.customColumn\">\n                    <th mat-header-cell class=\"montserrat bold siren-table-header\" *matHeaderCellDef=\"let element\" mat-sort-header [disabled]=\"!column.allowSorting ?? false\"> {{column.header}} </th> \n                    <td mat-cell class=\"openSans\" *matCellDef=\"let element\" class=\"siren-table-cell\" [ngClass]=\"{'cursor-pointer': onRowClick.observers.length > 0}\" (click)=\"onRowClickClicked(element)\" \n                    [ngStyle]=\"{'border-bottom-width': expandedCols.length > 0 ? 0 : inherit}\">\n                        <span [matTooltip]=\"column.cellValue(element)\" appTooltipIfTruncated *ngIf=\"column.cellValue(element) !== true && column.cellValue(element) !== false\" [ngClass]=\"{'ellipsis-overflow': column.allowEllipsis}\">\n                            {{ column.cellValue(element) || ' '}}\n                        </span>\n                        <mat-icon class=\"siren-table-checked-icon siren-table-mat-icons\" *ngIf=\"column.cellValue(element) === true\">check_circle</mat-icon>\n                        <mat-icon class=\"siren-table-unchecked-icon siren-table-mat-icons\" *ngIf=\"column.cellValue(element) === false\">cancel</mat-icon>\n                    </td>\n                </div>\n                <!-- custom template columns -->\n                <div *ngIf=\"column.customColumn\">\n                    <th mat-header-cell class=\"montserrat bold siren-table-header\" *matHeaderCellDef=\"let element\"> {{ column.header }}</th> \n                    <td mat-cell class=\"siren-table-cell\" *matCellDef=\"let element\" [ngClass]=\"{'cursor-pointer': onRowClick.observers.length > 0}\" [ngStyle]=\"{'border-bottom-width': expandedCols.length > 0 ? 0 : inherit}\">\n                        <ng-container *ngTemplateOutlet=\"customTemplates | customTemplate : column.columnDef; context: {$implicit: element}\"></ng-container>\n                    </td>\n                </div>\n            </ng-container>\n             <!-- expanded columns -->\n            <ng-container matColumnDef=\"sirenExpandedData\">\n                <td mat-cell *matCellDef=\"let element\" [attr.colspan]=\"displayedColumnsWithAction.length+1\">\n                    <div class=\"siren-table-expand-row\" *ngFor=\"let column of expandedCols\"\n                    [@detailExpand]=\"element == expandedElement ? 'expanded' : 'collapsed'\" [style.height]=\"element == expandedElement ? 'unset' : '0 !important'\">\n                        <div *ngIf=\"column.cellValue(element)\">{{ column.header || ''}}</div>\n                        <div *ngIf=\"column.cellValue(element)\">{{ column.cellValue(element) || ''}}</div>\n                    </div>\n                </td>\n            </ng-container>\n\n            <tr mat-header-row *matHeaderRowDef=\"displayedColumnsWithAction; sticky: true\"></tr>\n            <tr mat-row *matRowDef=\"let row; columns: displayedColumnsWithAction\" cdkDrag [cdkDragDisabled]=\"!allowReordering\" [cdkDragData]=\"row\"\n                [ngClass]=\"{ 'selected': (row?.isSelected) || (row?.selectionId == clickedRow && clickedRow != undefined), 'element-row': onRowClick.observers.length > 0 }\">\n            </tr>\n            <div *ngIf=\"expandedCols.length > 0\">\n                <tr mat-row *matRowDef=\"let row; columns: ['sirenExpandedData']\" class=\"detail-row\" [ngClass]=\"{ 'selected': (row.isSelected) || (row.selectionId === clickedRow && clickedRow != undefined)}\"></tr>\n            </div>\n        </table>\n    </div>\n    <div class=\"siren-table-paginator-container\" *ngIf=\"allowPagination\">\n        <mat-paginator [pageSize]=\"size\" [pageIndex]=\"page\" [length]=\"count\" #paginator (page)=\"updatePaginationParams($event)\" [pageSizeOptions]=\"[10, 20, 50, 100, 200, 1000]\" showFirstLastButtons ></mat-paginator>\n        <div *ngIf=\"(allowMultiSelection || allowSingleSelection) && selectedRowCounter > 0\">\n            <span class=\"siren-table-selection-counter\" >{{selectedRowCounter}} {{ labels?.selectionLabel ?? \"\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u062F\u062F\u0629\" }}</span>\n        </div>\n    </div>\n</div>\n<div class=\"submit-container\" *ngIf=\"( allowSingleSelection || allowMultiSelection ) && count !== 0\" style=\"padding-top: 8px; margin: 10px 15px\">\n    <button mat-raised-button class=\"siren-table-submit-btn\" (click)=\"onSubmitClick.emit(this.dataSource.getSelectedRows())\">{{ labels?.doneBtnLabel ?? \"\u0627\u0646\u062A\u0647\u0627\u0621\" }}</button>\n</div>\n", styles: ["table{width:100%}tr.detail-row{height:0}.siren-table-selection-counter{color:#777;font-size:13px}.siren-table-data-container{overflow:auto}.mat-row.selected{background:rgba(195,41,67,.1019607843)}.siren-table-container{padding:0;margin:10px 15px;background-color:#fff}.submit-container{padding-top:8px;margin:10px 15px;flex-direction:row;box-sizing:border-box;display:flex;place-content:center flex-end;align-items:center}tr.mat-header-row{background-color:#fff}.element-row:not(.selected):hover{background:#ececec}.cursor-pointer{cursor:pointer}.siren-table-expand-row{overflow:hidden;display:flex;flex-direction:row;align-items:center;justify-content:space-around}.siren-table-expand-row div{padding-bottom:5px}.siren-table-expand-btn{color:#5cc4cc;cursor:pointer}.siren-table-unchecked-icon{color:#c32943}.siren-table-checked-icon{color:#64ce16}.visibility-hidden{visibility:hidden}.siren-table{box-shadow:none}.siren-table .mat-header-cell{color:#535353;font-weight:700;font-size:13px;font-family:inherit;padding-inline-end:8px;padding-inline-start:8px}.siren-table .mat-cell{color:#777;font-weight:400;font-size:13px;font-family:inherit;padding-inline-end:8px;padding-inline-start:8px}.siren-table .mat-cell span{white-space:nowrap}.siren-table .mat-cell mat-icon{vertical-align:middle}.siren-table .siren-table-checkbox-col{padding-top:8px}.siren-table .siren-table-checkbox-col .siren-table-checkbox{margin:10px}.ellipsis-overflow{overflow-y:hidden!important;display:-webkit-box!important;text-overflow:ellipsis!important;-webkit-line-clamp:3!important;-webkit-box-orient:vertical!important;white-space:pre-wrap!important}.siren-table-submit-btn{padding:10px 30px;height:30px;border-radius:15px;color:#fff;line-height:1px;font-family:inherit;font-size:12px;border:none;background-color:#5cc4cc;width:-moz-fit-content;width:fit-content}.mat-paginator{display:inline-flex}::ng-deep .mat-paginator-range-label{font-size:12px;font-family:inherit;color:#777}::ng-deep .mat-paginator-page-size-label{font-size:12px;font-family:inherit;color:#777}::ng-deep .mat-select-value-text{font-size:12px;font-family:inherit;color:#777}.siren-table-paginator-container{display:flex;flex-direction:row;align-items:center}.siren-table-search-container{margin-inline-start:10px}.siren-table-search-container ::ng-deep .mat-form-field-flex{height:40px}.siren-table-search-container ::ng-deep .mat-form-field-underline{display:none}.siren-table-search-container ::ng-deep button{position:relative;bottom:8px}.siren-table-search-container ::ng-deep input{position:relative;bottom:14px}.siren-table-delete-btn{background-color:#c329431a}.siren-table-delete-btn mat-icon{color:#c32943;font-size:22px}.siren-action-col{width:10px}@media screen and (max-width: 599px){.full-width-mobile{width:100%}.siren-table-data-container{overflow-x:visible}::ng-deep .table-view{margin:5px}.siren-table-search-container{margin-inline-start:0px}.siren-table-search-field button{bottom:15px}.siren-table-search-field input{bottom:13px}.siren-table-search-field .mat-form-field-flex{padding:4px}.siren-table-container{margin:10px 5px}::ng-deep .mat-paginator-outer-container .mat-paginator-range-label{margin:0}}\n"], dependencies: [{ kind: "directive", type: i1$1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1$1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1$1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1$1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1$1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i1.MatTooltip, selector: "[matTooltip]", exportAs: ["matTooltip"] }, { kind: "directive", type: i4.MatSort, selector: "[matSort]", inputs: ["matSortDisabled", "matSortActive", "matSortStart", "matSortDirection", "matSortDisableClear"], outputs: ["matSortChange"], exportAs: ["matSort"] }, { kind: "component", type: i4.MatSortHeader, selector: "[mat-sort-header]", inputs: ["disabled", "mat-sort-header", "arrowPosition", "start", "sortActionDescription", "disableClear"], exportAs: ["matSortHeader"] }, { kind: "directive", type: i5.CdkDropList, selector: "[cdkDropList], cdk-drop-list", inputs: ["cdkDropListConnectedTo", "cdkDropListData", "cdkDropListOrientation", "id", "cdkDropListLockAxis", "cdkDropListDisabled", "cdkDropListSortingDisabled", "cdkDropListEnterPredicate", "cdkDropListSortPredicate", "cdkDropListAutoScrollDisabled", "cdkDropListAutoScrollStep"], outputs: ["cdkDropListDropped", "cdkDropListEntered", "cdkDropListExited", "cdkDropListSorted"], exportAs: ["cdkDropList"] }, { kind: "directive", type: i5.CdkDrag, selector: "[cdkDrag]", inputs: ["cdkDragData", "cdkDragLockAxis", "cdkDragRootElement", "cdkDragBoundary", "cdkDragStartDelay", "cdkDragFreeDragPosition", "cdkDragDisabled", "cdkDragConstrainPosition", "cdkDragPreviewClass", "cdkDragPreviewContainer"], outputs: ["cdkDragStarted", "cdkDragReleased", "cdkDragEnded", "cdkDragEntered", "cdkDragExited", "cdkDragDropped", "cdkDragMoved"], exportAs: ["cdkDrag"] }, { kind: "directive", type: i5.CdkDragHandle, selector: "[cdkDragHandle]", inputs: ["cdkDragHandleDisabled"] }, { kind: "component", type: i6.MatCheckbox, selector: "mat-checkbox", inputs: ["disableRipple", "color", "tabIndex"], exportAs: ["matCheckbox"] }, { kind: "component", type: i7.MatTable, selector: "mat-table, table[mat-table]", exportAs: ["matTable"] }, { kind: "directive", type: i7.MatHeaderCellDef, selector: "[matHeaderCellDef]" }, { kind: "directive", type: i7.MatHeaderRowDef, selector: "[matHeaderRowDef]", inputs: ["matHeaderRowDef", "matHeaderRowDefSticky"] }, { kind: "directive", type: i7.MatColumnDef, selector: "[matColumnDef]", inputs: ["sticky", "matColumnDef"] }, { kind: "directive", type: i7.MatCellDef, selector: "[matCellDef]" }, { kind: "directive", type: i7.MatRowDef, selector: "[matRowDef]", inputs: ["matRowDefColumns", "matRowDefWhen"] }, { kind: "directive", type: i7.MatHeaderCell, selector: "mat-header-cell, th[mat-header-cell]" }, { kind: "directive", type: i7.MatCell, selector: "mat-cell, td[mat-cell]" }, { kind: "component", type: i7.MatHeaderRow, selector: "mat-header-row, tr[mat-header-row]", exportAs: ["matHeaderRow"] }, { kind: "component", type: i7.MatRow, selector: "mat-row, tr[mat-row]", exportAs: ["matRow"] }, { kind: "component", type: i8.MatPaginator, selector: "mat-paginator", inputs: ["disabled"], exportAs: ["matPaginator"] }, { kind: "component", type: i9.MatFormField, selector: "mat-form-field", inputs: ["color", "appearance", "hideRequiredMarker", "hintLabel", "floatLabel"], exportAs: ["matFormField"] }, { kind: "directive", type: i9.MatPrefix, selector: "[matPrefix]" }, { kind: "directive", type: i9.MatSuffix, selector: "[matSuffix]" }, { kind: "component", type: i10.MatIcon, selector: "mat-icon", inputs: ["color", "inline", "svgIcon", "fontSet", "fontIcon"], exportAs: ["matIcon"] }, { kind: "component", type: i11.MatButton, selector: "button[mat-button], button[mat-raised-button], button[mat-icon-button],             button[mat-fab], button[mat-mini-fab], button[mat-stroked-button],             button[mat-flat-button]", inputs: ["disabled", "disableRipple", "color"], exportAs: ["matButton"] }, { kind: "directive", type: i12.MatInput, selector: "input[matInput], textarea[matInput], select[matNativeControl],      input[matNativeControl], textarea[matNativeControl]", inputs: ["disabled", "id", "placeholder", "name", "required", "type", "errorStateMatcher", "aria-describedby", "value", "readonly"], exportAs: ["matInput"] }, { kind: "directive", type: EllipsifyMeDirective, selector: "[matTooltip][appTooltipIfTruncated]" }, { kind: "pipe", type: CustomTemplatePipe, name: "customTemplate" }], animations: [
        trigger('detailExpand', [
            state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
        ])
    ] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "14.1.1", ngImport: i0, type: SirenTableComponent, decorators: [{
            type: Component,
            args: [{ selector: 'siren-table', animations: [
                        trigger('detailExpand', [
                            state('collapsed, void', style({ height: '0px', minHeight: '0', display: 'none' })),
                            state('expanded', style({ height: '*' })),
                            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
                            transition('expanded <=> void', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
                        ])
                    ], template: "<div class=\"siren-table-search-container\" >\n    <mat-form-field appearance=\"fill\" class=\"siren-table-search-field full-width-mobile\"  *ngIf=\"allowFiltering\" >\n        <button *ngIf=\"searchChanged !== ''\" mat-icon-button matSuffix (click)=\"searchChanged = ''; quickSearchChanged('')\">\n            <mat-icon class=\"siren-table-mat-icons\">clear</mat-icon>\n        </button>\n        <input autocomplete=\"off\" (keyup)=\"quickSearchChanged($event.target.value)\"\n            matInput [placeholder]=\"labels?.searchBoxLabel ?? '\u0628\u062D\u062B'\" [(ngModel)]=\"searchChanged\">\n        <button mat-icon-button matPrefix><mat-icon class=\"siren-table-mat-icons\">search</mat-icon></button>\n    </mat-form-field>\n</div>\n\n<div *ngIf=\"count === 0\" style=\"padding-inline-start: 10px;\">{{ labels?.noDataLabel ?? \"\u0644\u0627 \u064A\u0648\u062C\u062F \u0628\u064A\u0627\u0646\u0627\u062A\" }}</div>\n\n<div class=\"siren-table-container mat-elevation-z8\" [ngClass]=\"{'visibility-hidden': count === 0}\">\n    <div class=\"siren-table-data-container\" [ngStyle]=\"{ 'height': (innerHeight * 0.35) + 'px' }\">\n        <table mat-table #table multiTemplateDataRows [dataSource]=\"dataSource\" class=\"siren-table\" matSort [matSortActive]=\"sortColumn\" [matSortDirection]=\"sortDirection\" (matSortChange)=\"updateSortParams($event)\" cdkDropList [cdkDropListData]=\"dataSource\" (cdkDropListDropped)=\"swapRows($event)\">\n            <!-- Checkbox Column to select -->\n            <ng-container *ngIf=\"allowSingleSelection || allowMultiSelection\" matColumnDef={{sirenTableAction.SELECT}}>\n                <th mat-header-cell *matHeaderCellDef class=\"siren-table-checkbox-col siren-action-col\">\n                    <mat-checkbox  #selectAllCheckbox *ngIf=\"allowMultiSelection || partialSelection\" color=\"primary\" (change)=\"$event ? masterToggle($event) : null\"\n                        [checked]=\"isAllSelected\" (click)=\"$event.stopPropagation()\"\n                        [indeterminate]=\"partialSelection && !isAllSelected\" class=\"siren-table-checkbox\">\n                    </mat-checkbox>\n                </th>\n                <td mat-cell *matCellDef=\"let row\" class=\"siren-table-checkbox-col\" [ngStyle]=\"{'border-bottom-width': expandedCols.length > 0 ? 0 : inherit}\">\n                    <mat-checkbox color=\"primary\" (change)=\"$event ? selectRowTable($event, row) : null\"\n                        [checked]=\"row.isSelected || selectAllCheckbox?.checked\" class=\"siren-table-checkbox\">\n                    </mat-checkbox>\n                </td>\n            </ng-container>\n\n            <!-- Position Column -->\n            <ng-container *ngIf=\"allowReordering\" matColumnDef={{sirenTableAction.REORDER}} class=\"siren-action-col\">\n                <th mat-header-cell class=\"montserrat bold siren-action-col\" *matHeaderCellDef></th>\n                <td mat-cell class=\"openSans\" *matCellDef=\"let element\">\n                <mat-icon class=\"siren-table-mat-icons\" cdkDragHandle>reorder</mat-icon>\n                </td>\n            </ng-container>\n\n            <!-- show hide details -->\n            <ng-container *ngIf=\"expandedCols.length > 0\" matColumnDef={{sirenTableAction.EXPAND}} class=\"siren-action-col\">\n                <th mat-header-cell class=\"montserrat bold siren-action-col\" *matHeaderCellDef> </th>\n                <td mat-cell class=\"openSans\" *matCellDef=\"let element\" [ngStyle]=\"{'border-bottom-width': expandedCols.length > 0 ? 0 : inherit}\">\n                    <mat-icon class=\"siren-table-expand-btn siren-table-mat-icons\" (click)=\"expandedElement = expandedElement === element ? null : element\">{{expandedElement === element ? 'expand_less' : 'expand_more'}}</mat-icon>\n                </td>                \n            </ng-container>\n\n            <!-- Delete row action -->\n            <ng-container *ngIf=\"withDelete\" matColumnDef=\"{{ sirenTableAction.DELETE }}\" class=\"siren-action-col\">\n                <th mat-header-cell *matHeaderCellDef class=\"siren-action-col\"></th> \n                <td mat-cell *matCellDef=\"let element\" [ngStyle]=\"{'border-bottom-width': expandedCols.length > 0 ? 0 : inherit}\">\n                    <button mat-mini-fab class=\"siren-table-delete-btn\" (click)=\"deleteBtnClicked(element)\"><mat-icon class=\"siren-table-mat-icons\">delete</mat-icon></button>\n                </td>\n            </ng-container>\n\n            <!-- The base columns -->\n            <ng-container *ngFor=\"let column of baseCols\" matColumnDef={{column.columnDef}}>\n                <!-- default columns -->\n                <div *ngIf=\"!column.customColumn\">\n                    <th mat-header-cell class=\"montserrat bold siren-table-header\" *matHeaderCellDef=\"let element\" mat-sort-header [disabled]=\"!column.allowSorting ?? false\"> {{column.header}} </th> \n                    <td mat-cell class=\"openSans\" *matCellDef=\"let element\" class=\"siren-table-cell\" [ngClass]=\"{'cursor-pointer': onRowClick.observers.length > 0}\" (click)=\"onRowClickClicked(element)\" \n                    [ngStyle]=\"{'border-bottom-width': expandedCols.length > 0 ? 0 : inherit}\">\n                        <span [matTooltip]=\"column.cellValue(element)\" appTooltipIfTruncated *ngIf=\"column.cellValue(element) !== true && column.cellValue(element) !== false\" [ngClass]=\"{'ellipsis-overflow': column.allowEllipsis}\">\n                            {{ column.cellValue(element) || ' '}}\n                        </span>\n                        <mat-icon class=\"siren-table-checked-icon siren-table-mat-icons\" *ngIf=\"column.cellValue(element) === true\">check_circle</mat-icon>\n                        <mat-icon class=\"siren-table-unchecked-icon siren-table-mat-icons\" *ngIf=\"column.cellValue(element) === false\">cancel</mat-icon>\n                    </td>\n                </div>\n                <!-- custom template columns -->\n                <div *ngIf=\"column.customColumn\">\n                    <th mat-header-cell class=\"montserrat bold siren-table-header\" *matHeaderCellDef=\"let element\"> {{ column.header }}</th> \n                    <td mat-cell class=\"siren-table-cell\" *matCellDef=\"let element\" [ngClass]=\"{'cursor-pointer': onRowClick.observers.length > 0}\" [ngStyle]=\"{'border-bottom-width': expandedCols.length > 0 ? 0 : inherit}\">\n                        <ng-container *ngTemplateOutlet=\"customTemplates | customTemplate : column.columnDef; context: {$implicit: element}\"></ng-container>\n                    </td>\n                </div>\n            </ng-container>\n             <!-- expanded columns -->\n            <ng-container matColumnDef=\"sirenExpandedData\">\n                <td mat-cell *matCellDef=\"let element\" [attr.colspan]=\"displayedColumnsWithAction.length+1\">\n                    <div class=\"siren-table-expand-row\" *ngFor=\"let column of expandedCols\"\n                    [@detailExpand]=\"element == expandedElement ? 'expanded' : 'collapsed'\" [style.height]=\"element == expandedElement ? 'unset' : '0 !important'\">\n                        <div *ngIf=\"column.cellValue(element)\">{{ column.header || ''}}</div>\n                        <div *ngIf=\"column.cellValue(element)\">{{ column.cellValue(element) || ''}}</div>\n                    </div>\n                </td>\n            </ng-container>\n\n            <tr mat-header-row *matHeaderRowDef=\"displayedColumnsWithAction; sticky: true\"></tr>\n            <tr mat-row *matRowDef=\"let row; columns: displayedColumnsWithAction\" cdkDrag [cdkDragDisabled]=\"!allowReordering\" [cdkDragData]=\"row\"\n                [ngClass]=\"{ 'selected': (row?.isSelected) || (row?.selectionId == clickedRow && clickedRow != undefined), 'element-row': onRowClick.observers.length > 0 }\">\n            </tr>\n            <div *ngIf=\"expandedCols.length > 0\">\n                <tr mat-row *matRowDef=\"let row; columns: ['sirenExpandedData']\" class=\"detail-row\" [ngClass]=\"{ 'selected': (row.isSelected) || (row.selectionId === clickedRow && clickedRow != undefined)}\"></tr>\n            </div>\n        </table>\n    </div>\n    <div class=\"siren-table-paginator-container\" *ngIf=\"allowPagination\">\n        <mat-paginator [pageSize]=\"size\" [pageIndex]=\"page\" [length]=\"count\" #paginator (page)=\"updatePaginationParams($event)\" [pageSizeOptions]=\"[10, 20, 50, 100, 200, 1000]\" showFirstLastButtons ></mat-paginator>\n        <div *ngIf=\"(allowMultiSelection || allowSingleSelection) && selectedRowCounter > 0\">\n            <span class=\"siren-table-selection-counter\" >{{selectedRowCounter}} {{ labels?.selectionLabel ?? \"\u0628\u064A\u0627\u0646\u0627\u062A \u0645\u062D\u062F\u062F\u0629\" }}</span>\n        </div>\n    </div>\n</div>\n<div class=\"submit-container\" *ngIf=\"( allowSingleSelection || allowMultiSelection ) && count !== 0\" style=\"padding-top: 8px; margin: 10px 15px\">\n    <button mat-raised-button class=\"siren-table-submit-btn\" (click)=\"onSubmitClick.emit(this.dataSource.getSelectedRows())\">{{ labels?.doneBtnLabel ?? \"\u0627\u0646\u062A\u0647\u0627\u0621\" }}</button>\n</div>\n", styles: ["table{width:100%}tr.detail-row{height:0}.siren-table-selection-counter{color:#777;font-size:13px}.siren-table-data-container{overflow:auto}.mat-row.selected{background:rgba(195,41,67,.1019607843)}.siren-table-container{padding:0;margin:10px 15px;background-color:#fff}.submit-container{padding-top:8px;margin:10px 15px;flex-direction:row;box-sizing:border-box;display:flex;place-content:center flex-end;align-items:center}tr.mat-header-row{background-color:#fff}.element-row:not(.selected):hover{background:#ececec}.cursor-pointer{cursor:pointer}.siren-table-expand-row{overflow:hidden;display:flex;flex-direction:row;align-items:center;justify-content:space-around}.siren-table-expand-row div{padding-bottom:5px}.siren-table-expand-btn{color:#5cc4cc;cursor:pointer}.siren-table-unchecked-icon{color:#c32943}.siren-table-checked-icon{color:#64ce16}.visibility-hidden{visibility:hidden}.siren-table{box-shadow:none}.siren-table .mat-header-cell{color:#535353;font-weight:700;font-size:13px;font-family:inherit;padding-inline-end:8px;padding-inline-start:8px}.siren-table .mat-cell{color:#777;font-weight:400;font-size:13px;font-family:inherit;padding-inline-end:8px;padding-inline-start:8px}.siren-table .mat-cell span{white-space:nowrap}.siren-table .mat-cell mat-icon{vertical-align:middle}.siren-table .siren-table-checkbox-col{padding-top:8px}.siren-table .siren-table-checkbox-col .siren-table-checkbox{margin:10px}.ellipsis-overflow{overflow-y:hidden!important;display:-webkit-box!important;text-overflow:ellipsis!important;-webkit-line-clamp:3!important;-webkit-box-orient:vertical!important;white-space:pre-wrap!important}.siren-table-submit-btn{padding:10px 30px;height:30px;border-radius:15px;color:#fff;line-height:1px;font-family:inherit;font-size:12px;border:none;background-color:#5cc4cc;width:-moz-fit-content;width:fit-content}.mat-paginator{display:inline-flex}::ng-deep .mat-paginator-range-label{font-size:12px;font-family:inherit;color:#777}::ng-deep .mat-paginator-page-size-label{font-size:12px;font-family:inherit;color:#777}::ng-deep .mat-select-value-text{font-size:12px;font-family:inherit;color:#777}.siren-table-paginator-container{display:flex;flex-direction:row;align-items:center}.siren-table-search-container{margin-inline-start:10px}.siren-table-search-container ::ng-deep .mat-form-field-flex{height:40px}.siren-table-search-container ::ng-deep .mat-form-field-underline{display:none}.siren-table-search-container ::ng-deep button{position:relative;bottom:8px}.siren-table-search-container ::ng-deep input{position:relative;bottom:14px}.siren-table-delete-btn{background-color:#c329431a}.siren-table-delete-btn mat-icon{color:#c32943;font-size:22px}.siren-action-col{width:10px}@media screen and (max-width: 599px){.full-width-mobile{width:100%}.siren-table-data-container{overflow-x:visible}::ng-deep .table-view{margin:5px}.siren-table-search-container{margin-inline-start:0px}.siren-table-search-field button{bottom:15px}.siren-table-search-field input{bottom:13px}.siren-table-search-field .mat-form-field-flex{padding:4px}.siren-table-container{margin:10px 5px}::ng-deep .mat-paginator-outer-container .mat-paginator-range-label{margin:0}}\n"] }]
        }], propDecorators: { paginator: [{
                type: ViewChild,
                args: [MatPaginator, { static: false }]
            }], sort: [{
                type: ViewChild,
                args: [MatSort, { static: false }]
            }], table: [{
                type: ViewChild,
                args: ['table']
            }], onSubmitClick: [{
                type: Output
            }], onRowClick: [{
                type: Output
            }], onDeleteClick: [{
                type: Output
            }], onReorder: [{
                type: Output
            }], displayedColumns: [{
                type: Input
            }], dataSource: [{
                type: Input
            }], allowFiltering: [{
                type: Input
            }], allowMultiSelection: [{
                type: Input
            }], allowSingleSelection: [{
                type: Input
            }], allowReordering: [{
                type: Input
            }], withDelete: [{
                type: Input
            }], allowPagination: [{
                type: Input
            }], labels: [{
                type: Input
            }], customTemplates: [{
                type: ContentChildren,
                args: [CustomColsDirective]
            }], onResize: [{
                type: HostListener,
                args: ['window:resize', ['$event']]
            }] } });

class SirenTableModule {
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

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

class SirenBeDataSource extends SirenDataSource {
    constructor(service) {
        super();
        this.service = service;
        this.dataSubject = new BehaviorSubject([]);
        this.count = 0;
    }
    connect() {
        return this.dataSubject.asObservable();
    }
    disconnect() {
        this.dataSubject.complete();
    }
    getSize() {
        return this.params?.size ?? DefaultFilterValue.DEFAULT_PAGE_SIZE;
    }
    getPage() {
        return this.params?.page ?? DefaultFilterValue.DEFAULT_PAGE;
    }
    getKeyword() {
        return this.params?.keyword ?? DefaultFilterValue.DEFAULT_KEYWORD;
    }
    getSortColumn() {
        return this.params?.sortColumn ?? DefaultFilterValue.DEFAULT_SORT_COLUMN;
    }
    getSortDirection() {
        return this.params?.sortDirection ?? DefaultFilterValue.DEFAULT_SORT_DIRECTION;
    }
    getCount() {
        return this.count;
    }
    isAllRowsSelected() {
        return this.data?.find(row => row.isSelected === false || row.isSelected === undefined) === undefined;
    }
    /**
     * Loads the data fetched from the backend into Siren data table.
     * It is invoked on each pagination and sorting change event.
     * @param params an object that can be a filter's field to fetch data based on speicific condition, usually it represents the request header
     * @param showLoader useful while using spinner interceptor to show/hide the spinner.
     */
    loadData(params, showLoader = true) {
        this.params = params;
        this.fetchData(this.params, showLoader);
    }
    fetchData(params, showLoader = true) {
        this.service.fetchData(params, showLoader)
            .subscribe(data => {
            const response = this.service.handleData(data?.body);
            this.setCountAndData(response);
            this.sendDataToTable();
        }, () => {
            this.resetData();
            return of();
        });
    }
    /**
     * Loads last data in the table's.
     */
    resetData() {
        this.dataSubject.next(deepClone(this.data));
    }
    filter(keywords) {
        this.params.keyword = keywords;
        this.params.page = DefaultFilterValue.DEFAULT_PAGE;
        this.service.filterDataTable(this.params, this.data).subscribe(data => {
            const response = this.service.handleData(data?.body);
            this.setCountAndData(response);
            this.sendDataToTable();
        }, () => {
            this.resetData();
            return of();
        });
    }
    setCountAndData(response) {
        this.count = response.count;
        this.data = response.list;
        this.checkSelectedRows();
    }
    sendDataToTable() {
        this.dataSubject.next(this.data);
    }
    selectAllRows() {
        this.data.forEach(row => {
            this.selectRow(row);
        });
    }
    deselectAllRows(onlyPaginated = true) {
        this.data.forEach(row => this.deselectRow(row));
        if (!onlyPaginated) {
            this.selectedRows.clear();
        }
    }
    /**
     * Sets current page, size and invoke fetchData accordingly
     * @param data a model that contain current page, size
     */
    updatePaginationParams(data) {
        this.params.page = data.page;
        this.params.size = data.size;
        this.fetchData(this.params);
    }
    /**
     * Sets sortColumn and sortDirection and invoke fetchData accordingly
     * @param data a model that contain sortColumn and sortDirection
     */
    updateSortParams(data) {
        this.params.sortColumn = data.sortColumn;
        this.params.sortDirection = data.sortDirection;
        this.fetchData(this.params);
    }
}

/**
 * Generated bundle index. Do not edit.
 */

export { CustomColsDirective, CustomTemplatePipe, SirenBeDataSource, SirenDataSource, SirenFeDataSource, SirenTableComponent, SirenTableModule };
//# sourceMappingURL=siren-table-src-lib-table.mjs.map
