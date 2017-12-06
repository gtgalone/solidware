import Notification from '../../components/notification';

/**
 * API middleware에서 에러가 발생했을 경우 notification을 출력함
 * 에러 Action명은 ".../FAILURE" 형식이여야함
 */
// eslint-disable-next-line no-unused-vars
export default store => next => (action) => {
  if (!action.type) {
    return next(action);
  }

  if (action.type.indexOf('FAILURE') > -1) {
    const msg = action.error || '알 수 없는 오류가 발생했습니다.';
    Notification.error(msg);
  }

  return next(action);
};
