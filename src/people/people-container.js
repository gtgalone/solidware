import { connect } from 'react-redux';

import { actionForList, isSuccess } from '../../shared/redux/modules/redux-rest-api';

import PeopleComponent from './people-component';

const {
  loadWithoutId: loadPeople,
  set: setPeople,
  destroyWithId: destroyPerson,
  remove: removePerson,
} = actionForList('people', '/people', { idKey: '_id' });

const mapStateToProps = state => ({
  people: state.people,
});

const mapDispatchToProps = dispatch => ({
  loadPeople: () => dispatch(loadPeople()).then((res) => {
    if (isSuccess(res.type)) {
      dispatch(setPeople(res.data));
    }
  }),
  destroyPerson: id => dispatch(destroyPerson(id)).then((res) => {
    if (isSuccess(res.type)) {
      dispatch(removePerson(id));
    }
  }),
});

const PeopleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PeopleComponent);

export default PeopleContainer;
