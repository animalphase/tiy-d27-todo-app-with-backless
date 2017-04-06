export default function signInView(store) {

  let $viewContent = $(`<section class="page-wrapper view-login">
                          <div class="login">
                            <h2>pls login</h2>
                              <form class="">
                                <input type="text" placeholder="username…">
                                <input type="password" placeholder="password…">
                                <button class="btn btn-login" type="button" name="button">login</button>
                              </form>
                            <form
                          </div>
                        </section>`);

  $viewContent.find('.btn-login').on('click', () => {
    store.dispatch({ type: 'LOGIN' });
  });
  return $viewContent;
}
