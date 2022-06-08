import React, { createContext } from "react";
import { LOGIN, LOGOUT, SIGNUP, ADD_CATEGORY, GET_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, ADD_CAR, GET_CAR, DELETE_CAR, EDIT_CAR, FINISHED, LOADING, ERROR } from "./types";
import { setToken, getToken, removeToken } from "../auth";
export const AppContext = createContext();

const initialState = {
	isAuthenticated: getToken() ? true : false,
	error: "",
	successMsg: "",
	categories: [],
	cars: [],
	loggedInUser: getToken(),
	category_next: {},
	car_next: {},
};

export const reducer = (state = initialState, action) => {
	switch (action.type) {
		case LOADING:
			return {
				...state,
				loading: true,
			};
		case FINISHED:
			return {
				...state,
				loading: false,
			};
		case ERROR:
			return {
				...state,
				error: action.payload,
			};
		case LOGIN:
			setToken(action.payload.token);
			return {
				...state,
				isAuthenticated: true,
				loggedInUser: getToken(action.payload.token),
			};
		case LOGOUT:
			removeToken();
			return {
				...state,
				error: "",
				isAuthenticated: false,
				loggedInUser: null,
			};

		case SIGNUP:
			return {
				...state,
				successMsg: "Please check your email for login credentials",
			};
		case GET_CATEGORY: {
			return {
				...state,
				categories: action.payload.results,
				category_next: action.payload.next,
			};
		}
		case GET_CAR: {
			return {
				...state,
				cars: action.payload.results,
				car_next: action.payload.next,
			};
		}
		case ADD_CATEGORY: {
			// state.categories.push(action.payload);
			return {
				...state,
			};
		}
		case ADD_CAR: {
			// state.cars.push(action.payload);
			return {
				...state,
			};
		}
		case DELETE_CATEGORY: {
			return {
				...state,
				categories: state.categories.filter((category) => category._id !== action.payload),
			};
		}
		case DELETE_CAR: {
			return {
				...state,
				cars: state.cars.filter((car) => car._id !== action.payload),
			};
		}
		case EDIT_CATEGORY: {
			return {
				...state,
			};
		}
		case EDIT_CAR: {
			return {
				...state,
			};
		}
		default:
			return state;
	}
};

const AppContextProvider = (props) => {
	const [globalState, dispatch] = React.useReducer(reducer, initialState);
	return <AppContext.Provider value={{ globalState, dispatch }}>{props.children}</AppContext.Provider>;
};
export default AppContextProvider;
