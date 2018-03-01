/* sidebar to demonstrate all features */

$ = document.querySelector.bind(document);

browser.prefs.get('my.favorite.pref').then(
  answer => {
    console.log(`prefs sez: "${answer}"`);
    $("#pref-get").textContent=answer;
  }
);
