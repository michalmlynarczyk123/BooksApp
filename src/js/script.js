{
  'use strict';
  
  // cwiczenie 1
  // Prepare a reference to the template and the .books-list
  const booksList = document.querySelector('.books-list');
  const template = Handlebars.compile(document.querySelector('#template-book').innerHTML);
  // Add a new render function.
  function render() {
    // Inside it, go over each item in dataSource.books
    for (let book of dataSource.books) {
      const ratingBgc = determineRatingBgc(book.rating);
      const ratingWidth = book.rating * 10;
      book.ratingBgc = ratingBgc;
      book.ratingWidth = ratingWidth;
      // generate the HTML code based on the template and data about the specific book
      const generatedHTML = template(book);
      // Based on this HTML code, generate a DOM element
      const generatedDOM = utils.createDOMFromHTML(generatedHTML);
      // Append the generated DOM element to the .books-list as a new DOM child
      booksList.appendChild(generatedDOM);
    }
  }
  // cwiczenie 2
  // new blank favoriteBooks array.
  let favoriteBooks = [];
  // cwiczenie 4 new blank filters array
  let filters = [];
  // Add the initActions function
  function initActions() {
    // Provide a reference to the list of all .book__image items in the .booksList.
    const bookImages = booksList.querySelectorAll('.book__image');
    // Provide a reference to the class filters in index file.
    const bookFilters = document.querySelectorAll('.filters');
    // go over each item on that list
    for (const bookImage of bookImages) {
      bookImage.addEventListener('click', function (event) {
        event.preventDefault();
      });
      bookImage.addEventListener('dblclick', function (event) {
        // stop the default behavior of the browser (preventDefault)
        event.preventDefault();
        // get the book's id from its data-id
        const clickedBookId = bookImage.getAttribute('data-id');
        // czwiczenie 4
        if (event.target.offsetParent.classList.contains('favorite')) {
          // remove the 'favorite' class from the clicked item
          bookImage.classList.remove('favorite');
          // find index of removing book image
          const bookImageIndex = favoriteBooks.indexOf(clickedBookId);
          console.log('removed book image index:', bookImageIndex);
          // remove clicked book image from array
          favoriteBooks.splice(bookImageIndex, 1);
        } else {
          // adds this ID to favoriteBooks
          bookImage.classList.add('favorite');
          console.log('clicked book id:', clickedBookId);
          // adds the 'favorite' class to the clicked item
          favoriteBooks.push(clickedBookId);
        }
      });
    }
    for (const bookFilter of bookFilters) {
      bookFilter.addEventListener('click', function (event) {
        const clickedFilter = event.target;
        // check whether the element that is actually our checkbox has been clicked
        if (clickedFilter.tagName === 'INPUT' && clickedFilter.type === 'checkbox' && clickedFilter.name === 'filter') {
          console.log('clickedFilter:', clickedFilter.value);
          // check if checkbox is checked
          if (clickedFilter.checked) {
            // add filter value to filters array
            filters.push(clickedFilter.value);
          } else {
            // find index of removing book filter
            const bookFilterIndex = filters.indexOf(clickedFilter);
            // remove filter value from filters array
            filters.splice(bookFilterIndex, 1);
          }
        }
        filterBooks();
      });
    }
    console.log('fav books:', favoriteBooks);
    console.log('book filters active:', filters);
  }
  // cwiczenie 5
  function filterBooks() {
    // loop to run through all dataSource.books items.
    for (let book of dataSource.books) {
      //Create a variable shouldBeHidden that defaults to false
      let shouldBeHidden = false;
      for (let filter of filters) {
        // if given property should be true, but it is not, change shouldBeHidden to true and terminate loop
        if (book.details[filter]) {
          shouldBeHidden = true;
          break;
        }
      }
      const bookId = book.id;
      const selectedImage = document.querySelector('.book__image[data-id="' + bookId + '"]');
      // conditional loop that will check the value of shouldBeHidden. If it is true, find the book__image element of the book and give it the hidden class. If it is equal to false, then this class should be taken away.
      if (shouldBeHidden === true) {
        selectedImage.classList.add('hidden');
      } else {
        selectedImage.classList.remove('hidden');
      }
    }
  }
  // cwiczenie 6
  function determineRatingBgc(rating) {
    if (rating < 6) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 6 && rating <= 8) {
      return 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
    } else if (rating > 8 && rating <= 9) {
      return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
    } else if (rating > 9) {
      return 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
    }
  }
  render();
  initActions();
}