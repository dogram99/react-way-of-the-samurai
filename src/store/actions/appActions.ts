import {INITIALIZED_SUCCESS} from "../store-types";
import {authMe} from "./authActions";
import {updateProfile} from "./profileActions";

export const actions = {
    initializedSuccess: () => ({type: INITIALIZED_SUCCESS} as const)
}

/**
 * Initialize App
 */
export const initializeApp = () => {
    return (dispatch: Function) => {
        let authMePromise = dispatch(authMe());
        let setProfilePromise = dispatch(updateProfile(17461));
        Promise.all([authMePromise, setProfilePromise])
            .then(() => {
                dispatch(actions.initializedSuccess());
            });
    }
}

/**
 * Copy on click
 * @param text
 */
export function copy(text: string) {
    return async () => {
        navigator.clipboard.writeText(text).then(() => {
            console.log(`copy(${text})`)
        })
    }
}