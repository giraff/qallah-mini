import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import ByOtherQuestion from '../../components/byother/ByOtherQuetion';


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