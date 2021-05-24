import React, {useState, useCallback, useEffect, useRef} from 'react';
import Auth from './Auth.jsx';
import HomePage from './HomePage.jsx'

const App = (props) => {

return(
  <div>
    <HomePage/>
    {/* <Auth updateUser={updateUser}/> */}
  </div>
  )
}

export default App;
