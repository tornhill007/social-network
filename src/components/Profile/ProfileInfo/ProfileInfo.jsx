import React from 'react';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {
    if (!props.profile) {
        return <Preloader/>;
    }
    ;

    return (
        <div>
            <div>
                <img src="https://techcrunch.com/wp-content/uploads/2017/05/32786886766_0b0b236911_o.jpg"
                     alt="wallpaper"/>
            </div>
            <div>
                <img src={props.profile.photos.large} alt="profilePhoto"/>
                ava + desc
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
}

export default ProfileInfo;
