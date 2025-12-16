<script setup>
import { onMounted, ref } from 'vue'
import { getStorage } from '../composables/useStorage'
import Header from '@/components/Header.vue'
import Card from '@/components/Card.vue'
const datas = ref(null)

onMounted(() => {
  const storage = getStorage('datas') || undefined
  datas.value = storage
})
</script>

<template>
  <Header />
  <main class="responsive-width">
    <Card v-for="(data, index) in datas" :key="index" :data="data" class="temp" />
  </main>
</template>

<style scoped>
main {
  column-count: 4;
  column-gap: var(--spacing-500);
}

@media (max-width: 1200px) {
  main {
    column-count: 3;
  }
}

@media (max-width: 1024px) {
  main {
    column-count: 2;
  }
}

@media (max-width: 800px) {
  main {
    column-count: 1;
  }
}
</style>
