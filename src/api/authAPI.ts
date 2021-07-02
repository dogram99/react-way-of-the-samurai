import {authInstance} from "./instances";
import {ProfileActionType} from "../store/actions/authActions";
import {BaseResponseType, ResultCodes, ResultCodesForCaptcha} from "../types/Types";

type GetAuthMeApiType = {
    data: {
        id: number,
        email: string,
        login: string
    },
    resultCode: ResultCodes,
    messages: Array<string>
}

type PostSignInApiType = {
    data: {
        userId: number
    }
    resultCode: ResultCodes | ResultCodesForCaptcha,
    messages: Array<string>
}

const authAPI = {
    postSignIn: (profile: ProfileActionType) => {
        return authInstance.post<PostSignInApiType>("/auth/login", {
            email: profile.email,
            password: profile.password,
            rememberMe: true,
            captcha: profile.captcha
        }).then(res => res.data)
    },
    deleteLogOut: () => {
        return authInstance.delete<BaseResponseType>("/auth/login").then(res => res.data)
    },
    getAuthMe: () => {
        return authInstance.get<GetAuthMeApiType>("/auth/me").then(res => res.data)
    }
}

export default authAPI;