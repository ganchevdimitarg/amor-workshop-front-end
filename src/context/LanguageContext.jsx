import { createContext, useContext, useEffect, useState } from "react";
import { translations } from "../i18n/translations";

const LanguageContext = createContext(null);
const STORAGE_KEY = "lindenstudio_lang";

function detectDefault() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "bg") return stored;
  } catch {
    // localStorage can be unavailable (private browsing) — fall through.
  }
  if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("bg")) {
    return "bg";
  }
  return "en";
}

function resolve(dict, path) {
  return path.split(".").reduce((node, key) => (node && node[key] !== undefined ? node[key] : undefined), dict);
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectDefault);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Nothing to do if storage isn't available — language just won't persist.
    }
    document.documentElement.lang = lang;
  }, [lang]);

  // t("checkout.thanks", { name: "Maya" }) -> looks up translations[lang].checkout.thanks
  // and replaces {name} with "Maya". Falls back to English, then to the key itself,
  // so a missing translation never crashes the page.
  function t(key, vars) {
    const template = resolve(translations[lang], key) ?? resolve(translations.en, key) ?? key;
    if (!vars) return template;
    return Object.keys(vars).reduce((str, varName) => str.replace(`{${varName}}`, vars[varName]), template);
  }

  const value = { lang, setLang, t };
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside a LanguageProvider");
  return ctx;
}
