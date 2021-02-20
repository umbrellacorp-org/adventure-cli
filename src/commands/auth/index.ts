import fs from "fs";
import util from "util";
import path from "path";
import inquirer, { QuestionCollection } from "inquirer";
import { Character } from "src/redux/reducers/character";

const readFile = util.promisify(fs.readFile);

const loginQuestions: QuestionCollection = [
  { name: "username", message: "Enter your username", type: "string" },
  { name: "password", message: "Enter your password", type: "password" },
]


const prompt = inquirer.createPromptModule();

export const login = async (): Promise<Character[]> => {
  const answers = await prompt(loginQuestions);

  try {
    // authenticate login answers
    if (answers.password !== "asdasd123") {
      throw new Error("failed to authenticate you, please try again.")
    }
  } catch (err) {
    console.error(err.message)
    return login();
  }

  const characters: Character[] = [];
  try {
    const data: string = await readFile(path.join(__dirname, "../data/characters.json"), { encoding: "utf8" });
    const playerCharacters: Character[] = JSON.parse(data).characters;

    playerCharacters.forEach(c => characters.push(c))
  } catch (err) {
    console.log(err)
  }

  return characters;
}