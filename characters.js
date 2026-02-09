const charactersData = {
  characters: [
    new Character(
      id = "aizen-arrancar",
      name = "Айзен - Арранкар",
      img = "aizen-arrancar.png",
      rarity = "SSRLim",
      classType = "agility",
      baseStats = {
        health: 1200,
        attack: 804,
        armor: 491,
      },
      bonds = [
        { id: "mugetsu-ichigo", type: "hp", value: 44 },
        { id: "sp-aizen", type: "attack", value: 23 },
        { id: "white-day-aizen", type: "armor", value: 38 },
      ],
    ),
    new Character(
      id = "ichigo-dangai",
      name = "Ичиго Куросаки - закалка",
      img = "ichigo-dangai.png",
      rarity = "SSRLim",
      classType = "strength",
      baseStats = {
        health: 0,
        attack: 0,
        armor: 0,
      },
      bonds = [
        { id: "", type: "hp", value: 44 },
        { id: "", type: "attack", value: 23 },
        { id: "", type: "armor", value: 38 },
      ],
    ),
  ],
};

