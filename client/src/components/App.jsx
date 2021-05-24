import React, {useState, useCallback, useEffect, useRef} from 'react';
import Auth from './Auth.jsx';
import HomePageGrid from './HomePageGrid.jsx'

const App = (props) => {

return(
  <div>
    <HomePageGrid/>
    {/* <Auth updateUser={updateUser}/> */}
  </div>
  )
}

export default App;
