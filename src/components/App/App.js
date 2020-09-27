import React from 'react';
import Board from '../Board/Board';
import Footer from '../Footer/Footer';
import classes from './App.module.scss';

function App() {
  return (
    <div className={classes.App}>
      <h1 className={classes.Title}><span>beat</span>maker</h1>

      <Board />

      <Footer />
    </div>
  );
}

export default App;
