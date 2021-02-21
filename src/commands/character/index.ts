import path from "path";
import chalk from "chalk";
import inquirer, { QuestionCollection } from "inquirer";
import { dialog, DialogTemper, readFile, NpcNames } from "../../utils";
import { CharacterObj, CharacterClass, classColorScheme, Character } from "../../models/character";
import { validateCharacterName } from "./validation"

/**
 * selectCharacter
 * @description prompts the user to select their playable character form a simple list menu.
 * @param characterList a list of characters to chose from.
 * @returns Character
 */
export const selectCharacter = async (): Promise<Character> => {
  const characterList =  await getStoredCharacters();

  const choices = characterList.map(c => c.name);
  const questions: QuestionCollection<{ selection: string }> = [{
    name: "selection", message: "Select your character", type: "list", choices
  }];

  const { selection } = await inquirer.prompt(questions)
  const selectedChar: CharacterObj | undefined = characterList.find(c => c.name === selection)
  if (!selectedChar) {
    console.error(`Could not find character with name: ${selection}`)
    return selectCharacter();
  }

  dialog(NpcNames.INNKEEPER, `
    Welcome back adventure ${selectedChar.name}, happy to see you awake again!
  `, DialogTemper.HAPPY)
  dialog(selectedChar.name, `
    ${chalk.bold.italic(`*hmpf*.... morning ${NpcNames.INNKEEPER}`)}
  `, DialogTemper.NEUTRAL)
  console.log(chalk.italic("You take a chair, and your day is about to begin..."))
  return new Character(selectedChar);
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


  const character: CharacterObj = {
    name,
    class: classSelection,
    stats: {
      strength: 10,
      intelligence: 10,
      dexterity: 10
    },
    level: 1,
    experience: 0
  }

  return new Character(character);
}

/**
 * findCharacterByName
 * @param {string} name Name of the character you are trying to find
 */
export const findCharacterByName = async (name: string): Promise<Character|undefined> => {
  let storedCharacters: string;
  
  try {
    storedCharacters = await readFile(path.join(__dirname, "../../data/characters.json"), "utf-8");
  } catch (error) {
    console.error("failed to retrieve character list")
    return undefined;
  }

  const characterList: CharacterObj[] = JSON.parse(storedCharacters).characters;
  if (!characterList) {
    return undefined;
  }

  const characterData = characterList.find(c => c.name.toLowerCase().trim() === name.toLowerCase().trim())

  if (!characterData) {
    return undefined;
  }

  return new Character(characterData);
}

const getStoredCharacters = async (): Promise<CharacterObj[]> => {
  let storedCharacters: string;

  try {
    storedCharacters = await readFile(path.join(__dirname, "../../data/characters.json"), "utf-8");
  } catch (err) {
    console.error("failed to find stored characters, terminating");
    process.exit(0);
  }

  let characterList: CharacterObj[];

  try {
    characterList = JSON.parse(storedCharacters).characters;
  } catch (err) {
    console.error("failed to create character list");
    process.exit(0);
  }

  return characterList;
}