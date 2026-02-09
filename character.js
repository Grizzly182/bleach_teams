function rarityToString(character) {
    switch (character.rarity) {
      case "SSRLim":
        return "SSR";
      case "SSR":
        return "SSR";
      case "SR":
        return "SR";
      case "R":
        return "R";
    }
  }
  
  function getCharacterById(characterId) {
    const character = charactersData.characters.find(
      character => character.id === characterId
    );
  
    if (!character) {
      console.log(charactersData.characters);
      throw new Error(`Character with id '${characterId}' not found`);
    }
  
    return character;
  }
  
  function getCharacterImagePath(character) {
    return "images/characters/" + character.img;
  }
  
  
  class character {
    constructor(id, name, img, rarity, classType, baseStats, bonds) {
      this.id = id;
      this.name = name;
      this.img = img;
      this.rarity = rarity;
      this.classType = classType;
      this.baseStats = baseStats;
      this.bonds = bonds;
    }
  }