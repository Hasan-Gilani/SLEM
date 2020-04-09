import axios from "axios";
import { GET_ERRORS } from "../actions/types";

export const delBook = isbn => dispatch => {
    axios.
    delete(`/api/books/delbook/${isbn}`)
        .then(res => console.log("deleted"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};