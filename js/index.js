var bookmarksNameField = document.querySelector('#bookmarksNameField');
var bookmarksURLField = document.querySelector('#bookmarksURLField');
var addBookmarkButton = document.querySelector('#addBookmarkBtn')
var bookmarksTableBody = document.querySelector('tbody');
var bookmarks = [];

if(localStorage.getItem('bookmarks')==null) {
    localStorage.setItem('bookmarks','');
} else {
    bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmarks();
}

function addBookmark() {
    var bookmark = {
        bookmarkName: bookmarksNameField.value,
        bookmarkURL: bookmarksURLField.value
    };

    if(validateBookmark(bookmarksNameField) && validateBookmark(bookmarksURLField)) {
        if (!bookmark.bookmarkURL.startsWith('https://')) {
            bookmark.bookmarkURL = 'https://' + bookmark.bookmarkURL;
        }
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
        displayBookmarks();
        clearFields();
    }


}

function validateBookmark(element) {

    var regex = {
        bookmarksNameField: /^[A-Za-z\s]{3,20}$/,
        bookmarksURLField: /^(https?\:\/\/)?(www\.)?[A-Za-z]+\.[A-Za-z]{2,}$/
    };

    if(regex[element.id].test(element.value)) {
        element.classList.replace('custom-form-control','is-invalid');
        element.classList.replace('is-invalid','is-valid');
        return 1;
    } else {
        element.classList.add('is-invalid');
        return 0;
    }

}

function deleteBookmark(index) {
    bookmarks.splice(index,1);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    displayBookmarks();
}

function displayBookmarks() {
    var bookmarksContainer = ``;
    for (i = 0; i < bookmarks.length; i++) {
        bookmarksContainer += `
        <tr>
                            <th class="fw-normal" scope="row">${i + 1}</th>
                            <td>${bookmarks[i].bookmarkName}</td>
                            <td>
                                <a href="${bookmarks[i].bookmarkURL}" target="_blank">
                                    <button class="btn btn-success">
                                        <i class="fa-solid fa-eye"></i>
                                        Visit
                                    </button>
                                </a>    
                            </td>
                            <td>
                                <button onclick="deleteBookmark(${i});" class="btn btn-danger">
                                    <i class="fa-solid fa-trash"></i>
                                    Delete
                                </button>
                            </td>
                          </tr>
        `
    }

    bookmarksTableBody.innerHTML = bookmarksContainer;
}

function clearFields() {
    bookmarksNameField.value = null;
    bookmarksURLField.value = null;

    bookmarksNameField.classList.remove('is-valid', 'is-invalid');
    bookmarksNameField.classList.add('custom-form-control');
    bookmarksURLField.classList.remove('is-valid', 'is-invalid');
    bookmarksURLField.classList.add('custom-form-control')
}

// Event Listeners

bookmarksNameField.addEventListener('input', function(){
    validateBookmark(this);
});

bookmarksURLField.addEventListener('input', function(){
    validateBookmark(this);
});

addBookmarkButton.addEventListener('click', function(){
    addBookmark();
});
