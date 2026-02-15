
import { FormProvider } from './context/formcontext';
import MainLayout from './component/Mainlayout/mainlayout';

import './index.css';
import DynamicForm from './component/dynamic form/dynamicForm';


function App() {
  return (
    <FormProvider>
      <MainLayout>
        <DynamicForm />
      </MainLayout>
    </FormProvider>
  );
}

export default App;
