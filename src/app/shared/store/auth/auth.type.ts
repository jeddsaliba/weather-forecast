export enum AuthType {
    LOGIN = '[AUTH API] Login',
    LOGIN_SUCCESS = '[AUTH API] Login Success',
    LOGIN_CANCEL = '[AUTH API] Login Cancel',

    ACCESS_TOKEN = '[AUTH API] Access Token',
    ACCESS_TOKEN_SUCCESS = '[AUTH API] Access Token Success',
    ACCESS_TOKEN_CANCEL = '[AUTH API] Access Token Cancel',

    AUTHENTICATED = '[AUTH API] Is Authenticated',
    AUTHENTICATED_SUCCESS = '[AUTH API] Is Authenticated Success',
    AUTHENTICATED_CANCEL = '[AUTH API] Is Authenticated Cancel',

    LOGGED_IN_USER_DETAILS = '[AUTH API] Logged In User Details',
    LOGGED_IN_USER_DETAILS_SUCCESS = '[AUTH API] Logged In User Details Success',
    LOGGED_IN_USER_DETAILS_CANCEL = '[AUTH API] Logged In User Details Cancel',

    LOGOUT = '[AUTH API] Logout',
    LOGOUT_SUCCESS = '[AUTH API] Logout Success',
    LOGOUT_CANCEL = '[AUTH API] Logout Cancel'
}