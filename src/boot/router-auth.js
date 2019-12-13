import { LocalStorage } from 'quasar'

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    let loggedIn = LocalStorage.getItem('loggedIn')
    if (!loggedIn && to.path !== '/auth') {
      next('/auth')
      console.log('not logged in yet'); 
    } 
    else { 
      next()
      console.log('already logged in');
    }
  })
}
