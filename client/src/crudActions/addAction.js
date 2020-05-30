import axios from "axios";
import { GET_ERRORS } from "../actions/types";

export const addBook = userData => dispatch => {
  axios
      .post("/api/books/Addbook", userData)
      .then(res => {
          console.log(``)
      })
      .catch(err => {
              dispatch({
                  type: GET_ERRORS,
                  payload: err.response.data
              });
          }
      );
};
