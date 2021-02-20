import inquirer, { QuestionCollection } from "inquirer";
import { Character } from "src/redux/reducers/character";

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
      throw new Error ("Could not find character with name: ${selection}")
    }

    return selectedChar;
  } catch(err) {
    console.error("Failed to complete selection, please try again.");
    selectCharacter(characterList);
  }

  return undefined;
}