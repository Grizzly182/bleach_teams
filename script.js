var characterRoastr = getAvailableCharacters();

const storedTeam = localStorage.getItem("team");
var team = checkTeamDuplicates(
  storedTeam
    ? JSON.parse(storedTeam)
    : {
      support1: {
        id: "ichigo-dangai",
        bonds: [
          null,
          { id: "aizen-arrancar", callSupport: false },
          { id: "aizen-arrancar", callSupport: false },
        ],
      },
      main: {
        id: "hanataro",
        bonds: [
          { id: "aizen-arrancar", callSupport: false },
          { id: "aizen-arrancar", callSupport: false },
          { id: "aizen-arrancar", callSupport: false },
        ],
      },
      support2: null,
      defense1: {
        id: "sado",
        bonds: [
          { id: "aizen-arrancar", callSupport: false },
          { id: "aizen-arrancar", callSupport: false },
          { id: "aizen-arrancar", callSupport: false },
        ],
      },
      defense2: {
        id: "orihime",
        bonds: [],
      },
      defense3: null,
    }
);

function checkTeamDuplicates(team) {
  const usedIds = new Set();

  Object.keys(team).forEach((position) => {
    const slot = team[position];
    if (!slot) return;

    // Проверяем основной id слота
    if (usedIds.has(slot.id)) {
      team[position] = null; // удаляем весь слот
      return;
    }

    usedIds.add(slot.id);

    // Фильтруем bonds
    slot.bonds = slot.bonds.filter((bond) => {
      if (usedIds.has(bond?.id) || !bond) return false;
      usedIds.add(bond.id);
      return true;
    });
  });

  return team;
}

function checkBondsCount(team) {
  for (position in team) {
    const teamMember = team[position];
    if (!teamMember) {
      continue;
    }
    if (teamMember?.id) {
      const { id, bonds } = teamMember;
      const character = getCharacterById(id);
      if (bonds.length < character.maxBonds()) {
        const bondsCount = character.maxBonds();
        team[position].bonds = [...team[position].bonds, ...Array(bondsCount - bonds.length).fill(null)];
      }
    }
  }

  return team;
}

function updateTeam(team) {
  //TODO: позже поменять на зашифрованую
  team = checkTeamDuplicates(team);
  team = checkBondsCount(team);
  localStorage.setItem("team", JSON.stringify(team));
}

function getAvailableCharacters() {
  const charactersList = [];
  for (position in team) {
    const teamMember = team[position];
    if (!teamMember) {
      continue;
    }
    if (teamMember?.id) {
      const { id, bonds } = teamMember;
      charactersList.push(id);
      for (bond of bonds) {
        if (bond) {
          charactersList.push(bond.id);
        }
      }
    }
  }

  const allCharacters = getAllCharacters();
  const filteredCharacters = allCharacters.filter(character => !charactersList.includes(character.id));
  return filteredCharacters;
}

function getAllCharactersCards() {
  var cardsHtml = "";
  for (character of charactersData.characters) {
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
  <div class="card-body" ${character?.id ? `data-id="${character.id}"` : ""} ${character?.rarity ? `data-rarity="${character.rarityToString()}"` : ""}>
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
  return `
    <div class="character-component" data-position="${position}">

    ${getCharacterCardHtml(character)}

<button class="setup-btn">Настроить</button>

<div class="info-panel ${getPositionClass(position)}">
    <span class="position ${getPositionClass(position)}">${positionToString(
    position
  )}</span>
    <div class="name">${characterName}</div>
</div>
</div>
    `;
}

function renderSwapMenu() {
  const swapMenuHtml = `
    <div class="swap-menu" id="swapMenu">
      <div class="menu-content">
      <div class="menu-title">Заменить</div>
        <div class="tabs">
          <button data-filter="all" class="tab active">Все</button>
          <button data-filter="SSR" class="tab">SSR</button>
          <button data-filter="SR" class="tab">SR</button>
          <button data-filter="R" class="tab">R</button>
        </div>
        <div class="menu-grid">
          ${getAvailableCharacters().map(getCharacterCardHtml).join("")}
        </div>
      </div>
    </div>
    `;

  const stageElement = document.querySelector(".stage");
  stageElement.innerHTML += swapMenuHtml;

  const characters = document.querySelectorAll(".character-component")
  const menu = document.getElementById("swapMenu");
  const tabs = document.querySelectorAll(".tab");
  const cards = menu.querySelectorAll(".card-body");

  let currentCharacter = null;

  characters.forEach(character => {
    character.addEventListener("click", (e) => {

      // если уже открыто на этом же персонаже то закрываем
      if (menu.style.display === "block" && currentCharacter === character) {
        closeMenu();
        return;
      }

      currentCharacter = character;
      openMenu(character);
    });
  });

  function openMenu(character) {
    menu.style.display = "block";

    if (window.innerWidth > 768) {
      const rect = character.getBoundingClientRect();
      const menuWidth = 350;

      const spaceRight = window.innerWidth - rect.right;
      const spaceLeft = rect.left;

      if (spaceRight > spaceLeft) {
        menu.style.left = rect.right + 10 + "px";
      } else {
        menu.style.left = rect.left - menuWidth - 10 + "px";
      }

      menu.style.top = rect.top + "px";
    }
  }

  function closeMenu() {
    menu.style.display = "none";
    currentCharacter = null;
  }

  /* ==== Фильтрация ==== */
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {

      document.querySelector(".tab.active").classList.remove("active");
      tab.classList.add("active");

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        if (filter === "all" || card.dataset.rarity === filter) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  cards.forEach(card => {
    card.addEventListener("click", () => {
      if (currentCharacter) {
        const position = currentCharacter.dataset.position;
        team[position].id = card.dataset.id;
        closeMenu();
        renderTeamData(team);
      }
    });
  });

  // перемещение меню вместе со скроллом
  window.addEventListener("scroll", () => {
    if (currentCharacter) openMenu(currentCharacter);
  }, true);
}

function renderTeamData(team) {
  team = checkTeamDuplicates(team);
  team = checkBondsCount(team);
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
  renderRightSidebar(team);
  renderSwapMenu();
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

function renderRightSidebar(team) {
  var sidebarHtml = `<div class="sidebar-right">`;
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
  sidebarHtml += `</div>`;
  const stageElement = document.querySelector(".stage");
  stageElement.innerHTML += sidebarHtml;

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
}

$().ready(() => {
  $(".stage-btn").on("click", function () {
    if ($(this).hasClass("active")) {
      return;
    }
    $(".menu-btn").removeClass("active");
    $(this).addClass("active");
    renderTeamData(team);
  });

  $(".album-btn").on("click", function () {
    $(".menu-btn").removeClass("active");
    $(this).addClass("active");
  });

  $(".bonds-btn").on("click", function () {
    $(".menu-btn").removeClass("active");
    $(this).addClass("active");
  });

  // horizontal scroll
  const stage = document.querySelector(".stage");
  stage.addEventListener("wheel", (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      stage.scrollLeft += e.deltaY;
    }
  });

  renderTeamData(team);
});