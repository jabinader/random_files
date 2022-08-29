import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'matErrorPriority'
})
export class MatErrorPriorityPipe implements PipeTransform {

  transform(value: unknown[], ...args: string[]): string {
    return value.indexOf(true) !== -1 ? args[value.indexOf(true)] : args[args.length-1];
  }

}
