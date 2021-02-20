import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { Character } from "src/models/character";

export const setCharacter = createAction<Character>("decreaseHealth")

const reducer = createReducer<null | Character>(null, {
  [setCharacter.type]: (state, action: PayloadAction<Character> ) => {
    return action.payload
  }
});

export default reducer
