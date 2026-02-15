const charactersData = {
  characters: [
    new Character(
      id = "hanataro",
      name = "Ханатаро Ямада",
      img = "hanataro.png",
      rarity = "R",
      classType = "support",
      baseStats = {
        health: 0,
        attack: 0,
        armor: 0,
      },
      bonds = [
        { id: "rukia", type: "armor", value: 25 },
        { id: "unohana", type: "attack", value: 18 }
      ],
    ),
    new Character(
      id = "sado",
      name = "Ясутора Садо",
      img = "sado.png",
      rarity = "R",
      classType = "strength",
      baseStats = {
        health: 0,
        attack: 0,
        armor: 0,
      },
      bonds = [
        { id: "ichigo", type: "armor", value: 19 },
        { id: "ishida", type: "hp", value: 20 }
      ],
    ),
    new Character(
      id = "orihime",
      name = "Иноуэ Орихиме",
      img = "orihime.png",
      rarity = "R",
      classType = "support",
      baseStats = {
        health: 0,
        attack: 0,
        armor: 0,
      },
      bonds = [
        { id: "ichigo", type: "attack", value: 10 },
        { id: "ishida", type: "armor", value: 19 }
      ],
    ),
    new Character(
      id = "ishida",
      name = "Урюу Исида",
      img = "ishida.png",
      rarity = "R",
      classType = "support",
      baseStats = {
        health: 0,
        attack: 0,
        armor: 0,
      },
      bonds = [
        { id: "orihime", type: "hp", value: 20 },
        { id: "ichigo", type: "attack", value: 10 }
      ],
    ),
    new Character(
      id = "ichigo",
      name = "Ичиго Куросаки",
      img = "ichigo.png",
      rarity = "R",
      classType = "strength",
      baseStats = {
        health: 0,
        attack: 0,
        armor: 0,
      },
      bonds = [
        { id: "orihime", type: "attack", value: 10 },
        { id: "ishida", type: "armor", value: 19 },
        { id: "sado", type: "hp", value: 20 },
      ],
    ),
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
        { id: "mugetsu", type: "hp", value: 44 },
        { id: "aizen-sp", type: "attack", value: 23 },
        { id: "aizen-wd", type: "armor", value: 38 },
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