import { Pipe, PipeTransform, Inject, LOCALE_ID, Type, ɵstringify as stringify } from '@angular/core';
import * as moment from 'moment';

@Pipe({
    name: 'utcDate'
})
export class UtcDatePipe implements PipeTransform {
    constructor(@Inject(LOCALE_ID) private locale: string) { }

    /**
     * @param value The date expression: a `Date` object,  a number
     * (milliseconds since UTC epoch), or an ISO string (https://www.w3.org/TR/NOTE-datetime).
     * @param format The date/time components to include, using predefined options or a
     * custom format string.
     * @param timezone A timezone offset (such as `'+0430'`), or a standard
     * UTC/GMT or continental US timezone abbreviation. Default is
     * the local system timezone of the end-user's machine.
     * @param locale A locale code for the locale format rules to use.
     * When not supplied, uses the value of `LOCALE_ID`, which is `en-US` by default.
     * See [Setting your app locale](guide/i18n#setting-up-the-locale-of-your-app).
     * @returns A date string in the desired format.
     */
    transform(value: any, format = 'mediumDate', timezone?: string, locale?: string): string | null {
        if (value == null || value === '' || value !== value || value === '0001-01-01T00:00') { return 'N/A'; }
        try {
            // if (timezone == null || timezone === undefined || timezone === '') {
            //     moment.locale(locale);
            //     if (locale === 'fr') {
            //         const date = moment.utc(value).format(format);
            //         return `${date.substring(0, 1).toUpperCase()}${date.substring(1)}`;
            //     }
            //     return moment.utc(value).format(format);
            // } else {
            //     moment.locale(locale);
            //     if (locale === 'fr') {
            //         const date = moment.utc(value).utcOffset(timezone).format(format);
            //         return `${date.substring(0, 1).toUpperCase()}${date.substring(1)}`;
            //     }
            //     return moment.utc(value).utcOffset(timezone).format(format);
            // }
            return moment.utc(value).format(format);
        } catch (error) {
            throw invalidPipeArgumentError(UtcDatePipe, error.message);
        }
    }
}

function invalidPipeArgumentError(type: Type<any>, value: object): Error {
    return Error(`InvalidPipeArgument: '${value}' for pipe '${stringify(type)}'`);
}
