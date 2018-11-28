const fs = require('fs');

const note = {
    title: 'Some title',
    body: 'Some body'
};

const noteInJsonFormat = JSON.stringify(note);

fs.writeFileSync('notes.json', noteInJsonFormat);

const noteInObjectFormat = JSON.parse(fs.readFileSync('notes.json'));

console.log('noteInObjectFormat type:', typeof noteInObjectFormat);
console.log('noteInObjectFormat.title :', noteInObjectFormat.title);