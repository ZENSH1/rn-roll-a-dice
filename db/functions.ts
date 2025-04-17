import { database } from './database';
import  User  from './models/User';  
import  DiceRoll from './models/DiceRoll';  
import { Q } from '@nozbe/watermelondb';

const users = database.get<User>('users');

const diceRolls = database.get<DiceRoll>('dice_rolls');
// USER FUNCTIONS

export const addName = async (name: string) => {
  await database.write(async () => {
    await users.create((user: User) => {
      user.name = name;
    });
  });
};

export const removeName = async (id: string) => {
  const user = await users.find(id);
  await database.write(async () => {
    await user.markAsDeleted(); // permanent delete: user.destroyPermanently()
  });
};

export const editName = async (id: string, newName: string) => {
  const user = await users.find(id);
  await database.write(async () => {
    await user.update((u: User) => {
      u.name = newName;
    });
  });
};

export const fetchNames = async () => {
  return await users.query().fetch();
};

// DICE FUNCTIONS

export const addDice = async (userId: string, diceNum: number) => {
  await database.write(async () => {
    await diceRolls.create((dice: DiceRoll) => {
      dice.diceNum = diceNum;
      dice.createdAt = Date.now();
      dice.user.id = userId;
    });
  });
};

export const removeDice = async (id: string) => {
  const dice = await diceRolls.find(id);
  await database.write(async () => {
    await dice.markAsDeleted();
  });
};

export const fetchDiceByUserId = async (userId: string) => {
  return await diceRolls.query(Q.where('user_id', userId)).fetch();
};
