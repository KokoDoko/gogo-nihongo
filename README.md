# Gogo Nihongo

A chrome extension that replaces English words with the first basic kanji or kana characters from your study book. 
The extension replaces words mentioned in the file `words.csv` with kanji.

## Testing

- Download this repository. 
- Generate a new `words.csv` file to add new words
- Rows with just one entry will be treated as headers, for example JLPT5, JLPT4
- Open the Chrome extensions page, enable developer mode
- Click "Load Unpacked" and choose the folder you just downloaded

## Editing the files

- **popup.html** has the layout and css for the little popup window
- **style.css** has the styles that show kanji and a popup in all html pages

## TODO

- [ ] Move storage script to background JS
- [ ] Improve icon
- [x] Styling, toolip for the kanji
- [ ] Create CSV lists for JLPT or by subject
- [x] Small popup where user can select list
- [ ] Styling for popup and kanji
- [ ] Make user selection working with CSV file
- [ ] User can set On Off switch in extension menu
- [ ] CSV files included in extension, but can be updated remotely
- [ ] Save the extension as a CRX file, put in the chrome store
- [ ] Show "translating" message while working