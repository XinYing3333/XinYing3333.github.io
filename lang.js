const translations = {
    en: {
        //index.html
        title: "My Portfolio",
        name: "Tan Xin Ying",
        slogan: "Game Developer · 2D Artist",
        slogan_2: "Live simply, do what you love.",
        socialTitle: "Social Links",

        //section title
        sectionTitle_Arts:"Gallery",
        sectionTitle_Games:"Solo Projects",
        sectionTitle_Projects:"Projects",

        //Abang
        game_name_Abang:"Good Fishing",
        game_info_Abang:"2024",

        game_tag_Program:"Programming",
        game_tag_GameDesign:"GameDesign",
        game_tag_Art:"Art",
        game_tag_Sfx:"Sfx",
        game_tag_Solo:"Solo Project",


        //GameArt
        art_name_gameArt:"GameArt",
        art_info_gameArt:"",

        //Illustration
        art_name_illustration:"Illustrations & Character Arts",
        art_info_illustration:"",

        //Poster
        art_name_poster:"Event Visual Design",
        art_info_poster:"",

        //3DModel
        art_name_model:"3D Model",
        art_info_model:"",

        //Dispell
        project_name_dispell:"Dispell - 3D Platformer Game",
        project_info_dispell:"2026",

        //BubbleParty
        project_name_bubbleParty:"Bubble Party! - Game Jam",
        project_info_bubbleParty:"2025",

        //Freeze!
        project_name_freeze:"Freeze! - 3D Shooting Party Game",
        project_info_freeze:"2025",

        //Escape from the Cursed Convent
        project_name_escape:"Escape from the Cursed Convent",
        project_info_escape:"2021-2023",

        //Puppet's Heart
        project_name_puppets:"Puppet's Heart",
        project_info_puppets:"2024",

    },
    zh: {
        //index.html
        title: "我的作品集",
        name: "陳欣瑩",
        slogan: "遊戲開發 · 2D美術",
        slogan_2: "簡簡單單過日子，踏踏實實做喜歡的事。",
        socialTitle: "社群連結",

        //section title
        sectionTitle_Arts:"美術",
        sectionTitle_Games:"個人專案",
        sectionTitle_Projects:"專案",

        //Abang
        game_name_Abang:"阿棒愛釣魚",
        game_info_Abang:"2024",

        game_tag_Program:"程式",
        game_tag_GameDesign:"企劃",
        game_tag_Art:"美術",
        game_tag_Sfx:"音效",
        game_tag_Solo:"個人專案",

        //GameArt
        art_name_gameArt:"遊戲美術",
        art_info_gameArt:"",

        //Illustration
        art_name_illustration:"角色插圖&立繪",
        art_info_illustration:"",

        //Poster
        art_name_poster:"活動視覺設計",
        art_info_poster:"",

        //3DModel
        art_name_model:"3D模型",
        art_info_model:"",

        //Dispell-fix
        project_name_dispell:"Dispell - 3D 平臺跳躍冒險游戲",
        project_info_dispell:"2026",

        //BubbleParty
        project_name_bubbleParty:"泡泡派對! - Game Jam",
        project_info_bubbleParty:"2025",

        //Freeze!
        project_name_freeze:"Freeze! - 3D射擊派對遊戲",
        project_info_freeze:"2025",

        //Escape from the Cursed Convent
        project_name_escape:"逃離地獄邊緣",
        project_info_escape:"2021-2023",

        //Puppet's Heart
        project_name_puppets:"布偶之心",
        project_info_puppets:"2024",
    },
};

function toggleLanguage(lang) {
    document.querySelectorAll('[data-lang]').forEach(el => {
        el.style.display = el.getAttribute('data-lang') === lang ? 'block' : 'none';
    });
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);
}

function setLangAndGo(lang) {
    localStorage.setItem('lang', lang);
    window.location.href = 'index.html';
}

function applyLang(lang) {
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach((el) => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang') || 'zh';
    applyLang(lang)
    toggleLanguage(lang);
});