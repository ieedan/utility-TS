"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentPreference = exports.changePreference = exports.loadDarkMode = exports.ColorPreference = void 0;
/**
 * ```ts
 * {
 *   dark = 'dark',
     light = 'light',
     OS = 'OS'
 * }
 * ```
 */
var ColorPreference;
(function (ColorPreference) {
    ColorPreference["dark"] = "dark";
    ColorPreference["light"] = "light";
    ColorPreference["OS"] = "OS";
})(ColorPreference || (exports.ColorPreference = ColorPreference = {}));
/** Configures preferred color scheme
 *
 */
const loadDarkMode = () => {
    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    updateMode();
    colorSchemeQuery.addEventListener("change", updateMode);
};
exports.loadDarkMode = loadDarkMode;
const updateMode = () => {
    const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    if (localStorage.theme === "dark" || (!("theme" in localStorage) && colorSchemeQuery.matches)) {
        document.documentElement.classList.add("dark");
    }
    else {
        document.documentElement.classList.remove("dark");
    }
};
/** Gets the current color scheme preference
 *
 * @returns
 */
const getCurrentPreference = () => {
    if (localStorage.theme === "dark")
        return ColorPreference.dark;
    if (localStorage.theme === "light")
        return ColorPreference.light;
    return ColorPreference.OS;
};
exports.getCurrentPreference = getCurrentPreference;
/** Changes the current color scheme preference
 *
 * @param preference
 */
const changePreference = (preference) => {
    if (preference === ColorPreference.OS)
        localStorage.removeItem("theme");
    if (preference === ColorPreference.light)
        localStorage.theme = "light";
    if (preference === ColorPreference.dark)
        localStorage.theme = "dark";
    loadDarkMode();
};
exports.changePreference = changePreference;
