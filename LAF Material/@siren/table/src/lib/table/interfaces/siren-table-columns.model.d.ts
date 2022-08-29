export interface SirenTableColumns<T> {
    columnDef: string;
    header?: string;
    cellValue?: (element: T) => any;
    customColumn?: boolean;
    expandedData?: boolean;
    allowSorting?: boolean;
    allowEllipsis?: boolean;
}
