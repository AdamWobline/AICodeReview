import React from 'react';
import Toolbar from './Toolbar';
import Pagination from './Pagination';
import GridItems from './GridItems';

const Main = () => {
  return (
    <div className="container">
      <Toolbar />
      <Pagination />
      <GridItems />
    </div>
  )
}

export default Main
