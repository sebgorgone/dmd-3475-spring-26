let storage = null;

export function initStorage() {
  if (!localStorage.getItem('tasks')) {

    const defaultList = [
      {
        name: 'my tasks',
        active: true,


        list: [
          {
            name: 'my first task',
            note: 'you need to do this',
            date: '31-30-2026',
          },
          {
            name: 'my second task',
            note: 'you need to do this',
            date: '31-30-2026'
          },
          {
            name: 'my third task',
            note: 'you need to do this',
            date: '31-30-2026'
          }
        ]
      },
      {
        name: 'my other tasks',
        active: false,


        list: [
          {
            name: 'my other first task',
            note: 'you need to do this',
            date: '31-30-2026',
          },
          {
            name: 'my other second task',
            note: 'you need to do this',
            date: '31-30-2026'
          },
          {
            name: 'my other third task',
            note: 'you need to do this',
            date: '31-30-2026'
          }
        ]
      }
    ];

    localStorage.setItem('tasks', JSON.stringify(defaultList));
    storage = defaultList;
    console.log(storage)
    return

  }


  storage = JSON.parse(localStorage.getItem('tasks'))
  return
}




export function updateStorage(data) {
  localStorage.setItem('tasks', JSON.stringify(data))

  return
}


initStorage()
export let data = storage;
