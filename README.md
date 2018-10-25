# Gogo Nihongo

A chrome extension that replaces English words with the first basic kanji or kana characters from your study book. 

## Testing

- Download this repository. 
- Open the Chrome extensions page, enable developer mode
- Click "Load Unpacked" and choose the folder you just downloaded

The extension should search any html page for words mentioned in the file `words.js`. These words are then replaced with the accompanying kana/kanji.

```
let words = [["water", "みず"], ["tree", "き"], ["sun", "ひ"], ["forest", "もり"]]
```

## TODO

- Styling
- Create lists with the first 100 words you learn, in kana and in kanji
- User can select lists
- User can input own words
- Put lists online instead of in the extension itself