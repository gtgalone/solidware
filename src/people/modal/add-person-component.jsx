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
    <form onSubmit={props.handleSubmit} noValidate>
      <DialogTitle disableTypography>
        <Typography type="body1" component="span">ADD PERSON</Typography>
      </DialogTitle>
      <DialogContent>
        <Field name="name" label="Name" component={FormGroupInput} required autoFocus />
      </DialogContent>
      <DialogActions>
        {
          props.val.name ?
            <Button type="submit" style={{ width: '100%' }} onClick={() => props.valid && setTimeout(() => props.onRequestClose(), 100)}>submit</Button>
            :
            <Button type="button" onClick={props.onRequestClose} style={{ width: '100%' }}>cancel</Button>
        }
      </DialogActions>
    </form>
  </Dialog>
);

ModalAddPersonComponent.propTypes = {
  addPerson: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  val: PropTypes.objectOf(String).isRequired,
  valid: PropTypes.bool.isRequired,
};

export default ModalAddPersonComponent;
