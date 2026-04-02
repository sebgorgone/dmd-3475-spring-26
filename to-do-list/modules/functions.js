import { initStorage } from './localStorage.js'
import { domElements } from './dom.js';

let { listSection, fileName, fileBrowserSection, taskInput, taskNoteInput, taskDateInput } = domElements


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



export function buildBrowserList() {


  let data = JSON.parse(localStorage.getItem('tasks'));
  let active = null;
  let browserList = [];
  let pElement = fileBrowserSection;

  for (let i = 0; i < data.length; i++) {
    browserList.push(data[i].name)
  }

  for (let i = 0; i < data.length; i++) {
    if (data[i].active)  {
      active = data[i]
    } 
  }
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

      for (let j = 0; j < data.length; j++) {
        if (data[j].active) {
          data[j].active = false;
        }
      }

      data[i].active = true;
      active = data[i];

      localStorage.setItem('tasks', JSON.stringify(data));
      initStorage();
      buildBrowserList ();
      buildTaskListOrdered(data);
    });

    pElement.appendChild(button);
  }

  let newFileName = fileName.cloneNode(true);
  fileName.parentNode.replaceChild(newFileName, fileName);
  fileName = newFileName;

  fileName.addEventListener('click', () => {
    const input = document.createElement("input");
    input.type = 'text';
    input.placeholder = fileName.textContent;
    input.value = "";
    let replaced = false;
    fileName.replaceWith(input);

    input.addEventListener("keydown", e => {
      if (e.key === 'Enter') {
        replaced = true;
        for (let i = 0; i < data.length; i++) {
          if (data[i].active) {
            data[i].name = input.value;
          }
          localStorage.setItem('tasks', JSON.stringify(data));
        }
        const h1 = document.createElement("h1");
        h1.id = 'file-title';
        h1.textContent = input.value;
        input.replaceWith(h1);



        active.name = h1.textContent;



        fileName = h1;
        fileName.addEventListener('click', () => buildBrowserList())
        buildBrowserList();
      }
    });

    input.focus();

    input.addEventListener("blur", () => {
      if (replaced) return;
      const h1 = document.createElement("h1");
      h1.id = 'file-title';
      h1.textContent = active.name;
      input.replaceWith(h1);
      fileName = h1;
      fileName.addEventListener('click', () => buildBrowserList());
    });
  });


}

export function buildTaskListOrdered(data) {
  const pElement = listSection;
  pElement.innerHTML = '';


  function pruneInactive() {
    return data.filter(list => list.active)
  }

  const activeList = pruneInactive()[0]


  for (let i = 0; i < activeList.list.length; i++) {

    let task = activeList.list[i].name
    let taskNote = activeList.list[i].note;
    let taskDate = activeList.list[i].date;



    const li = document.createElement('li');
    li.className = 'list-element';
    li.id = `list-element-${i}`;

    const leftDiv = document.createElement('div');
    leftDiv.className = 'left-div';

    
    const title = document.createElement('h3');
    title.textContent = activeList.list[i].name;




    title.addEventListener('click', () => {
      let nameInput = document.createElement('input');
      nameInput.value = task;
      nameInput.placeholder = activeList.list[i].name;
      nameInput.type = 'text';
      

      let replaced = false;

      title.replaceWith(nameInput);

      nameInput.focus();

      nameInput.addEventListener('input', e => {task = e.target.value; replaced = true;})

      nameInput.addEventListener('keydown', e => {
        if (e.key === 'Enter'){

          if (task.trim() === '' || !replaced) buildTaskListOrdered(data);

          activeList.list[i] = {
            name: task.trim(),
            note: taskNote.trim(),
            date: taskDate.trim()
          }

          for (let item of data) {
            if (item.active) {item = activeList}
          }

          localStorage.setItem('tasks', JSON.stringify(data));

          buildTaskListOrdered(data)

        }
      })




      nameInput.addEventListener('blur', () => {
        if (replaced) {
          if (task.trim() === '') buildTaskListOrdered(data);

          activeList.list[i] = {
            name: task.trim(),
            note: taskNote.trim(),
            date: taskDate.trim()
          }

          for (let item of data) {
            if (item.active) {item = activeList}
          }

          localStorage.setItem('tasks', JSON.stringify(data));
        }

        buildTaskListOrdered(data);
      })


    });




    leftDiv.appendChild(title);

    if (activeList.list[i].note.trim() !== ''){
      const note = document.createElement('p');
      note.textContent = activeList.list[i].note;


      note.addEventListener('click', () => {
        let nameInput = document.createElement('input');
        nameInput.value = taskNote;
        nameInput.placeholder = activeList.list[i].note;
        nameInput.type = 'text';


        let replaced = false;

        note.replaceWith(nameInput);

        nameInput.focus();

        nameInput.addEventListener('input', e => {taskNote = e.target.value; replaced = true;})

        nameInput.addEventListener('keydown', e => {
          if (e.key === 'Enter'){

            if (!replaced) buildTaskListOrdered(data);

            activeList.list[i] = {
              name: task.trim(),
              note: taskNote.trim(),
              date: taskDate.trim()
            }

            for (let item of data) {
              if (item.active) {item = activeList}
            }

            localStorage.setItem('tasks', JSON.stringify(data));

            buildTaskListOrdered(data)

          }
        })




        nameInput.addEventListener('blur', () => {
          if (replaced) {

            activeList.list[i] = {
              name: task.trim(),
              note: taskNote.trim(),
              date: taskDate.trim()
            }

            for (let item of data) {
              if (item.active) {item = activeList}
            }

            localStorage.setItem('tasks', JSON.stringify(data));
          }

          buildTaskListOrdered(data);
        })


      });




      leftDiv.appendChild(note);
    }

    if (activeList.list[i].date.trim() !== '') {
      const date = document.createElement('p');
      date.className = 'date';
      date.textContent = activeList.list[i].date



      date.addEventListener('click', () => {
        let nameInput = document.createElement('input');
        nameInput.value = taskDate;
        nameInput.placeholder = Date(activeList.list[i].date);
        nameInput.type = 'date';


        let replaced = false;

        date.replaceWith(nameInput);

        nameInput.focus();

        nameInput.addEventListener('input', e => {taskDate = e.target.value; replaced = true;})

        nameInput.addEventListener('keydown', e => {
          if (e.key === 'Enter'){

            if (!replaced) buildTaskListOrdered(data);

            activeList.list[i] = {
              name: task.trim(),
              note: taskNote.trim(),
              date: taskDate.trim()
            }

            for (let item of data) {
              if (item.active) {item = activeList}
            }

            localStorage.setItem('tasks', JSON.stringify(data));

            buildTaskListOrdered(data)

          }
        })




        nameInput.addEventListener('blur', () => {
          if (replaced) {
            activeList.list[i] = {
              name: task.trim(),
              note: taskNote.trim(),
              date: taskDate.trim()
            }

            for (let item of data) {
              if (item.active) {item = activeList}
            }

            localStorage.setItem('tasks', JSON.stringify(data));
          }

          buildTaskListOrdered(data);
        })


      });




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
    deleteButton.textContent = 'DELETE';

    deleteButton.addEventListener('click', () => {
      deleteTask(i, activeList, data);
    })

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


function deleteTask(index, activeList, data) {
  activeList.list.splice(index, 1);

  for (let i = 0; i < data.length; i++) {
    data[i].active && (data[i].list = activeList.list);
  }

  localStorage.setItem('tasks', JSON.stringify(data));
  buildTaskListOrdered(data);
}




export function addTask(task, note, date) {
  if (task.trim() === '') return;

  let data = JSON.parse(localStorage.getItem('tasks'));
  let active = null;
  for (let item of data) {
    if (item.active) {
      active = item;
    }
  }

  const newItem = {
    name: task.trim(),
    note: note.trim(),
    date: date.trim()
  }

  active.list = [newItem, ...active.list];

  for (let item of data) {
    if (item.active) {
      item = active;
    }
  }

  localStorage.setItem('tasks', JSON.stringify(data));
  buildTaskListOrdered(data);

  taskInput.value = '';
  taskNoteInput.value = '';
  taskDateInput.value = '';

  taskInput.focus();
}
