class Team {
  constructor() {
    this.main = null;
    this.support1 = null;
    this.support2 = null;
    this.defense1 = null;
    this.defense2 = null;
    this.defense3 = null;
  }
}

const storedTeam = localStorage.getItem("team");
const team = storedTeam
  ? JSON.parse(storedTeam)
  : {
    support1: {
      id: "ichigo-dangai",
      bonds: [
        { id: "aizen-arrancar", callSupport: false },
        { id: "aizen-arrancar", callSupport: false },
        { id: "aizen-arrancar", callSupport: false },
      ],
    },
    main: {
      id: "aizen-arrancar",
      bonds: [
        { id: "aizen-arrancar", callSupport: false },
        { id: "aizen-arrancar", callSupport: false },
        { id: "aizen-arrancar", callSupport: false },
      ],
    },
    support2: null,
    defense1: {
      id: "aizen-arrancar",
      bonds: [
        { id: "aizen-arrancar", callSupport: false },
        { id: "aizen-arrancar", callSupport: false },
        { id: "aizen-arrancar", callSupport: false },
      ],
    },
    defense2: {
      id: "orihime",
      bonds: []
    },
    defense3: null
  };
function getAllCharacters() {
  return charactersData.characters;
}

function getAllCharactersCards() {
  var cardsHtml = "";
  for(character of charactersData.characters) {
    cardsHtml += getCharacterCardHtml(character);
  }
  return cardsHtml;
}

function positionToString(position) {
  switch (position) {
    case "main":
      return "Главный";
    case "support1":
      return "Помощь";
    case "support2":
      return "Помощь";
    case "defense1":
      return "Оборона";
    case "defense2":
      return "Оборона";
    case "defense3":
      return "Оборона";
  }
}

function getPositionClass(position) {
  switch (position) {
    case "main":
      return "position-main";
    case "support1":
      return "position-support";
    case "support2":
      return "position-support";
    case "defense1":
      return "position-defense";
    case "defense2":
      return "position-defense";
    case "defense3":
      return "position-defense";
  }
}

function getCharacterCardHtml(character) {

  return `
  <div class="card-body">
    <img class="class-icon" src="${getCharacterClassImagePath(character)}">
    <div class="portrait-block">
        <img src="${character.getImagePath()}" alt="${character.name}">
    </div>
    
    <div class="tier-block">
        <span class="tier-text">${character.rarityToString()}</span>
    </div>
</div>`;
}

function getCharacterHtml(character, bonds, position) {
  const characterName = character?.name || "Character";
  const bondsHtml = bonds
    .map((bond) => {
      const bondCharacter = charactersData.characters.find(
        (c) => c.id === bond.id
      );
      const bondCharacterName = bondCharacter?.name || "Not found";
      return `<div class="bond">${bondCharacterName}</div>`;
    })
    .join("");
  return `
    <div class="character-component">

    ${getCharacterCardHtml(character)}

<button class="setup-btn">Настроить</button>

<div class="info-panel ${getPositionClass(position)}">
    <span class="position ${getPositionClass(position)}">${positionToString(
    position
  )}</span>
    <div class="name">${characterName}</div>
</div>
    <div class="character-list" id="characterList">
      <div class="tabs">
        <button data-rarity="all" class="tab active">Все</button>
        <button data-rarity="ssr" class="tab">SSR</button>
        <button data-rarity="sr" class="tab">SR</button>
        <button data-rarity="r" class="tab">R</button>
      </div>
      <div class="grid" id="grid">${getAllCharactersCards()}</div>
    </div>
</div>
    `;
}

function renderTeamData() {
  var teamDataHtml = "";
  for (position in team) {
    const teamMember = team[position];
    if (!teamMember) {
      teamDataHtml += `<div class="empty-character-card" data-position="${position}"><img src="images/add-button.png"></div>`;
    }
    if (teamMember?.id) {
      const { id, bonds } = teamMember;
      teamDataHtml += getCharacterHtml(getCharacterById(id), bonds, position);
    }
  }
  const stageElement = document.querySelector(".stage");
  stageElement.innerHTML = teamDataHtml;
}

function getCharacterClassImagePath(character) {
  switch (character.classType) {
    case "agility":
      return "images/classes/agility.png";
    case "strength":
      return "images/classes/strength.png";
    case "support":
      return "images/classes/support.png";
    case "agility-mod":
      return "images/classes/agility-mod.png";
    case "strength-mod":
      return "images/classes/strength-mod.png";
    case "support-mod":
      return "images/classes/support-mod.png";
  }
}

function renderRightSidebar() {
  const sidebar = document.querySelector(".sidebar-right");
  var sidebarHtml = "";
  for (position in team) {
    teamMember = team[position];
    if (teamMember?.id) {
      const { id, bonds } = teamMember;
      const character = getCharacterById(id);
      sidebarHtml += `<div class="hero-thumb">
          <img src="${character.getImagePath()}" alt="${id}" /><span>8/8</span>
        </div>`;
    }
  }
  sidebar.innerHTML = sidebarHtml;
}

$().ready(() => {
  // horizontal scroll
  const stage = document.querySelector(".stage");
  stage.addEventListener("wheel", (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      stage.scrollLeft += e.deltaY;
    }
  });

  const toggleBtn = document.querySelector(".right-sidebar-toggle");
  const sidebar = document.querySelector(".sidebar-right");

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!sidebar.contains(e.target) && !toggleBtn.contains(e.target)) {
      sidebar.classList.remove("open");
    }
  });

  renderTeamData();
  renderRightSidebar();

  const character = document.querySelector('.card-body')
const list = document.getElementById('characterList')
const wrapper = document.querySelector('.character-component')

character.addEventListener('click', (e) => {
  e.stopPropagation()
  list.classList.toggle('open')

  if (list.classList.contains('open')) {
    positionList()
  }
})

document.addEventListener('click', () => {
  list.classList.remove('open')
})

if (window.innerWidth <= 768) {
  character.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function positionList() {
  if (window.innerWidth <= 768) {
    return
  }

  list.style.left = '100%'
  list.style.right = 'auto'
  list.style.marginLeft = '12px'
  list.style.marginRight = '0'

  const rect = list.getBoundingClientRect()

  if (rect.right > window.innerWidth) {
    list.style.left = 'auto'
    list.style.right = '100%'
    list.style.marginLeft = '0'
    list.style.marginRight = '12px'
  }
}
});
