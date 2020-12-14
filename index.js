const GITHUBAPI = "https://api.github.com/users/"

const searchInput = document.querySelector('#search');

showUser("marufsami")

const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const searchTerm = searchInput.value;
    
    if(searchTerm){
     showUser(searchTerm);
    
        searchInput.value = "";
    }
});


async function  showUser(user){
    const resp = await fetch(GITHUBAPI + user);
    const respData = await resp.json();
    
    createCard(respData);
    getRepos(user);
};


async function getRepos(username){
    const resp = await fetch(GITHUBAPI + username + '/repos')
    const respData = await resp.json();
    console.log(respData);
    addReposToCard(respData)
}


function addReposToCard(data){
    const respE = document.querySelector('.repos');
    data.sort((a, b)=>{
      return b.stargazers_count -  a.stargazers_count;
    }).slice(0,10).forEach((value)=>{
       
        const a = document.createElement('a');
        a.classList.add('respName');
       
        a.href=value.html_url;
        a.innerText = value.name;
        a.target = "_blank"
        respE.appendChild(a);
        
    });
}


const main = document.querySelector('.main')


function createCard(data){
    const cardHTML = `
    <div class="card">
    <img src="${data.avatar_url}">
    <h1>${data.name}</h1>
    <p class="bio">${data.bio}</p>
    <div class="fullList">
    <li>Followers :${data.followers}</li>
    <li>Following :${data.following}</li>
    <li>Repos :${data.public_repos}</li>
    </div>
    <div class="repos"></div>
    </div>
    `;
    main.innerHTML = cardHTML;
}