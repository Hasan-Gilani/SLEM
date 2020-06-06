import axios from "axios";
import { GET_ERRORS } from "../actions/types";

export const DeleteGood = isbn => dispatch => {
    axios
    // .delete(`/api/books/DeleteGood/${isbn}`)
        .then(res => console.log("deleted"))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};
