import React, { useMemo, useState, useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import Button from '../../../../components/Button';
import Portal from '../../../../components/Portal';

import styles from './styles.module.scss';
import { formatterName } from './utils';
import Logout from './components/Logout';

function Profile() {
  const [logout, setLogout] = useState(false);
  const { displayName, email, photoURL } = useSelector(state => state.auth);
  const nameUser = useMemo(() => formatterName(displayName), [displayName]);
  const childrenRef = useRef();

  const hanldeLogoutModal = useCallback(() => setLogout(true), []);

  const handleOutsideClick = event => {
    if (childrenRef.current && !childrenRef.current.contains(event.target)) {
      setLogout(false);
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', handleOutsideClick);
    return () => {
      window.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <div className={styles.profileContainer}>
      <img src={photoURL} className={styles.photoProfile} alt="foto profile" />
      <h2 className={styles.displayName}>{nameUser}</h2>
      <h4 className={styles.email}>{email}</h4>
      <Button className={styles.logout} onClick={hanldeLogoutModal}>
        Salir
      </Button>

      {logout && (
        <Portal>
          <Logout wrappRef={childrenRef} cancelLogout={setLogout} />
        </Portal>
      )}
    </div>
  );
}

export default Profile;
