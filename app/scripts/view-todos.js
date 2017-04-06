export default function todosView(store) {

  let $viewContent = $(`<section class="page-wrapper view-todo">
                          <div class="todos">
                            <h2>todos</h2>
                            <ul class="todo-list"></ul>
                            <form
                          </div>
                        </section>`);
  let $todoList = $viewContent.find('.todo-list');

  console.log(`viewing todos`);
  let todos = store.getState().todos;
  console.log(todos);

  todos.forEach( (todo, i, array) => {
    let $todoContent = $(`<div class="todo">
                        <button class="btn btn-complete">☐</button>
                        <div class="todo-main-info">
                          <span class="important">❕</span>
                          <span class="todo-name">${todo.name}</span>
                        </div>
                        <p class="description">${todo.description}</p>
                        <p class="dueDate">${todo.dueDate}</p>
                        <button class="btn btn-delete">𝗫</button>
                      </div>`);
    $todoList.append($todoContent);
  });



  return $viewContent;
}
