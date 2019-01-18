# Go Go Nihongo

A chrome extension that replaces English words with the first basic kanji or kana characters from your study book. 
The extension replaces words mentioned in the file `words.csv` with kanji.

## Testing

- Download this repository. 
- You can edit or replace the `words.csv` file
- Rows with just one entry will be treated as headers, for example JLPT5, JLPT4
- Open the Chrome extensions page, enable developer mode
- Click "Load Unpacked" and choose the folder you just downloaded

## Editing the files

- **popup.html** has the layout and css for the little popup window
- **style.css** has the styles that show kanji and a popup in all html pages

## TODO

- [ ] Improve extension icon
- [ ] Improve styling, toolip for the kanji
- [ ] Improve style, layout for popup menu
- [ ] Create one CSV with jlpt5, jlpt4, etc
- [x] Create popup menu
- [x] User can select which JLPT list to use
- [ ] Put extension in the chrome store
- [ ] Show "translating" message while working