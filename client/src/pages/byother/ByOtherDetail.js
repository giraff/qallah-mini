import React from 'react';

import ByOtherQuestion from '../../components/byother/ByOtherQuetion';

const ByOtherDetail = req => (
    <section className="sections">
        <div className="sections-overlay">
            <ByOtherQuestion req={req} />
        </div>
    </section>
);

export default ByOtherDetail;
