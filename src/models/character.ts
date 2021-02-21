export enum CharacterClass {
  ROGUE = "Rogue",
  WARRIOR = "Warrior",
  MAGICIAN = "Magician",
  RANGER = "Ranger",
  PRIEST = "Priest",
}

export type CharacterStats = {
  strength: number;
  intelligence: number;
  dexterity: number;
}

export type Character = {
  name: string;
  class: CharacterClass;
  level: number;
  stats: CharacterStats;
  experience: number;
  nextLevelExperience: number
}

export const classColorScheme = {
  [CharacterClass.WARRIOR]: {
    hex: "#c7433f",
    text: "#c7433f"
  },
  [CharacterClass.ROGUE]: {
    hex: "#ea6834",
    text: "ea6834"
  },
  [CharacterClass.MAGICIAN]: {
    hex: "#245fca",
    text: "#245fca"
  },
  [CharacterClass.RANGER]: {
    hex: "#72b357",
    text: "#72b357"
  },
  [CharacterClass.PRIEST]: {
    hex: "#ece83d",
    text: "#ece83d"
  },
}