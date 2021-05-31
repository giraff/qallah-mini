import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import ByOtherQuestion from '../../components/byother/ByOtherQuetion';
import axios from 'axios';
// import { Link, useHistory } from 'react-router-dom';


const ByOtherDetail = (req) => {
  return(  
    <Fragment>
      <h1>ByOtherDetail</h1>
      <ByOtherQuestion 
        req={req}
      />
    </Fragment>
  )
}

export default ByOtherDetail;