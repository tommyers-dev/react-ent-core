import { useEffect } from 'react';
import { useStateValue, RLean } from './';

/**
 * Save an object to state, and optionally to store if persistData
 * is true (default). Don't check if current state and new value are different
 * so if there is an infinite loop, the developer will know right away in the
 * console log.
 *
 * @param {Object} model
 * @param {Object} newValue
 * @param {function} dispatch
 * @param {string} type
 */
const save = async (model, newValue, dispatch, type = null) => {
  if (newValue === undefined) return;

  /*if(model.persistData) {
    await Store.set(model, newValue);
  }*/

  RLean.model = model;
  return await dispatch(await model.updateState(newValue, type));
};

/**
 * Save an object to state, and optionally to store if persistData
 * is true (default). Don't check if current state and new value are different
 * so if there is an infinite loop, the developer will know right away in the
 * console log.
 *
 * @param {Object} model
 * @param {Object} newValue
 * @param {string} type
 */
export default function useSave(model, newValue, type = null) {
  const [state, dispatch] = useStateValue();

  if (typeof newValue === 'undefined') {
    return [
      newVal => {
        save(model, newVal, dispatch, type);
      }
    ];
  }

  useEffect(() => {
    save(model, newValue, dispatch, type);
  }, [dispatch]);
}
