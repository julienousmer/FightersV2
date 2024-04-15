import Dexie, {Table} from 'dexie';
import {IFighter} from "@models/shared";

export class IndexedDb extends Dexie {
  fighters!: Table<IFighter, number>;

  constructor() {
    super('dbName');
    this.version(1).stores({
      fighters: '++id'
    });
    this.on('populate', () => this.maSuperFonction());
  }

  async maSuperFonction(){
    await db.fighters.bulkAdd([
      {id : 100, firstname: 'Toto', lastname: 'Tata', age: 12, weight: 50, height: 24, reach: 13, nbWin: 10, nbLose: 1, sexe: 'Masculin', category: null}
    ]);
  }
}

export const db = new IndexedDb();
