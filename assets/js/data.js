const STORAGE_KEY = 'BOOKSHELF_APP';

let books = [];

function isStorageExist() {
	return typeof Storage === undefined ? false : true;
}

function saveData() {
	const parsed = JSON.stringify(books);
	localStorage.setItem(STORAGE_KEY, parsed);
	document.dispatchEvent(new Event('ondatasaved'));
}

function loadDataFromStorage() {
	const serializedData = localStorage.getItem(STORAGE_KEY);
	const data = JSON.parse(serializedData);
	if (data !== null) books = data;
	document.dispatchEvent(new Event('ondataloaded'));
}

function updateDataToStorage() {
	if (isStorageExist()) saveData();
}

function composeObject(title, author, year, isComplete) {
	return {
		id: +new Date(),
		title,
		author,
		year,
		isComplete,
	};
}

function findBook(bookId) {
	for (book of books) {
		if (book.id === bookId) return book;
	}
	return null;
}

function findBookInd(bookId) {
	let i = 0;
	for (book of books) {
		if (book.id === bookId) return i;

		i++;
	}

	return -1;
}

function refreshData() {
	const listUnfinished = document.getElementById(LIST_BOOK_UNFINISHED);
	const listFinished = document.getElementById(LIST_BOOK_FINISHED);

	for (book of books) {
		const newBook = makeLogBook(
			book.title,
			book.author,
			book.year,
			book.isComplete
		);
		newBook[BOOK_ID] = book.id;

		if (book.isComplete) {
			listFinished.append(newBook);
		} else {
			listUnfinished.append(newBook);
		}
	}
}

function searchTitle() {
	var input = document.getElementById('search');
	var filter = input.value.toLowerCase();
	var ul = document.getElementById('title');
	var p = document.querySelectorAll('p');
	console.log(p);
	for (var i = 0; i < p.length; i++) {
		var ti = document.querySelectorAll('p')[i];
		if (ti.innerHTML.toLowerCase().indexOf(filter) > -1) {
			p[i].style.display = '';
		} else {
			p[i].style.display = 'none';
		}
	}
}
