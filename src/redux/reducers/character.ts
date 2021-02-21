import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";
import { CharacterObj } from "../../models/character";

export const setCharacter = createAction<CharacterObj>("decreaseHealth")

const reducer = createReducer<null | CharacterObj>(null, {
  [setCharacter.type]: (state, action: PayloadAction<CharacterObj> ) => {
    return action.payload
  }
});

export default reducer
