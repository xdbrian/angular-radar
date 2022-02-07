import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {
  transform(values: any[]): any {
    console.log('YesNoPipe')
    console.log(values)
    return values.filter(item => item.isChecked == true);
  }

}