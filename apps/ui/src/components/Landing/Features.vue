<script setup lang="ts">
import ICDiscourse from '~icons/c/discourse';
import ISAdjustments from '~icons/heroicons-solid/adjustments';
import ISColorSwatch from '~icons/heroicons-solid/color-swatch';
import ISCursorClick from '~icons/heroicons-solid/cursor-click';
import ISShieldCheck from '~icons/heroicons-solid/shield-check';
import ISSparkles from '~icons/heroicons-solid/sparkles';

const FEATURES = [
  {
    title: 'Costless polls and petitions',
    about:
      'Create an unlimited number of free democratic polls and petitions, and encourage broader community involvement in advocacy.',
    icon: ISCursorClick
  },
  {
    title: 'Multiple voting systems',
    about:
      'Support single choice, approval, basic, weighted, and ranked choice voting. Select the most suitable method for each decision.',
    icon: ISAdjustments
  },
  {
    title: 'Discourse integration',
    about:
      'View Discourse discussions and comments directly within the app, enhancing context and facilitating informed decision-making.',
    icon: ICDiscourse
  },
  {
    title: 'Shielded voting',
    about:
      'Keep voter choices confidential until voting ends, preventing manipulation and promoting fair, unbiased outcomes.',
    icon: ISShieldCheck
  },
  {
    title: 'AI proposal summary',
    about:
      'Concise overviews of proposals to help voters quickly understand key points for informed decision-making.',
    icon: ISSparkles
  },
  {
    title: 'Whitelabel',
    about:
      "Select your own branding options, creating a cohesive user experience aligned with your organization's identity.",
    icon: ISColorSwatch
  }
];
</script>

<template>
  <div id="for-orgs" class="pt-8 border-b">
    <UiContainer class="!max-w-screen-lg">
      <div class="pb-6 max-w-[600px]">
        <div class="eyebrow mb-3">For orgs</div>
        <h1 class="mb-4 font-display !text-[36px] sm:!text-[44px]">
          Free and open-source global democracy
        </h1>
      </div>
    </UiContainer>
    <div class="border-t">
      <UiContainer class="!max-w-screen-lg !px-0">
        <div class="grid grid-cols-1 lg:grid-cols-3">
          <div v-for="(feature, i) in FEATURES" :key="i"
            class="px-4 py-5 border-b last:border-b-0 border-r-0 lg:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+4)]:border-b-0">
            <component :is="feature.icon" class="text-skin-link size-[22px] mb-4" />
            <h3 class="text-skin-link font-heading !text-[18px] mb-2" v-text="feature.title" />
            <div v-text="feature.about" />
          </div>
        </div>
      </UiContainer>
    </div>
  </div>
</template>
