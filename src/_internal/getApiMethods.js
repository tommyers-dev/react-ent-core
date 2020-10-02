import { getValue, hasValue } from '@rlean/utils';
import RLean from '../RLean';
import { AxiosAdapter } from '../defaultAdapters';

export const getApiMethods = model => {
  const api = hasValue(model, 'adapters.api') ? model.adapters.api : getValue(RLean, 'config.api.adapter', AxiosAdapter);

  const get = api.get;
  const put = api.put;
  const post = api.post;
  const del = api.del;
  const patch = api.patch;

  return { get, put, post, del, patch };
};
