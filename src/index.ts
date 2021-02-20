import store from "./redux";

import { login } from "./commands/auth";
import { Character, setCharacter } from "./redux/reducers/character";
import { selectCharacter } from "./commands/character";

const initialState = store.getState();

const renderGame = async (character: Character) => {
  console.log("Welcome to kashan:", character.name);
}

const run = async (): Promise<void> => {
  if (!initialState.character) {
    try {
      const characterList = await login();
      let character: Character;

      if (!characterList.length) {
        // Create a new Character and then render game with that.
        console.log("Create character prompt");
        character = { name: "New char" } as Character
        store.dispatch(setCharacter(character));
        renderGame(character);
        return;
      }

      const selectedChar = await selectCharacter(characterList);
      if (!selectedChar) {
        throw new Error("failed to complete character selection")
      }

      store.dispatch(setCharacter(selectedChar))
      renderGame(selectedChar);
    } catch (err) {
      console.log("An unexpected error ocurred, developer have been notified, terminating.")
      console.error(err)
      process.exit(0);
    }
  } else {
    console.log("render game, initial state was provided")
    renderGame(initialState.character)
  }
}
run();