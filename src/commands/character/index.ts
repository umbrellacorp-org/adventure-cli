import chalk from "chalk";
import inquirer, { QuestionCollection } from "inquirer";
import { dialog, DialogTemper, readFile, NpcNames } from "../../utils";
import { Character, CharacterClass, CharacterStats, classColorScheme } from "../../models/character";
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
  
  const classChoices = [CharacterClass.WARRIOR, CharacterClass.MAGICIAN, CharacterClass.RANGER, CharacterClass.ROGUE, CharacterClass.PRIEST];
  const { classSelection } = await inquirer.prompt<{ classSelection: CharacterClass }>([
    { name: "classSelection", message: `Great scott! you are ${name} the, the, the ....`, type: "list", choices: classChoices }
  ]);

  dialog(NpcNames.STORYTELLER, `
    Ah yes, sorry I had forgotten it is not easy being 768 years.
    Welcome to Kashan ${chalk.hex(classColorScheme[classSelection].hex).italic(`${classSelection}`)}, I look forward to hear of yor tales in this barren land.
  `, DialogTemper.HAPPY);


  const character: Character = {
    name,
    class: classSelection,
    stats: {
      strength: 10,
      intelligence: 10,
      dexterity: 10
    },
    level: 1,
    experience: 0,
    nextLevelExperience: 100,
  }

  return character
}

/**
 * findCharacterByName
 * @param {string} name Name of the character you are trying to find
 */
export const findCharacterByName = async (name: string): Promise<Character|undefined> => {
  let storedCharacters: string;
  
  try {
    storedCharacters = await readFile(`${__dirname}/../../data/characters.json`, "utf-8");
  } catch (error) {
    console.error("failed to retrieve character list")
    return undefined;
  }

  const characterList: Character[] = JSON.parse(storedCharacters).characters;
  return characterList.find(c => c.name.toLowerCase().trim() === name.toLowerCase().trim())
}