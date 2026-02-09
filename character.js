function getCharacterById(characterId) {
  const character = charactersData.characters.find(
    (character) => character.id === characterId
  );

  if (!character) {
    console.log(charactersData.characters);
    throw new Error(`Character with id '${characterId}' not found`);
  }

  return character;
}

class Character {
  constructor(id, name, img, rarity, classType, baseStats, bonds) {
    this.id = id;
    this.name = name;
    this.img = img;
    this.rarity = rarity;
    this.classType = classType;
    this.baseStats = baseStats;
    this.bonds = bonds;
  }

  maxBonds() {
    switch (this.rarity) {
      case "SSRFlourite+":
      case "SSRFlourite":
      case "SSRCrystal":
        return 8;
      case "SSRLim":
        return 7;
      case "SSR":
        return 6;
      case "SR":
        return 3;
      case "R":
        return 2;
      default:
        throw new Error("Invalid rarity");
    }
  }
  getImagePath() {
    return "images/characters/" + this.img;
  }

  rarityToString() {
    switch (this.rarity) {
      case "SR":
        return "SR";
      case "R":
        return "R";
      default:
        return "SSR";
    }
  }
}
