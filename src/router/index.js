import { createRouter, createWebHashHistory,createWebHistory } from "vue-router";
import authGuard from "@/auth-module/index.js";
import PublicContainer from "@/pages/PublicContainer.vue";  
import store from "@/store";
const routes = [
  {
    path: "/",
    component: PublicContainer,
    meta: {
      requiresAuth: true
    },
    children: [
     
      {
        path: "",
        component: () => import("../pages/agrupadores/Index.vue")
      },
      {
        path: "/indicador/:id",
        name: 'indicador',
        component: () => import("../pages/indicador/Index.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/sucursales",
        name: 'general',
        component: () => import("../pages/indicador/SucursalesCajas/ContainerPage.vue"),
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            component: () => import("../pages/indicador/SucursalesCajas/Sucursales.vue"),
            name: "Sucursales"
          },
          {
            path: "cajas",
            component: () => import("../pages/indicador/SucursalesCajas/Cajas.vue"),
            name: "Cajas"
          },
        ]
      },
      {
        path: "/monedas",
        name:"Cotizaciones",
        component: () => import("../pages/indicador/Cotizaciones/ContainerPage.vue"),
        meta: { requiresAuth: true },
        children: [
          {
            path: "",
            component: () => import("../pages/indicador/Cotizaciones/Monedas.vue"),
            name: "monedas"
          },
          {
            path: "indices",
            component: () => import("../pages/indicador/Cotizaciones/Indices.vue"),
            name: "indices"
          },
        ]
      },
      {
        path: "/cuadre-saldos",
        component: () => import("../pages/indicador/CuadreMonedas/Index.vue")
      },
      {
        path: "/rubros-centralizados",
        component: () => import("../pages/indicador/RubrosBolsa/Index.vue")
      },
      {
        path: "/transacciones",
        component: () => import("../pages/indicador/TransaccionEstado/Index.vue")
      },
      {
        path: "/condiciones",
        component: () => import("../pages/indicador/CondicionesGenerales/Index.vue")
      },
      {
        path: "/observabilidad",
        name: 'powerBI',
        component: () => import("../pages/powerbi/powerbi.vue")
      },
      {
        path: "/SesionesPorUsuario",
        component: () => import("../pages/indicador/SesionesPorUsuario/Index.vue")
      },
      {
        path: "/EjecucionesPorServicio",
        component: () => import("../pages/indicador/EjecucionesPorServicio/Index.vue")
      },
    ]
  },
  {
    path: "/login",
    component: () => import("../pages/LoginPage.vue"),
    meta: { requiresAuth: false },
    beforeEnter: (to, from, next) => {
      console.log(store.state.logged);
      if (store.state.logged) {
        next({ path: "/" });
      } else {
        next();
      }
    }
  },

  {
    path: '/404',
    name: "not fount",
    component: () => import("@/pages/Default404.vue"),
  },
  {
    path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
    redirect: '/404',
  },

];

const router = createRouter({
  //history: createWebHistory(),
  history: createWebHashHistory(),
  routes
});

router.beforeEach(authGuard);

export default router;
