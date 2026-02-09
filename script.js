$().ready(() => {
    const team = [
        main = {
            id: 'aizen-arrancar',
            bonds: [
                {
                    id: 'aizen-arrancar',
                    callSupport: false
                },
                {
                    id: 'aizen-arrancar',
                    callSupport: false
                },
                {
                    id: 'aizen-arrancar',
                    callSupport: false
                },
            ]
        },
        support1 = {
            id: 'ichigo-dangai',
            bonds: [
                {
                    id: 'aizen-arrancar',
                    callSupport: false
                },
                {
                    id: 'aizen-arrancar',
                    callSupport: false
                },
                {
                    id: 'aizen-arrancar',
                    callSupport: false
                },
            ]
        },
        support2 = null,
        defense1 = {
            id: 'aizen-arrancar',
            bonds: [
                {
                    id: 'aizen-arrancar',
                    callSupport: false
                },
                {
                    id: 'aizen-arrancar',
                    callSupport: false
                },
                {
                    id: 'aizen-arrancar',
                    callSupport: false
                },
            ]
        },
        defense2 = null,
        defense3 = null
    ];

    let charactersJson = charactersData;

    function getCharacterCardHtml(characterId, bonds) {
        const character = getCharacterById(characterId);
        const characterName = character?.name || 'Character';
        const characterImg = getCharacterImagePath(character);
        const characterRarity = rarityToString(character);
        const bondsHtml = bonds.map(bond => {
            const bondCharacter = charactersJson.characters.find(c => c.id === bond.id);
            const bondCharacterName = bondCharacter?.name || 'Character';
            return `<div class="bond">${bondCharacterName}</div>`;
        }).join('');
        return `
        <div class="character-component">
    
        <div class="card-body">
        <div class="portrait-block">
            <img src="${characterImg}" alt="${characterName}">
        </div>
        
        <div class="tier-block">
            <span class="tier-text">${characterRarity}</span>
        </div>
    </div>

    <button class="setup-btn">Настроить</button>

    <div class="info-panel">
        <div class="name">${characterName}</div>
        <div class="subtext">undefined</div>
    </div>

    <!--<div class="bonds">${bondsHtml}</div> -->

</div>
        `;
    }

    function renderTeamData() {
        const teamDataHtml = team.map(teamMember => {
            if (!teamMember?.id) return '<div class="empty-character-card"><img src="images/add-button.png"></div>';
            const { id, bonds } = teamMember;
            return getCharacterCardHtml(id, bonds);
        }).join('');
        const stageElement = document.querySelector('.stage');
        stageElement.innerHTML = teamDataHtml;
    }

    const stage = document.querySelector('.stage');
    stage.addEventListener('wheel', (e) => {
        if (e.deltaY !== 0) {
            e.preventDefault();
            stage.scrollLeft += e.deltaY;
        }
    });

    renderTeamData();
});