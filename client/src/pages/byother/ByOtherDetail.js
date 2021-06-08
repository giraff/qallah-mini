import React, { useEffect, useState } from 'react';
import { Fragment } from 'react';
import ByOtherQuestion from '../../components/byother/ByOtherQuetion';


const ByOtherDetail = (req) => {
  return(
    <section className="sections">
        <div className="sections-overlay">
          <ByOtherQuestion req={req}/>
        </div>
    </section>
  )
}

export default ByOtherDetail;