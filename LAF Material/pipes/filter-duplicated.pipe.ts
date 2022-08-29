import { Pipe, PipeTransform } from '@angular/core';
import { LookUpModel } from '../models/lookup.model';

@Pipe({
	name: 'filterDuplicated',
	pure: true
})
export class FilterDuplicatedPipe implements PipeTransform {

	transform(data: LookUpModel[], selectedValues: number[]): unknown {
		data?.forEach(lookup => {
			lookup['disabled'] = selectedValues?.includes(lookup?.ref);
		});
		return data;
	}
}
