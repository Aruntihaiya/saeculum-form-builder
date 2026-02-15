import React from 'react';

import { useDynamicForm } from '../../hooks/useDynamicform';

const MainLayout = ({ children }) => {
  // const { form } = useDynamicForm();

  return (
    <div className="app-container no-sidebar">
      <main className="main-content">
        {/* <div className="form-header-container">
          <h1 className="form-title">Dynamic Form</h1>
        </div> */}
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
