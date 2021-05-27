const state = {
  drawer: false,
  menuTitle: '🛒 List',
  menuDesc: 'Best tools app',
  menuList: [
    { title: "Todo", icon: "mdi-format-list-checks", to: "/" },
    { title: "Words", icon: "mdi-script-text-outline", to: "/words" },
    { title: "About", icon: "mdi-help-box", to: "/about" }
  ]
}

const mutations = {
  toggle(state, drawer) {
    state.drawer = drawer
  },
}
const getters = {
  getMenuList: (state) => state.menuList,
  getMenuInfo: (state) => ({title: state.menuTitle, 
    desc: state.menuDesc})
}

export default {
  state,
  mutations,
  getters
}