const titlep= document.getElementById("n-title")
const genrep= document.getElementById("n-genre")
const authorp= document.getElementById("n-author")
const pub_yearp= document.getElementById("n-publishing_year")

const addNoteDiv = document.getElementById("add-note");

addNoteDiv.addEventListener("click", (e) => {
    e.preventDefault();

    fetch("https://practice-mifg.onrender.com/books/add", {
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
            title: titlep.value,
            genre: genrep.value,
            author: authorp.value,
            publishing_year: pub_yearp.value,
        }),
    })
    .then((response) => {
        if (!response.ok) {
            window.alert("please enter right credintials");
            throw new Error(`Registration failed: ${response.statusText}`);
        }

        return response.json();
    })
    .then((data) => {
        console.log(data);
        window.location.reload();
    })
    .catch((err) => {
        console.log(err.message);
    });
});

const noteList = document.getElementById("note-card-list");
function getData() {
    
  fetch("https://practice-mifg.onrender.com/books/", {
    headers: {
      "Content-type": "application/json",
      authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      displayBooks(data);
    })
    .catch((err) => console.log(err));
}

function displayBooks(data) {
  
  const books = data.books_data;

  books.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    const title = document.createElement("h3");
    title.innerText = book.title;

    const genre = document.createElement("p");
    genre.innerText = book.genre;


    const author = document.createElement("p");
    author.innerText = book.author;

    const pub_year = document.createElement("p");
    pub_year.innerText = book.publishing_year;

    const edit = document.createElement('button');
    edit.classList.add('edit-btn');
    edit.innerText = 'EDIT'
    

    const editBtn = document.createElement("button");
    editBtn.className = "btn1";
    editBtn.innerText = "Edit";
    editBtn.addEventListener("click",(e)=>{
        console.log(book)
        e.preventDefault();
        editNotes(book);
    })

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "btn1";
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => {
        deleteNote(book._id)
    });

    bookCard.append(title, genre,author,pub_year, editBtn, deleteBtn);
    

    noteList.appendChild(bookCard);
  });
}

getData();



function editNotes(book){
    
        titlep.value = book.title;

         genrep.value=book.genre;
         authorp.value=book.author;
         pub_yearp.value=book.publishing_year;
         currEdit=book;
  }
  
  submitBtn.addEventListener('click',(e)=>{
      e.preventDefault();
      updateNote(currEdit);
  })
  async function updateNote(item){
      try{
       let res = await fetch(`https://practice-mifg.onrender.com/books/update/${item._id}`,{
          method: 'PATCH',
          headers: {
            "Content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`
          },
          body:JSON.stringify({
            
            title:titlep.value,
    
             genre: genrep.value,
             author: authorp.value,
             publishing_year: pub_yearp.value
             
           })
       })
        getData()
        window.location.reload();
      }
      catch(err){
        console.log(err);
      }
  }

  function deleteNote(noteId) {
    fetch(`https://practice-mifg.onrender.com/books/delete/${noteId}`, {
        method: "DELETE",
        headers: {
            "Content-type": "application/json",
            "authorization": `Bearer ${localStorage.getItem("token")}`,
        },
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Note deletion failed: ${response.statusText}`);
        }

        return response.json();
    })
    .then((deletedData) => {
        console.log(deletedData);

        getData();
        window.location.reload();
    })
    .catch((err) => {
        console.log(err.message);
    });
}

  
const logoutbtn = document.getElementById('logoutbtn');

logoutbtn.addEventListener('click', (e) => {
    e.preventDefault();

    fetch('https://practice-mifg.onrender.com/users/logout', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // credentials: 'include',
            "authorization": `Bearer ${localStorage.getItem("token")}`,
            "authorization": `Bearer ${localStorage.getItem("token2")}`,
        },
         // Send cookies with the request
        // body: JSON.stringify({
        //     access_token: localStorage.getItem('token'),
        //     refresh_token: localStorage.getItem('token2'),
        // }),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`Logout failed: ${response.statusText}`);
        }
    })
    .then((result) => {
        console.log(result.msg); // Display the success message
        // Redirect or perform any other action after successful logout
        location.href = '/index.html';
    })
    .catch((error) => {
        console.error(error);
    });
});
// const logoutBtn = document.getElementById('logoutBtn');

// logoutbtn.addEventListener('click', async () => {
//     try {
//         const response = await fetch('https://practice-mifg.onrender.com/users/logout', {
//             method: 'GET',
//             // credentials: 'include',
//              // include cookies in the request
//         });

//         if (response.ok) {
//             const result = await response.json();
//             console.log(result.msg); // Display the success message
//             // Redirect or perform any other action after successful logout
//             window.location.href = '/index.html'; // Redirect to the login page
//         } else {
//             const error = await response.json();
//             console.error(error.error);
//         }
//     } catch (error) {
//         console.error(error);
//     }
// });
