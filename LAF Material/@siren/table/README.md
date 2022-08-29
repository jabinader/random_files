# Siren Table

SirenTableComponent is an abstraction of MatTable from the @angular/material dependency. It allows you to quickly and in a typesafe way define tables. This is perfect if you want to display data in a table and do not need full control over the table HTML.

Instead of copy/pasting the HTML for each column, you can describe the columns in a declarative way. It also allows you to delete, select, reorder rows, define custom columns and expandable rows.

Another feature is supporting client and server side pagination and sorting.

## Table of contents
- [Prerequesites](#prerequesites)
- [Installation](#installation)
- [Demo](#demo)
- [Quick Start](#quick-Start)
- [Components](#components)
    + [SirenTableComponent](#sirenTableComponent)
- [Interfaces](#interfaces)
    + [SirenTableConfig](#sirenTableConfig)
    + [SirenTableFilterModel](#sirenTableFilterModel)
    + [SirenTableColumns&lt;T&gt;](#sirenTableColumns&lt;T&gt;)
    + [SirenTableData](#sirenTableData)
    + [SirenTableService&lt;T&gt;](#sirenTableService&lt;T&gt;)
- [Classes](#classes)
    + [SirenDataSource](#sirenDataSource)
    + [SirenFeDataSource](#sirenFeDataSource)
    + [SirenBeDataSource](#sirenBeDataSource)
- [Usage](#usage)
    + [Client Side Data Source](#client-side-data-source)
        + [Local Pagination](#local-pagination)
        + [Local Sorting](#local-sorting)
        + [Local Filtering](#local-filtering)
    + [Server Side Data Source](#server-side-data-source)
        + [SirenDataService<T>](#sirendataservice<T>)
        + [Backend Filtering](#backend-filtering)
        + [Backend Sorting](#backend-sorting)
    + [Common Features](#common-features)
      + [Selection](#selection)
      + [Delete](#delete)
      + [Custom Template](#custom-template)
      + [Ellipsis](#ellipsis)
      + [Expanded Row](#expanded-row)
      + [Reordering](#reordering)
- [Contributing](#contributing)
- [Authors](#authors)

## Prerequesites
- Credentials to access http://10.10.30.3:4873/ registry.( [Wireguard](https://www.wireguard.com/install/) VPN is needed)
- Angular Material installed.

## Installation

Add Siren Data Table to your project by running

```
npm install @siren/table --registry http://10.10.30.3:4873/
```

Then import SirenTableModule into your AppModule

```
import { NgModule } from '@angular/core';
import { SirenTableModule } from '@siren/table';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    AppRoutingModule,
    SirenTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

Finally, import styles in the styles.sass of your project.

```
@import '@siren/table/src/styles'
```

## Demo

A demo application is available in the [github repository](https://github.com/sirenanalytics/siren_data_table). Please clone the project then run it using `ng serve`.

## Quick Start

After having installed the library, lets go through the steps of defining a very basic table.

### SirenTableData
Lets say you have a table showing a list of persons PersonModel[], PersonModel should extend SirenTableData to be loaded in siren-table:

```
import { SirenTableData } from "@siren/table";

interface Person extends SirenTableData {
  firstName: string;
  lastName: string;
  address: string;
}
```

> Ignore SirenTableData's properties for the moment, we will discuss them in the upcoming sections. 

### SirenTableColumns

The table's columns can be defined in your component as follows:

```
columns: SirenTableColumns<Person>[] = [
    { columnDef: 'firstName', header: 'First Name', cellValue: (person: Person) => person.firstName },
    { columnDef: 'lastName', header: 'Last Name', cellValue: (person: Person) => person.lastName },
    { columnDef: 'address', header: 'Address', cellValue: (person: Person) => person.address }
];
```

> Please note that columnDef should be unique for each column.


### SirenFeDataSource

SirenFeDataSource is used for client-side pagination, filtering and sorting. It is initialize as follows:

```
persons: Person[] = [
  { firstName: 'Anas', lastName: 'El Daou', address: 'Barja' },
  { firstName: 'Jad', lastName: 'Abi Nader', address: 'Aley' },
  { firstName: 'Youssef', lastName: 'Bandak', address: 'Zgharta' },
  { firstName: 'Jad', lastName: 'Al Arab', address: 'baalbak' },
  { firstName: 'Mike', lastName: 'Mouanness', address: 'Aley' },
  { firstName: 'Hicham', lastName: 'Zreik', address: 'bnt Jbeil' },
  { firstName: 'Steve', lastName: 'El Khoury', address: 'Jounie' },
  { firstName: 'Elie', lastName: 'Salemeh', address: 'Jounie' },
  { firstName: 'Fady', lastName: 'Chebly', address: 'Aley' },
  { firstName: 'Mazen', lastName: 'Lahham', address: 'achrafieh' },
  { firstName: 'Mohamad', lastName: 'Mokalled', address: 'dahye' },
  { firstName: 'Rola', lastName: 'Wehbi', address: 'dahye' },
  { firstName: 'Souheir', lastName: 'Khatib', address: 'dahye' }];

personsFeDataSource: SirenFeDataSource = new SirenFeDataSource(this.persons);
```

### SirenTable

After you defined your table columns, model and datasource, you can bind them to the html element using:

```
<siren-table [dataSource]="personsFeDataSource" [displayedColumns]="columns"></siren-table>
```

Thats it!! You should be able to see the table now.

## Components
### SirenTableComponent
Data table component has Angular Material theme.

Selector: `siren-table`
#### Properties
Name                                                                                                         | Description                                                                   |
------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------- |
@Input() dataSource: SirenDataSource                                                                         | An instance of SirenFeDataSource or SirenBeDataSource that provides data to the table.                                                                                                                                                                                   |
@Input() displayedColumns: SirenTableColumns<any>[]                                                          | An array that defines columns of the table.                                   |
@Input() allowPagination: boolean                                                                            | `false` by default. It displays a paginator below the table.                  |
@Input() allowSorting: boolean                                                                               | `false` by default. It displays a search box input above the table.           |
@Input() allowSingleSelection: boolean                                                                       | `false` by default. It allows the user to select a single row and it displays a submit button to get the selected row. You should set a unique key for each row by setting a value for `selectionId` field extended from `SirenTableData` to make selection work correctly.                                                                                                                                                                                   |
@Input() allowMultiSelection: boolean                                                                        | `false` by default. It allows the user to select multiple rows and it displays a submit button to get the selected rows. You should set a unique key for each row by setting a value for `selectionId` field extended from `SirenTableData` to make selection work correctly.                                                                                                                                                                                   |
@Input() allowReordering: boolean                                                                            | `false` by default. It allows the user to reorder the rows.                   |
@Input() withDelete: boolean                                                                                 | `false` by default. It adds a delete column at the end. It's doesn't make any change in table's data on clicking the button. `onDeleteClick` output should be implemented to update data.                                                                                  |
@Input() labels: SirenTableConfig                                                                            | It allows the user to change default placeholders of submit button, search box input, selected items count and no data label.                                                                                                                                               |
@Output() onSubmitClick: EventEmitter<SirenTableData[]>                                                      | Emits on submit button click if `allowSingleSelelction` or `allowMultiSelection` is `true`                                                                                                                                                              |
@Output() onRowClick: EventEmitter<SirenTableData>                                                           | Emits on row click.                                                           |
@Output() onDeleteClick: EventEmitter<{ row: SirenTableData, index: number}>                                 | Emits on delete button click if `withDelete` is `true`.                       |
@Output() onReorder: EventEmitter<{ event:  CdkDragDrop<SirenTableColumns<any>[]>, data: SirenTableData[] }> | Emits on data's order change when `allowReordering` is `true`.                |

#### Methods
Name                                                                           | Description                                                                    |
------------------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
updateSortParams(changes: { active: string, direction: SortDirection }): void  | Sets the active sorting column and direction.                                  | 
updatePaginationParams(changes: {pageSize: number, pageIndex: number}): void   | sets the page and size of the paginatior when `allowPagination` is `true`.     |
masterToggle(event: MatCheckboxChange ): void                                  | Selects all the rows if at least one is not selected; otherwise deselects all. |
selectRowTable(event: MatCheckboxChange, row: SirenTableData): void            | Selects a row.                                                                 |
quickSearchChanged(keyword: string): void                                      | Filters data based on a given keyword when `allowFitlering` is `true`.         |
deleteBtnClicked(row: SirenTableData): void                                    | Emits the row to be deleted and its index through `onDeleteClick` output.      |
onRowClickClicked(row: SirenTableData): void                                   | Emits clicked row through `onRowClick` output.                                 |
swapRows(event: CdkDragDrop&lt;SirenTableColumns&lt;any&gt;[]&gt;): void       | Swaps the table's rows.                                                        |

## Interfaces
### SirenTableConfig
Used to change default placeholder of some table elements.
#### Properties
Name                    | Description                                                                                  |
----------------------- | -------------------------------------------------------------------------------------------- |
selectionLabel?: string | Placeholder of selected rows counter when rows are selected.                                 |
noDataLabel?: string    | Placeholder of no data found.                                                                |
searchBoxLabel?: string | Placeholder of search box input when `allowFiltering` is `true`.                             | 
doneBtnLabel?: string   | Placeholder of submit button when `allowSingleSelection` or `allowMultiSelection` is `true`. |

### SirenTableFilterModel
Used to set initial value to the matPaginator and matSort.
#### Properties
Name                          | Description                                                                                                         |
----------------------------- | ------------------------------------------------------------------------------------------------------------------- |
page?: string                 | Paginator's pageIndex when `allowPagination` is `true`.                                                             |
size?: string                 | Paginator's pageSize when `allowPagination` is `true`.                                                              |
sortColumn?: string           | Active sort column when `allowSorting` is `true`. It should equal to columnDef of the column you desire to sort by. | 
sortDirection?: SortDirection | Direction sort column when `allowSorting` is `true`.                                                                |

### SirenTableColumns&lt;T&gt;
Used to sepcify columns properties. T represents the model of the data you need to display.
#### Properties
Name                            | Description                                                                     |
------------------------------- | ------------------------------------------------------------------------------- |
columnDef: string               | Defines a set of cells for a table column. It should be unique for each column. |
header?: string                 | Defines a header for a table column.                                            |
cellValue?: (element: T) => any | Data to be displayed in the cell.                                               | 
customColumn?: boolean          | Sets a custom template for a table column.                                      |
expandedData?: boolean          | Displays the data of the column in an expandable row.                           |
allowSorting?: boolean          | Enables sorting on the column.                                                  | 
allowEllipsis?: boolean         | Displays cell's text in a maximium of 3 lines with ellipsis at the end.         |
### SirenTableData

Should be extended by data the table model.

#### Properties
Name                           | Description                                                                                                                   |
------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
isSelected: boolean            | Marks the row as selected if `true`.                                                                                          |
selectionId?: number or number | Like primary key for the row when `allowMultiSelection`, `allowSingleSelection`, `allowReordering` or `withDelete` is `true`. |

### SirenTableService&lt;T&gt;

Declares methods responsible to fetch, handle and filter data.T represents response model.
#### Methods
Name                                                                                                                  | Description                                                     |
--------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
fetchData: (param?: SirenTableFilterModel, showLoader?: boolean) => Observable&lt;HttpResponse&lt;T&gt;&gt;           | Fetchs data from the backend.                                   |
handleData?: (data: T) => SirenTableSource&lt;SirenTableData&gt;                                                      | Loads the data fetched from the backend into the table.         |
filterDataTable?: (param?: SirenTableFilterModel, data?: SirenTableData[]) => Observable&lt;HttpResponse&lt;T&gt;&gt; | Fetchs filtered data from the backend based on param's keyword. |

## Classes
### SirenDataSource
Abstract class responsible to manage the data of the table.
#### Methods
Name                                                        | Description                                                                                           |
----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
connect(): Observable&lt;SirenTableData[]&gt;               | Returns an observable that emits current loaded data                                                  |
disconnect(): void                                          | Stops receiving data.                                                                                 |
getData(): SirenTableData[]                                 | Retruns the array of data table.                                                                      |
getCount(): number                                          | Returns the length of data array.                                                                     |
getIndexOf(row: SirenTableData): number                     | Returns the index of the row based on `selectionId` regardless pagination.                            |
selectRow(row: SirenTableData): void                        | Selects a row based on `selectionId`.                                                                 |
deselectRow(row: SirenTableData): void                      | Deselects a row based on `selectionId`.                                                               |
selectAllRows(): void                                       | Selects all rows.                                                                                     |
deselectAllRows(onlyPaginated?: boolean): void              | Deselects all rows.                                                                                   |
getSelectionCounter(): number                               | Returns the number of selected rows.                                                                  |
getSelectedRows(): SirenTableData[]                         | Returns the selected rows.                                                                            |
isAllRowsSelected(): boolean                                | Returns `true` if all rows of the current page is selected.                                           |
updatePaginationParams(data: SirenTableFilterModel): void   | Sets `sortColumn` and `sortDirection` of the paginator. It doesn't trigger ui change.                 |
getSize(): number                                           | Returns the current paginator size when `allowPagination` is `true `.                                 |
getPage(): number                                           | Returns the current paginator page when `allowPagination` is `true `.                                 |
updateSortParams(data: SirenTableFilterModel): void         | Sets `page` and `size` of the paginator. It doesn't trigger ui change.                                |
getSortColumn(): string                                     | Returns current active sorting column when `allowSorting` of `SirenTableColumns` is `true `.          |
getSortDirection(): SortDirection                           | Returns the current direction of sorted column when `allowSorting` of `SirenTableColumns` is `true `. |
filter(keywords: string): void                              | Filters data based on given keyword when `allowFiltering` is `true `                                  |
getKeyword(): string                                        | Returns the current value of search box input when `allowFiltering` is `true `.                       |
swapRows(previousIndex: number, currentIndex: number): void | Swaps items in data array.                                                                            |

### SirenFeDataSource
SirenFeDataSource extends SirenDataSource
#### Methods
Name                                                                   | Description                                                                                                    |
---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
loadData(data: SirenTableData[], config?: SirenTableFilterModel): void | Loads an array of SirenTableData in the table. `config` sets initial parameters when pagination or sorting are enabled.                                                                                                                                                                                |
setSort(sort: MatSort): void                                           | Sets MatSort for local sorting.                                                                                |
setPaginator(paginator: MatPaginator)                                  | Sets MatPaginator for local pagination.                                                                        |
getPaginatedData(): SirenTableData[]                                   | Returns data array of the current page when `allowPagination` is                                               |
getFilteredData(): SirenTableData[] | Returns a filtered data array when `allowFiltering` is `true`.                                                                                    |

### SirenBeDataSource
#### Methods
SirenBeDataSource extends SirenDataSource
Name                                                              | Description                                                             |
----------------------------------------------------------------- | ----------------------------------------------------------------------- |
loadData(params?: SirenTableFilterModel, showLoader = true): void | Loads data in the table based on SirenTableService's fetchData response.|
## Usage

### Client Side Data Source

SirenFeDataSource is used for client side pagination, filtering and sorting.

#### Local Pagination

`allowPagination` is an optional input of SirenTableComponent that displays a paginator.

```
<siren-table [dataSource]="personsFeDataSource" [displayedColumns]="columns" [allowPagination]="true"></siren-table>
```

Default page and size of the paginator are `0` and `20` respectively. To set page `1` and size `10` explicitly:

```
const defaultParams: SirenTableFilterModel = { page: 1, size: 10 };
dataSource.loadData(this.personsData, defaultParams);
```

#### Local Sorting

`allowSorting` is an optional field of SirenTableColumns that enables sorting of the specified column.For example, to enable sorting on First Name and Last name only:
```
columns: SirenTableColumns<Person>[] = [
    { columnDef: 'firstName', header: 'First Name', cellValue: (person: Person) => person.firstName, allowSorting: true },
    { columnDef: 'lastName', header: 'Last Name', cellValue: (person: Person) => person.lastName, allowSorting: true },
    { columnDef: 'address', header: 'Address', cellValue: (person: Person) => person.address }
];
dataSource.loadData(this.personsData);
```
Sorted column and direction are not selected by default. To sort data by firstName by default:
```
const defaultParams: SirenTableFilterModel = { sortColumn: 'firstName', sortDirection: 'asc' }; // sortColumn's value should match a columnDef that exists in columns
dataSource.loadData(this.personsData, defaultParams);
```
> Please note that columnDef and Person's key should be identical to make sorting work properly. Also that the sortColumn value in SirenTableFilterModel should equal to columnDef of the column you desire to sort by.

#### Local Filtering

`allowFiltering` is an optional input of SirenTableComponent that displays a search box input above the table to filter data.

```
<siren-table [dataSource]="this.personsFeDataSource" [displayedColumns]="columns" [allowFiltering]="true"></siren-table>
```

The default value of the search box is an empty string. To set a default value for the search box: 
```
const defaultParams: SirenTableFilterModel = { keyword: 'Anas'};
dataSource.loadData(this.personsData, defaultParams);
```

### Server Side Data Source

SirenBeDataSource is used for server side pagination, filtering and sorting. It uses `SirenDataService`.

#### SirenDataService<T>
A generic interface where T represents the API call's response. It declares methods responsible to fetch, handle and filter data.

Let's say a class named PersonsDataService implements SirenTableService.
```
interface PersonBackendModel{
  firstName: string;
  LN: string;
  address: string;
}
interface ResponseModel<T> {
  list: T[];
  count: number
}
class PersonsDataService implements SirenTableService<ResponseModel<PersonBackendModel>> {
  fetchData: (param?: SirenTableFilterModel, showLoader?: boolean) => Observable<HttpResponse<ResponseModel<PersonBackendModel>>>;
  handleData: (data: ResponseModel<PersonBackendModel>) => SirenTableSource<Person>;
  filterDataTable?: (param?: SirenTableFilterModel, data?: Person[]) => Observable<HttpResponse<ResponseModel<PersonBackendModel>>>;
}
```

- **fetchData**: Mostly used to call a REST API to fetch data from the backend.
- **handleData**: Useful when backend's response doesn't match the table model. It receives the body of fetchData's HttpResponse as parameter.
- **filterDataTable**: `optional` method. Should be implemented when `allowFiltering` is true.

Let's implements `fetchData` and `handleData`.
```
class PersonsDataService implements SirenTableService<ResponseModel<PersonBackendModel>> {
  persons: PersonBackendModel[] = [
    { firstName: 'Anas', LN: 'El Daou', address: 'Barja' },
    { firstName: 'Jad', LN: 'Abi Nader', address: 'Aley' },
    { firstName: 'Youssef', LN: 'Bandak', address: 'Zgharta' },
    { firstName: 'Jad', LN: 'Al Arab', address: 'baalbak' },
    { firstName: 'Mike', LN: 'Mouanness', address: 'Aley' },
    { firstName: 'Hicham', LN: 'Zreik', address: 'bnt Jbeil' },
    { firstName: 'Steve', LN: 'El Khoury', address: 'Jounie' },
    { firstName: 'Elie', LN: 'Salemeh', address: 'Jounie' },
    { firstName: 'Fady', LN: 'Chebly', address: 'Aley' },
    { firstName: 'Mazen', LN: 'Lahham', address: 'achrafieh' },
    { firstName: 'Mohamad', LN: 'Mokalled', address: 'dahye' },
    { firstName: 'Rola', LN: 'Wehbi', address: 'dahye' },
    { firstName: 'Souheir', LN: 'Khatib', address: 'dahye' }
  ];

  fetchData(param?: SirenTableFilterModel, showLoader?: boolean): Observable<HttpResponse<ResponseModel<PersonBackendModel>>>{
    const filteredPersons =  param.keyword ? this.persons.filter(person => person.firstName.includes(param.keyword)) : this.persons;
    return of(new HttpResponse({
      body: { list: this.getPaginatedData(param.page, param.size, param.sortColumn,param.sortDirection, filteredPersons),
      count: filteredthis.persons.length}
    }));
  }

  private getPaginatedData(page: number, size: number, sortColumn: string, sortDirection: string, array: PersonBackendModel[]): any {
    const response = deepClone(array);
    if (sortColumn && sortDirection) {
      response.sort((a, b) => {
        if(a[sortColumn] < b[sortColumn]) { return sortDirection === 'asc' ? -1 : 1; }
        if(a[sortColumn] > b[sortColumn]) { return sortDirection === 'asc' ? 1 : -1; }
        return 0;});
    }
    return response.slice(size*page, size*page + size);
  }

  handleData(data: ResponseModel<PersonBackendModel>): SirenTableSource<Person> {
    return {
      count: data.count,
      list: data.list.map(person => {
        return {
        firstName: person.firstName,
        lastName: person.LN,
        address: person.address};
      })};
  }
}
```

Now PersonsDataService is ready to fetch data. You can initialize SirenBeDataSource in your component:

> Please note that default page and size are 0 and 20 respectively.

```
const params: SirenFilterModel = { page:0, size:10};
this.personsBeDataSource = new SirenBeDataSource(new this.personsDataService());
this.personsBeDataSource.loadData(params);
```

Then bind it with the html element:

```
<siren-table [dataSource]="personsBeDataSource" [displayedColumns]="columns" [allowPagination]="true"></siren-table>
```
The first 10 persons should be loaded in the table and the total count `13` will be displayed in the paginator. 
#### Backend Filtering
Sets `allowFiltering` to `true` in the template
```
<siren-table [dataSource]="personsBeDataSource" [displayedColumns]="columns" [allowPagination]="true" [allowFiltering]="true"></siren-table>
```

Then implements `filterDataTable` of the service
```
filterDataTable(param?: SirenTableFilterModel, data?: SirenTableData[]): Observable<HttpResponse<ResponseModel<PersonBackendModel>>>{
  const filteredPersons =  persons.filter( person => person.firstName.includes(param.keyword));
  return of(new HttpResponse(
    { body: { list: this.getPaginatedData(param.page, param.size, param.sortColumn,param.sortDirection, filteredPersons) , count: filteredPersons.length }}));
}
```
Sets `Anas` as default value for search box input:
```
const params: SirenFilterModel = { keyword: 'Anas' }; 
this.personsBeDataSource.loadData(params);
```
#### Backend Sorting
Sets `allowSorting` to `true` for the column we need to sort by.
```
columns: SirenTableColumns<Person>[] = [
    { columnDef: 'firstName', header: 'First Name', cellValue: (person: Person) => person.firstName, allowSorting: true },
    { columnDef: 'lastName', header: 'Last Name', cellValue: (person: Person) => person.lastName, allowSorting: true },
    { columnDef: 'address', header: 'Address', cellValue: (person: Person) => person.address }
];
```
To sort data by First Name as default sorting:
```
const params: SirenFilterModel = { sortColumn: 'firstName', sortDirection: 'asc' };
this.personsBeDataSource.loadData(params);
```

### Common Features
Those features are common in both SirenBeDataSource and SirenFeDataSource. Let's continue with SirenFeDataSource in the following example for simplicity.
#### Selection
`allowSingleSelection` or `allowMultiSelection` are optional inputs to enable selection feature. onSubmitClick` is an output that emits an array of the selected rows.
```
<siren-table [dataSource]="personsFeDataSource" [displayedColumns]="columns" [allowSingleSelection]="true" (onSubmitClick)="print($event)"</siren-table> // $event is an array of selected rows
```
Or
```
<siren-table [dataSource]="personsFeDataSource" [displayedColumns]="columns" [allowMultiSelection]="true" (onSubmitClick)="print($event)"></siren-table> // $event is an array of selected rows
```
> You should set a unique key for each row by setting a value for `selectionId` field extended from `SirenTableData` to make selection work correctly.
#### Delete
`withDelete` is an optional that displays a delete column at the end of the table. `onDeleteClick` is an output that emits deleted row.
```
<siren-table [dataSource]="personsFeDataSource" [displayedColumns]="columns" [withDelete]="true" (onDeleteClick)="delete($event)"></siren-table> // $event is an array of selected rows
```
> Please note that clicking on delete button doesn't delete the row automatically. The developer should implement a delete function and re-update the data using loadData function and set a unique key for each row by setting a value for `selectionId` field extended from `SirenTableData` to make selection work correctly.

#### Custom Template
`appCustomCols` is a structural directive that injects a template in a specified column.

Let's add a column that contains a checkbox. To do this, we need to add a column to the columns array having customTemplate field as true.
```
interface Person extends SirenTableData{
  firstName: string;
  lastName: string;
  address: string;
  under18: boolean
}
columns: SirenTableColumns<Person>[] = [
    { columnDef: 'firstName', header: 'First Name', cellValue: (person: Person) => person.firstName, allowSorting: true },
    { columnDef: 'lastName', header: 'Last Name', cellValue: (person: Person) => person.lastName, allowSorting: true },
    { columnDef: 'address', header: 'Address', cellValue: (person: Person) => person.address },
    { columnDef: 'under18', header: 'under18', cellValue: (person: Person) => person.under18, customTemplate: true }
];
```
In the template
```
<siren-table [dataSource]="personsFeDataSource" [displayedColumns]="columns">
  <mat-checkbox *appCustomCols="let person; columnDef: 'under18'" [checked]="person?.under18"></mat-checkbox>
</siren-table>
```
#### Expanded Row
`expandedData` is an optional field of SirenTableData that makes the rows expandable to show more details. Lets adds BOD and phone number as expanded data.
```
interface Person extends SirenTableData{
  firstName: string;
  lastName: string;
  address: string;
  under18: boolean;
  BOD: string;
  description: string;
}
columns: SirenTableColumns<Person>[] = [
    { columnDef: 'firstName', header: 'First Name', cellValue: (person: Person) => person.firstName },
    { columnDef: 'lastName', header: 'Last Name', cellValue: (person: Person) => person.lastName },
    { columnDef: 'address', header: 'Address', cellValue: (person: Person) => person.address },
    { columnDef: 'under18', header: 'under18', cellValue: (person: Person) => person.under18, customTemplate: true },
    { columnDef: 'BOD', header: 'BOD', cellValue: (person: Person) => person.BOD, expandedData: true },
    { columnDef: 'description', header: 'description', cellValue: (person: Person) => person.description, expandedData: true }
];
persons: Person[] = [
  { firstName: 'Anas', lastName: 'El Daou', address: 'Barja', BOD: '1/1/1998', description: 'xxxxxx'},
  { firstName: 'Jad', lastName: 'Abi Nader', address: 'Aley', BOD: '1/1/1998', description: 'xxxxxx' },
  { firstName: 'Youssef', lastName: 'Bandak', address: 'Zgharta', BOD: '1/1/1998', description: 'xxxxxx' },
  { firstName: 'Jad', lastName: 'Al Arab', address: 'baalbak', BOD: '1/1/1998', description: 'xxxxxx' },
  { firstName: 'Mike', lastName: 'Mouanness', address: 'Aley', BOD: '1/1/1998', description: 'xxxxxx' },
  { firstName: 'Hicham', lastName: 'Zreik', address: 'bnt Jbeil', BOD: '1/1/1998', description: 'xxxxxx' },
  { firstName: 'Steve', lastName: 'El Khoury', address: 'Jounie', BOD: '1/1/1998', description: 'xxxxxx' },
  { firstName: 'Elie', lastName: 'Salemeh', address: 'Jounie', BOD: '1/1/1998', description: 'xxxxxx' },
  { firstName: 'Fady', lastName: 'Chebly', address: 'Aley', BOD: '1/1/1998', description: 'xxxxxx' },
  { firstName: 'Mazen', lastName: 'Lahham', address: 'achrafieh', BOD: '1/1/1998', description: 'xxxxxx' },
  { firstName: 'Mohamad', lastName: 'Mokalled', address: 'dahye', BOD: '1/1/1998', description: 'xxxxxx7' },
  { firstName: 'Rola', lastName: 'Wehbi', address: 'dahye', BOD: '1/1/1998', description: 'xxxxxx' },
  { firstName: 'Souheir', lastName: 'Khatib', address: 'dahye', BOD: '1/1/1998', description: 'xxxxxx' }];
```
#### Ellipsis
By default, the table's cell doesn't wrap text.To avoid horizontal scrolling, `allowEllipsis` gives a cell a maximium of 3 lines with ellipsis.
```
columns: SirenTableColumns<Person>[] = [
    { columnDef: 'firstName', header: 'First Name', cellValue: (person: Person) => person.firstName },
    { columnDef: 'lastName', header: 'Last Name', cellValue: (person: Person) => person.lastName },
    { columnDef: 'address', header: 'Address', cellValue: (person: Person) => person.address },
    { columnDef: 'under18', header: 'under18', cellValue: (person: Person) => person.under18 },
    { columnDef: 'BOD', header: 'BOD', cellValue: (person: Person) => person.BOD },
    { columnDef: 'description', header: 'description', cellValue: (person: Person) => person.description, allowEllipsis: true }
];
```

#### Reordering
`allowReordering` is an optional input of SirenTableComponent that displays a column to reorder the table's data.`onReorder` is an output that emits when rows are reordered.
```
<siren-table [dataSource]="personsFeDataSource" [displayedColumns]="columns" [allowReordering]="true" (onReorder)="printNewData($event)"></siren-table>
```

> Please note that Reordering is not supported when Sorting is enabled.`selectionId` should be setted when `allowPagination` is true.

## Contributing
The Sourcecode is in a private github repository. Iff you have any nice ideas for improvements, new features, bugfixes, unittests, ... or any questions, feel free to contact the [authors](#authors). You can find their email address in the authors section.

## Authors
Jad Abi Nader (jad.abinader@sirenanalytics.com)
Anas El Daou (anas@sirenanalytics.com)