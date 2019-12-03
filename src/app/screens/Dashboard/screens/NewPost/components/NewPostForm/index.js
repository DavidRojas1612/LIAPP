import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { func, string } from 'prop-types';
import Select from 'app/components/Select';

import Button from '../../../../../../components/Button';
import InputWrapper from '../../../../../../components/InputWrapper';
import ErrorMessage from '../../../../../../components/ErrorMessage';

import styles from './styles.module.scss';

// import { VALIDATION } from '~utils/validations';

// const VALIDATIONS = {
//   email: [VALIDATION.required, VALIDATION.email],
//   password: [VALIDATION.required, VALIDATION.minLength(8)]
// };

const OPTIONS = [{ label: 'Encontrado', value: 'finded' }, { label: 'Perdido', value: 'lost' }];

function LoginForm({ handleSubmit, error, disabled }) {
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Field
        name="state"
        label="Reportar como"
        typeField="select"
        component={InputWrapper}
        options={OPTIONS}
      />
      <Field
        typeField="textArea"
        component={InputWrapper}
        name="description"
        label="Descripcion"
        // validate={VALIDATIONS.email}
      />

      <ErrorMessage error={error} />
      <Button type="submit" className={styles.button} disabled={disabled}>
        Publicar
      </Button>
    </form>
  );
}

LoginForm.propTypes = {
  handleSubmit: func.isRequired,
  error: string
};

export default reduxForm({
  form: 'newPost'
})(LoginForm);
