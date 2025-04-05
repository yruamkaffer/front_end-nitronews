import './styles/globals.css';

import { ThemeSwitch } from './components/theme-switch';
import Form from './components/form.tsx';
import Presentation from './components/presentation.tsx';


function App() {
  return (
    <div>
      <body>
        <Presentation />

        <Form />
      </body>
  
      <footer>
        <ThemeSwitch />
      </footer>
    </div>
  )
};

export default App

