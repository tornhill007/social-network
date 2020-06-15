import React from 'react';
import classes from './Users.module.css';
import preloader from '../../assets/images/Spinner-1s-200px (1).svg'
import {NavLink} from "react-router-dom";
import * as axios from "axios";
import {toggleIsFollowingProgress} from "../../redux/usersReducer";
import {usersAPI} from "../../api/api";
import ProfileStatus from "../Profile/ProfileInfo/ProfileStatus";
import Paginator from "../common/Paginator/Paginator";

const Users = ({user, ...props}) => {
    return (
        <div>
            <div>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img className={classes.imgWrap}
                             src={user.photos.small || 'https://cdn3.iconfinder.com/data/icons/avatars-round-flat/33/avat-01-512.png'}
                             alt="userAvatar"/>
                    </NavLink>
                </div>
                <div>
                    {user.followed ?
                        <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                            props.unfollow(user.id);
                        }}>Unfollow</button> :
                        <button disabled={props.followingInProgress.some(id => id === user.id)} onClick={() => {
                            props.follow(user.id);
                        }}>Follow</button>}
                </div>
                <div>
                    <div>
                        <span>{user.name}</span>
                    </div>
                    <div>
                        <span>{user.status}</span>
                    </div>
                    <div>
                        <span>{"location.country"}</span>
                    </div>
                    <div>
                        <span>{"location.city"}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
