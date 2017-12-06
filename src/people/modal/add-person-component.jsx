import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from 'material-ui';
import { Field } from 'redux-form';

import FormGroupInput from '../../../shared/components/redux-form/form-group-input';

const ModalAddPersonComponent = props => (
  <Dialog
    open={props.addPerson}
    onRequestClose={props.onRequestClose}
  >
    <form onSubmit={props.handleSubmit}>
      <DialogTitle disableTypography>
        <Typography type="body1" component="span">ADD PERSON</Typography>
      </DialogTitle>
      <DialogContent>
        <Field name="name" placeholder="name" component={FormGroupInput} />
      </DialogContent>
      <DialogActions>
        {
          props.val.name ?
            <Button type="submit">submit</Button>
            :
            <Button type="button" onClick={props.onRequestClose}>cancel</Button>
        }
      </DialogActions>
    </form>
  </Dialog>
);

ModalAddPersonComponent.propTypes = {
  addPerson: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  val: PropTypes.string.isRequired,
};

export default ModalAddPersonComponent;
