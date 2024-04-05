
// GET

const listMovies = document.querySelector(".list-movies");
const btnMovies = document.querySelector(".add-card-f");
const url = "http://localhost:3000/movies";

const btnGet = document.querySelector(".add-card-g");
const formMovies = document.querySelector(".form-card");
const modal = document.querySelector(".modal-card");

function fetchUrl(url) {
    const data = fetch(url);
    return data;
};


btnGet.addEventListener("click", (e) => {
    e.preventDefault();
    fetchUrl(url)
        .then(data =>
            data.json()
        ).then(data =>
            // console.log(data)
            createEl(data)
        );
});



function createEl(data) {
    data.map((movies) => {
        listMovies.insertAdjacentHTML(
            "beforeend",
            `<li class="item-movies">
              <p class="text-movies">name: ${movies.title}</p>
              <p class="text-movies">genre: ${movies.genre}</p>
              <p class="text-movies">director: ${movies.director}</p>
              <p class="text-movies">year: ${movies.year}</p>
              <p class="text-movies">id: ${movies.id}</p>
            </li>`
        );
    });
};


// ADD


const addMovies = (newMovies) => {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(newMovies),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    }).then(res =>
        res.json()
    ).then(post =>
        console.log(post)
    ).catch(error =>
        console.log(error)
    );
};


btnMovies.addEventListener("click", () => {
    modal.style.display = "block";
});

formMovies.addEventListener("submit", (e) => {
    e.preventDefault();
    const newMovies = {
        title: e.currentTarget.elements.title.value,
        genre: e.currentTarget.elements.genre.value,
        director: e.currentTarget.elements.director.value,
        year: e.currentTarget.elements.year.value,
        id: e.currentTarget.elements.id.value,
    };

    e.currentTarget.reset();
    return addMovies(newMovies);

});

// RENEWAL

const modalRenewalCard = document.querySelector(".modal-renewal-card");
const formRenewalCard = document.querySelector(".form-renewal-card");

const btnRenewal = document.querySelector(".add-card-r");


const formRenewal = document.querySelector(".form-renewal");
const inputRenewal = document.querySelector("[data-id]");
const modalRenewal = document.querySelector(".modal-renewal");

const renewalMovies = {
    title: "",
    genre: "",
    director: "",
    year: 0,
    id: 0
};

inputRenewal.addEventListener("input", (e) => {
    if (e.currentTarget.value > 0) {
        modalRenewalCard.style.display = "block";
        renewalMovies.id = e.currentTarget.value;
        console.log(renewalMovies);
    };
});


btnRenewal.addEventListener("click", () => {
    modalRenewal.style.display = "block";
});


formRenewalCard.addEventListener("submit", (e) => {
    e.preventDefault();
    const renewalMoviesObj = {
        title: e.currentTarget.elements.title.value,
        genre: e.currentTarget.elements.genre.value,
        director: e.currentTarget.elements.director.value,
        year: e.currentTarget.elements.year.value,
        id: renewalMovies.id
    };
   
    e.currentTarget.reset();
     localStorage.setItem("card-movies", JSON.stringify(renewalMoviesObj));
    return renewalfunctionMovies(renewalMoviesObj);

});


const renewalfunctionMovies = (renewalMoviesObj) => {
    return fetch(`http://localhost:3000/movies/${renewalMoviesObj.id}`, {
        method: "PATCH",
        body: JSON.stringify(renewalMoviesObj),
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
        },
    }).then(res =>
        res.json()
    ).then(post =>
        console.log(post)
    ).catch(error =>
        console.log(error)
    );
};




// DELETE


const formDelete = document.querySelector(".form-delete");
const deleteBtn = document.querySelector(".add-card-d");
const modalDelete = document.querySelector(".modal-delete");
const inputDelete = document.querySelector("[data-delete]");

const deletId = {
    id: 0,
};

deleteBtn.addEventListener("click", () => {
    modalDelete.style.display = "block";
});

inputDelete.addEventListener("input", (e) => {
    deletId.id = e.currentTarget.value;
    console.log(deletId);
});

formDelete.addEventListener("submit", (e) => {
    e.preventDefault();
    const deleteMoviesObj = {

        id: deletId.id
    };
    e.currentTarget.reset();
    return deleteMovies(deleteMoviesObj);

});

const deleteMovies = (deleteMoviesObj) => {
    return fetch(`http://localhost:3000/movies/${deleteMoviesObj.id}`, {
        method: "DELETE",
    }).then(post =>
        console.log(post)
    ).catch(error =>
        console.log(error)
    );
};