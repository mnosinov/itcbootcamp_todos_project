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

	if (filteredAndOrderedTodos.length != 0) {
		for (let todo of filteredAndOrderedTodos) {
			todosDiv.innerHTML += `
				<div class="todo">
					<input type="checkbox" class="complete-checkbox" data-id="${todo.id}"
						${todo.status === 'COMPLETED'? 'checked': ''} >
					<input type="text" value="${todo.title}" data-id="${todo.id}" class="status-${todo.status}">
					<button class="remove-todo-btn" data-id="${todo.id}">
						<img src="images/icon-cross.svg" alt="Remove Todo">
					</button>
				</div>
			`;
		}
		initTodoRemoveBtns();
		initCompleteCheckboxes();
	} else {
		todosDiv.innerHTML = `<div class="there-is-no-todos">Nothing to show</div>`;
	}
	showItemsleftQnt();
	initDragAndDrop();
}

// init complete checkboxes
function initCheckboxes() {
	let completeCheckboxes = document.querySelectorAll('.remove-todo-btn');

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
	let filterBtns = document.querySelectorAll('.todos-filter-btn');
	for (let filterBtn of filterBtns) {
		filterBtn.addEventListener('click', event => {
			// remove active-filter class from all buttons
			let btns = document.querySelectorAll('.todos-filter-btn');
			btns.forEach( item => item.classList.remove('active-filter') );
			// set active-filter class to the current filter buttons
			let currentActiveFilter = event.target.dataset.id;
			btns.forEach( item => {
				if (item.dataset.id === currentActiveFilter) {
					item.classList.add('active-filter');
				}
			});
			showTodos();
		});
	}
}

// remove buttons initialization
function initTodoRemoveBtns() {
	let removeBtns = document.querySelectorAll('.remove-todo-btn');
	for (let btn of removeBtns) {
		btn.addEventListener( 'click', event => {
			// remove this todo
			let todoIdToRemove = btn.dataset.id;
			// find this todo index in array
			let todoIndexToRemove = todos.findIndex( item => item.id == todoIdToRemove );
			// remove todo
			todos.splice(todoIndexToRemove, 1);
			showTodos();
		});
	}
}

// complete checkboxes initialization
function initCompleteCheckboxes() {
	let completeCheckboxes = document.querySelectorAll('.complete-checkbox');
	for (let chkbx of completeCheckboxes) {
		chkbx.addEventListener( 'change', event => {
			// remove this todo
			let todoChangeStatusId = chkbx.dataset.id;
			// find this todo index in array
			let todoIndexToChangStatus = todos.findIndex( item => item.id == todoChangeStatusId );
			// change status of the  todo
			if (todos[todoIndexToChangStatus].status === 'ACTIVE')
				todos[todoIndexToChangStatus].status = 'COMPLETED';
			else
				todos[todoIndexToChangStatus].status = 'ACTIVE';
			showTodos();
		});
	}
}
//
// get max todos ID
function getTodosMaxId() {
	return todos.reduce( (accum, element) => element.id > accum ? element.id : accum, 0);
}
/* theme switcher ---------------------------------- BEGIN */
themeSwitcherBtn.addEventListener('click', event => {
	let currentTheme;
	for (let cls of document.body.classList) {
		for (let theme of themes) {
			if (theme.name === cls) {
				currentTheme = theme;
				break;
			}
		}
		if (currentTheme !== undefined) break;
	}
	if (currentTheme === undefined) currentTheme = themes[0];
	let indexOfCurrentTheme = themes.indexOf(currentTheme);
	let nextThemeIndex = (indexOfCurrentTheme + 1) % themes.length;
	// change theme class for the body
	document.body.classList.remove(themes[indexOfCurrentTheme].name);
	document.body.classList.add(themes[nextThemeIndex].name);
	// change theme icon
	themeIconImg.src = themes[nextThemeIndex].icon;
});
/* theme switcher ---------------------------------- END */
/* create new todo text input ---------------------- BEGIN */
createNewTodoTxt.addEventListener('keypress', event => {
	if (event.key === 'Enter' || event.keyCode === 13) {
		// add new todo
		newTodoId = getTodosMaxId() + 1;
		let newTodo = {
			id: newTodoId,
			title: createNewTodoTxt.value,
			status: 'ACTIVE',
			orderNumber: newTodoId
		};
		todos.push(newTodo);
		showTodos();
		// clear new todo text input
		createNewTodoTxt.value = '';
	}
});
/* create new todo text input ---------------------- END */
/* clear completed button initialization --------- BEGIN */
clearCompletedBtn.addEventListener('click', event => {
	for (let i = 0; i < todos.length; i++) {
		const todo = todos[i];
		if (todo.status === 'COMPLETED') todos.splice(i, 1);
	}
	showTodos();
});
/* clear completed button initialization --------- END */

/* drag and drop mechanism ----------------------- BEGIN */
function initDragAndDrop() {
	let todosForDragAndDrop = document.querySelector('.todo-list-section').querySelectorAll('.todo');
	console.log(todosForDragAndDrop);
	let draggedElement;
	const addDnDEvents = (element) => {
		element.setAttribute('draggable', 'true');
		element.addEventListener('dragstart', onDnDStart);
		element.addEventListener('dragover', (el) => el.preventDefault());
		element.addEventListener('drop', onDrop);
	};

	const onDnDStart = (event) => draggedElement = event.currentTarget;

	const onDrop = (event) => {
		if (!draggedElement) return;
		event.preventDefault();

		// "swap" elements
		const targ = event.currentTarget;
		const targClone = targ.cloneNode(true);
		const dragClone = draggedElement.cloneNode(true);

		targ.replaceWith(dragClone);
		draggedElement.replaceWith(targClone);

		addDnDEvents(targClone);
		addDnDEvents(dragClone);

		draggedElement = undefined;

		// swap orderNumbers
		let targTodoId = +targClone.querySelector('input[type="text"]').dataset.id;
		let draggedTodoId = +dragClone.querySelector('input[type="text"]').dataset.id;
		let targTodo = todos.find( todo => todo.id === targTodoId);
		let draggedTodo = todos.find( todo => todo.id === draggedTodoId);
		let tempVar = targTodo.orderNumber;
		targTodo.orderNumber = draggedTodo.orderNumber;
		draggedTodo.orderNumber = tempVar;
	};

	todosForDragAndDrop.forEach( todo => addDnDEvents(todo));
}
/* drag and drop mechanism ----------------------- END */

initFilters();
showTodos();
