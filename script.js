document.addEventListener("DOMContentLoaded", function () {
    // Initialize with default language
    let currentLang = "en";
    let translations = {};

    // Load translations immediately
    fetch("translations.json")
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.json();
        })
        .then(data => {
            translations = data;
            applyTranslations(currentLang);
            initEventListeners();
        })
        .catch(error => {
            console.error("Failed to load translations:", error);
            // Fallback to English if translations fail to load
            applyTranslations('en');
        });

    function initEventListeners() {
        const langSwitcher = document.querySelector(".lang-switcher");
        if (langSwitcher) {
            langSwitcher.addEventListener("click", function() {
                currentLang = currentLang === "en" ? "ar" : "en";
                applyTranslations(currentLang);
                this.textContent = currentLang === "en" ? "AR" : "EN";
            });
        }
    }

    function applyTranslations(lang) {
        if (!translations[lang]) {
            console.warn(`No translations found for language: ${lang}`);
            return;
        }

        document.querySelectorAll("[data-translate]").forEach(element => {
            const key = element.dataset.translate;
            const translation = translations[lang][key];

            if (translation) {
                if (element.placeholder) {
                    element.placeholder = translation;
                } else if (element.alt) {
                    element.alt = translation;
                } else {
                    element.textContent = translation;
                }
            } else {
                console.warn(`Missing translation for key: ${key}`);
            }
        });

        // Update document direction and language
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    }
});
