import { Pipe, PipeTransform } from '@angular/core';
import { LookUpModel } from '../models/lookup.model';

@Pipe({
	name: 'lookupFilter'
})
export class LookupFilterPipe implements PipeTransform {

	transform(lookups: LookUpModel[], value: any): LookUpModel[] {
		return value ? lookups.filter(lookup => lookup.fatherRef === value ) : lookups;
	}

}
