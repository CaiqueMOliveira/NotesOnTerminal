const fs = require('fs');

const fetchNotes = () => {
    try {
        existingNotes = JSON.parse(fs.readFileSync('notes.json'));
        return existingNotes;
    } catch (e) {
        return [];
    }
};

const saveNote = note => {
    try {
        const noteToSave = JSON.stringify(note);
        fs.writeFileSync('notes.json', noteToSave);
        return true;
    } catch (e) {
        return false;
    }
};

const addNote = (noteTitle, noteBody) => {
    const existingNotes = fetchNotes();
    const isDuplicateNote = (existingNotes.filter(note => note.title === noteTitle)).length;

    if (isDuplicateNote) return;

    const newNote = {
        title: noteTitle,
        body: noteBody
    };
    const notesToSave = [...existingNotes, newNote];
    if (saveNote(notesToSave)) return newNote;
};

const getAllNotes = () => {
    return fetchNotes();
};

const deleteNote = noteTitle => {
    const existingNotes = fetchNotes();
    const notesToSave = existingNotes.filter(note => note.title !== noteTitle);
    saveNote(notesToSave);
    return existingNotes.length > notesToSave.length;
}

const readNote = noteTitle => {
    const existingNotes = fetchNotes();
    const foundNote = existingNotes.find(note => note.title === noteTitle);
    return foundNote;
};

const showNote = noteToShow => {
    debugger;
    console.log('title:', noteToShow.title);
    console.log('content:', noteToShow.body);
};

module.exports = {
    addNote,
    getAllNotes,
    deleteNote,
    readNote,
    showNote
}