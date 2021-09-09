//function for loading searchItem
const searchBook = () => {
    //search field input
    const searchField = document.getElementById("search-book");
    const searchText = searchField.value;
    //url
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    searchField.value = '';
    //empty search box text
    const emptyErrorMsg = document.getElementById("empty-error-msg");

    if (searchText == '') {

        emptyErrorMsg.innerText = "Search box can not be empty";
    }
    else {
        emptyErrorMsg.innerText = " ";
        fetch(url)
            .then(res => res.json())
            .then(data => displayBook(data.docs));
    }

}

//function display search results
const displayBook = (books) => {

    const container = document.getElementById("book-info");
    container.textContent = " ";
    const notFoundMsg = document.getElementById("book-not-found-msg");
    //display total search result
    const totalResult = document.getElementById("total-book-result");
    totalResult.innerText = "Total search result found : " + books.length;


    // check if the book is available
    if (books.length == 0) {
        notFoundMsg.innerText = "We can not find your searched book";
    }
    //load book details
    books.slice(0, 20).forEach(book => {
        //console.log(book);
        notFoundMsg.innerText = "";
        const divContainer = document.createElement("div");
        divContainer.classList.add("col-lg-4");
        divContainer.textContent = "";
        const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;

        divContainer.innerHTML = `

                    <div class="card">
                         <img src="${imgUrl}" class="card-img-top" alt="book_img">
                        <div class="card-body">
                            <h5 class="card-title"><span class="fw-bold">Book Title:</span> ${book.title}</h5>
                            <h6 class="card-title"><span class="fw-bold">Author Name:</span> ${book.author_name ? book.author_name[0] : 'No data found'}</h6>
                            <p class="card-text"><span class="fw-bold">First Publish Year:</span> ${book.first_publish_year ? book.first_publish_year : 'No data found'}</p>
                            <p class="card-text"><span class="fw-bold">Publisher:</span> ${book.publisher ? book.publisher[0] : 'No data found'}</p>
                        </div>
                    </div>
                    `
        container.appendChild(divContainer);

    })


}