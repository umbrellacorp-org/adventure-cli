import inquirer, { QuestionCollection } from "inquirer";
import { Character } from "src/models/character";
import { validateCharacterName } from "./validation"
/**
 * selectCharacter
 * @description prompts the user to select their playable character form a simple list menu.
 * @param characterList a list of characters to chose from.
 * @returns Character
 */
export const selectCharacter = async (characterList: Character[]): Promise<Character|undefined> => {
  const choices = characterList.map(c => c.name);
  const questions: QuestionCollection<{ selection: string }> = [{
    name: "selection", message: "Select your character", type: "list", choices
  }];

  try {
    const { selection } = await inquirer.prompt(questions)
    const selectedChar: Character | undefined = characterList.find(c => c.name === selection)
    if (!selectedChar) {
      throw new Error (`Could not find character with name: ${selection}`)
    }

    return selectedChar;
  } catch(err) {
    console.error("Failed to complete selection, please try again.");
    selectCharacter(characterList);
  }

  return undefined;
}

/**
 * createCharacter
 * @description creates a new character, saves this base character and returns it to the program.
 * @returns Character
 */
export const createCharacter = async (): Promise<Character> => {
  const { name } = await inquirer.prompt<{ name: string }>([
    { name: "name", message: "Hello adventure, what may I call you?", type: "input", validate: validateCharacterName }
  ])

  

  return { name } as Character;
}