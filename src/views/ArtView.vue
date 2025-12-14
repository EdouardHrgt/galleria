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
  <main v-if="art" class="responsive-width">
    <section class="images">
      <picture>
        <source media="(max-width: 768px)" :srcset="art.images.hero.small" />
        <source media="(max-width: 1024px)" :srcset="art.images.hero.small" />
        <img :src="art.images.hero.large" :alt="art.description" class="main-img" />
        <div class="view">
          <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
            <g fill="#FFF" fill-rule="nonzero">
              <path
                d="M7.714 0l1.5 1.5-2.357 2.357 1.286 1.286L10.5 2.786l1.5 1.5V0zM3.857 6.857L1.5 9.214 0 7.714V12h4.286l-1.5-1.5 2.357-2.357zM8.143 6.857L6.857 8.143 9.214 10.5l-1.5 1.5H12V7.714l-1.5 1.5zM4.286 0H0v4.286l1.5-1.5 2.357 2.357 1.286-1.286L2.786 1.5z" />
            </g>
          </svg>
          <p class="text-preset-7">view image</p>
        </div>
      </picture>

      <img :src="art.artist.image" :alt="art.artist.name" class="portrait" />
      <div class="name">
        <h1 class="text-preset-2">{{ art.name }}</h1>
        <p class="text-preset-4">{{ art.artist.name }}</p>
      </div>
    </section>

    <section class="text">
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
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-500);
  padding-bottom: var(--spacing-500);
}

.images {
  position: relative;
  max-width: 650px;
  flex: 1;
  isolation: isolate;
}

picture {
  cursor: pointer;
  overflow: hidden;
  position: relative;
}

picture img {
  transition: filter 0.3s ease-out, transform 1s ease-out;
}

.name {
  background-color: var(--white);
  padding-left: var(--spacing-500);
  padding-block: var(--spacing-500);
  max-width: 400px;
  position: absolute;
  top: -1px;
  right: -280px;
}

.text {
  max-width: 500px;
}

.view {
  background-color: var(--black);
  padding: var(--spacing-200) var(--spacing-300);
  width: fit-content;
  cursor: pointer;
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  transition: 0.4s ease-out;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.view svg {
  position: relative;
  top: -2px;
}

.view p {
  color: var(--white);
  text-transform: uppercase;
}

.portrait {
  position: absolute;
  width: 128px;
  aspect-ratio: 1;
  bottom: calc(-128px / 2);
  right: calc(-128px - 1rem);
}

@media (hover: hover) {
  picture:hover img {
    transform: scale(1.05);
  }
  .view:hover {
    background-color: transparent;
    outline: 1px solid var(--white);
  }
  .view:hover .view p {
    color: var(--white);
  }
}

@media (max-width: 1560px) {
  .name {
    max-width: 300px;
    right: -200px;
  }
  .text {
    max-width: 480px;
    position: relative;
    z-index: 1000;
  }
}

@media (max-width: 1440px) {
  .images {
    max-width: 460px;
    height: fit-content;
  }
}

@media (max-width: 1200px) {
  main {
    flex-direction: column;
    justify-content: start;
  }
  .images {
    max-width: 475px;
  }
  .text {
    text-align: center;
    max-width: 70%;
    margin-inline: auto;
  }
  .portrait {
    bottom: auto;
    top: 16rem;
    right: calc(-128px - 2rem);
  }
}

@media (max-width: 900px) {
  .portrait {
    bottom: -8rem;
    top: auto;
    right: auto;
    left: 0;
    width: 64px;
    z-index: 100;
  }
  .view {
    background-color: rgba(0, 0, 0, 0.5);
    padding: var(--spacing-100) var(--spacing-100);
    bottom: auto;
    left: 1rem;
    top: 1rem;
  }
  .name {
    padding-inline: var(--spacing-500);
    top: auto;
    right: auto;
    left: -1px;
    bottom: -5rem;
  }
  .text {
    text-align: left;
    max-width: 100%;
    margin-top: 9rem;
  }
}
</style>
