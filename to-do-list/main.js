import { domElements } from './modules/dom.js'
import * as fn from './modules/functions.js'

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
} = domElements

//if (!localStorage.getItem('tasks')) {
//  
//  const today = new Date();
//
//
//  const default = {
//    [
//      {
//        name: 'my tasks',
//        list: [
//          {
//            name: 'my first task',
//            note: 'you need to do this',
//            date: ''
//          }
//        ]
//      }
//    ]
//  }
//}
console.log(fn.formatDate(new Date()))




