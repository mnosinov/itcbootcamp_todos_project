/* initial data --------------------------------BEGIN */
var todos = [
	{id: 6, title: "Completed online JavaScript course", status: "COMPLETED"},
	{id: 5, title: "Jog around the park 3x", status: "ACTIVE"},
	{id: 4, title: "10 minutes meditation", status: "ACTIVE"},
	{id: 3, title: "Read for 1 hour", status: "COMPLETED"},
	{id: 2, title: "Pick up groceries", status: "ACTIVE"},
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
	// apply current filter. One of: all, active, completed
	let activeFilter = todosFilterDiv.querySelector('.active-filter'); 
	let filteredTodos = todos.slice();
	switch (activeFilter.dataset.id) {
		case 'active':
			filteredTodos = filteredTodos.filter( item => item.status === 'ACTIVE' );
			break;
		case 'completed':
			filteredTodos = filteredTodos.filter( item => item.status === 'COMPLETED' );
			break;
	}
	// loop in reverse order
	let filteredAndOrderedTodos = filteredTodos.sort( (a, b) => b.orderNumber - a.orderNumber);
	for (let todo of filteredAndOrderedTodos) {
		todosDiv.innerHTML += `
			<div class="todo">
				<input type="checkbox" class="checkbox" data-id="${todo.id}"
					${todo.status === 'COMPLETED'? 'checked': ''} >
				<input type="text" value="${todo.title}" data-id="${todo.id}" class="status-${todo.status}">
			</div>
		`;
	}
	showItemsleftQnt();
}

// show active items left quantity
function showItemsleftQnt() {
	let itemsLeftQnt = todos.filter( item => item.status === 'ACTIVE').length;
	itemsLeftQntSpan.innerHTML = `${pluralize(itemsLeftQnt, 'item')} left`;
}

// english simple pluralize processor
function pluralize( count, noun, suffix = 's') {
  return `${count} ${noun}${count > 1 ? suffix : ''}`;
}

// filters handlers initialization
function initFilters() {
	let filterBtns = todosFilterDiv.querySelectorAll('.todos-filter-btn');
	for (let filterBtn of filterBtns) {
		filterBtn.addEventListener('click', event => {
			// remove active-filter class from all buttons
			let btns = todosFilterDiv.querySelectorAll('.todos-filter-btn');
			btns.forEach( item => item.classList.remove('active-filter') );
			// set active-filter class to the current button
			event.target.classList.add('active-filter');
			showTodos();
		});
	}
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

initFilters();
showTodos();
