import store from "@/store";

export const authGuard = (to, from, next) => {
  console.log("Before Each Routes");
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.logged) {
      console.log("Logged in");
      next();
      return;
    }
    console.log(to.fullPath);
    next({
      path: "/login",
      params: { nextUrl: to.fullPath }
    });
    return;
  } else {
    console.log(to.fullPath);
    next();
  }
};

export default authGuard;
