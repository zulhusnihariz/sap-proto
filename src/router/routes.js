const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/login",
        name: "Login",
        component: () => import("pages/Login.vue")
      },
      {
        path: "/",
        name: "Home",
        component: () => import("pages/Home.vue")
      },
      {
        path: "/database/upload",
        name: "DatabaseUpload",
        component: () => import("pages/Database.vue")
      },
      {
        path: "/database/view",
        name: "DatabaseView",
        component: () => import("pages/Database.vue")
      },
      {
        path: "/database/generate",
        name: "DatabaseGenerate",
        component: () => import("pages/Database.vue")
      },
      {
        path: "/user-management/user",
        name: "UserManagement",
        component: () => import("pages/UserManagement.vue")
      },
      {
        path: "/settings/change-password",
        name: "ChangePassword",
        component: () => import("pages/ChangePassword.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
