export interface LookUpModel {
    name: string;
    ref: number;
    fatherRef?: number;
    isSelected?: boolean;
    category?: number;
	deprecated?: boolean;
    poste?: number;
    disabled?: boolean;
    value?: string;
}

export interface SpecialLookUpModel {
    name: string;
    ref: string;
    fatherRef?: number;
    isSelected?: boolean;
}
