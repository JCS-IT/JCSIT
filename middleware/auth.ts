export default defineNuxtRouteMiddleware((to, from) => {
  const auth = useFirebaseAuth();
  if (!auth?.currentUser) {
    return navigateTo(`/login?to=${encodeURI(to.path)}`);
  }
});
