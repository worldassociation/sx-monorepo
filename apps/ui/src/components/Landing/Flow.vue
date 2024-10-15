<script setup lang="ts">
import ICAnnotation from '~icons/heroicons-solid/annotation';
import ISCheck from '~icons/heroicons-solid/check';
import ISLightningBolt from '~icons/heroicons-solid/lightning-bolt';
import ISPlay from '~icons/heroicons-solid/play';

const STEPS = [
  {
    title: 'Discuss',
    about:
      "Stay up-to-date with conversations on global issues, participate in debates, and refine ideas directly within the World Association app.",
    icon: ICAnnotation
  },
  {
    title: 'Delegate',
    about:
      'Increase your impact by becoming a delegate or choose one to represent your interests. Read delegate statements and continuously track their performance.',
    icon: ISLightningBolt
  },
  {
    title: 'Vote',
    about:
      "Create proposals and cast votes anonymously. Stay informed with AI summaries, analyze trends, and see real-time results – all in one place.",
    icon: ISCheck
  },
  {
    title: 'Execute',
    about:
      'Turn decisions into action. After a proposal passes, create transactions from our treasury – using our official currency, the world drachma.',
    icon: ISPlay
  }
];
</script>

<template>
  <div id="for-people" class="pt-8">
    <UiContainer class="!max-w-screen-lg">
      <div class="pb-6 max-w-[600px] text-center mx-auto">
        <h1 class="mb-4 font-display !text-[36px] sm:!text-[44px]">
          Start shaping the future of humanity
        </h1>
      </div>
    </UiContainer>
    <div class="border-y">
      <UiContainer class="!max-w-screen-lg !px-0">
        <div class="grid grid-cols-1 lg:grid-cols-2 text-md flow">
          <div v-for="(step, i) in STEPS" :key="i"
            class="border-b border-r-0 last:border-b-0 lg:border-r lg:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(n+3)]:border-b-0">
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

  .step-3 {
    background-image: url('@/assets/site/flow-3-light.png');
  }

  .step-4 {
    background-image: url('@/assets/site/flow-4-light.png');
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

    .step-3 {
      background-image: url('@/assets/site/flow-3-dark.png');
    }

    .step-4 {
      background-image: url('@/assets/site/flow-4-dark.png');
    }
  }
}
</style>
