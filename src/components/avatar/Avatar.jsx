import React from 'react';
import './avatar.scss';

const Avatar = ({name, color}) => {
    return (
        <div className="ui-avatar" style={{background: color}}>
            {name.charAt(0)}
        </div>
    )
}

export default Avatar;