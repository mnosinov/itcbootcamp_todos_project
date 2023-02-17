/* initial data --------------------------------BEGIN */
var todos = [
	{id: 6, title: "Completed online JavaScript course", status: "COMPLETED"},
	{id: 5, title: "Jog around the park 3x", status: "ACTIVE"},
	{id: 4, title: "10 minutes meditation", status: "ACTIVE"},
	{id: 3, title: "Read for 1 hour", status: "ACTIVE"},
	{id: 2, title: "Pick up groceries", status: "COMPLETED"},
	{id: 1, title: "Complete Todo App on Frontend Mentor", status: "ACTIVE"}
];
// add orderNumber, by default it is equal to id
todos.forEach( item => {
	item.orderNumber = item.id;
});
console.log(todos[1]);

/* initial data --------------------------------END */

// show todos list
function showTodos() {
	todosDiv.innerHTML = '';

	// loop in reverse order
	let orderedTodos = todos.sort( (a, b) => b.orderNumber - a.orderNumber);
	for (let todo of orderedTodos) {
		todosDiv.innerHTML += `
			<div class="todo">
				<input type="checkbox" class="checkbox" data-id="${todo.id}"
					${todo.status === 'COMPLETED'? 'checked': ''} >
				<input type="text" value="${todo.title}" data-id="${todo.id}" class="status-${todo.status}">
			</div>
		`;
	}
}

// show active items left quantity
function showItemsleftQnt() {
	let itemsLeftQnt = todos.filter( item => item.status === 'ACTIVE').length;
	itemsLeftQntSpan.innerHTML = `${itemsLeftQnt} items left`;
}

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

showTodos();
showItemsleftQnt();
