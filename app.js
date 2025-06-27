const movieListElem = document.getElementById("movie__result")

async function main() {
    const getInfo = await fetch('http://www.omdbapi.com/?t=Spider-Man&apikey=1fb66a7f')
    const myInfo = await getInfo.json();
    console.log(myInfo);
}

main();

function search() {
    
}