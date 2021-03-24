/*
	Javascript-tiedosto AJAX-tehtäviä varten.
	Jos etsitään TV-sarjoja haulla "girls", niin TV Maze APIsta suoritettava hakuosoite on:
	http://api.tvmaze.com/search/shows?q=girls
	Testaa haun toimintaa omassa selaimessa (Firefox osaa tulkita json-tuloksen yleensä paremmin).
*/

// hakuosoitteen vakio-osa.
const apiurl = "http://api.tvmaze.com/search/shows?q=";
// Etsitään HTML-sivulta tarvittavat komponentit id:n avulla.
const hakunappi = document.getElementById("hakunappi");
const hakuteksti = document.getElementById("hakuteksti");
// TODO: etsi html-sivulta komponentti, johon tuloksien pitäisi ilmestyä.
const tulosalue = document.getElementById("tulos");


// lisätään napille tapahtumankäsittelijä
hakunappi.addEventListener('click', tee_haku);

// Idea: tämä fetch-osa säilyy aina lähes vakiona.
function tee_haku()  {
    // TODO: haetaan html-sivulta käyttäjän antama hakuteksti (muista .value)
    // TODO: poista siis tuo kovakoodaus!
    let hakusana = document.getElementById("hakuteksti").value;
    fetch(apiurl + hakusana).then(function(response) {
        return response.json();
    }).then(function(json) {
        naytaVastaus(json);				// siirrytään varsinaisen datan käsittelyyn.
    });

};

function naytaVastaus(json) {
    /* 	Aha, json-dataoliot ovat siis taulukossa. Yksi dataolio sisältää yhden
        sarjan tiedot tai vastaavaa.
        Eihän ope nyt kaikkia saa tulostettua... Kokeilen eka hakutuloksen kanssa...
        // TODO: tulosta kaikkien sarjojen tiedot.
        

        // TODO: virheiden varalta tsekkaa myös alla oleva try-catch juttu.

    */

       
   function etsiSarjoja ({ target }) {
    fetch(`https://api.tvmaze.com/search/shows?q=${target.value}`)
        .then(blob => blob.json())
        .then(shows => {
            const app = document.getElementById('app')
        app.innerHTML = shows.map(({ show }) => `
          <div class="col-sm movie-content">
            ${show.image ? `<img src="${show.image.medium}">` : ''}
            <div class="movie-info">
              <h5>${show.name}</h5>
              <span>Rating: ${show.rating.average}</span>
              <br />
              <span>Rating: ${show.genres}</span>
            </div>
          </div>

        `).join();
      })
  }
  
  hakunappi.addEventListener('keydown', etsiSarjoja)

    console.log("json sellaisenaan <br>");
    console.log(json);
    document.getElementById("tulos").innerHTML = (json);

    console.log("Se siitä <br>");
    // Valmistellaan html-sivulle tuleva koodi.
    let html_koodi = '';


    // Sijoitan jokaisen dataolion (sarjan) tiedot oman article-tagin sisään.
    html_koodi += `<article>`;

    // harjoittelua ennen varsinaista tulostusta.
    console.log("Hakutuloksia löytyi: " + Object.keys(json).length + " kpl.");
    console.log("Length kertoo: " + json.length);

    for (let i = 0; i<json.length; i++) {

    let nimi = json[i].show.name;
    console.log("Check: eka sarjan nimi: " + nimi + "<br>");
    html_koodi += `Nimi: ${nimi}`;
    html_koodi += `</article>`
    tulosalue.innerHTML = html_koodi;
    let url = json[i].show.url;
    html_koodi += `<a href="${url}">Nettiosoite</a><br>`;
    html_koodi += `</article>`
    tulosalue.innerHTML = html_koodi;
    console.log("Check: eka sarjan url: " + url + "<br>");
    let imgOsoite = json[i].show.image.medium;
    html_koodi += `Image: <img src="${imgOsoite}"></img>`;
    html_koodi += `</article>`
    tulosalue.innerHTML = html_koodi;
    console.log("Check: eka sarjan kuvien url löytyy show.image alta");

}
}
function virhetilanne() {
    // Virhealtis koodi kannattaa hallinnoida esim. try-catch tekniikalla.
    // Idea: tehdään yleensä toimivat osat normaalisti.
    // virhealtis kohta try-catch osan sisään.

    // Tässä alla on jotakin virhealista koodia:
    try {
        // virhealtista koodia.
        // Jos tulee virhetilanne, niin tämän koodin ssuoritus lopetetaan heti.
        // Tänne ei palata.
    }
    catch (e) {
        // jos tapahtui virhe, niin tullaan tänne, muuten ei.
        console.log("Jokin meni pieleen, alla virheen info: <br>")
        console.log(e);
    }

}



