const LIST_BOOK_UNFINISHED = 'list-book-unfinished';
const LIST_BOOK_FINISHED = 'list-book-finished';
const BOOK_ID = 'bookId';

function makeLogBook(title, author, year, isComplete) {
	const txt_title = document.createElement('p');
	txt_title.classList.add('title');
	txt_title.innerHTML = title;

	const txt_author = document.createElement('p');
	txt_author.classList.add('author');
	txt_author.innerHTML = author;

	const txt_year = document.createElement('p');
	txt_year.classList.add('year');
	txt_year.innerHTML = year;

	const txt_container = document.createElement('div');
	txt_container.classList.add('inner');
	txt_container.append(txt_title, txt_author, txt_year);

	const container = document.createElement('div');
	container.classList.add('item');
	container.append(txt_container);
	if (isComplete) {
		container.append(createUndoButton(), createDeleteButton());
	} else {
		container.append(createFinishButton(), createDeleteButton());
	}
	return container;
}

function addBook() {
	const completeBookList = document.getElementById(LIST_BOOK_FINISHED);
	const uncompleteBookList = document.getElementById(LIST_BOOK_UNFINISHED);
	const val_book_title = document.getElementById('title').value;
	const val_book_author = document.getElementById('author').value;
	const val_book_year = document.getElementById('year').value;
	const checkBox = document.getElementById('finish');

	if (checkBox.checked) {
		const book = makeLogBook(
			val_book_title,
			val_book_author,
			val_book_year,
			true
		);

		const book_obj = composeObject(
			val_book_title,
			val_book_author,
			val_book_year,
			true
		);

		book[BOOK_ID] = book_obj.id;
		books.push(book_obj);

		completeBookList.append(book);
		updateDataToStorage();
	} else {
		const book = makeLogBook(
			val_book_title,
			val_book_author,
			val_book_year,
			false
		);

		const book_obj = composeObject(
			val_book_title,
			val_book_author,
			val_book_year,
			false
		);

		book[BOOK_ID] = book_obj.id;
		books.push(book_obj);

		uncompleteBookList.append(book);
		updateDataToStorage();
	}
}

function createButton(buttonTypeClass, text, eventListener) {
	const button = document.createElement('button');
	button.classList.add(buttonTypeClass);
	button.innerText = text;
	button.addEventListener('click', function (event) {
		eventListener(event);
	});
	return button;
}

function addBookToFinished(bookElement) {
	const listFinished = document.getElementById(LIST_BOOK_FINISHED);
	const el_book_title = bookElement.querySelector(
		'.item > .inner > p.title'
	).innerText;
	const el_book_author = bookElement.querySelector(
		'.item > .inner > p.author'
	).innerText;
	const el_book_year = bookElement.querySelector(
		'.item > .inner > p.year'
	).innerText;

	const new_book = makeLogBook(
		el_book_title,
		el_book_author,
		el_book_year,
		true
	);

	const book_find = findBook(bookElement[BOOK_ID]);
	book_find.isComplete = true;

	new_book[BOOK_ID] = book_find.id;
	listFinished.append(new_book);

	bookElement.remove();
	updateDataToStorage();
}

function undoBookToStillRead(bookElement) {
	const listUnfinished = document.getElementById(LIST_BOOK_UNFINISHED);
	const el_book_title = bookElement.querySelector(
		'.item > .inner > p.title'
	).innerText;
	const el_book_author = bookElement.querySelector(
		'.item > .inner > p.author'
	).innerText;
	const el_book_year = bookElement.querySelector(
		'.item > .inner > p.year'
	).innerText;

	const new_book = makeLogBook(
		el_book_title,
		el_book_author,
		el_book_year,
		false
	);

	const book_find = findBook(bookElement[BOOK_ID]);
	book_find.isComplete = false;

	new_book[BOOK_ID] = book_find.id;
	listUnfinished.append(new_book);

	bookElement.remove();
	updateDataToStorage();
}

function removeBookFromFinished(bookElement) {
	const book_position = findBookInd(bookElement[BOOK_ID]);
	books.splice(book_position, 1);

	bookElement.remove();
	updateDataToStorage();
}

function createFinishButton() {
	return createButton('btn-success', 'Finish', function (event) {
		addBookToFinished(event.target.parentElement);
	});
}

function createDeleteButton() {
	return createButton('btn-danger', 'Delete', function (event) {
		confirm('Are you sure?')
			? removeBookFromFinished(event.target.parentElement)
			: '';
	});
}

function createUndoButton() {
	return createButton('btn-warning', 'Unfinished', function (event) {
		undoBookToStillRead(event.target.parentElement);
	});
}
