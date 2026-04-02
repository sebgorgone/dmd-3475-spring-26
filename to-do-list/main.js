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

newTaskListButton.addEventListener('click', () => {
  const dialougeWindow = document.createElement('div');
  dialougeWindow.style.cssText = 'position: fixed; top: 30px; right: 30px; background-color: rgb(20, 20, 20); z-index: 10; width: 450px; height: 128px; border-radius: 12px; display: flex; flex-direction: column; '
  const body = document.querySelector('body');


  const xButton = document.createElement('button');
  xButton.className = 'delete';
  xButton.textContent = 'X';
  xButton.addEventListener('click', () => {
    dialougeWindow.remove();
  })

  dialougeWindow.appendChild(xButton);


  body.appendChild(dialougeWindow);


})
