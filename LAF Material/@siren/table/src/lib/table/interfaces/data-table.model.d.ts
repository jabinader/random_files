export interface SirenTableSource<T extends SirenTableData> {
    list: T[];
    count?: number;
}
export interface SirenTableData {
    isSelected?: boolean;
    selectionId?: string | number;
}
export interface SirenTableConfig {
    selectionLabel?: string;
    noDataLabel?: string;
    searchBoxLabel?: string;
    doneBtnLabel?: string;
}
