<script setup>
import Logo from './Logo.vue'
import Button from './Button.vue'
import { useRouter } from 'vue-router'
import { getStorage } from '../composables/useStorage'
import { onMounted, ref } from 'vue'
const datas = ref(null)

onMounted(() => {
  const storage = getStorage('datas') || undefined
  datas.value = storage
})

const router = useRouter()

const goToArt = () => {
  if (datas.value) {
    router.push(datas.value[0].slug)
  }
}
</script>

<template>
  <header class="responsive-width">
    <Logo />
    <Button type="primary" label="start slideshow" @click="goToArt()"/>
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
