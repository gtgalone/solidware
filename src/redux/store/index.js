import configureStore from '../../../shared/redux/store/configureStore';
import reducers from '../reducers';

// 클라이언트에서만 사용됨
/* eslint-disable no-underscore-dangle */
export default configureStore(
  reducers,
  window.__PRELOADED_STATE__ ? window.__PRELOADED_STATE__ : {},
);
/* eslint-enable */
