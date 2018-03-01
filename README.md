# shield-study-webextension-experiment-template
A prototype for the new development of Shield studies as WebExtension Experiments


## Setup

1. Get a Firefox 59+
2. Install

  ```
  npm install -g web-ext  # just make it global!
  web-ext run --firefox=/Applications/FirefoxNightly.app/Contents/MacOS/firefox-bin
  ```


## How to WebExtension Experiment (pitfalls, tricks)

Example:  Prefs  (`privileged/prefs`)

`manifest.json`

```js
{
  // other sections

  // experiment apis `maps` file paths for WEE's
  "experiment_apis": {
    // this is called paths.
    "prefs": {

      // path to schema that describes this
      "schema": "./privileged/prefs/schema.json",

      "parent": {
        // there are others, including content process stuff
        // don't mess with it!
        "scopes": ["addon_parent"],
        // relative location of script
        "script": "./privileged/prefs/prefs.js",

        // describe the lazy getter.  won't be loaded until `browser.prefs`
        "paths": [["prefs"]]
      }
    }
  }
}
```

`prefs/prefs.js`

- ChromeUtils, not Cu: `ChromeUtils.import("resource://gre/modules/Services.jsm");`
- How to export the api to MATCH `schema.json`

  ```
  // MUST have a `this.prefs`
  // MUST extend ExetensionAPI

  this.prefs = class extends ExtensionAPI {
    getAPI(context) {
      return {
        prefs: {
          async get(prefName) {
            return "getting";
          },
          async set(prefName, value) {
            return "set";
          }
        }
      };
    }
  ```

`schema.json`

- mostly obvious
- for polymorphic types: `"type": "any"` is acceptable, but there are other ways.


`sidebar.js`

This is where we USE the new `browser.prefs`

```
$ = document.querySelector.bind(document);

browser.prefs.get('my.favorite.pref').then(
  answer => {
    console.log(`prefs sez: "${answer}"`);
    $("#pref-get").textContent=answer;
  }
);
```



Pitfalls:

- `web-ext lint` doesn't work for embedded WEE (yet, issue filed)




Claims / ideas / conventions:

- put all 'privileged' code in `privileged/` as convention.
