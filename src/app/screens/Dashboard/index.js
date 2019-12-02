import React from 'react';
// import { Route, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from '../../components/Nabvar';
import Toolbar from '../../components/Toolbar';

import Routes from './components/Routes';

function Dashboard() {
  const isAuthed = useSelector(state => state.auth.isAuthed);
  return (
    <div>
      <Toolbar />
      <Navbar title="LIAPP" />
      <Routes />
    </div>
  );
}

export default Dashboard;
