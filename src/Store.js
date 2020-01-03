import LocalForage from './defaults/LocalForage';
import { has } from '@react-ent/utils';

class Store {

  /*
   * Decides whether it should use the plugin or default
   * Only here to make logic more readable since async/await makes it annoyingly hard to read
  */
  decideWhichEngine(model) {
    return has(model, 'plugins.storage') ? model.plugins.storage : LocalForage;
  }

  /*
   * Get the Models state representation
  */
  getKeys(model) {
    if(!model) return;

    // If it's a string, it's already a key!
    if(typeof model === 'string' || model instanceof String) {
      return model;
    }

    return Object.keys(model.initialState)[0].toString();
  }

  /*
   * Makes the 'set' call to local storage to store data
   * Uses the storage engine found by decideWhichEngine, either plugin or default.
  */
  async set(model, value) {
    const key    = this.getKeys(model);
    const engine = this.decideWhichEngine(model);

    try {
      await engine.set(key, value);

      const updatedValue = await engine.get(key);

      if(updatedValue === undefined) throw new Error(`Could not set ${key} = ${value}`);

      return { key, value };
    } catch (err) {
      console.log(err);
    }
  }

  /*
   * Makes the 'get' call to local storage to get some data
   * Uses the storage engine found by decideWhichEngine, either plugin or default.
  */
  async get(model) {
    const key    = this.getKeys(model);
    const engine = this.decideWhichEngine(model);

    try {
      return await engine.get(key);
    } catch (err) {
      console.log(err);
    }
  }

  async setAll(units) {
    if (units === undefined || units.length === 0) {
      throw new Error('Array cannot be null or empty');
    }

    units.forEach(async kvPair => {
      try {
        await this.set(kvPair.key, kvPair.value);
      } catch (e) {
        console.log(e);
      }
    });

    return true;
  }

  /*
   * Makes the 'clear' call to local storage to get clear local storage
   * Uses the storage engine found by decideWhichEngine, either plugin or default.
  */
  async clear() {
    const engine = this.decideWhichEngine(model);

    try {
      await engine.clear();
    } catch (err) {
      console.log(err);
    }
  }

  /*
   * Makes the 'remove' call to local storage to get remove a value from local storage
   * Uses the storage engine found by decideWhichEngine, either plugin or default.
  */
  async remove(model) {
    const key    = this.getKeys(model);
    const engine = this.decideWhichEngine(model);

    try {
      await engine.remove(key);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new Store();
