import {usersAPI} from "../api/api";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_AMOUNT = 'SET_USERS_AMOUNT';
const IS_FETCHING = 'IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';
const FAKE = 'FAKE';


let initialState = {
    users: [],
    currentPage: 1,
    usersAmount: 30,
    pageSize: 5,
    isFetching: false,
    followingInProgress: [],
    fake: 10
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FAKE:
            return {
                ...state,
                fake: state.fake + 1,
                currentPage: state.currentPage + 1
            };
        case FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })
            };
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
            };
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.pageNumber
            };
        case SET_USERS_AMOUNT:
            return {
                ...state,
                usersAmount: action.usersAmount
            };
        case IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            };
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching ? [...state.followingInProgress, action.userId] : [state.followingInProgress.filter(id => id != action.userId)]
            };
        default:
            return state;
    }
};

export const followAC = (userId) => ({
    type: FOLLOW,
    userId
});

export const unfollowAC = (userId) => ({
    type: UNFOLLOW,
    userId
});

export const setUsers = (users) => ({
    type: SET_USERS,
    users
});

export const setCurrentPage = (pageNumber) => ({
    type: SET_CURRENT_PAGE,
    pageNumber
});

export const setUsersAmount = (usersAmount) => ({
    type: SET_USERS_AMOUNT,
    usersAmount
});

export const setIsFetching = (isFetching) => ({
    type: IS_FETCHING,
    isFetching
});

export const toggleIsFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
});

export const getUsers = (pageSize, currentPage) => async (dispatch) => {
    dispatch(setIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    let response = await usersAPI.getUsers(pageSize, currentPage);
        dispatch(setIsFetching(false));
        console.log(response);
        dispatch(setUsers(response.items));
        dispatch(setUsersAmount(response.totalCount));
};

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleIsFollowingProgress(true, userId));
    let response = await apiMethod(userId);
    console.log(response);
    dispatch(toggleIsFollowingProgress(false, userId));
    if(response.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
}

export const follow = (userId) => async (dispatch) => {
    let apiMethod = usersAPI.follow.bind(usersAPI);
    let actionCreator = followAC;
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);

};

export const unfollow = (userId) => (dispatch) => {
    let apiMethod = usersAPI.unfollow.bind(usersAPI);
    let actionCreator = unfollowAC;
    followUnfollowFlow(dispatch, userId, apiMethod, actionCreator);
};

export default usersReducer;