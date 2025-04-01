export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/") {
    return navigateTo("/products");
  }

  if (to.path === "/login") {
    return;
  }

  const { data } = await useFetch("/api/auth.check");

  if (!data.value?.valid) {
    const authToken = useCookie("auth_token");
    authToken.value = null;

    return navigateTo("/login");
  }
});
