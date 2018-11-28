const yargs = require('yargs');
const notes = require('./notes.js');

const userSubArgument = yargs
    .command('add', 'Add a new note', {
        title: {
            describe: "Title of note",
            demand: true,
            alias: 't'
        }
    })
    .help()
    .argv;
const userArgument = userSubArgument._[0];

switch (userArgument) {
    case 'add':
        const createdNote = notes.addNote(
            userSubArgument.title,
            userSubArgument.body
        );
        if (createdNote) {
            console.log('Note has been created.');
            console.log('--');
            notes.showNote(createdNote);
        } else {
            console.log('Note title taken.');
        }
        break;
    case 'list':
        const allNotes = notes.getAllNotes();
        allNotes.forEach(note => {
            notes.showNote(note)
            console.log();
        });
        break;
    case 'update':
        break;
    case 'delete':
        if (notes.deleteNote(userSubArgument.title)) {
            console.log('Note has been deleted with successful.');
        } else {
            console.log('No note to delete.');
        }
        break;
    case 'read':
        const foundNote = notes.readNote(userSubArgument.title);
        if (typeof foundNote === 'undefined') console.log('Note not found.');
        else notes.showNote(foundNote);
        break;
    default:
        console.log(`Argument not recognized (${userArgument}).`);
}