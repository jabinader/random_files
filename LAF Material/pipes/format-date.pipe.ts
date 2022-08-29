import { Pipe, PipeTransform, Inject, LOCALE_ID, Type, ɵstringify as stringify } from '@angular/core';
import * as moment from 'moment';
import {TranslateService} from '@ngx-translate/core';
import { TransIncidentList } from '../../shared/models/incident.model';
@Pipe({
    name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {
    transItemsIncidentList: TransIncidentList;
    constructor(@Inject(LOCALE_ID) private locale: string, translate: TranslateService) {
        translate.get('incidents_list').subscribe((incidentsList: TransIncidentList) => {this.transItemsIncidentList = incidentsList});
     }

     /**
      * Function used to change the format of display date depend on the current date e.g: 5 min ago, yesterday, Monday, 14,4,2020
      * @param dateValue  The date expression
      * @param locale A locale code for the locale format rules to use, arabic is the default.
      * @returns A date string in the desired format.
      */
    transform(dateValue: any, locale?: string): string | null {
        if (dateValue == null || dateValue === '' || dateValue !== dateValue || dateValue === '0001-01-01T00:00') { return 'N/A'; }
        try {
            const currentDateTimeString = moment().utc().format('DD/MM/YYYY HH:mm:ss');
            const dateValueString = moment.utc(dateValue).format('DD/MM/YYYY HH:mm:ss');
            // convert to date type to calculate the difference
            const currentDateTime = moment(currentDateTimeString, 'DD/MM/YYYY HH:mm:ss');
            const valueFormated = moment(dateValueString, 'DD/MM/YYYY HH:mm:ss');
            const diffDates = moment.duration(currentDateTime.diff(valueFormated));
            const hours = diffDates.asHours();
            const days = diffDates.asDays();
            const minutes = diffDates.asMinutes();
            if (days > 0) { // current date greather than start date time
                if (days < 1) {
                    if (hours < 1) { // difference is few minutes
                        const transMin = Math.floor(minutes) > 1 ? this.transItemsIncidentList?.minutes : this.transItemsIncidentList.minute;
                        return  String(Math.floor(minutes)) + ' ' + transMin  + ' ' + this.transItemsIncidentList.ago;
                    }
                    // difference is few hours
                    const transHours = Math.floor(hours) > 1 ? this.transItemsIncidentList?.hours : this.transItemsIncidentList?.hour;
                    return String(Math.floor(hours))  + ' ' + transHours + ' ' + this.transItemsIncidentList?.ago;
                } else if (days < 2) {
                    return this.transItemsIncidentList?.yesterday;
                }
            }
            moment.locale(locale ? locale : 'ar');
            return moment.utc(dateValue).format('DD/MM/YYYY HH:mm');
        } catch (error) {
            throw invalidPipeArgumentError(FormatDatePipe, error.message);
        }
    }
}

function invalidPipeArgumentError(type: Type<any>, value: object): Error {
    return Error(`InvalidPipeArgument: '${value}' for pipe '${stringify(type)}'`);
}
