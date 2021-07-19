import {
    SET_CURRENT_PAGE,
    SET_TOTAL_USERS_COUNT,
    GET_FOLLOWING_STATUS,
    TOGGLE_FOLLOW_UNFOLLOW, TOGGLE_IS_FOLLOWING_PROGRESS, SET_USERS_FILTER, SET_USERS_SUCCESS, SET_FRIENDS_SUCCESS,
} from "../../store-types";
import usersAPI from "../../../api/usersAPI";
import {ResultCodes, UserType} from "../../../types";
import {BaseThunkType, InferActionsTypes} from "../../reducers/rootReducer";
import {FilterType} from "../../reducers/usersReducer/usersReducer";

export const actions = {
    toggleFollowingProgress: (followingInProgress: boolean, userId: number) => ({
        type: TOGGLE_IS_FOLLOWING_PROGRESS,
        followingInProgress,
        userId
    } as const),
    setCurrentPage: (pageNumber: number) => ({
        type: SET_CURRENT_PAGE,
        currentPage: pageNumber
    } as const),
    setTotalUserCount: (totalUserCount: number) => ({
        type: SET_TOTAL_USERS_COUNT,
        totalUserCount: totalUserCount
    } as const),
    setFilter: (filter: FilterType) => ({type: SET_USERS_FILTER, payload: filter} as const)
}

/**
 * Returns all (or only filtered by name with term parameter) users splitted by page
 * @param:number requestPage
 * @param:number pageSize
 */
export const setUsers = (requestPage: number = 1, pageSize: number = 12, filter: FilterType): ThunkType => {
    return async (dispatch: Function) => {
        dispatch(actions.setFilter(filter))
        usersAPI.requestUsers(requestPage, pageSize, filter.term, filter.friend)
            .then(data => dispatch(setUsersSuccess(data)))
            .catch((e) => console.error(e));
    }
};

export const setFriends = (requestPage: number, pageSize: number): ThunkType => {
    return async (dispatch: Function) => {
        usersAPI.requestUsers(requestPage, pageSize, '', true)
            .then(data => dispatch(setFriendsSuccess(data)))
            .catch((e) => console.error(e));
    }
};

type UsersType = {
    items: UserType[],
    totalCount: number
}

const setUsersSuccess = (data: UsersType) => (dispatch: Function) => {
    dispatch({
        type: SET_USERS_SUCCESS,
        users: data.items,
        totalUsersCount: data.totalCount
    })
}

const setFriendsSuccess = (data: UsersType) => (dispatch: Function) => {
    dispatch({
        type: SET_FRIENDS_SUCCESS,
        friends: data.items,
        totalFriendsCount: data.totalCount
    })
}

/**
 * Get following status current user
 * @param:number userId
 */
export const setCurrentUserFollower = (userId: number): ThunkType => {
    return async (dispatch: Function) => {
        usersAPI.getCurrentUserFollower(userId).then(data => {
            dispatch({
                type: GET_FOLLOWING_STATUS,
                userId: userId,
                followStatus: data
            })
        }).catch((e) => console.error(e))
    }
}

/**
 * Follow to user
 * @param:number userId
 */
export const userFollow = (userId: number): ThunkType => {
    return async (dispatch: Function) => {
        await dispatch(actions.toggleFollowingProgress(true, userId))
        usersAPI.postUserFollow(userId).then(data => {
            if (data.resultCode === ResultCodes.Success) {
                dispatch({
                    type: TOGGLE_FOLLOW_UNFOLLOW,
                    userId: userId
                })
            }
            dispatch(actions.toggleFollowingProgress(false, userId))
        }).then(() => dispatch(setCurrentUserFollower(userId))).catch((e) => console.error(e))
    }
}

/**
 * Unfollow to user
 * @param:number userId
 */
export const userUnfollow = (userId: number): ThunkType => {
    return async (dispatch: Function) => {
        usersAPI.deleteUserUnfollow(userId).then(data => {
            if (data.resultCode === ResultCodes.Success) {
                dispatch(actions.toggleFollowingProgress(false, userId))
                dispatch({
                    type: TOGGLE_FOLLOW_UNFOLLOW,
                    userId: userId
                })
            }
        }).then(() => dispatch(setCurrentUserFollower(userId))).catch((e) => console.error(e))
    }
}

export type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionsTypes>;
