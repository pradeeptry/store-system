import { combineReducers } from 'redux';

import customer from './customer';
import provider from './provider';
import product from './product';
import budget from './budget';
import stock from './stock';
import brand from './brand';
import user from './user';

export default combineReducers({
  customer,
  provider,
  product,
  budget,
  brand,
  stock,
  user,
});
