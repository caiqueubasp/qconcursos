const body = document.querySelector("body");

const section = document.createElement("section");
section.id = "section-container";

const aboutSection = document.createElement("section");
aboutSection.id = "about-section";

const githubSection = document.createElement("section");
githubSection.id = "github-section";

const footer = document.createElement("footer");

var repoList, listTitle;

// const repoList = document.createElement("ul");
// repoList.id = "repo-list";
// let  profileImg;

var dataState = {
  repo: false,
  fav: false,
};

const sectionContent = (section.innerHTML = `

      <div id="header">
      <span id="header-name">Caique</span>
      <div id="header-itens">
      <a href="#section-container"><span>Home</span></a>
      <a href="#about-section"><span>Sobre</span></a>
      <a href="#github-section"><span>Desafio</span></a>
      </div>
      </div>

      <div id="main-content">
      <p>Desenvolvedor Front End</p>
      <span>Desafio Qconcursos</span>
      </div>

      <div id="container-icons">

      <img src="./icons/iconfinder_facebook.png">
      <img src="./icons/iconfinder_linkedin.png">
      <img src="./icons/iconfinder_github.png">

      </div>

      `);

const aboutSectionContent = (aboutSection.innerHTML = `

  <span>About Me!</span>
  <br><br><br>

  <p>
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ratione tempora possimus culpa! A, odio qui illum, explicabo doloremque officia dolorum eaque laboriosam architecto consectetur aliquam voluptatibus facilis velit est!
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ratione tempora possimus culpa! A, odio qui illum, explicabo doloremque officia dolorum eaque laboriosam architecto consectetur aliquam voluptatibus facilis velit est!
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ratione tempora possimus culpa! A, odio qui illum, explicabo doloremque officia dolorum eaque laboriosam architecto consectetur aliquam voluptatibus facilis velit est!
  Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt ratione tempora possimus culpa! A, odio qui illum, explicabo doloremque officia dolorum eaque laboriosam architecto consectetur aliquam voluptatibus facilis velit est!

  </p>
`);

async function githubProfileRequest() {
  const userUrl = await fetch("https://api.github.com/users/aneagoie");

  const userData = await userUrl.json();

  console.log(userData);

  const profileImg = userData.avatar_url;
  const repoNumber = userData.public_repos;
  const followers = userData.followers;
  const following = userData.following;
  const urlProfile = userData.html_url;
  console.log(profileImg);
  body.append(githubSection);
  createGithubSection(profileImg, repoNumber, followers, following, urlProfile);
}

function createGithubSection(profileImg, repoNumber, followers, following, urlProfile) {
  const githubSectionContent = (githubSection.innerHTML = `
    <section id="github-section">

    <h3>Desafio</h3>

    <div id="container-challenge">
    <div id="profile-container">

    <div id="profile">

    <img src="${profileImg}">

    <h4 id="visit-profile" data-value="${urlProfile}">Visitar Perfil</h4>
    </div>

    <div id="profile-informations">

    <ul>
    <li>Repositórios : ${repoNumber}</li>
    <li>Seguidores : ${followers}</li>
    <li>Seguindo : ${following}</li>
    </ul>

    <div id="btns-show-infos">

    <div id="btn-check-repo" class="btns-profile" data-value="btn-repo">Ver Repositórios</div>

    <div id="btn-check-fav" class="btns-profile" data-value="btn-fav">Ver Favoritos</div>


    </div>

    </div>


    </div>

    <h3 id="list-title"></h3>
    <ul id="repo-list">
    </ul>

    </div>

    </section>

`);

  const btnCheckRepo = document.querySelector("#btn-check-repo");
  btnCheckRepo.addEventListener("click", checkWhereToGo);
  const profileContainer = document.querySelector("#profile-container");
  const btnCheckFav = document.querySelector("#btn-check-fav");
  btnCheckFav.addEventListener("click", checkWhereToGo);
  repoList = document.querySelector("#repo-list");
  listTitle = document.querySelector("#list-title");
  const btnVisitProfile = document.querySelector("#visit-profile");
  btnVisitProfile.addEventListener("click", visitProfile);

  body.append(footer);
}

const footerContent = (footer.innerHTML = `
      <footer>

      <h4>Desafio Desenvolvedor Front Qconcursos.com</h4>

      </footer>
      `);

function checkWhereToGo() {
  listTitle.innerText = "";

  console.log(this);

  console.log(dataState);

  var dataValue = this.dataset.value;

  console.log(dataValue);

  if (dataValue === "btn-repo") {
    listTitle.innerText = "Lista de Repositórios";

    requestGithubRepo();
  }
  if (dataValue === "btn-fav") {
    listTitle.innerText = "Lista de Favoritos";

    requestGithubFav();
  } else {
    return false;
  }
}

function requestGithubRepo() {
  fetch("https://api.github.com/users/aneagoie/repos")
    .then(function (response) {
      response.json().then(function (data) {
        console.log(data);
        showRepos(data);
      });
    })
    .catch(function (err) {
      console.error("Failed retrieving information", err);
    });
}

function requestGithubFav() {
  fetch("https://api.github.com/users/aneagoie/starred")
    .then(function (response) {
      response.json().then(function (data) {
        console.log(data);
        showFavs(data);
      });
    })
    .catch(function (err) {
      console.error("Failed retrieving information", err);
    });
}

function showRepos(repoData) {
  // githubSection.append(repoList);

  repoList.innerHTML = "";

  array = repoData;

  console.log("array", array);

  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    // console.log(element);
    const listItem = `
      <li class="list-item"><a href="${element.html_url}" target="_blank">${element.name}</a></li>
    `;
    // console.log(listItem);
    repoList.innerHTML += listItem;
  }
}

function showFavs(favData) {
  // githubSection.append(repoList);

  repoList.innerHTML = "";

  array = favData;

  console.log("array", array);

  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    // console.log(element);
    const listItem = `
      <li class="list-item"><a href="${element.html_url}" target="_blank">${element.name}</a></li>
    `;
    // console.log(listItem);
    repoList.innerHTML += listItem;
  }
}

function visitProfile() {
  var urlValue = this.dataset.value;

  window.open(urlValue);
}

// Append HTML Itens

window.onload = function () {
  console.log("Loaded");

  body.append(section);
  body.append(aboutSection);
  githubProfileRequest();
};


