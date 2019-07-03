import _ from 'lodash';
import uuid from 'uuid';

export const todos = [
  {
    id: 'b8965bd8-83bf-4d9c-bfcc-6502c92817e0',
    title: 'Work',
    status: false,
    startDate: '2019-06-26T14:34:50.053Z',
    description: 'At vero eos et  atque corrupti  molestias',
    isChecked: false,
    day: ['Thứ 3', 'Thứ 4', 'Chủ Nhật']
  },
  {
    id: 'de119d89-f3b9-40d6-a8e7-5536472b3c45',
    title: 'Study',
    status: false,
    startDate: '2019-07-26T14:34:50.053Z',
    description: 'On the other hand demoralized  the moment',
    isChecked: false,
    day: ['Thứ 3', 'Thứ 4', 'Chủ Nhật']
  },
  {
    id: '7e710af7-07f9-4ff0-970d-594f754c32d9',
    title: 'Playing game',
    status: true,
    startDate: '2019-08-26T14:34:50.053Z',
    description:
      'But I must explain to you how all this complete account of the system',
    isChecked: false,
    day: ['Thứ 3', 'Thứ 4', 'Chủ Nhật']
  }
];

export const initValues = () => {
  saveLocalStorage(todos);
};

export function saveLocalStorage(data = []) {
  localStorage.setItem('data', JSON.stringify(data));
}

export function getTodos() {
  return JSON.parse(localStorage.getItem('data') || '[]');
}
export function getTodoByid(todoId) {
  const todos = getTodos();
  const id = todos.find(item => item.id === todoId);
  if (id) return todos.filter(todo => todo.id === todoId)[0];
  else return null;
}

export function saveTodo(todo) {
  const data = [{ ...todo, id: uuid.v4() }, ...getTodos()];
  saveLocalStorage(data);
}
export function updateTodo(todo) {
  const data = getTodos();
  const updateData = data.map(item =>
    _.isEqual(item.id, todo.id) ? todo : item
  );
  saveLocalStorage(updateData);
}

export function deleteTodo(todoId) {
  const data = getTodos();
  saveLocalStorage(data.filter(item => item.id !== todoId));
}
