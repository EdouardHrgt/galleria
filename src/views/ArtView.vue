<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import { getStorage } from '../composables/useStorage'
import Button from '@/components/Button.vue'
import Header from '@/components/Header.vue'

const route = useRoute()
const slug = computed(() => route.params.art)
const art = ref(null)

onMounted(() => {
  const datas = getStorage('datas')
  if (datas) {
    art.value = datas.find((item) => item.slug === slug.value)
  }
})
</script>

<template>
  <Header />
  <main v-if="art">
    <section class="images">
      <picture>
        <source media="(max-width: 768px)" :srcset="art.images.hero.small" />
        <source media="(max-width: 1024px)" :srcset="art.images.hero.small" />
        <img :src="art.images.hero.large" :alt="art.description" class="main-img" />
      </picture>
      <div class="view">
        <p class="text-preset-7">view image</p>
      </div>
      <img :src="art.artist.image" :alt="art.artist.name" />
    </section>

    <section class="text">
      <div class="name">
        <h1 class="text-preset-2">{{ art.name }}</h1>
        <p class="text-preset-4">{{ art.artist.name }}</p>
      </div>
      <div class="description">
        <p class="text-preset-3-bis">{{ art.description }}</p>
        <p>
          <strong class="text-preset-1">{{ art.year }}</strong>
        </p>
        <Button type="primary" label="go to source" />
      </div>
    </section>
  </main>
</template>
<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 0;
}

picture {
  max-width: 580px;
  cursor: pointer;
  overflow: hidden;
}

picture img {
  transition: filter 0.3s ease-out, transform 1s ease-out;
}

.text .name {
  background-color: steelblue;
  padding-left: var(--spacing-500);
  padding-block: var(--spacing-500);
  max-width: 400px;
}

@media (hover: hover) {
  picture:hover img {
    transform: scale(1.05);
  }
}
</style>
