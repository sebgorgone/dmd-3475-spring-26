let taskInput = document.querySelector('#task-input');
let taskNoteInput = document.querySelector('#task-note-input');
let taskDateInput = document.querySelector('#task-date-input');
let addTaskButton = document.querySelector('#add-task-button');

let taskSearchInput = document.querySelector('#task-search-input');

let newTaskListButton = document.querySelector('#new-task-list-button');

let downloadListButton = document.querySelector('#download-list-button');
let uploadListButton = document.querySelector('#upload-list-button');

let sortByDateButton = document.querySelector('#sort-by-date-button');
let sortAlphabeticallyButton = document.querySelector('#sort-alphabetically-button');
let deleteAllButton = document.querySelector('#delete-all-button');
let deleteListButton = document.querySelector('#delete-list-button');

let listSection = document.querySelector('#task-list');
let fileBrowserSection = document.querySelector('#file-browser-list');

let fileName = document.querySelector('#file-title')

export const domElements = {
  taskInput,
  taskNoteInput,
  taskDateInput,
  addTaskButton,
  taskSearchInput,
  newTaskListButton,
  downloadListButton,
  uploadListButton,
  sortByDateButton,
  sortAlphabeticallyButton,
  deleteAllButton,
  deleteListButton,
  listSection,
  fileBrowserSection,
  fileName
}
