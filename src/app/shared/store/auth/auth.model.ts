export interface AuthModel {
    name: string,
    email: string,
    nickname: string,
    picture: string,
    url: string
}
export interface Auth {
    auth: AuthModel,
    authenticated: boolean
}