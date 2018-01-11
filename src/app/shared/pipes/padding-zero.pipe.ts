import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paddingZero'
})
export class PaddingZeroPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let strValue: string = value.toString();

    if (strValue.length === 1) {
      strValue = '0' + strValue;
    }

    return strValue;
  }

}
