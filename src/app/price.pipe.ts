import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'price',
})
export class PricePipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): unknown {
    const price = `R$${Number(value).toFixed(2)}`;
    return price;
  }
}
