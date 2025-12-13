<script setup>
defineProps({
  type: String,
  label: String,
})
</script>

<template>
  <button class="text-preset-6" v-if="type == 'primary'">{{ label }}</button>
</template>

<style scoped>
button {
  text-transform: uppercase;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--grey-400);
  transition: color 0.3s ease-out;
}

@media (hover: hover) {
  button:hover {
    color: var(--grey-200);
  }
}
</style>
