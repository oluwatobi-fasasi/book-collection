class BookHub{
    constructor(){
        this.bookHub = JSON.parse(localStorage.getItem('bookHub')) || [];
        this.form = document.getElementById('home-form');
        this.inputTitle =document.getElementById('book-title');
        this.inputAuthor = document.getElementById('book-author');
        this.bookCard = document.getElementById('book-card');
        this.bookDisplay();
      
    }

    addBook(author, title){
        this.bookHub.push({author, title});
        localStorage.setItem('bookHub', JSON.stringify(this.bookHub))
    }

    removeBook(author, title){
        this.bookHub = this.bookHub.filter((book)=>{
            !(book.title === title && book.author === author)
        });
        localStorage.setItem('bookHub', JSON.stringify(this.bookHub));
    }


    bookDisplay =()=>{
        this.bookCard.innerHTML ='';

        for(let i =0; i < this.bookHub.length; i++){
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


            removeBtn.addEventListener('click', ()=>{
                this.removeBook(book.author, book.title);
                this.bookDisplay();
            })
        }
    }

    toggle(){
            this.listLink.addEventListener('click', ()=>{
            this.listPage.style.display = 'block';
            this.homePage.style.display = 'none';
            this.contactPage.style.display = 'none';
        })
    }
    init(){
        this.form.addEventListener('submit', (e)=>{
            e.preventDefault();
            this.addBook(this.inputAuthor.value.trim(''), this.inputTitle.value.trim(''));
            this.bookDisplay();
            this.form.reset();
        });
        
    }
}

const newBook = new BookHub();
newBook.init();

listLink =document.getElementById('list-link');
homeLink = document.getElementById('home-link');
contactLink = document.getElementById('contact-link');
listPage =document.querySelector('.list');
homePage = document.querySelector('.home');
contactPage = document.querySelector('.contact');

listLink.addEventListener('click',()=>{
    listPage.style.display = 'block'
    homePage.style.display = 'none'
    contactPage.style.display = 'none'});

    homeLink.addEventListener('click',()=>{
        listPage.style.display = 'none'
        homePage.style.display = 'block'
        contactPage.style.display = 'none'});

    contactLink.addEventListener('click',()=>{
        listPage.style.display = 'none'
        homePage.style.display = 'none'
        contactPage.style.display = 'block'});