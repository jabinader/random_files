import { Pipe, PipeTransform } from '@angular/core';
import { LookUpModel } from '../models/lookup.model';

@Pipe({
	name: 'filterDeprecated',
	pure: true
})
export class FilterDeprecatedPipe implements PipeTransform {

	transform(data: LookUpModel[], selectedValue: number): unknown {
		return data?.filter(lookup => !(lookup.deprecated && lookup.ref !== selectedValue));
	}

}
