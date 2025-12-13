<script setup>
import { useRouter } from 'vue-router'

defineProps({
  data: Object,
})

const router = useRouter()

const goToArt = (slug) => {
  if (slug) {
    router.push(`/${slug}`)
  }
}
</script>

<template>
  <article @click="goToArt(data.slug)" v-if="data">
    <img :src="data.images.gallery" :alt="data.description" />
    <div class="content">
      <p>
        <strong class="text-preset-2-bis">{{ data.name }}</strong>
      </p>
      <p class="text-preset-5">{{ data.artist.name }}</p>
    </div>
  </article>
</template>

<style scoped>
article {
  break-inside: avoid;
  margin-bottom: var(--spacing-500);
  position: relative;
  width: fit-content;
  height: fit-content;
  isolation: isolate;
  overflow: hidden;
  cursor: pointer;
  margin-inline: auto;
}

.content {
  position: absolute;
  z-index: 1;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, transparent 20%, rgba(0, 0, 0, 0.8) 100%);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: var(--spacing-200);
  padding-bottom: var(--spacing-200);
  padding-right: var(--spacing-100);
}

img {
  width: 100%;
  display: block;
  object-fit: cover;
  transition: filter 0.3s ease-out, transform 1s ease-out;
}

@media (hover: hover) {
  article:hover img {
    filter: grayscale(70%);
    transform: scale(1.05);
  }
}

p strong {
  color: var(--white);
  display: block;
  margin-bottom: var(--spacing-100);
}

p {
  color: var(--grey-200);
}
</style>
