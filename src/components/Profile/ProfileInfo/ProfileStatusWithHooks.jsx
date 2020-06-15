import React, {useEffect, useState} from 'react';

const ProfileStatusWithHooks = (props) => {
    console.log(props);
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    const activateEditMode = () => {
        setEditMode(true);
    };

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status);
    };

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    };

    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     console.log('UPDATEE');
    //     if(prevProps.status !== this.props.status) {
    //         this.setState({
    //             status:this.props.status
    //         })
    //     }
    // }

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

        return (
            <div>
                {console.log("RENDER")}
                {!editMode &&
                <div>
                    <span onDoubleClick={activateEditMode}>{props.status || '----'}</span>
                </div>
                }
                {editMode &&
                <div>
                    <input onChange={onStatusChange} autoFocus={true} onBlur={deactivateEditMode} value={status}/>
                </div>
                }
            </div>
        );
};

export default ProfileStatusWithHooks;
