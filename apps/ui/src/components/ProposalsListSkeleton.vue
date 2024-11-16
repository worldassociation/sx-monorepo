<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    count?: number;
    isHome?: boolean;
  }>(),
  {
    count: 3,
    isHome: false
  }
);
</script>

<template>
  <div class="animate-pulse">
    <div v-for="i in count" :key="i" class="border-b mx-4" :class="[
      isHome ? 'py-[14px]' : 'py-3'
    ]">
      <div class="space-x-2 flex">
        <!-- Avatar + Status Icon -->
        <div class="flex flex-shrink-0">
          <div v-if="isHome" class="my-2 bg-skin-border rounded-full w-[40px] h-[40px]" />
          <div :class="[
            'rounded-full bg-skin-border',
            isHome ? 'relative top-[30px] right-[13px] -mr-[12px] w-[18px] h-[18px]' : 'relative top-[3px] w-[18px] h-[18px]'
          ]" />
        </div>

        <!-- Content -->
        <div class="flex flex-col min-w-0 mt-1 mb-1.5 md:mb-1 leading-6 grow">
          <!-- Space name (if home) -->
          <div v-if="isHome" class="h-[20px] w-[120px] bg-skin-border rounded my-1" />

          <!-- Title -->
          <div class="block md:hidden h-[18px] w-4/5 bg-skin-border rounded mb-1" />

          <div class="h-[18px] w-1/2 bg-skin-border rounded mb-3" />

          <!-- Meta info -->
          <div class="flex items-center gap-2" :class="{ '-ml-[58px]': isHome }">
            <div class="h-3 w-[160px] bg-skin-border rounded" />
            <div class="h-3 w-[40px] bg-skin-border rounded" />
            <div class="h-3 w-[80px] bg-skin-border rounded" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
