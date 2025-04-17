import { appSchema, tableSchema } from '@nozbe/watermelondb';

export const mySchema = appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: 'users',
      columns: [
        { name: 'name', type: 'string' },
      ],
    }),
    tableSchema({
      name: 'dice_rolls',
      columns: [
        { name: 'dice_num', type: 'number' },
        { name: 'user_id', type: 'string', isIndexed: true },
        { name: 'created_at', type: 'number' }, // timestamp
      ],
    }),
  ],
});
