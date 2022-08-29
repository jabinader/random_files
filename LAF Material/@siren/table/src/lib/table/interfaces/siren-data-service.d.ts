import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SirenTableSource, SirenTableData } from './data-table.model';
import { SirenTableFilterModel } from './siren-table-filter.model';
export interface SirenTableService<T> {
    /**
     * This function is called from SirenBeDataSource . It should call a REST API to get data
     * @returns observable that contain response body
     */
    fetchData: (param?: SirenTableFilterModel, showLoader?: boolean) => Observable<HttpResponse<T>>;
    /**
     * These function is called from SirenBeDataSource after fetching data from the backend.
     * @param data body of HttpResponse returned in fetchData
     * @returns object that contain a data array to be loaded in the table and a count that represent the length of database's table.
     */
    handleData: (data: T) => SirenTableSource<SirenTableData>;
    /**
     *
     */
    filterDataTable?: (param?: SirenTableFilterModel, data?: SirenTableData[]) => Observable<HttpResponse<T>>;
}
