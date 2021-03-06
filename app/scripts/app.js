/* jshint -W138 */
/* jshint -W004 */

import { createStore } from 'redux';
import signInView from './view-signin.js';
import todosLoadingView from './view-loading-todo-app.js';
import todosView from './view-todos.js';
// import ajax from './ajax.js';
// import loadingMenuView from './view-loading-menu.js';
// import menuView from './view-menu.js';
// import sendingOrderView from './view-sending-order.js';
// import orderConfirmationView from './view-order-confirmation.js';

export default function app() {

  const $appContainer = $('#app');

  const APP_URL = 'https://api.backendless.com/v1/data';

  const initialState = {
    session: {
      displayName: '',
      userToken: ''
    },
    view: signInView,
    todos: []
  };

  function Todo(rawData) {
    this.name = rawData.name;
    this.description = rawData.description;
    this.complete = rawData.complete;
    this.important = rawData.important;
    this.dueDate = new Date(rawData.dueDate);
  }

  const reducer = function (currentState, action) {
    if (currentState === undefined) {
      return initialState;
    }

    switch(action.type) {


      case 'VIEW_LOGIN_SCREEN':
        console.log(currentState);
        return initialState;


      case 'LOGIN':
        var newState = {
          view: todosLoadingView
        };
        let retrievedUserToken;
        console.log('>>> logging in >>>');
        $.ajax({
          url: "https://api.backendless.com/v1/users/login",
          method: "POST",
          headers: {
            "application-id": "068B64E1-D886-AE57-FF06-C235EB26B100",
            "secret-key": "F05CCB9A-CF37-CDDE-FF5F-B90BE8657D00",
            "Content-Type": "application/json",
            "application-type": "REST"
          },
          dataType: "JSON",
          data: JSON.stringify( {
           login : "ripley@example.com",
           password : "password"
          })
        }).then( (data, status, xhr) => {
          console.log(data);
          retrievedUserToken = data['user-token'];
          console.log(retrievedUserToken);
          store.dispatch({
            type: "LOAD_TODO_VIEW",
            userToken: data['user-token'],
            displayName: data.name
          });
        });
        return Object.assign({}, currentState, newState);


        case 'LOAD_TODO_VIEW':
          var newState = {
            session: { userToken: action.userToken },
            displayName: action.displayName
          };
          console.log(`user "${newState.displayName}" authenticated`, newState);
          console.log('loading tasks…');
          $.ajax({
            url: "https://api.backendless.com/v1/data/Todos",
            method: "GET",
            headers: {
              "application-id": "068B64E1-D886-AE57-FF06-C235EB26B100",
              "secret-key": "F05CCB9A-CF37-CDDE-FF5F-B90BE8657D00",
              "user-token": newState.session.userToken
            }
          }).then( (data, status, xhr) => {
            console.log(data);
            store.dispatch({
              type: "VIEW_TASKS",
              todoData: data.data
            });
          });
          return Object.assign({}, currentState, newState);


      case 'VIEW_TASKS':
        console.log(`viewing tasks:`, action.todoData);
        let instancedTodos = action.todoData.map( (rawTodo, i, array) => {
          return new Todo (rawTodo);
        });
        console.log(instancedTodos);
        var newState = {
          view: todosView,
          todos: instancedTodos
        };
        return Object.assign({}, currentState, newState);


      case 'ADD_TODO':
        var newState = {
        };
        console.log(newState);
        return Object.assign({}, currentState, newState);


      default:
        console.debug('⚠️ reducer(): Unhandled action!', action.type);
        return currentState;
    }
  };
  // end reducer()

  const store = createStore(reducer);

  const render =  function () {
    let state = store.getState();
    $appContainer.html(state.view(store));
  };

  //The store will now run our 'render' function after every event is dispatched.
  store.subscribe(render);
  store.dispatch({ type: 'VIEW_LOGIN_SCREEN' });
}
