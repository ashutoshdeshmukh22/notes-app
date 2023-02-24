const chalk = require('chalk');
const { string } = require('yargs');
const yargs = require('yargs');
const notes = require('./notes.js');

// add, remove, read, list

// create add command

yargs.command({
  command: 'add',
  describe: 'Add a new Note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true, //true - required field
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// create remove command

yargs.command({
  command: 'remove',
  describe: ' Remove a Note',
  builder: {
    title: {
      describe: 'Note Title',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title);
  },
});

// create list command

yargs.command({
  command: 'list',
  describe: ' List Notes',
  handler: function () {
    notes.listNotes();
  },
});

// create read command

yargs.command({
  command: 'read',
  describe: ' Read Notes',
  builder: {
    title: { describe: 'Note Title', demandOption: true, type: 'string' },
  },
  handler: function (argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
// console.log(yargs.argv);
