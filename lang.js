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
        game_tag_Art:"Art",

        //CharacterArt
        art_name_character:"Character Design",
        art_info_character:"Game character concept design.",

        //EnvironmentArt
        art_name_environment:"Environment Design",
        art_info_environment:"Game environment concept design.",

        //BubbleParty
        project_name_bubbleParty:"Bubble Party!",
        project_info_bubbleParty:"Project of GGJ-2025.",

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
        game_tag_Art:"美術",

        //CharacterArt
        art_name_character:"角色設計",
        art_info_character:"游戲角色概念設計。",

        //EnvironmentArt
        art_name_environment:"場景設計",
        art_info_environment:"游戲場景概念設計。",

        //BubbleParty
        project_name_bubbleParty:"泡泡派對!",
        project_info_bubbleParty:"GGJ-2025 參與作品.",
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

function setLang(lang) {
    localStorage.setItem("lang", lang);
    applyLang(lang);
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

/*function createLangToggle() {
    const currentLang = localStorage.getItem("lang") || "zh";
    const langToggle = document.createElement("button");
    langToggle.className = "lang-toggle";
    langToggle.innerHTML = currentLang === "zh"
        ? '<i>EN</i>'
        : '<i>ZH</i>';
    document.body.appendChild(langToggle);

    langToggle.addEventListener("click", () => {
        const newLang = localStorage.getItem("lang") === "zh" ? "en" : "zh";
        localStorage.setItem("lang", newLang);
        applyLang(newLang); // 呼叫你的語言套用函式
        langToggle.innerHTML = newLang === "zh"
            ? '<i>EN</i>'
            : '<i>ZH</i>';
    });
}*/




window.addEventListener('DOMContentLoaded', () => {
    const lang = localStorage.getItem('lang') || 'zh';
    applyLang(lang)
    toggleLanguage(lang);
});