export default function todosView(store) {

  let $viewContent = $(`<section class="page-wrapper view-todo">
                          <div class="todos">
                            <h2>todos</h2>
                            <ul class="todo-list"></ul>
                            <form
                          </div>
                        </section>`);
                        
  return $viewContent;
}
