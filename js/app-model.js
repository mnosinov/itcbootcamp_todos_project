var todos = [
	{id: 1, title: "Completed online JavaScript course", status: "COMPLETED"},
	{id: 2, title: "Jog around the park 3x", status: "ACTIVE"},
	{id: 3, title: "10 minutes meditation", status: "ACTIVE"},
	{id: 4, title: "Read for 1 hour", status: "ACTIVE"},
	{id: 5, title: "Pick up groceries", status: "ACTIVE"},
	{id: 6, title: "Complete Todo App on Frontend Mentor", status: "ACTIVE"}
];
console.log(todos[1]);

/* theme switcher ---------------------------------- BEGIN */
themeSwitcherBtn.addEventListener('click', event => {
	let currentTheme;
	for (let cls of document.body.classList) {
		if (themes.includes(cls)) {
			currentTheme = cls;
			break;
		}
	}
	if (currentTheme === undefined) {
		currentTheme = themes[0];
	}
	let indexOfCurrentTheme = themes.indexOf(currentTheme);
	let nextThemeIndex = (indexOfCurrentTheme + 1) % themes.length;
	document.body.classList.toggle(themes[indexOfCurrentTheme]);
	document.body.classList.toggle(themes[nextThemeIndex]);
});
/* theme switcher ---------------------------------- END */
