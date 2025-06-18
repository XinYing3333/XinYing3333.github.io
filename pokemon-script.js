function submitGuess() {
    const number = parseInt(document.getElementById('guessInput').value);

    fetch('/guess', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ number })
    })
        .then(res => res.json())
        .then(data => {
            document.getElementById('response').innerText = data.message;
        });
}

// 自動初始化遊戲
fetch('/start')
    .then(res => res.json())
    .then(data => {
        console.log(data.message);
    });

let isBattle = false;


// PokéAPI 基礎 URL
const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

// 類型對應的表情符號
const typeEmojis = {
    normal: '⚪', fire: '🔥', water: '💧', electric: '⚡', grass: '🌱',
    ice: '❄️', fighting: '👊', poison: '☠️', ground: '🌍', flying: '🦅',
    psychic: '🧠', bug: '🐛', rock: '🗿', ghost: '👻', dragon: '🐉',
    dark: '🌙', steel: '⚙️', fairy: '🧚'
};

// 中文名稱對照（部分常見寶可夢）
const chineseNames = {
    'pikachu': '皮卡丘', 'charizard': '噴火龍', 'blastoise': '水箭龜',
    'venusaur': '妙蛙花', 'charmander': '小火龍', 'squirtle': '傑尼龜',
    'bulbasaur': '妙蛙種子', 'mewtwo': '超夢', 'mew': '夢幻',
    'articuno': '急凍鳥', 'zapdos': '閃電鳥', 'moltres': '火焰鳥',
    'dragonite': '快龍', 'gyarados': '暴鯉龍', 'lapras': '乘龍',
    'eevee': '伊布', 'snorlax': '卡比獸', 'gengar': '耿鬼',
    'alakazam': '胡地', 'machamp': '怪力', 'golem': '隆隆岩'
};

// 遊戲狀態
let gameState = {
    playerLevel: 1,
    playerExp: 0,
    winCount: 0,
    myPokemon: [],
    currentBattle: null,
    playerCurrentPokemon: null,
    enemyCurrentPokemon: null
};

// 初始化
function init() {
    createStars();
    updateStats();
    addBattleLog('歡迎來到寶可夢世界！點擊「探索野生寶可夢」開始你的冒險！');
}

// 創建星星背景
function createStars() {

    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 2 + 's';
        starsContainer.appendChild(star);
    }
}

// 調用真實的 PokéAPI
async function callPokemonAPI(pokemonId) {
    try {
        const response = await fetch(`${POKEAPI_BASE_URL}${pokemonId}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return formatPokemonData(data);
    } catch (error) {
        console.error('API 調用失敗:', error);
        throw error;
    }
}

// 格式化寶可夢數據
function formatPokemonData(apiData) {
    const mainType = apiData.types[0].type.name;
    const stats = {};

    apiData.stats.forEach(stat => {
        stats[stat.stat.name.replace('-', '_')] = stat.base_stat;
    });

    return {
        id: apiData.id,
        name: chineseNames[apiData.name] || apiData.name,
        englishName: apiData.name,
        type: mainType,
        types: apiData.types.map(t => t.type.name),
        emoji: typeEmojis[mainType] || '🎯',
        image: apiData.sprites.front_default,
        hp: stats.hp || 50,
        attack: stats.attack || 50,
        defense: stats.defense || 50,
        speed: stats.speed || 50,
        height: apiData.height,
        weight: apiData.weight,
        rarity: getRarity(stats.hp + stats.attack + stats.defense)
    };
}

// 根據總能力值判斷稀有度
function getRarity(totalStats) {
    if (totalStats >= 400) return 'legendary';
    if (totalStats >= 300) return 'rare';
    if (totalStats >= 200) return 'uncommon';
    return 'common';
}

// 獲取隨機寶可夢ID（第一代寶可夢 1-151）
function getRandomPokemonId() {
    return Math.floor(Math.random() * 151) + 1;
}

// 顯示載入狀態
function showLoading(show = true) {
    document.getElementById('loading').classList.toggle('hidden', !show);
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomLoadingMessage() {
    const messages = [
        '正在穿越草叢...',
        '正在翻過山崖...',
        '跳入水中...',
        '走進洞穴...',
        '潛入高草中...',
        '跟著腳印前進中...'
    ];
    const index = Math.floor(Math.random() * messages.length);
    return messages[index];
}

// 載入隨機寶可夢
async function loadRandomPokemon() {
    if(isBattle){
        addBattleLog('戰鬥中請保持專心！');
    }else{
        showLoading(true);
        document.getElementById('pokemonGrid').innerHTML = '';

        try {
            // 一次載入 3 隻隨機寶可夢
            const pokemonPromises = [];
            for (let i = 0; i < 3; i++) {
                pokemonPromises.push(callPokemonAPI(getRandomPokemonId()));
            }
            const message = getRandomLoadingMessage();
            addBattleLog(message);


            // 人為延遲 2 秒
            await delay(2000);

            const pokemon = await Promise.all(pokemonPromises);
            displayPokemon(pokemon);
            addBattleLog(`發現了 ${pokemon.length} 隻野生寶可夢！`);
        } catch (error) {
            console.error('載入寶可夢失敗:', error);
            addBattleLog('載入失敗，請稍後再試...');
        } finally {
            showLoading(false);
        }
    }
}

// 顯示寶可夢
function displayPokemon(pokemon) {
    const grid = document.getElementById('pokemonGrid');
    grid.classList.add('active');
    grid.innerHTML = '';

    pokemon.forEach(p => {
        const pokemonElement = document.createElement('div');
        pokemonElement.className = 'pokemon-item';

        // 顯示所有屬性
        const typeBadges = p.types.map(type =>
            `<span class="type-badge type-${type}">${type}</span>`
        ).join('');

        pokemonElement.innerHTML = `
                    <div class="pokemon-image">
                        ${p.image ? `<img src="${p.image}" alt="${p.name}" style="width: 100px; height: 100px;">` : p.emoji}
                    </div>
                    <h3>${p.name}</h3>
                    <p class="english-name" style="font-size: 0.9em; color: #888;">${p.englishName}</p>
                    <div>${typeBadges}</div>
                    <div style="margin: 10px 0; font-size: 0.9em;">
                        <div>❤️ HP: ${p.hp}</div>
                        <div>⚔️ 攻擊: ${p.attack}</div>
                        <div>🛡️ 防禦: ${p.defense}</div>
                        <div>💨 速度: ${p.speed}</div>
                    </div>
                    <div class="type-badge type-${p.rarity}" style="background: ${getRarityColor(p.rarity)};">
                        ${p.rarity}
                    </div>
                `;
        pokemonElement.onclick = () => selectPokemon(p);
        grid.appendChild(pokemonElement);
    });
}

// 獲取稀有度顏色
function getRarityColor(rarity) {
    switch (rarity) {
        case 'legendary': return '#ff4545';
        case 'rare': return '#9970ff';
        case 'uncommon': return '#53a7ff';
        case 'common': return '#2ed573';
        default: return '#ddd';
    }
}

// 選擇寶可夢
function selectPokemon(pokemon) {
    gameState.playerCurrentPokemon = { ...pokemon, currentHP: pokemon.hp , defense : pokemon.defense };
    updatePlayerPokemon();
    addBattleLog(`你選擇了 ${pokemon.name}！`);
}

// 開始隨機對戰
async function startRandomBattle() {
    if (!gameState.playerCurrentPokemon) {
        addBattleLog('身上沒有寶可夢，怎麽能稱作是寶可夢訓練家？...請先選擇一隻寶可夢！');
        return;
    }

    showLoading(true);

    try {
        // 獲取隨機敵人寶可夢
        const enemy = await callPokemonAPI(getRandomPokemonId());
        gameState.enemyCurrentPokemon = { ...enemy, currentHP: enemy.hp ,defense: enemy.defense};

        document.getElementById('battleArena').classList.add('active');
        document.getElementById('pokemonGrid').classList.remove('active');
        updateEnemyPokemon();
        addBattleLog(`野生的 ${enemy.name} 出現了！`);
        addBattleLog('戰鬥開始！');
        isBattle = true;
    } catch (error) {
        console.error('無法開始戰鬥:', error);
        addBattleLog('載入對手失敗，請稍後再試...');
        isBattle = false;
    } finally {
        showLoading(false);
    }
}

// 更新玩家寶可夢顯示
function updatePlayerPokemon() {
    const pokemon = gameState.playerCurrentPokemon;
    if (!pokemon) return;

    const imageElement = document.getElementById('playerImage');
    if (pokemon.image) {
        imageElement.innerHTML = `<img src="${pokemon.image}" alt="${pokemon.name}" style="width: 120px; height: 120px;">`;
    } else {
        imageElement.textContent = pokemon.emoji;
    }

    document.getElementById('playerName').textContent = pokemon.name;

    const typeBadges = pokemon.types ? pokemon.types.map(type =>
        `<span class="type-badge type-${type}">${type}</span>`
    ).join('') : `<span class="type-badge type-${pokemon.type}">${pokemon.type}</span>`;

    document.getElementById('playerStats').innerHTML = `
                ${typeBadges}
                <p>HP: ${pokemon.currentHP}/${pokemon.hp}</p>
                <p>攻擊: ${pokemon.attack} | 防禦: ${pokemon.defense}</p>
            `;

    const hpPercent = (pokemon.currentHP / pokemon.hp) * 100;
    document.getElementById('playerHP').style.width = hpPercent + '%';
}

// 更新敵人寶可夢顯示
function updateEnemyPokemon() {
    const pokemon = gameState.enemyCurrentPokemon;
    if (!pokemon) return;

    const imageElement = document.getElementById('enemyImage');
    if (pokemon.image) {
        imageElement.innerHTML = `<img src="${pokemon.image}" alt="${pokemon.name}" style="width: 120px; height: 120px;">`;
    } else {
        imageElement.textContent = pokemon.emoji;
    }

    document.getElementById('enemyName').textContent = pokemon.name;

    const typeBadges = pokemon.types ? pokemon.types.map(type =>
        `<span class="type-badge type-${type}">${type}</span>`
    ).join('') : `<span class="type-badge type-${pokemon.type}">${pokemon.type}</span>`;

    document.getElementById('enemyStats').innerHTML = `
                ${typeBadges}
                <p>HP: ${pokemon.currentHP}/${pokemon.hp}</p>
                <p>攻擊: ${pokemon.attack} | 防禦: ${pokemon.defense}</p>
            `;

    const hpPercent = (pokemon.currentHP / pokemon.hp) * 100;
    document.getElementById('enemyHP').style.width = hpPercent + '%';
}

// 攻擊動作
function attack(type) {
    if (!gameState.playerCurrentPokemon || !gameState.enemyCurrentPokemon) return;

    const player = gameState.playerCurrentPokemon;
    const enemy = gameState.enemyCurrentPokemon;

    let damage = 0;
    let message = '';

    switch (type) {
        case 'tackle':
            damage = (Math.floor(player.attack * 0.8 - Math.random() * 20)) - (enemy.defense/10);
            message = `${player.name} 使用撞擊造成 ${damage} 點傷害！`;
            break;
        case 'special':
            damage = (Math.floor(player.attack * 1.2 - Math.random() * 30)) - (enemy.defense/10);
            message = `${player.name} 使用特殊攻擊造成 ${damage} 點傷害！`;
            break;
        case 'heal':
            const healAmount = Math.floor(player.hp * 0.3);
            player.currentHP = Math.min(player.hp, player.currentHP + healAmount);
            message = `${player.name} 恢復了 ${healAmount} HP！`;
            updatePlayerPokemon();
            addBattleLog(message);
            enemyAttack();
            return;
    }

    enemy.currentHP = Math.max(0, enemy.currentHP - damage);
    updateEnemyPokemon();
    addBattleLog(message);

    if (enemy.currentHP <= 0) {
        endBattle(true);
        return;
    }

    setTimeout(enemyAttack, 1000);
}

// 敵人攻擊
function enemyAttack() {
    if (!gameState.enemyCurrentPokemon || !gameState.playerCurrentPokemon) return;

    const enemy = gameState.enemyCurrentPokemon;
    const player = gameState.playerCurrentPokemon;

    const damage = (Math.floor(enemy.attack * 0.8 + Math.random() * 20)) - (player.defense/5);
    player.currentHP = Math.max(0, player.currentHP - damage);

    addBattleLog(`${enemy.name} 攻擊造成 ${damage} 點傷害！`);
    updatePlayerPokemon();

    if (player.currentHP <= 0) {
        endBattle(false);
    }
}

// 收服寶可夢
function catchPokemon() {
    if (!gameState.enemyCurrentPokemon) return;

    const enemy = gameState.enemyCurrentPokemon;
    const catchRate = (1 - enemy.currentHP / enemy.hp) * 0.7 + 0.1;

    if (Math.random() < catchRate) {
        gameState.myPokemon.push({ ...enemy, currentHP: enemy.hp });
        addBattleLog(`成功收服了 ${enemy.name}！`);
        const names = gameState.myPokemon.map(p => p.name).join('、');
        addBattleLog(`目前寶可夢： ${names}`);

        endBattle(true);
    } else {
        addBattleLog(`${enemy.name} 掙脫了精靈球！`);
        enemyAttack();
    }
}

// 結束戰鬥
async function endBattle(victory) {
    if (victory) {
        const exp = Math.floor(Math.random() * 50) + 10;
        gameState.playerExp += exp;
        gameState.winCount++;

        if (gameState.playerExp >= gameState.playerLevel * 100) {
            gameState.playerLevel++;
            gameState.playerExp = 0;
            addBattleLog(`恭喜！你升級到了 ${gameState.playerLevel} 級！`);
        }
        isBattle = false;

        addBattleLog(`戰鬥勝利！獲得 ${exp} 經驗值！`);
    } else {
        isBattle = false;

        addBattleLog('戰鬥失敗...');
    }

    updateStats();
    setTimeout(() => {
        document.getElementById('battleArena').classList.remove('active');
        gameState.currentBattle = null;
    }, 2000);
}

// 顯示我的寶可夢
function showMyPokemon() {
    displayPokemon(gameState.myPokemon);
    addBattleLog(`你擁有 ${gameState.myPokemon.length} 隻寶可夢！`);
}


// 添加戰鬥日誌
function addBattleLog(message) {
    const log = document.getElementById('battleLog');
    const entry = document.createElement('div');
    entry.className = 'log-entry';
    entry.id = 'typedtext';
    entry.textContent = `> ${message}`;
    log.appendChild(entry);
    log.scrollTop = log.scrollHeight;
}

// 更新統計數據
function updateStats() {
    document.getElementById('playerLevel').textContent = gameState.playerLevel;
    document.getElementById('playerExp').textContent = gameState.playerExp;
    document.getElementById('winCount').textContent = gameState.winCount;
    document.getElementById('pokemonCount').textContent = gameState.myPokemon.length;
}

// 初始化遊戲
init();