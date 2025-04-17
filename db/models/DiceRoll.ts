import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';

export default class DiceRoll extends Model {
  static table = 'dice_rolls';

  @field('dice_num') diceNum!: number;
  @field('created_at') createdAt!: number;

  @relation('users', 'user_id') user!: any;
}
