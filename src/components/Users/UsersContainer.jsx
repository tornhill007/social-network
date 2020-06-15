import React from 'react';
import {connect} from "react-redux";
import Users from "./Users";
import {
    follow, getUsers,
    setCurrentPage,
    setIsFetching,
    setUsers,
    setUsersAmount, toggleIsFollowingProgress,
    unfollow
} from "../../redux/usersReducer";
import * as axios from "axios";
import classes from "./Users.module.css";
import preloader from "../../assets/images/Spinner-1s-200px (1).svg";
import Preloader from "../common/Preloader/Preloader";
import {usersAPI} from "../../api/api";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {
    getAllUsers,
    getCurrentPage, getFollowingInProgress,
    getIsFetching,
    getPageSize,
    getUsersAmount
} from "../../redux/selectors/usersSelectors";

class UsersContainer extends React.Component {
    componentDidMount() {
        this.props.getUsers(this.props.pageSize, this.props.currentPage);
    }

    onSetCurrentPage = (pageNumber) => {
        this.props.getUsers(this.props.pageSize, pageNumber);
    };

    render() {
console.log("RENDER")
        return (
            <>
                {this.props.isFetching && <Preloader/>}
                <Users usersAmount={this.props.usersAmount}
                       pageSize={this.props.pageSize}
                       onSetCurrentPage={this.onSetCurrentPage}
                       users={this.props.users}
                       currentPage={this.props.currentPage}
                       follow={this.props.follow}
                       unfollow={this.props.unfollow}
                       toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                       followingInProgress={this.props.followingInProgress}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => {
    console.log(state.usersPage.users);
    console.log(state.usersPage);
    console.log("MapStateToProps");

    return {
        users: getAllUsers(state),
        currentPage: getCurrentPage(state),
        usersAmount: getUsersAmount(state),
        pageSize: getPageSize(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state)
    }
};

// const mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (userId) => {
//             dispatch(followAC(userId));
//         },
//         unfollow: (userId) => {
//             dispatch(unfollowAC(userId));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setCurrentPage: (pageNumber) => {
//             dispatch(setCurrentPageAC(pageNumber));
//         },
//         setUsersAmount: (usersAmount) => {
//             dispatch(setUsersAmountAC(usersAmount));
//         },
//         setIsFetching: (isFetching) => {
//             dispatch(setIsFetchingAC(isFetching));
//         }
//     }
// };

// let AuthRedirectComponent = withAuthRedirect(UsersContainer);

export default compose(
    connect(mapStateToProps, {
        follow,
        unfollow,
        toggleIsFollowingProgress,
        getUsers
    }),
    withAuthRedirect
)(UsersContainer)

// export default connect(mapStateToProps, {
//     follow,
//     unfollow,
//     toggleIsFollowingProgress,
//     getUsers
// })(AuthRedirectComponent);
