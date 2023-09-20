import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '../../models/games/Category';
import { Gender } from '../../models/games/Gender';

@Pipe({
  name: 'nameTeam',
  standalone: true,
})
export class NameTeamPipe implements PipeTransform {
  transform(
    value: string,
    category: Category,
    gender: Gender,
    number: number
  ): string {
    let teamName: string;
    let genderChar: string = gender == Gender.FEMALE ? 'F' : 'M';

    if (category.isMaxAge) {
      teamName = 'U' + category.age + genderChar + number;
    } else {
      teamName = 'S' + genderChar + number;
    }
    return value + ' ' + teamName;
  }
}
