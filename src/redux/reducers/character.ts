import { createAction, createReducer, PayloadAction } from "@reduxjs/toolkit";

export enum CharacterClass {
  ROGUE = "Rogue",
  WARRIOR = "Warrior",
  MAGICIAN = "Magician",
  RANGER = "Ranger",
  PRIEST = "Priest",
}

type Character = {
  name: string;
  class: CharacterClass;
  level: number;
  experience: number;
}

export const setCharacter = createAction<Character>("decreaseHealth")

const reducer = createReducer<null | Character>(null, {
  [setCharacter.type]: (state, action: PayloadAction<Character> ) => {
    return action.payload
  }
});

export default reducer
