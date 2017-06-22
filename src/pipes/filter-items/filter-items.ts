import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FilterItemsPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'filterItems',
  pure: false,
})
export class FilterItemsPipe implements PipeTransform {
  transform(items: any[], args: any): any {
    if (!args || !items) {
      return items;
    }
    return items.filter((item) => {
      return item.Title.toLowerCase().indexOf(args.toLowerCase()) > -1 || item.Actors.toLowerCase().indexOf(args.toLowerCase()) > -1;
    });
  }
}
