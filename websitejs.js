
//connecting to database

document.addEventListener('DOMContentLoaded', function() {
    showSection('loginSection');

    // Event listener for admin login form
    document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const adminUsername = document.getElementById('adminUsername').value;
        const adminPassword = document.getElementById('adminPassword').value;
        if (adminLogin(adminUsername, adminPassword)) {
            alert('Admin login successful');
            showAdminOperations();
        } else {
            alert('Invalid admin credentials');
        }
    });

    // Event listener for user login form
    document.getElementById('userLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const userId = document.getElementById('userId').value;
        const userPassword = document.getElementById('userPassword').value;
        if (userLogin(userId, userPassword)) {
            alert('User login successful');
            showUserOperations();
        } else {
            alert('Invalid user credentials');
        }
    });

    // Event listener for admin signup form
    document.getElementById('adminSignupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add admin signup logic here
        alert('Admin signed up successfully!');
        showSection('loginSection');
    });

    document.getElementById('addUser').addEventListener('submit',function(e) {
        e.preventDefault();
        alert('User Registered successfully!');
        showSection('addUser');
    })
    // Event listener for user signup form
    document.getElementById('userSignupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add user signup logic here
        alert('User signed up successfully!');
        showSection('loginSection');
    });

    
    // Event listener for adding a book
    document.getElementById('bookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let bookTitle = document.getElementById('bookTitle').value;
        let bookAuthor = document.getElementById('bookAuthor').value;
        let bookEdition = document.getElementById('bookEdition').value;
        let bookGenre = document.getElementById('bookGenre').value;
        let bookCopies = document.getElementById('bookCopies').value;
        let book = {
            id: bookId++,
            title: bookTitle,
            author: bookAuthor,
            edition: bookEdition,
            genre: bookGenre,
            copies: bookCopies
        };

        books.push(book);
        document.getElementById('bookForm').reset();
        alert('Book added successfully!');
    });

    // Event listeners for searching books and other operations
    addSearchEventListeners();
    addLendReturnDeleteEventListeners();
});

function showSection(sectionId, isAdmin = false) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => section.style.display = 'none');
    
    // Show the selected section
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }

    // Show sidebar if not the login or sign-up sections
    const sidebar = document.querySelector('.sidebar');
    if (sectionId !== 'loginSection' && sectionId !== 'adminSignup' && sectionId !== 'userSignup') {
        sidebar.style.display = 'block';
    } else {
        sidebar.style.display = 'none';
    }

    // Show only relevant sections for the user type
    if (isAdmin) {
        // Show admin sections
        if (sectionId === 'adminOperations') {
            showAdminOperations();
        }
    } else {
        // Show user sections
        if (sectionId === 'userOperations') {
            showUserOperations();
        }
    }
}


function adminLogin(username, password) {
    return username === 'awais' && password === '12345';
}

function userLogin(id, password) {
    return id === '12344321' && password === 'awais0315';
}

function showAdminOperations() {
    showSection('addBook');
    showSection('searchBook');
    showSection('searchAuthorBooks');
    showSection('addUser');
    showSection('userRecord');
    showSection('bookRecord');
    showSection('lendBook');
    showSection('returnBook');
    showSection('deleteUser');
    showSection('deleteBook');
}

function showUserOperations() {
    showSection('searchBook');
    showSection('searchAuthorBooks');
    showSection('bookRecord');
    showSection('lendBook' );
    showSection('returnBook');
}

function addSearchEventListeners() {
    document.getElementById('searchByAuthorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let authorName = document.getElementById('searchAuthor').value;
        let results = books.filter(book => book.author.toLowerCase().includes(authorName.toLowerCase()));
        displayResults('searchByAuthorResults', results);
    });

    document.getElementById('searchByNameForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let bookName = document.getElementById('searchBookName').value;
        let results = books.filter(book => book.title.toLowerCase().includes(bookName.toLowerCase()));
        displayResults('searchByNameResults', results);
    });

    document.getElementById('searchAuthorBooksForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let authorName = document.getElementById('searchAuthorBooksName').value;
        let results = books.filter(book => book.author.toLowerCase().includes(authorName.toLowerCase()));
        displayResults('searchAuthorBooksResults', results);
    });
}

function addLendReturnDeleteEventListeners() {
    document.getElementById('lendBookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let bookTitle = document.getElementById('lendBookTitle').value;
        let bookAuthor = document.getElementById('lendBookAuthor').value;
        let bookEdition = document.getElementById('lendBookEdition').value;
        let results = books.filter(book =>
            book.title.toLowerCase() === bookTitle.toLowerCase() &&
            book.author.toLowerCase() === bookAuthor.toLowerCase() &&
            book.edition == bookEdition
        );
        displayResults('lendBookResults', results);
        if (results.length > 0) {
            document.getElementById('lendBookUserForm').style.display = 'block';
        }
    });

    document.getElementById('lendBookUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let userId = document.getElementById('lendUserId').value;
        if (!users.some(user => user.id == userId)) {
            alert('User not found!');
            return;
        }
        let book = document.getElementById('lendBookResults').querySelector('li');
        if (book) {
            let bookId = book.dataset.bookId;
            lentBooks[bookId] = userId;
            alert('Book lent successfully!');
        }
    });

    document.getElementById('returnBookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let userId = document.getElementById('returnUserId').value;
        let bookId = document.getElementById('returnBookId').value;
        if (lentBooks[bookId] == userId) {
            delete lentBooks[bookId];
            alert('Book returned successfully!');
        } else {
            alert('No such lending record found!');
        }
    });

    document.getElementById('deleteUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let userId = document.getElementById('deleteUserId').value;
        users = users.filter(user => user.id != userId);
        alert('User deleted successfully!');
    });

    document.getElementById('deleteBookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let bookId = document.getElementById('deleteBookId').value;
        books = books.filter(book => book.id != bookId);
        alert('Book deleted successfully!');
    });
}

function displayResults(elementId, results) {
    let resultElement = document.getElementById(elementId);
    resultElement.innerHTML = '';
    if (results.length > 0) {
        results.forEach(book => {
            let li = document.createElement('li');
            li.textContent = `ID: ${book.id}, Title: ${book.title}, Author: ${book.author}, Edition: ${book.edition}`;
            li.dataset.bookId = book.id;
            resultElement.appendChild(li);
        });
    } else {
        resultElement.textContent = 'No results found.';
    }
}

// Sample data arrays for demonstration purposes
let books = [];
let users = [];
let lentBooks = {};
let bookId = 1;
let userId = 1;


/*document.addEventListener('DOMContentLoaded', function() {
    showSection('loginSection');

    // Event listener for admin login form
    document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const adminUsername = document.getElementById('adminUsername').value;
        const adminPassword = document.getElementById('adminPassword').value;
        if (adminLogin(adminUsername, adminPassword)) {
            alert('Admin login successful');
            showSection('adminOperations', true);
        } else {
            alert('Invalid admin credentials');
        }
    });

    // Event listener for user login form
    document.getElementById('userLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const userId = document.getElementById('userId').value;
        const userPassword = document.getElementById('userPassword').value;
        if (userLogin(userId, userPassword)) {
            alert('User login successful');
            showSection('userOperations');
        } else {
            alert('Invalid user credentials');
        }
    });

    // Event listener for admin signup form
    document.getElementById('adminSignupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add admin signup logic here
        alert('Admin signed up successfully!');
        showSection('loginSection');
    });

    // Event listener for user signup form
    document.getElementById('userSignupForm').addEventListener('submit', function(e) {
        e.preventDefault();
        // Add user signup logic here
        alert('User signed up successfully!');
        showSection('loginSection');
    });

    // Event listener for adding a book
    document.getElementById('bookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let bookTitle = document.getElementById('bookTitle').value;
        let bookAuthor = document.getElementById('bookAuthor').value;
        let bookEdition = document.getElementById('bookEdition').value;

        let book = {
            id: bookId++,
            title: bookTitle,
            author: bookAuthor,
            edition: bookEdition
        };

        books.push(book);
        document.getElementById('bookForm').reset();
        alert('Book added successfully!');
    });

    // Event listeners for searching books and other operations
    addSearchEventListeners();
    addLendReturnDeleteEventListeners();
});

function showSection(sectionId, isAdmin = false) {
    // Hide all sections
    const sections = document.querySelectorAll('.page-section');
    sections.forEach(section => section.style.display = 'none');
    
    // Show the selected section
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }

    // Show sidebar if not the login or sign-up sections
    const sidebar = document.querySelector('.sidebar');
    if (sectionId !== 'loginSection' && sectionId !== 'adminSignup' && sectionId !== 'userSignup') {
        sidebar.style.display = 'block';
        updateSidebar(isAdmin);
    } else {
        sidebar.style.display = 'none';
    }

    if (sectionId === 'adminOperations' && isAdmin) {
        showAdminOperations();
    } else if (sectionId === 'userOperations' && !isAdmin) {
        showUserOperations();
    }
}

function updateSidebar(isAdmin) {
    const sidebarLinks = document.querySelector('.sidebar-links');
    sidebarLinks.innerHTML = ''; // Clear existing links

    if (isAdmin) {
        // Add admin links
        sidebarLinks.appendChild(createSidebarLink('Add Book', 'addBook'));
        sidebarLinks.appendChild(createSidebarLink('Search Book', 'searchBook'));
        sidebarLinks.appendChild(createSidebarLink('Search Author Books', 'searchAuthorBooks'));
        sidebarLinks.appendChild(createSidebarLink('User Record', 'userRecord'));
        sidebarLinks.appendChild(createSidebarLink('Book Record', 'bookRecord'));
        sidebarLinks.appendChild(createSidebarLink('Lend Book', 'lendBook'));
        sidebarLinks.appendChild(createSidebarLink('Return Book', 'returnBook'));
        sidebarLinks.appendChild(createSidebarLink('Delete User', 'deleteUser'));
        sidebarLinks.appendChild(createSidebarLink('Delete Book', 'deleteBook'));
    } else {
        // Add user links
        sidebarLinks.appendChild(createSidebarLink('Search Book', 'searchBook'));
        sidebarLinks.appendChild(createSidebarLink('Search Author Books', 'searchAuthorBooks'));
        sidebarLinks.appendChild(createSidebarLink('Book Record', 'bookRecord'));
        sidebarLinks.appendChild(createSidebarLink('Lend Book', 'lendBook'));
        sidebarLinks.appendChild(createSidebarLink('Return Book', 'returnBook'));
    }
}

function createSidebarLink(text, sectionId) {
    const link = document.createElement('a');
    link.href = '#';
    link.textContent = text;
    link.addEventListener('click', function(e) {
        e.preventDefault();
        showSection(sectionId);
    });
    return link;
}

function adminLogin(username, password) {
    return username === 'awais' && password === '12345';
}

function userLogin(id, password) {
    return id === '12344321' && password === 'awais0315';
}

function showAdminOperations() {
    document.getElementById('addBook').style.display = 'block';
    document.getElementById('searchBook').style.display = 'block';
    document.getElementById('searchAuthorBooks').style.display = 'block';
    document.getElementById('userRecord').style.display = 'block';
    document.getElementById('bookRecord').style.display = 'block';
    document.getElementById('lendBook').style.display = 'block';
    document.getElementById('returnBook').style.display = 'block';
    document.getElementById('deleteUser').style.display = 'block';
    document.getElementById('deleteBook').style.display = 'block';
}

function showUserOperations() {
    document.getElementById('searchBook').style.display = 'block';
    document.getElementById('searchAuthorBooks').style.display = 'block';
    document.getElementById('bookRecord').style.display = 'block';
    document.getElementById('lendBook').style.display = 'block';
    document.getElementById('returnBook').style.display = 'block';
}

function addSearchEventListeners() {
    document.getElementById('searchByAuthorForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let authorName = document.getElementById('searchAuthor').value;
        let results = books.filter(book => book.author.toLowerCase().includes(authorName.toLowerCase()));
        displayResults('searchByAuthorResults', results);
    });

    document.getElementById('searchByNameForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let bookName = document.getElementById('searchBookName').value;
        let results = books.filter(book => book.title.toLowerCase().includes(bookName.toLowerCase()));
        displayResults('searchByNameResults', results);
    });

    document.getElementById('searchAuthorBooksForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let authorName = document.getElementById('searchAuthorBooksName').value;
        let results = books.filter(book => book.author.toLowerCase().includes(authorName.toLowerCase()));
        displayResults('searchAuthorBooksResults', results);
    });
}

function addLendReturnDeleteEventListeners() {
    document.getElementById('lendBookForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let bookTitle = document.getElementById('lendBookTitle').value;
        let bookAuthor = document.getElementById('lendBookAuthor').value;
        let bookEdition = document.getElementById('lendBookEdition').value;
        let results = books.filter(book =>
            book.title.toLowerCase() === bookTitle.toLowerCase() &&
            book.author.toLowerCase() === bookAuthor.toLowerCase() &&
            book.edition == bookEdition
        );
        displayResults('lendBookResults', results);
        if (results.length > 0) {
            document.getElementById('lendBookUserForm').style.display = 'block';
        }
    });

    document.getElementById('lendBookUserForm').addEventListener('submit', function(e) {
        e.preventDefault();
        let userId = document.getElementById('lendUserId').value;
        if (!users.some(user => user.id == userId)) {
            alert('User not found!');
            return;
        }
        let book = document.getElementById('lendBookResults').querySelector('li');
        if (book) {
            let bookId = book.dataset.bookId;
            lentBooks[bookId] = userId;
            alert('Book lent successfully!');
        }
    });

    document.getElementById('returnBookForm*/