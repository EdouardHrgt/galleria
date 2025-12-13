<script setup>
import Logo from './Logo.vue'
import Button from './Button.vue'
</script>

<template>
  <header class="responsive-width">
    <Logo />
    <Button type="primary" label="start slideshow"/>
  </header>
</template>

<style scoped>
header {
  border-bottom: 3px solid var(--grey-200);
  padding-block: var(--spacing-500);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

@media (max-width: 1024px) {
  header {
    padding-block: var(--spacing-300);
  }
}
</style>
