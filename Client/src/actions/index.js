export const isLogged = boolean => {
    return {
        type: 'LOGGED_IN',
        payload: boolean
    }
}

export const currentUser = object => {
    return {
        type: 'CURRENT_USER',
        payload: object
    }
}

export const imageChange = string => {
    return {
        type: 'CHANGE_IMAGE',
        payload: string
    }
}