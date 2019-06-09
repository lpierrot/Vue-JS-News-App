// router/index.js
import Vue from 'vue'
import Router from 'vue-router'

//import view
import News from '@/views/News'
import Info from '@/views/Info'

Vue.use(Router)

export default new Router({
    routes: [{
        path: '/',
        name: 'News',
        component: News
    },
    {
        path: '/info',
        name: 'info',
        component: Info
    },
    ]
})