/**
 * ```ts
 * {
 *   dark = 'dark',
     light = 'light',
     OS = 'OS'
 * }
 * ``` 
 */
export enum ColorPreference {
	dark = "dark",
	light = "light",
	OS = "OS",
}

/** Configures preferred color scheme
 *
 */
const loadDarkMode = (): void => {
	const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

	updateMode();

	colorSchemeQuery.addEventListener("change", updateMode);
};

const updateMode = () => {
	const colorSchemeQuery = window.matchMedia("(prefers-color-scheme: dark)");

	if (localStorage.theme === "dark" || (!("theme" in localStorage) && colorSchemeQuery.matches)) {
		document.documentElement.classList.add("dark");
	} else {
		document.documentElement.classList.remove("dark");
	}
};

/** Gets the current color scheme preference
 *
 * @returns
 */
const getCurrentPreference = (): ColorPreference => {
	if (localStorage.theme === "dark") return ColorPreference.dark;

	if (localStorage.theme === "light") return ColorPreference.light;

	return ColorPreference.OS;
};

/** Changes the current color scheme preference
 *
 * @param preference
 */
const changePreference = (preference: ColorPreference) => {
	if (preference === ColorPreference.OS) localStorage.removeItem("theme");

	if (preference === ColorPreference.light) localStorage.theme = "light";

	if (preference === ColorPreference.dark) localStorage.theme = "dark";

	loadDarkMode();
};

export { loadDarkMode, changePreference, getCurrentPreference };
