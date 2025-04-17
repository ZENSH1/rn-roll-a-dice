import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import { Database } from '@nozbe/watermelondb';
import { mySchema } from './schema';
import User from './models/User';
import DiceRoll from './models/DiceRoll';

const adapter = new SQLiteAdapter({
  schema: mySchema,
});

export const database = new Database({
  adapter,
  modelClasses: [User, DiceRoll],
});
