import inquirer, { QuestionCollection } from "inquirer";
import store from "./redux";
import { Character, CharacterClass, setCharacter } from "./redux/reducers/character";

const initialState = store.getState();
const loginPrompt = inquirer.createPromptModule()

const login = async (questions: QuestionCollection): Promise<Character> => {
  const answers = await loginPrompt(questions);

  try {
    // authenticate login answers
    if (answers.password !== "asdasd123") {
      throw new Error("LOL")
    }
  } catch (err) {
    console.error("failed to authenticate you, please try again.")
    return login(questions);
  }

  const MOCK_CHARACTER: Character = {
      class: CharacterClass.WARRIOR,
      name: "Nopzen",
      experience: 100,
      level: 10
    }

  return MOCK_CHARACTER
}

const renderScreen = () => {
  const state = store.getState();
  console.log(state.character);
}

const run = async (): Promise<void> => {
  if (!initialState.character) {
    const questions: QuestionCollection = [
      { name: "username", message: "Enter your username", type: "string" },
      { name: "password", message: "Enter your password", type: "password" },
    ]

    try {
      const result: Character = await login(questions);
      store.dispatch(setCharacter(result))
      renderScreen()
    } catch (err) {
      throw new Error(err)
    }
  } else {
    console.log("render screen")
  }
}
run();