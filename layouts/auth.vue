<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script setup>
</script>

<style>
.auth-header {
  height: 100px;
  background: #1976d2;
}

.auth-footer {
  height: 100px;
  background: #f5f5f5;
}
</style>