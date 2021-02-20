import { dialog, DialogTemper } from "../../utils";

export const validateCharacterName = async (input: string) => {
  const name = input.trim();

  if (!name || name.length < 2) {
    return dialog("Storyteller", "Sorry adventure I'm not sure i understand your name.", DialogTemper.HAPPY)
  }

  return true;
}