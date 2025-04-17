import { Model } from '@nozbe/watermelondb';
import { field, children } from '@nozbe/watermelondb/decorators';
import DiceRoll from './DiceRoll';

export default class User extends Model {
  static table = 'users';

  @field('name') name!: string;

  @children('dice_rolls') diceRolls!: DiceRoll[];
}
