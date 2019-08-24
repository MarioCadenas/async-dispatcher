const todos = [
  { title: 'todo1', description: 'todo description 1', id: 1, completed: false },
  { title: 'todo2', description: 'todo description 2', id: 2, completed: false },
  { title: 'todo3', description: 'todo description 3', id: 3, completed: false },
  { title: 'todo4', description: 'todo description 4', id: 4, completed: false },
  { title: 'todo5', description: 'todo description 5', id: 5, completed: false },
  { title: 'todo6', description: 'todo description 6', id: 6, completed: false },
  { title: 'todo7', description: 'todo description 7', id: 7, completed: false },
  { title: 'todo8', description: 'todo description 8', id: 8, completed: false }
];

export const getTodos = () => {
  return new Promise(resolve => setTimeout(() => resolve(todos), 2000));
};
