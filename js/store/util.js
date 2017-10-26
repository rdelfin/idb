// @flow

export interface AsyncStore<T> {
  getById(id: string | number): Promise<T | void>;
  getAll(): Promise<Array<T>>;
  getIdByName(name: string): Promise<number>;
}

export function createAsyncStore<T: {name: string}>(
  fetch: () => Promise<Array<T>>,
): AsyncStore<T> {
  let data: Array<T>;
  return asyncify({
    getById(id: string | number): T | void {
      if (!data)
        throw 'Data not loaded yet!';
      return data[+id];
    },
    getAll(): Array<T> {
      if (!data)
        throw 'Data not loaded yet!';
      return data;
    },
    getIdByName(name: string): number {
      if (!data)
        throw 'Data not loaded yet!';
      return data.findIndex(item => item.name === name);
    },
    fetch(): Promise<void> {
      return fetch().then(_data => {
        data = _data;
      });
    },
    isDataAvailable(): boolean {
      return !!data;
    },
  });
}

interface Store<T> {
  getById(id: string | number): T | void;
  getAll(): Array<T>;
  getIdByName(name: string): number;
  fetch(): Promise<void>;
  isDataAvailable(): boolean;
}

function asyncify<T>(store: Store<T>): AsyncStore<T> {
  return {
    getById(id: string | number): Promise<T | void> {
      if (store.isDataAvailable())
        return promisify(store.getById(id));
      return store.fetch().then(() => store.getById(id));
    },
    getAll(): Promise<Array<T>> {
      if (store.isDataAvailable())
        return promisify(store.getAll());
      return store.fetch().then(() => store.getAll());
    },
    getIdByName(name: string): Promise<number> {
      if (store.isDataAvailable())
        return promisify(store.getIdByName(name));
      return store.fetch().then(() => store.getIdByName(name));
    },
  };
}

function promisify<T>(result: T): Promise<T> {
  return new Promise((resolve, reject) => {
    resolve(result);
  });
}
