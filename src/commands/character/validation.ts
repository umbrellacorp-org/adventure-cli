import chalk from "chalk";
import { findCharacterByName } from ".";
import { dialog, DialogTemper, NpcNames } from "../../utils";

export const validateCharacterName = async (input: string) => {
  const name = input.trim();
  const character = await findCharacterByName(name);

  if (!!character) {
    dialog(NpcNames.STORYTELLER, `
      I'm sorry i think my old ears deceived me, did you say: ${name}?
    `, DialogTemper.ANGRY)
    dialog(name, `
      Yes, I'm the great adventure ${name}...
    `, DialogTemper.NEUTRAL)
    dialog(NpcNames.STORYTELLER, `
      I'm so sorry to that, impersonation is punishable by death! I've already met ${name}!
      I'm sorry.... I have to obey the rules.... yells: ${chalk.bold.italic(" Impediminio Immorectus ")}
    `, DialogTemper.ANGRY)

    return console.log(chalk.red.bold("*Puff* you have evaporated from Kashan"));
  }

  if (!name || name.length < 2) {
    return dialog("Storyteller", "Sorry adventure I'm not sure i understand your name.", DialogTemper.HAPPY)
  }

  return true;
}