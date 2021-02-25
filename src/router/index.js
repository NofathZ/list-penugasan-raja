import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: () => import('../views/listPenugasan.vue')
  },
  {
    path: '/kelompok',
    component: () => import('../views/Kelompok.vue')
  },
  {
    path: '/pilgan',
    component: () => import('../views/ExamPage.vue')
  },
  {
    path: '/lyrics',
    component: () => import('../views/GuessLyrics.vue')
  },
  {
    path: '/superheroes',
    component: () => import('../views/VideoSuperheroes.vue')
  },
  {
    path: '/bmc',
    component: () => import('../views/VideoBMC.vue')
  },
  {
    path: '/bercerita',
    component: () => import('../views/VideoAdhikaraBercerita.vue')
  },
  {
    path: '/motivation',
    component: () => import('../views/EssayMotivationLetter.vue')
  },
  {
    path: "/mental-health",
    component: () => import('../views/EssayMentalHealth.vue')
  },
  {
    path: '/kolaborasi',
    component: () => import('../views/VideoKolaborasi.vue')
  }
]

const router = new VueRouter({
  base: '/penugasan/',
  mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   if(from.path != 'kelompok'){
//     axios.get('https://rajabrawijaya.ub.ac.id/api/penugasan/kolaborasi/kelompok/status/' + this.nim).then(res => {
//       if (res.data.status == false) {
//         Swal.fire({
//           icon: 'info',
//           title: 'Pemberitahuan',
//           text: 'Sebelum mulai mengerjakan tugas, silahkan mengisi data kontak kamu terlebih dahulu untuk saling terhubung dengan teman sekelompokmu.'
//         })
//         setTimeout(function () {
//           next({
//             path: '/kelompok'
//           })
//         }.bind(this), 3000);
//       }
//     }).catch((err) => {
//       console.log(err);
//     })
//   } else {
//     next()
//   }
// })

export default router
