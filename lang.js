const translations = {
    en: {
        //intro.html
        title: "My Portfolio",
        name: "Tan Xin Ying",
        slogan: "Game Developer · 2D Artist",
        slogan_2: "Live simply, do what you love.",
        socialTitle: "Social Links",

        //section title
        sectionTitle_Arts:"Arts",
        sectionTitle_Games:"Solo Projects",
        sectionTitle_Projects:"Group Projects",

        //Abang
        game_name_Abang:"Good Fishing",
        game_info_Abang:"A 2D mini game that develop with Unity.",

        game_tag_Program:"Programming",
        game_tag_GameDesign:"GameDesign",
        game_tag_Art:"Art",
        game_tag_Sfx:"Sfx",

        //CharacterArt
        art_name_character:"Character Art",
        art_info_character:"",

        //Illustration
        art_name_illustration:"Illustration",
        art_info_illustration:"",

        //Poster
        art_name_poster:"Event Visual Design",
        art_info_poster:"",

        //EnvironmentArt
        art_name_environment:"Environment Design",
        art_info_environment:"Game environment concept design.",

        //BubbleParty
        project_name_bubbleParty:"Bubble Party!",
        project_info_bubbleParty:"Project of GGJ-2025.",

        //Escape from the Cursed Convent
        project_name_escape:"Escape from the Cursed Convent",
        project_info_escape:"Published indie game project.",

        //Puppet's Heart
        project_name_puppets:"Puppet's Heart",
        project_info_puppets:"Year 2 Game Project.",

    },
    zh: {
        //intro.html
        title: "我的作品集",
        name: "陳欣瑩",
        slogan: "遊戲開發 · 2D美術",
        slogan_2: "簡簡單單過日子，踏踏實實做喜歡的事。",
        socialTitle: "社群連結",

        //section title
        sectionTitle_Arts:"美術",
        sectionTitle_Games:"個人專案",
        sectionTitle_Projects:"團隊專案",

        //Abang
        game_name_Abang:"阿棒愛釣魚",
        game_info_Abang:"使用 Unity 開發的 2D 釣魚小遊戲",

        game_tag_Program:"程式",
        game_tag_GameDesign:"企劃",
        game_tag_Art:"美術",
        game_tag_Sfx:"音效",

        //CharacterArt
        art_name_character:"角色立繪",
        art_info_character:"",

        //Illustration
        art_name_illustration:"角色插圖",
        art_info_illustration:"",

        //Poster
        art_name_poster:"活動視覺設計",
        art_info_poster:"",

        //EnvironmentArt
        art_name_environment:"場景設計",
        art_info_environment:"遊戲場景概念設計。",

        //BubbleParty
        project_name_bubbleParty:"泡泡派對!",
        project_info_bubbleParty:"GGJ-2025 參與作品。",

        //Escape from the Cursed Convent
        project_name_escape:"逃離地獄邊緣",
        project_info_escape:"已上架的獨立遊戲專案。",

        //Puppet's Heart
        project_name_puppets:"布偶之心",
        project_info_puppets:"大二小專題作品",
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
    window.location.href = 'intro.html';
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