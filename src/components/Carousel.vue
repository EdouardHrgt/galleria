<script setup></script>

<template>
  <section class="carousel">
  </section>
</template>

<style scoped>
.carousel {
  display: grid;
  place-content: center;
  position: absolute;
  z-index: 2000;
  inset: 0 0 -2rem 0;
  background-color: rgba(0, 0, 0, 0.6);
}

.carousel h1 {
  color: white;
  font-size: 8rem;
}
</style>
