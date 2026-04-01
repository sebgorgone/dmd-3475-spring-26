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
fn.buildBrowserList(browserList, active, fileBrowserSection, local.data);
fn.buildTaskListOrdered(local.data);






console.log(fn.formatDate(new Date()));




