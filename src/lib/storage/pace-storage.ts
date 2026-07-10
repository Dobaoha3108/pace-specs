import { AppError } from "@/lib/errors";
import { JsonLocalStorage, type KeyValueStorage } from "@/lib/storage/local-storage";
import type { PaceDataStore, PaceEntityName, UUID } from "@/types/finance";

export const PACE_STORAGE_KEY = "pace:data-store:v1";

export const defaultPaceDataStore: PaceDataStore = {
  schemaVersion: 1,
  users: [],
  budgets: [],
  expenses: [],
  expenseCategories: [],
  savingGoals: [],
  budgetStreaks: [],
  pigCoinWallets: [],
  vouchers: [],
  userRewards: [],
  notifications: [],
  pigPigInsights: [],
  chatHistories: [],
};

type EntityWithId = { id: UUID };
type EntityCollection<TEntityName extends PaceEntityName> =
  PaceDataStore[TEntityName] extends Array<infer TEntity> ? TEntity : never;

export class PaceStorageRepository {
  private readonly storage: JsonLocalStorage<PaceDataStore>;

  constructor(storage?: KeyValueStorage) {
    this.storage = new JsonLocalStorage(
      PACE_STORAGE_KEY,
      defaultPaceDataStore,
      storage,
    );
  }

  readStore(): PaceDataStore {
    return this.storage.read();
  }

  writeStore(store: PaceDataStore): PaceDataStore {
    this.storage.write(store);
    return store;
  }

  clearStore(): void {
    this.storage.clear();
  }

  list<TEntityName extends PaceEntityName>(
    entityName: TEntityName,
  ): EntityCollection<TEntityName>[] {
    return this.readStore()[entityName] as EntityCollection<TEntityName>[];
  }

  findById<TEntityName extends PaceEntityName>(
    entityName: TEntityName,
    id: UUID,
  ): EntityCollection<TEntityName> | undefined {
    return this.list(entityName).find(
      (entity) => (entity as EntityWithId).id === id,
    );
  }

  upsert<TEntityName extends PaceEntityName>(
    entityName: TEntityName,
    entity: EntityCollection<TEntityName> & EntityWithId,
  ): EntityCollection<TEntityName> {
    this.storage.update((store) => {
      const collection = store[entityName] as EntityWithId[];
      const existingIndex = collection.findIndex((item) => item.id === entity.id);
      const nextCollection =
        existingIndex >= 0
          ? collection.map((item) => (item.id === entity.id ? entity : item))
          : [...collection, entity];

      return {
        ...store,
        [entityName]: nextCollection,
      };
    });

    return entity;
  }

  remove<TEntityName extends PaceEntityName>(
    entityName: TEntityName,
    id: UUID,
  ): void {
    let removed = false;

    this.storage.update((store) => {
      const collection = store[entityName] as EntityWithId[];
      const nextCollection = collection.filter((entity) => entity.id !== id);
      removed = nextCollection.length !== collection.length;

      return {
        ...store,
        [entityName]: nextCollection,
      };
    });

    if (!removed) {
      throw new AppError("NOT_FOUND", `${entityName} "${id}" was not found.`, {
        context: { entityName, id },
      });
    }
  }

  replaceCollection<TEntityName extends PaceEntityName>(
    entityName: TEntityName,
    entities: EntityCollection<TEntityName>[],
  ): EntityCollection<TEntityName>[] {
    this.storage.update((store) => ({
      ...store,
      [entityName]: entities,
    }));

    return entities;
  }
}

export const paceStorage = new PaceStorageRepository();

export class PaceLocalDataSource {
  constructor(private readonly repository = paceStorage) {}

  users = this.createEntityAccessors("users");
  budgets = this.createEntityAccessors("budgets");
  expenses = this.createEntityAccessors("expenses");
  expenseCategories = this.createEntityAccessors("expenseCategories");
  savingGoals = this.createEntityAccessors("savingGoals");
  budgetStreaks = this.createEntityAccessors("budgetStreaks");
  pigCoinWallets = this.createEntityAccessors("pigCoinWallets");
  vouchers = this.createEntityAccessors("vouchers");
  userRewards = this.createEntityAccessors("userRewards");
  notifications = this.createEntityAccessors("notifications");
  pigPigInsights = this.createEntityAccessors("pigPigInsights");
  chatHistories = this.createEntityAccessors("chatHistories");

  readStore() {
    return this.repository.readStore();
  }

  writeStore(store: PaceDataStore) {
    return this.repository.writeStore(store);
  }

  clearStore() {
    this.repository.clearStore();
  }

  private createEntityAccessors<TEntityName extends PaceEntityName>(
    entityName: TEntityName,
  ) {
    type TEntity = EntityCollection<TEntityName> & EntityWithId;

    return {
      list: () => this.repository.list(entityName) as TEntity[],
      findById: (id: UUID) =>
        this.repository.findById(entityName, id) as TEntity | undefined,
      upsert: (entity: TEntity) =>
        this.repository.upsert(entityName, entity) as TEntity,
      remove: (id: UUID) => this.repository.remove(entityName, id),
      replaceAll: (entities: TEntity[]) =>
        this.repository.replaceCollection(entityName, entities) as TEntity[],
    };
  }
}

export const paceLocalDataSource = new PaceLocalDataSource();
