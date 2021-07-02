export enum ResultCodes {
    Success = 0,
    Error = 1
}

export enum ResultCodesForCaptcha {
    CaptchaIsRequired = 10
}

export type BaseResponseType = {
    resultCode: ResultCodes,
    messages: Array<string>
    data: {}
}

export type ProfileType = {
    userId: number | null,
    lookingForAJob: boolean,
    lookingForAJobDescription: string | null,
    fullName: string | null,
    aboutMe: string | null,
    contacts: {
        key?: string | null,
        github: string | null,
        vk: string | null,
        facebook: string | null,
        instagram: string | null,
        twitter: string | null,
        website: string | null,
        youtube: string | null,
        mainLink: string | null,
    },
    photos: {
        small: string | null,
        large: string | null
    }
}

export type UserType = {
    id: number,
    name: string,
    photos: { small: string, large: string },
    status: string,
    followed: boolean,
}