import { connect } from 'react-redux';

import { actionFor, actionForList, isSuccess } from '../../shared/redux/modules/redux-rest-api';

import GroupComponent from './group-component';

const { loadWithoutId: loadPeopleRandom, set: setPeopleRandom } = actionForList('peopleRandom', '/people/random');
const { loadWithoutId: loadPeopleCount, set: setPeopleCount } = actionFor('peopleCount', '/people/count');

const mapStateToProps = state => ({
  peopleCount: state.peopleCount,
});

const mapDispatchToProps = dispatch => ({
  loadPeopleRandom: () => dispatch(loadPeopleRandom()).then((res) => {
    if (isSuccess(res.type)) {
      dispatch(setPeopleRandom(res.data));
    }
    return res;
  }),
  loadPeopleCount: () => dispatch(loadPeopleCount()).then((res) => {
    if (isSuccess(res.type)) {
      dispatch(setPeopleCount(res.data));
    }
  }),
});

const GroupContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(GroupComponent);

export default GroupContainer;
