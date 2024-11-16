<script setup lang="ts">
const { scrollProgress, isMobile } = useScrollVisibility();

const translateY = computed(() => {
  if (!isMobile.value) return 0;
  return -72 * scrollProgress.value;
});
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 border-b flex items-center justify-between h-[72px] bg-skin-bg will-change-transform"
    :style="{
      transform: `translate3d(0, ${translateY}px, 0)`,
      transition: 'transform 0.15s cubic-bezier(0.4, 0, 0.2, 1)'
    }">
    <slot />
  </header>
</template>
