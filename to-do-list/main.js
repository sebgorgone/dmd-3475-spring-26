import { domElements } from './modules/dom.js';
import * as fn from './modules/functions.js';
import * as local from './modules/localStorage.js'


let {
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
} = domElements;





const { active, browserList} = fn.build(local.data);
fn.buildBrowserList();
fn.buildTaskListOrdered(local.data);


addTaskButton.addEventListener('click', () => {
  fn.addTask(taskInput.value, taskNoteInput.value, taskDateInput.value);
});

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    fn.addTask(taskInput.value, taskNoteInput.value, taskDateInput.value);
  }
});

taskNoteInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    fn.addTask(taskInput.value, taskNoteInput.value, taskDateInput.value);
  }
});

taskDateInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    fn.addTask(taskInput.value, taskNoteInput.value, taskDateInput.value);
  }
});
