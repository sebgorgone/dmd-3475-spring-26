import { initStorage } from './localStorage.js'
import { domElements } from './dom.js';

const { listSection, fileName } = domElements

export function formatDate(date) {
  const formatted = String(date.getDate()).padStart(2, '0') + '-' +
    String(date.getMonth() + 1).padStart(2, '0') + '-' +
    date.getFullYear();

  return formatted
}

export function build(data) {
  let active = null;
  const browserList = [];
  for (let i = 0; i < data.length; i++) {

    browserList.push(data[i].name)

    if (data[i].active) {
      active = data[i]
    }
  }
  return { active, browserList }
}



export function buildBrowserList(browserList, active, pElement, data) {


  pElement.innerHTML = '';
  fileName.textContent = active.name;


  for (let i = 0; i < browserList.length; i++) {
    if (browserList[i] === active.name) {
      const p = document.createElement('p');

      p.className = 'active-list';
      p.textContent = browserList[i];
      pElement.appendChild(p);

      continue;
    }

    const button = document.createElement('button');
    button.id = `browser-list-button-${i}`;
    button.className = 'list-button';
    button.textContent = browserList[i];

    button.addEventListener('click', () => {
      console.log('listener active running loop');

      for (let j = 0; j < data.length; j++) {
        if (data[j].active) {
          data[j].active = false;
        }
      }

      data[i].active = true;
      active = data[i];

      localStorage.setItem('tasks', JSON.stringify(data));
      initStorage();
      buildBrowserList(browserList, active, pElement, data);
      buildTaskListOrdered(data);
    });

    pElement.appendChild(button);
  }

}

export function buildTaskListOrdered (data) {
  const pElement = listSection;
  pElement.innerHTML = ''

  function pruneInactive() {
    return data.filter(list => list.active)
  }

  const activeList = pruneInactive()[0]


  for (let i = 0; i < activeList.list.length; i++) {
    const li = document.createElement('li');
    li.className = 'list-element';

    const leftDiv = document.createElement('div');
    leftDiv.className = 'left-div';

    
    const title = document.createElement('h3');
    title.textContent = activeList.list[i].name;

    leftDiv.appendChild(title);
    
    if (activeList.list[i].note.trim() !== ''){
      const note = document.createElement('p');
      note.textContent = activeList.list[i].note;
      leftDiv.appendChild(note);
    }

    if (activeList.list[i].date.trim() !== '') {
      const date = document.createElement('p');
      date.className = 'date';
      date.textContent = activeList.list[i].date
      leftDiv.appendChild(date);
    }

    if (i !== 0) {
      const upButton = document.createElement('button');
      upButton.textContent = '↑';
      upButton.className = 'up-button';

      upButton.addEventListener('click', () => {
        moveTaskUp(i, activeList.list, data);
      })

      li.appendChild(upButton)
    }

    if(i !== activeList.list.length - 1) {
      const downButton = document.createElement('button');
      downButton.textContent = '↓';
      downButton.className = 'down-button'

      downButton.addEventListener('click', () => {
        moveTaskDown(i, activeList.list, data);
      })

      li.appendChild(downButton)
    }

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.textContent = 'DELETE'
    li.appendChild(deleteButton);

    li.appendChild(leftDiv);

    pElement.appendChild(li)

  }
}

function moveTaskUp (index, activeList, data) {

  const list1 = activeList.filter((item, idx) => idx < index - 1);
  const list2 = activeList.filter((item, idx) => idx === index);
  const list3 = activeList.filter((item, idx) => idx === index - 1);
  const list4 = activeList.filter((item, idx) => idx > index);

  const updated = [...list1, ...list2, ...list3, ...list4];

  for (let i = 0; i < data.length; i++) {
    data[i].active && (data[i].list = updated);
  }

  localStorage.setItem('tasks', JSON.stringify(data));
  buildTaskListOrdered(data);

}

function moveTaskDown (index, activeList, data) {

  const list1 = activeList.filter((item, idx) => idx < index);
  const list3 = activeList.filter((item, idx) => idx === index);
  const list2 = activeList.filter((item, idx) => idx === index + 1);
  const list4 = activeList.filter((item, idx) => idx > index + 1);

  const updated = [...list1, ...list2, ...list3, ...list4];

  for (let i = 0; i < data.length; i++) {
    data[i].active && (data[i].list = updated);
  }

  localStorage.setItem('tasks', JSON.stringify(data));
  buildTaskListOrdered(data);

}
