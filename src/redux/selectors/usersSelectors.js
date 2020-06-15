import {createSelector} from "reselect"

const getAllUsersSelector = (state) => {
    return state.usersPage.users;
};

export const getAllUsers = createSelector(getAllUsersSelector, (users) => {
    return users.filter(u => true)
});

export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
};

export const getUsersAmount = (state) => {
    return state.usersPage.usersAmount;
};

export const getPageSize = (state) => {
    return state.usersPage.pageSize;
};

export const getIsFetching = (state) => {
    return state.usersPage.isFetching;
};

export const getFollowingInProgress = (state) => {
    return state.usersPage.followingInProgress;
};
