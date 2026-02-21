const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url");
const addBookmarkForm = document.getElementById("add-bookmark-form");

let bookmarkData = JSON.parse(localStorage.getItem("bookmark-data")) || [];

addBookmarkForm.addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  e.preventDefault()

  const bookmarkName = bookmarkNameInput.value.trim();
  const bookmarkUrl = bookmarkUrlInput.value.trim();

  if (!bookmarkName || !bookmarkUrl) {
    alert("Please enter bookmark name and bookmark url");
  } else if (!bookmarkUrl.startsWith("http://") && !bookmarkUrl.startsWith("https://")) {
    alert("Please enter valid url");
  } else {
    bookmarkData.push({
      id: Date.now(),
      bookmarkName,
      bookmarkUrl
    })

    localStorage.setItem("bookmark-data", JSON.stringify(bookmarkData));
    updateBookmarkList()

    this.reset()
  }
}

function updateBookmarkList() {
  bookmarkList.innerHTML = "";
  bookmarkData.forEach((bookmark) => {
    const li = document.createElement("li");
    li.innerHTML = `
        <a href="${bookmark.bookmarkUrl}" target="_blank">${bookmark.bookmarkName}</a>
        <button onclick="removeBookmark(${bookmark.id})">X</button>
      `;
    bookmarkList.appendChild(li)
  })
}

function removeBookmark(deleteBookmarkId) {
  bookmarkData = bookmarkData.filter((bookmark) => bookmark.id !== deleteBookmarkId);
  localStorage.setItem("bookmark-data", JSON.stringify(bookmarkData));
  updateBookmarkList()
}

window.removeBookmark = removeBookmark;

updateBookmarkList()
