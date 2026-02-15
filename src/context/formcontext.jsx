import React, { createContext, useContext } from 'react';
import { useDynamicForm } from '../hooks/useDynamicform';


const FormContext = createContext();

export const FormProvider = ({ children }) => {
  const formStore = useDynamicForm();
  
  return (
    <FormContext.Provider value={formStore}>
      {children}
    </FormContext.Provider>
  );
};

export const useForm = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  return context;
};
