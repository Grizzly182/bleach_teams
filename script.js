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

    function getCharacterCardHtml(id, bonds) {
        return `
            <div class="character-card" data-id="${id}">
                <div class="char-model">
                    <div class="card-top"><img src="images/characters/${charactersJson.characters.find(character => character.id === id)?.img}" alt="${id}" style="width: 100%; height: 100%; object-fit: contain"></div>
                </div>
                ${bonds.map(bond => `<div class="bond" data-id="${bond.id}" data-call-support="${bond.callSupport}"></div>`).join('')}
                <div class="config-btn">Настроить</div>
                <div class="char-info role-attack">
                    <h3>${charactersJson.characters.find(character => character.id === id)?.name}</h3>
                    <p>Новолуние</p>
                </div>
                <div class="swap-icon">↻</div>
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