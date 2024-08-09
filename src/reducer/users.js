import { Types } from "../actions/user";

const INITIAL_STATE = {
    items: [],
};

export default function users(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.GET_USERS_SUCCESS: {
            return {
                ...state,
                items: action.payload.item,
            };
        }
        case Types.USERS_ERROR: {
            return {
                ...state,
                items: action.payload.error,
            };
        }
        case Types.ADD_USER: {
            return {
                ...state,
                items: [...state.items, action.payload],
            };
        }
        case Types.DELETE_USER: {
            return {
                ...state,
                items: state.items.filter((user) => user.id !== action.payload),
            };
        }
        case Types.EDIT_USER: {
            return {
                ...state,
                items: state.items.map(item =>
                    item.id === action.payload.id ? { ...item, ...action.payload } : item
                )
            };
        }
        default: {
            return state;
        }
    }
}
