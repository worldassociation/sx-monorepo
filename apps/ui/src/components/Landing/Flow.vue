<script setup lang="ts">
import ISCheck from '~icons/heroicons-solid/check';
import ISUserPlus from '~icons/heroicons-solid/user-plus';

const STEPS = [
  {
    title: 'Join',
    about:
      'Prove your personhood, set up your basic income, and join conversations on our pressing global challenges – all while preserving your privacy by default.',
    icon: ISUserPlus
  },
  {
    title: 'Decide',
    about:
      'Create referendums, elect representatives, and cast votes anonymously. Decisions are turned into action using our official currency, the world drachma.',
    icon: ISCheck
  }
];
</script>

<template>
  <div id="community" class="pt-8">
    <UiContainer class="!max-w-screen-lg">
      <div class="pb-6 max-w-[600px] text-center mx-auto">
        <h1 class="mb-4 font-display !text-[36px] sm:!text-[44px]">
          A democratic community open to all
        </h1>
      </div>
    </UiContainer>
    <div class="border-y">
      <UiContainer class="!max-w-screen-lg !px-0">
        <div class="grid grid-cols-1 lg:grid-cols-2 text-[19px] flow">
          <div v-for="(step, i) in STEPS" :key="i"
            class="border-b border-r-0 last:border-b-0 lg:border-r lg:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(n+1)]:border-b-0">
            <div class="px-4 py-5">
              <div class="flex space-x-2.5">
                <component :is="step.icon" class="text-skin-link size-[24px] mb-4 inline-block" />
                <h2 class="mb-3 font-heading text-[22px] inline-block" v-text="step.title" />
              </div>
              <div class="mb-3 max-w-[457px]">
                <div class="bg-contain flow w-full max-h-[260px] h-[calc(50vw)]" :class="`step-${i + 1}`" />
              </div>
              <div v-text="step.about" />
            </div>
          </div>
        </div>
      </UiContainer>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.flow {
  .step-1 {
    background-image: url('@/assets/site/flow-1-light.png');
  }

  .step-2 {
    background-image: url('@/assets/site/flow-2-light.png');
  }
}

.dark {
  .flow {
    .step-1 {
      background-image: url('@/assets/site/flow-1-dark.png');
    }

    .step-2 {
      background-image: url('@/assets/site/flow-2-dark.png');
    }
  }
}
</style>
