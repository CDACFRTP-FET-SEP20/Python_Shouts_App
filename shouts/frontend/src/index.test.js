import { render } from '@testing-library/react';

import App from './components/App'

describe("App Component",()=>{
    it("Should display App Component",()=>{
      render(
       
         <App/>
        
      );
      
    })
  })