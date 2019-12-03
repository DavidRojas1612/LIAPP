import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../../../../../../components/Button';
import authActions from '../../../../../../../redux/Auth/actions';

import styles from './styles.module.scss';

function Logout({ wrappRef, cancelLogout }) {
  const dispatch = useDispatch();
  const handleCancelButton = useCallback(() => cancelLogout(false), [cancelLogout]);

  const handleExitButton = useCallback(() => {
    dispatch(authActions.logOut());
  }, [dispatch]);

  return (
    <div className={styles.container} ref={wrappRef}>
      <h2 className={styles.title}>¿ Salir de Liapp ?</h2>
      <div className={styles.buttonsContainer}>
        <Button className={styles.exit} onClick={handleExitButton}>
          Saliir
        </Button>
        <Button className={styles.cancel} onClick={handleCancelButton}>
          Cancelar
        </Button>
      </div>
    </div>
  );
}

export default Logout;
