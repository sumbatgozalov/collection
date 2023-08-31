const API_URL = "http://localhost:3000/series";
const form = document.querySelector(".form");
const title = document.querySelector("#title");
const season = document.querySelector("#season");
const movies = document.querySelector(".movies");

const rowWithCreateEL = (el) => {
  const row = document.createElement('tr');

  const cellTitle = document.createElement('td');
  cellTitle.textContent = el.title;
  row.appendChild(cellTitle);

  const cellSeason = document.createElement('td');
  cellSeason.textContent = el.season;
  row.appendChild(cellSeason);

  const cellActions = document.createElement('td');
  const editButton = document.createElement('button');
  editButton.innerHTML = '<i class="fas fa-edit"></i>';
  editButton.classList.add("edit-btn");
  editButton.addEventListener('click', () => editSeries( el.id, el.title, el.season));
  cellActions.appendChild(editButton);
  row.appendChild(cellActions)

  const editCell = document.createElement('td')
  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i> '
  deleteButton.addEventListener('click', () => deleteSeries(el.id));
  deleteButton.classList.add('delete-btn')
  editCell.appendChild(deleteButton);
  row.appendChild(editCell);

  return row;
};

const cleanseries = (newseries)=>{
  movies.innerHTML='';
  newseries.forEach((el)=>{
   const createRows = rowWithCreateEL(el);
   movies.appendChild(createRows)
  })
}
const getSeries = async () => {
  try {
    const response = await fetch(API_URL);
    const series = await response.json();

    if (response.status !== 200) {
      throw new Error("Could not load....");
    }
  cleanseries(series)
  } catch (error) {
    movies.textContent= error;
  }
};
const editSeries = (id, currentTitle, currentSeason) => {
  const newTitle = prompt('Enter new title:', currentTitle);
  const newSeason = prompt('Enter new season:', currentSeason);

  if (newTitle !== null && newSeason !== null) {
    updateSeries(id, newTitle, newSeason);
  }
};
const deleteSeries = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });

    if (response.status !== 200) {
      throw new Error("Could not delete...");
    }

    getSeries();
  } catch (error) {
    console.error(error);
  }
}
getSeries();

const updateSeries = async (id, newTitle, newSeason) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title: newTitle, season: newSeason }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      throw new Error('Could not update...');
    }

    getSeries(); 
  } catch (error) {
    console.error(error);
  }
};

const addMovies = async () => {
    const newTitle = title.value.trim(); 
  const newSeason = season.value.trim();

  if (newTitle === "" || newSeason === "") {
    
    return; 
  }
  const data = {
    title: title.value,
    season: season.value,
  };
  const response = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  getSeries();
  title.value = "";
  season.value = "";
};

form.addEventListener("submit", (e) => {
  addMovies();
  e.preventDefault();
});
