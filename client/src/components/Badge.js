import React from 'react';

const Badge = ({ id, isActive, onClick, children }) => (
    <div id={id} className={'badge ' + (isActive ? ' badge--active' : '')} onClick={onClick}>
        {children}
    </div>
);

export default Badge;