<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, computed, watch } from 'vue'
import { getStorage } from '../composables/useStorage'
import Button from '@/components/Button.vue'
import Header from '@/components/Header.vue'
import Carousel from '@/components/Carousel.vue'

const route = useRoute()
const router = useRouter()
const slug = computed(() => route.params.art)
const art = ref(null)
const carousel = ref(false)
const allArts = ref([])
const currentIndex = ref(0)
const transitionName = ref('slide-left')

onMounted(() => {
  const datas = getStorage('datas')
  if (datas) {
    allArts.value = datas
    updateCurrentArt()
  }
})

const updateCurrentArt = () => {
  const foundArt = allArts.value.find((item) => item.slug === slug.value)
  if (foundArt) {
    art.value = foundArt
    currentIndex.value = allArts.value.findIndex((item) => item.slug === slug.value)
  }
}

watch(slug, () => {
  updateCurrentArt()
})

const progression = computed(() => {
  if (allArts.value.length === 0) return 0
  return ((currentIndex.value + 1) / allArts.value.length) * 100
})

const toggleCarousel = () => {
  carousel.value = !carousel.value
}

watch(carousel, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

const switchArt = (direction) => {
  if (allArts.value.length === 0) return

  let newIndex

  if (direction === 0) {
    transitionName.value = 'slide-right'
    newIndex = currentIndex.value === 0 ? allArts.value.length - 1 : currentIndex.value - 1
  } else if (direction === 1) {
    transitionName.value = 'slide-left'
    newIndex = currentIndex.value === allArts.value.length - 1 ? 0 : currentIndex.value + 1
  }

  const newArt = allArts.value[newIndex]
  router.push({ name: route.name, params: { art: newArt.slug } })
}
</script>

<template>
  <Header />
  <Transition name="carousel-scale">
    <Carousel v-if="carousel" @close="toggleCarousel" :slug="slug" />
  </Transition>
  <div class="page">
    <Transition :name="transitionName" mode="out-in">
      <main v-if="art" :key="art.slug" class="responsive-width">
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
              <p class="text-preset-7" @click="toggleCarousel">view image</p>
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
            <p class="text-preset-3-bis desc-p">{{ art.description }}</p>
            <p>
              <strong class="text-preset-1">{{ art.year }}</strong>
            </p>
            <Button type="primary" label="go to source" />
          </div>
        </section>
      </main>
    </Transition>
    <footer v-if="art" class="responsive-width">
      <span class="progression">
        <div :style="{ width: progression + '%' }"></div>
      </span>
      <div class="detail">
        <p class="text-preset-3 | detail-name">{{ art.name }}</p>
        <p class="text-preset-5 | detail-artist">{{ art.artist.name }}</p>
      </div>
      <div class="pagination">
        <svg width="26" height="24" xmlns="http://www.w3.org/2000/svg" @click="switchArt(0)">
          <g fill="none" fill-rule="evenodd">
            <path d="M24.166 1.843L3.627 12.113l20.539 10.269V1.843z" stroke-width="2" />
            <path fill="#D8D8D8" d="M.986.5h-1v22.775h1z" />
          </g>
        </svg>
        <svg width="26" height="24" xmlns="http://www.w3.org/2000/svg" @click="switchArt(1)">
          <g fill="none" fill-rule="evenodd">
            <path d="M1.528 1.843l20.538 10.27L1.528 22.382V1.843z" stroke-width="2" />
            <path fill="#D8D8D8" d="M24.708.5h1v22.775h-1z" />
          </g>
        </svg>
      </div>
    </footer>
  </div>
</template>
<style scoped>
.page {
  position: relative;
}

main {
  display: flex;
  justify-content: space-between;
  gap: var(--spacing-500);
  padding-bottom: var(--spacing-500);
  position: relative;
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
  max-width: 600px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-inline: 2rem;
}

.description button {
  margin-top: 3rem;
}

.text strong {
  color: var(--grey-150);
  position: absolute;
  z-index: -1;
  top: 9rem;
  left: 8rem;
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
  user-select: none;
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

footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 5rem;
  padding-top: 2rem;
  position: relative;
}

footer .progression {
  background-color: var(--grey-150);
  position: absolute;
  width: 100%;
  height: 3px;
  top: 0;
  right: 0;
  left: 0;
}

.progression div {
  background-color: var(--grey-400);
  height: inherit;
}

footer .detail-artist {
  color: var(--grey-400);
  margin-top: var(--spacing-100);
}

footer .pagination {
  display: flex;
  align-items: center;
  gap: var(--spacing-500);
}

.pagination svg {
  cursor: pointer;
  stroke: var(--black);
  transition: 0.4s ease-out;
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
  .pagination svg:hover {
    stroke: var(--grey-200);
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
  .text strong {
    top: 5rem;
    left: 2rem;
  }
}

@media (max-width: 1440px) {
  .images {
    max-width: 460px;
    height: fit-content;
  }
  .text strong {
    top: 0rem;
    left: 0rem;
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
  .text {
    margin-top: 5rem;
  }
  .text strong {
    top: -7rem;
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
  .text strong {
    top: -3rem;
    left: auto;
    right: 0;
  }
}

.carousel-scale-enter-active,
.carousel-scale-leave-active {
  transition: all 0.4s ease;
  transform-origin: center;
}

.carousel-scale-enter-from {
  opacity: 0;
  transform: scale(0);
}

.carousel-scale-enter-to {
  opacity: 1;
  transform: scale(1);
}

.carousel-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}

.carousel-scale-leave-to {
  opacity: 0;
  transform: scale(0);
}

.slide-left-enter-active,
.slide-left-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-left-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: all 0.5s ease-in-out;
}

.slide-right-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-right-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  position: relative;
}
</style>
