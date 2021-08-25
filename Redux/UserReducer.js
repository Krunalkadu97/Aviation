export const ADD_USER = 'ADD_USER'
export const ADD_USER_ROLE = 'ADD_USER_ROLE'
export const ADD_CO_ID = 'ADD_CO_ID'

const initialState = {
    users: '',
    role: '',
    coid: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_USER:
            return {
                ...state,
                users: action.payload, ...state.users
            }
        case ADD_USER_ROLE:
            return {
                ...state,
                role: action.payload, ...state.role
            }
        case ADD_CO_ID:
            return {
                ...state,
                coid: action.payload, ...state.coid
            }

    }
    return state
}

export default userReducer