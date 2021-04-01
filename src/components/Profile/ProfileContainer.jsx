import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getStatus, getUserProfile, savePhoto, saveProfileData, updateStatus} from "../../redux/profileReducer";
import * as axios from "axios";
import {Redirect, withRouter} from "react-router-dom";
import {usersAPI} from "../../api/api";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";

class ProfileContainer extends React.Component {

    componentDidMount() {
        let userId = this.props.match.params.userId;
        if(!userId) {
            userId = this.props.authorizedUserId;
        }
        this.props.getUserProfile(userId);
        this.props.getStatus(userId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.match.params.userId !== prevProps.match.params.userId) {
            let userId = this.props.match.params.userId;
            if(!userId) {
                userId = this.props.authorizedUserId;
            }
            this.props.getUserProfile(userId);
            this.props.getStatus(userId);
        }
    }

    render() {


        return (
            <Profile saveProfileData={this.props.saveProfileData} savePhoto={this.props.savePhoto} {...this.props} status={this.props.status} updateStatus={this.props.updateStatus} isOwner={!this.props.match.params.userId}/>
        )
    }
}
// let AuthRedirectComponent = withAuthRedirect(ProfileContainer);

let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    status: state.profilePage.status,
    authorizedUserId: state.auth.id,
    isAuth: state.auth.userId
});

export default compose(
    connect(mapStateToProps, {getUserProfile, getStatus, updateStatus, savePhoto, saveProfileData}),
    withRouter,
    withAuthRedirect,
)(ProfileContainer)

// let ProfileWithRouterContainer = withRouter(AuthRedirectComponent)
//
// export default connect(mapStateToProps, {getUserProfile})(ProfileWithRouterContainer);