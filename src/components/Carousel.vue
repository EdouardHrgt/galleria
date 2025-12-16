<script setup>
import { onMounted, ref } from 'vue'
import { getStorage } from '../composables/useStorage'

const props = defineProps({
  slug: String,
})

const emit = defineEmits(['close'])

const art = ref(null)

onMounted(() => {
  const datas = getStorage('datas')
  if (datas) {
    art.value = datas.find((item) => item.slug === props.slug)
  }
})

const closeCarousel = () => {
  emit('close')
}
</script>

<template>
  <section class="carousel" v-if="art">
    <picture>
      <p class="close" @click="closeCarousel">close</p>
      <source media="(max-width: 768px)" :srcset="art.images.hero.small" />
      <img :src="art.images.hero.large" :alt="art.description" class="main-img" />
    </picture>
  </section>
</template>

<style scoped>
.carousel {
  display: grid;
  place-content: center;
  position: fixed;
  z-index: 2000;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  overflow: hidden;
  padding-inline: 1rem;
}

picture {
  position: relative;
}

img {
  width: 700px;
  object-fit: cover;
  display: block;
}

.close {
  color: var(--grey-200);
  font-size: 1rem;
  width: fit-content;
  position: absolute;
  padding: 0.5rem 1rem;
  top: -3rem;
  right: -1rem;
  user-select: none;
  cursor: pointer;
  transition: all 0.4s ease;
  text-transform: uppercase;
}

@media (hover: hover) {
  .close:hover {
    color: var(--white);
  }
}
</style>
