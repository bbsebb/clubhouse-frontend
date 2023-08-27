import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'euroFormat',
  standalone: true
})
export class EuroFormatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (typeof value !== 'number') {
      return value;
    }
    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(value);
  }
}
