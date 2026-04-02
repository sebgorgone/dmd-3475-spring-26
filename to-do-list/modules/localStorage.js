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
            date: '2005-08-02',
          },
          {
            name: 'my second task',
            note: 'you need to do this',
            date: '2025-06-22'
          },
          {
            name: 'my third task',
            note: 'you need to do this',
            date: '3202-04-18'
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
          },
          {
            name: 'my other second task',
            note: 'you need to do this',
          },
          {
            name: 'my other third task',
            note: 'you need to do this',
          }
        ]
      }
    ];

    localStorage.setItem('tasks', JSON.stringify(defaultList));
    storage = defaultList;
    console.log(storage);
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
