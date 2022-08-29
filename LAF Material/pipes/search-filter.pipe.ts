import { Pipe, PipeTransform } from '@angular/core';
import { deepClone } from '../helpers/utils';
import { IncidentModel } from 'src/app/shared/models/incident.model';

@Pipe({
	name: 'searchFilterPipe'
})
export class SearchFilterPipe implements PipeTransform {

	transform(value: any[], args: string, type?: string): any[] {
		if (!value) { return null; }
		if (!args) { return value; }
		args = args.toLowerCase()?.trim();
		if (type === 'incidentModel') {
			return value.filter( incident => incident?.concernedStation?.name?.includes(args) || incident?.typeDisplay?.includes(args) || incident?.site?.name?.includes(args) || incident.description?.includes(args) || incident.displayDate?.includes(args)
			);
		}
		return value.filter( data => JSON.stringify(data).toLowerCase().includes(args) );
	}
}
