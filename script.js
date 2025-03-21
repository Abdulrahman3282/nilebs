document.addEventListener("DOMContentLoaded", function () {
    init();
});

let translations = {};
let currentLang = "en"; // Default language

function init() {
    fetch("translations.json")
        .then(response => response.json())
        .then(data => {
            translations = data;
            applyTranslations(currentLang);
        })
        .catch(error => console.error("Error loading translations:", error));

    const langSwitcher = document.querySelector(".lang-switcher");
    if (langSwitcher) {
        langSwitcher.addEventListener("click", toggleLanguage);
    }
}

function toggleLanguage() {
    currentLang = currentLang === "en" ? "ar" : "en";
    applyTranslations(currentLang);
    document.querySelector(".lang-switcher").textContent = currentLang === "en" ? "AR" : "EN";
}

function applyTranslations(lang) {
    document.querySelectorAll("[data-translate]").forEach(element => {
        const key = element.dataset.translate;
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                element.placeholder = translations[lang][key]; // For input and textarea
            } else {
                element.textContent = translations[lang][key]; // For other elements
            }
        }
    });

    // Update HTML direction for Arabic
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
}
