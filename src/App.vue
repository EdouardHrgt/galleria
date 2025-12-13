<script setup>
import { onMounted, ref } from 'vue'
import { saveStorage, getStorage } from './composables/useStorage'
import Header from './components/Header.vue'
import useFetch from './composables/useFetch'

const datas = ref(null)

onMounted(async () => {
  const storage = getStorage('datas') || undefined

  if (storage && storage.length > 0) {
    datas.value = storage
  } else {
    const result = await useFetch()
    datas.value = result
    saveStorage('datas', result)
  }
})
</script>

<template>
  <div class="container">
    <router-view />
  </div>
</template>

<style scoped>
.container {
  max-width: 1550px;
  width: 100%;
  margin-inline: auto;
  padding-bottom: var(--spacing-500);
}

@media (max-width: 1560px) {
}
</style>
