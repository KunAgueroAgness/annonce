<script setup>
const { isAuthenticated } = useAuth()

if (import.meta.client && isAuthenticated.value) {
  navigateTo('/products')
}
</script>

<template>
  <div>
    <h1>Home page</h1>
  </div>
</template>
<style></style>