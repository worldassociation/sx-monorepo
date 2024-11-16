<script setup lang="ts">
withDefaults(
  defineProps<{
    count?: number;
  }>(),
  {
    count: 18
  }
);
</script>

<template>
  <div class="animate-pulse">
    <div
      class="justify-center max-w-screen-md 2xl:max-w-screen-xl 3xl:max-w-screen-2xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-explore-3 2xl:grid-cols-explore-4 3xl:grid-cols-explore-5 gap-3">
      <div v-for="i in count" :key="i" class="border rounded-lg block relative overflow-hidden h-[280px]">
        <!-- Cover image -->
        <div class="h-[68px] w-full absolute overflow-hidden">
          <div class="w-full h-full bg-skin-border" />
        </div>

        <!-- Avatar -->
        <div class="relative inline-block mx-4 mt-[34px]">
          <div class="mb-2">
            <div class="border-skin-bg rounded-md border-[3px] w-[50px] h-[50px] bg-skin-border" />
          </div>
        </div>

        <!-- Content -->
        <div class="px-4">
          <div class="flex items-center">
            <div class="h-4 w-2/3 bg-skin-border rounded" />
          </div>

          <div class="mt-1">
            <div class="h-3 w-full bg-skin-border rounded mb-2" />
            <div class="h-3 w-4/5 bg-skin-border rounded" />
          </div>
        </div>

        <!-- Footer -->
        <div class="absolute bottom-[28px] px-4 flex items-center space-x-2">
          <div class="h-3 w-[96px] bg-skin-border rounded" />
          <div class="h-3 w-[64px] bg-skin-border rounded" />
        </div>
      </div>
    </div>
  </div>
</template>
