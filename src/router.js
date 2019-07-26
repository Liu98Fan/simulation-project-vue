import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/home.vue')
    },
    {
      path: '/tehindex',
      name: 'tehindex',
      component: () => import('./views/teacher/index.vue')
    },

    {
      path: '/kcb',
      name: 'kcb',
      component: () => import('./views/teacher/kcb.vue')
    },
    {
      path: '/myclass',
      name: 'myclass',
      component: () => import('./views/teacher/myclass.vue')
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import('./views/teacher/personal.vue')
    },
    {
      path: '/skzx',
      name: 'skzx',
      component: () => import('./views/teacher/skzx.vue')
    },
    {
      path: '/teacherVirtualClass/:classId',
      name: 'virtualClass',
      component: () => import('./views/teacher/teacherVirtualClass.vue')

    },
    //*************学生模块**************/
    {
      path:'/studentIndex',
      name:'studentIndex',
      component: () => import('./views/student/studentIndex.vue')
    },
    {
      path:'/professionalClass',
      name:'professionalClass',
      component: () => import('./views/student/professionalClass.vue')
    },
    {
      path:'/myStudy',
      name:'myStudy',
      component: () => import('./views/student/myStudy.vue'),
      children:[
        {
          path:'myExperiment',
          component:() =>import('./components/student/study/myExperiment.vue')
        },

        {
          path:'myGrade',
          component:() =>import('./components/student/study/myGrade.vue')
        },

        {
          path:'myHomework',
          component:() =>import('./components/student/study/myHomework.vue')
        },

        {
          path:'mySchedule',
          component:() =>import('./components/student/study/mySchedule.vue')
        },

        {
          path:'/myStudy',
          component:() =>import('./components/student/study/myExperiment.vue')
        },
      ]
    },
    {
      path:'/studentPersonalCenter',
      name:'studentPersonalCenter',
      component: () => import('./views/student/studentPersonalCenter.vue'),
      children:[
        {
          path:'basicInformation',
          component:() =>import('./components/student/personalCenter/basicInformation.vue')
        },

        {
          path:'modifyInformation',
          component:() =>import('./components/student/personalCenter/modifyInformation.vue')
        },

        {
          path:'modifyPassword',
          component:() =>import('./components/student/personalCenter/modifyPassword.vue')
        },

        {
          path:'/studentPersonalCenter',
          component:() =>import('./components/student/personalCenter/basicInformation.vue')
        },
      ]
    },
    {
      path: '/studentVirtualClass/:classId',
      name: 'studentVirtualClass',
      component: () => import('./views/student/studentVirtualClass.vue')

    },
    //*************学生模块**************/

    {
      path: '/404',
      name: '404',
      component: () => import('./views/404.vue')
    }
  ]
})
