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
  let newTaskListName = '';

  const dialougeWindow = document.createElement('div');
  dialougeWindow.className= 'dialouge'
  dialougeWindow.style.cssText = 'position: fixed; top: 30px; right: 30px; background-color: rgb(20, 20, 20); z-index: 10; width: 450px; height: 128px; border-radius: 12px; display: flex; flex-direction: column; gap: 4px; padding-4px;'
  const body = document.querySelector('body');


  const xButton = document.createElement('button');
  xButton.className = 'delete';
  xButton.textContent = 'X';
  xButton.addEventListener('click', () => {
    dialougeWindow.remove();
  })

  dialougeWindow.appendChild(xButton);


  const nameInput = document.createElement('input');
  nameInput.type = 'text'
  nameInput.placeholder = 'new list name';

  nameInput.addEventListener('input', e => {newTaskListName = e.target.value})

  function checkExistingNames(){
    const data = JSON.parse(localStorage.getItem('tasks'));

    for (let item of data) {
      if (item.name.trim() === newTaskListName.trim()) return true;
    }

    return false
  }

  nameInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      if (newTaskListName.trim() === '' || checkExistingNames()){
        dialougeWindow.remove();
      } else {
        fn.addTaskList(newTaskListName);
        dialougeWindow.remove();
      }

    }
  })

  dialougeWindow.appendChild(nameInput);

  body.appendChild(dialougeWindow);

  nameInput.focus();


})





deleteListButton.addEventListener('click', () => {

  const dialougeWindow = document.createElement('div');
  dialougeWindow.className= 'dialouge'
  dialougeWindow.style.cssText = 'position: fixed; top: 30px; right: 30px; background-color: rgb(20, 20, 20); z-index: 10; width: 450px; height: 128px; border-radius: 12px; display: flex; flex-direction: column; gap: 4px; padding-4px;'
  const body = document.querySelector('body');


  const xButton = document.createElement('button');
  xButton.className = 'delete';
  xButton.textContent = 'X';
  xButton.addEventListener('click', () => {
    dialougeWindow.remove();
  });

  function getName() {
    const data = JSON.parse(localStorage.getItem('tasks'));

    for (let item of data) {
      if (item.active) return item.name;
    }
  }

  const text = document.createElement('p');
  text.textContent = `are you sure you want to delete ${getName()}`

  dialougeWindow.appendChild(xButton);
  dialougeWindow.appendChild(text);

  const div = document.createElement('div');
  const okButton = document.createElement('button')
  okButton.textContent = 'ok';
  okButton.className = 'delete'

  okButton.addEventListener('click', () => {
    fn.deleteActiveList();
    dialougeWindow.remove();
  });

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'cancel'

  cancelButton.addEventListener('click', () => {
    dialougeWindow.remove();
  })

  div.appendChild(okButton);
  div.appendChild(cancelButton);
  dialougeWindow.appendChild(div);
  body.appendChild(dialougeWindow);


});


deleteAllButton.addEventListener('click', () => {

  const dialougeWindow = document.createElement('div');
  dialougeWindow.className= 'dialouge'
  dialougeWindow.style.cssText = 'position: fixed; top: 30px; right: 30px; background-color: rgb(20, 20, 20); z-index: 10; width: 450px; height: 128px; border-radius: 12px; display: flex; flex-direction: column; gap: 4px; padding-4px;'
  const body = document.querySelector('body');


  const xButton = document.createElement('button');
  xButton.className = 'delete';
  xButton.textContent = 'X';
  xButton.addEventListener('click', () => {
    dialougeWindow.remove();
  });

  function getName() {
    const data = JSON.parse(localStorage.getItem('tasks'));

    for (let item of data) {
      if (item.active) return item.name;
    }
  }

  const text = document.createElement('p');
  text.textContent = `are you sure you want to delete all task in ${getName()}`

  dialougeWindow.appendChild(xButton);
  dialougeWindow.appendChild(text);

  const div = document.createElement('div');
  const okButton = document.createElement('button')
  okButton.textContent = 'ok';
  okButton.className = 'delete'

  okButton.addEventListener('click', () => {
    fn.deleteAllActiveItems();
    dialougeWindow.remove();
  });

  const cancelButton = document.createElement('button');
  cancelButton.textContent = 'cancel'

  cancelButton.addEventListener('click', () => {
    dialougeWindow.remove();
  })

  div.appendChild(okButton);
  div.appendChild(cancelButton);
  dialougeWindow.appendChild(div);
  body.appendChild(dialougeWindow);


});

sortAlphabeticallyButton.addEventListener('click', () => {
  fn.sortAlphabetically();
})

sortByDateButton.addEventListener('click', () => {
  fn.sortByDate();
})

taskSearchInput.addEventListener('input', () => {
  fn.wildcardSearch(taskSearchInput.value);
})
