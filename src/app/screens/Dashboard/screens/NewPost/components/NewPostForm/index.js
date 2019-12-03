import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { func, string } from 'prop-types';

import Button from '../../../../../../components/Button';
import InputWrapper from '../../../../../../components/InputWrapper';
import ErrorMessage from '../../../../../../components/ErrorMessage';
import { VALIDATION } from '../../../../../../../utils/validations';

import styles from './styles.module.scss';

const VALIDATIONS = {
  state: [VALIDATION.required],
  description: [VALIDATION.required, VALIDATION.minLength(10)]
};

const OPTIONS = [{ label: 'Encontrado', value: 'finded' }, { label: 'Perdido', value: 'lost' }];

function NewPostForm({ handleSubmit, error, disabled, invalid, ...props }) {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="state"
        label="Reportar como"
        typeField="select"
        component={InputWrapper}
        validate={VALIDATIONS.state}
        options={OPTIONS}
      />
      <Field
        typeField="textArea"
        component={InputWrapper}
        name="description"
        label="Descripcion"
        validate={VALIDATIONS.description}
      />

      <ErrorMessage error={error} />
      <Button type="submit" className={styles.button} disabled={disabled || invalid}>
        Publicar
      </Button>
    </form>
  );
}

NewPostForm.propTypes = {
  handleSubmit: func.isRequired,
  error: string
};

export default reduxForm({
  form: 'newPost'
})(NewPostForm);
