import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';

import PeopleComponent from './people-component';

import { people } from '../redux/modules';

const { ADD_PEOPLE_REDUX_FORM } = people;

const onSubmit = (values, dispatch, props) => {
  console.log(values);
};

// const reduxFormComponent = reduxForm({
//   form: ADD_PEOPLE_REDUX_FORM,
//   onSubmit,
// })(PeopleComponent);

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({

});

const PeopleContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PeopleComponent);

export default PeopleContainer;
