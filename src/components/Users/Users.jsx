import React from 'react';
import classes from './Users.module.css';
import preloader from '../../assets/images/Spinner-1s-200px (1).svg'
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import {toggleIsFollowingProgress} from "../../redux/usersReducer";
import {usersAPI} from "../../api/api";
import ProfileStatus from "../Profile/ProfileInfo/ProfileStatus";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";

const Users = (props) => {

    return (
        <div>
            <Paginator usersAmount={props.usersAmount} pageSize={props.pageSize} currentPage={props.currentPage}
                       onSetCurrentPage={props.onSetCurrentPage} portionSize={10}/>
            <div>
                {
                    props.users.map(user => <User user={user}
                                                  key={user.id}
                                                  followingInProgress={props.followingInProgress}
                                                  follow={props.follow}
                                                  unfollow={props.unfollow}/>)
                }
            </div>
        </div>
    );
}

export default Users;
