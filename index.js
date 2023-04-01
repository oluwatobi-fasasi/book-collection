class BookHub {
    constructor() {
        this.bookHub = JSON.parse(localStorage.getItem('bookHub')) || [];
        this.form = document.getElementById('home-form');
        this.inputTitle = document.getElementById('book-title');
        this.inputAuthor = document.getElementById('book-author');
        this.bookCard = document.getElementById('book-card');
        this.listLink = document.getElementById('list-link');
        this.homeLink = document.getElementById('home-link');
        this.contactLink = document.getElementById('contact-link');
        this.listPage = document.querySelector('.list');
        this.homePage = document.querySelector('.home');
        this.contactPage = document.querySelector('.contact');
        this.bookDisplay();

    }

    addBook(author, title) {
        this.bookHub.push({ author, title });
        localStorage.setItem('bookHub', JSON.stringify(this.bookHub))
    }

    removeBook(author, title) {
        this.bookHub = this.bookHub.filter((book) => {
            !(book.title === title && book.author === author)
        });
        localStorage.setItem('bookHub', JSON.stringify(this.bookHub));
    }


    bookDisplay = () => {
        this.bookCard.innerHTML = '';

        for (let i = 0; i < this.bookHub.length; i++) {
            const book = this.bookHub[i];
            const eachBookDiv = document.createElement('div');
            const author = document.createElement('p');
            author.textContent = book.author;
            author.classList.add('author');
            const title = document.createElement('p');
            title.textContent = book.title;
            title.classList.add('title');
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove'
            removeBtn.classList.add('removeBtn');
            const hr_line = document.createElement('hr');

            eachBookDiv.appendChild(author);
            eachBookDiv.appendChild(title);
            eachBookDiv.appendChild(removeBtn);
            eachBookDiv.appendChild(hr_line);

            this.bookCard.appendChild(eachBookDiv);


            removeBtn.addEventListener('click', () => {
                this.removeBook(book.author, book.title);
                this.bookDisplay();
            })
        }
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addBook(this.inputAuthor.value.trim(''), this.inputTitle.value.trim(''));
            this.bookDisplay();
            this.form.reset();
        });

        this.listLink.addEventListener('click', () => {
            this.listPage.style.display = 'block';
            this.homePage.style.display = 'none';
            this.contactPage.style.display = 'none';
        });

        this.homeLink.addEventListener('click', () => {
            this.listPage.style.display = 'none';
            this.homePage.style.display = 'block';
            this.contactPage.style.display = 'none';
        });

        this.contactLink.addEventListener('click', () => {
            this.listPage.style.display = 'none';
            this.homePage.style.display = 'none';
            this.contactPage.style.display = 'block';
        });

    }
}

const newBook = new BookHub();
newBook.init();


const form = document.querySelector('contact-form');
const showError = document.getElementById('show-error');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (document.querySelector('.email').value.match(/[A-Z]/)) {
    showError.innerHTML = 'Please enter a valid email in lowercase';
    showError.style.display = 'block';
  } else {
    form.submit();
  }
});