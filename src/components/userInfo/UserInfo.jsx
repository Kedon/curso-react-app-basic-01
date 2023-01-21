import React from 'react';
import Avatar from '../avatar/Avatar';
import './user-info.scss';

const UserInfo = ({name, description}) => {
    return (
        <div className="ui-user-info">
            <div className="ui-user-info-avatar">
                <Avatar name={name} color="#f00" />
            </div>
            <div className="ui-user-info-description">
                <div className="ui-user-info-name">
                    {name}
                </div>
                <small className="ui-user-info-caption">
                    {description}
                </small>
            </div>
        </div>
    )
}

export default UserInfo;