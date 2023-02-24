const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
  return 'Your Notes ...';
};

// Adding note
const addNote = (title, body) => {
  const notes = loadNotes(); // getting notes from loadNotes Method

  // find method returns first match and will stops
  const duplicateNote = notes.find((note) => note.title === title);

  /* const duplicateNotes = notes.filter((note) => {
    return note.title === title; //title is we pass through cmd line
    // In filter Method - Here if we found duplicate note still filter will check all other elements in array its not time efficient
  }); 
  
  if duplicateNotes.length === 0*/

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });

    saveNote(notes);
    console.log(chalk.blue.bgGreen.bold('New Note Added'));
  } else {
    console.log(chalk.blue.bgMagenta.bold('Note Title Taken / Already Exist'));
  }
};

// helper function to save note to file
const saveNote = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

// helper method to get / read all the notes from file
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
};

// method to remove the note
const removeNote = (title) => {
  const notes = loadNotes(); // getting existing notes from loadNotes Method

  const notesToKepp = notes.filter((note) => {
    return note.title !== title;
  });

  saveNote(notesToKepp); //saving updated notes to file

  if (notes.length > notesToKepp.length) {
    //notesToKeep size reduces means a note is deleted , comparing previous notes object with updated one
    console.log(chalk.blue.bgRedBright.bold('Note Removed'));
  } else {
    console.log(chalk.blue.bgMagenta.bold('Note Not Found'));
  }
};

// listing notes
const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.inverse('Your Notes'));

  notes.forEach((note) => {
    console.log(note.title);
  });
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.inverse('Title: ' + note.title));
    console.log('Note: ' + note.body);
  } else {
    console.log(chalk.red.inverse('Note not Found'));
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
};
