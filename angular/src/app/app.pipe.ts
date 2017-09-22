import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToString'
})
export class ArrayToString implements PipeTransform {

  transform(value: any[]): string {
    return value.join(", ");
  }

}
