import React, {useState} from 'react';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/avat-01-512.webp"
import ProfileDataForm from "./ProfileDataForm";

const ProfileInfo = (props) => {

    let [editMode, setEditMode] = useState(false);

    console.log(props.profile);
    if (!props.profile) {
        return <Preloader/>;
    };

    const onMainPhotoSelected = (e) => {
        if(e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    };

    const onSubmit = (formData) => {
        console.log(formData);
        props.saveProfileData(formData).then(() => {
            setEditMode(false);
        })
    };

    return (
        <div>
            <div>
                <img src="https://techcrunch.com/wp-content/uploads/2017/05/32786886766_0b0b236911_o.jpg"
                     alt="wallpaper"/>
            </div>
            <div>
                <img src={props.profile.photos.large || userPhoto} alt="profilePhoto"/>
                {props.isOwner && <input type={"file"} onChange={onMainPhotoSelected}/>}
                {editMode ? <ProfileDataForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/> : <ProfileData profile={props.profile} goToEditMode={() => {setEditMode(true)}} isOwner={props.isOwner}/>}
                <ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    );
};

const ProfileData = (props) => {
    return <div>
        {props.isOwner && <div>
            <button onClick={props.goToEditMode}>Edit</button>
        </div>}
        <div>
            <h4>FullName: </h4><h5>{props.profile.fullName}</h5>
        </div>
        <div>
            <h4>lookingForAJob: </h4><h5>{props.profile.lookingForAJob ? "yes" : "no"}</h5>
        </div>
        {props.profile.lookingForAJob && <div><h4>lookingForAJobDescription: </h4><h5>{props.profile.lookingForAJobDescription}</h5></div>}
        <div>
            <h4>Contacts: </h4>{Object.keys(props.profile.contacts).map(key =>
            <Contact key={key} contactTitle={key} contactValue={props.profile.contacts[key]}/>
        )}
        </div>
    </div>
};


const Contact = (props) => {
    return <div>
        <h4>{props.contactTitle}</h4><h5>{props.contactValue}</h5>
    </div>
};

export default ProfileInfo;
