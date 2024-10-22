<script setup lang="ts">
import ICDiscourse from '~icons/c/discourse';
import ICGitHub from '~icons/c/github';
import ISAdjustments from '~icons/heroicons-solid/adjustments';
import ISColorSwatch from '~icons/heroicons-solid/color-swatch';
import ISCursorClick from '~icons/heroicons-solid/cursor-click';
import ISShieldCheck from '~icons/heroicons-solid/shield-check';
import ISSparkles from '~icons/heroicons-solid/sparkles';
import ISBanknotes from '~icons/heroicons-solid/banknotes';
import ISUserGroup from '~icons/heroicons-solid/user-group';

const FEATURES = [
  {
    title: 'An open platform',
    about:
      'Launch your initiatives on a free, open-source platform, ensuring transparency and integrity at every step.',
    icon: ICGitHub
  },
  {
    title: 'Costless polls and petitions',
    about:
      'Create an unlimited number of free polls and petitions, and encourage broader community involvement in advocacy.',
    icon: ISCursorClick
  },
  {
    title: 'Democratic legitimacy',
    about:
      'Utilize our Global Voter ID system to ensure that only real and unique people participate in your projects.',
    icon: ISUserGroup
  },
  {
    title: 'A source of funding',
    about:
      'Receive grants in our official currency, create positive change, and tackle humanity\'s most pressing challenges.',
    icon: ISBanknotes
  },
  {
    title: 'Shielded voting',
    about:
      'Keep voter choices confidential until voting ends, preventing manipulation and promoting fair, unbiased outcomes.',
    icon: ISShieldCheck
  },
  {
    title: 'Discourse integration',
    about:
      'View discussions and comments directly within the app, enhancing context and facilitating informed decision-making.',
    icon: ICDiscourse
  },
  {
    title: 'Multiple voting systems',
    about:
      'Choose the most appropriate voting method for each decision or create a new one tailored to your needs.',
    icon: ISAdjustments
  },
  {
    title: 'AI proposal summary',
    about:
      'Help voters quickly understand key points for informed decision-making with concise overviews of proposals.',
    icon: ISSparkles
  },
  {
    title: 'Your own branding',
    about:
      "Set up your own space and create a cohesive user experience aligned with your organization's identity.",
    icon: ISColorSwatch
  }
];
</script>

<template>
  <div id="features" class="pt-8 border-b">
    <UiContainer class="!max-w-screen-lg">
      <div class="pb-6 max-w-[600px]">
        <div class="eyebrow mb-3">Features</div>
        <h1 class="mb-4 font-display !text-[36px] sm:!text-[44px]">
          Everything you need to have a global impact
        </h1>
      </div>
    </UiContainer>
    <div class="border-t">
      <UiContainer class="!max-w-screen-lg !px-0">
        <div class="grid grid-cols-1 lg:grid-cols-3">
          <div v-for="(feature, i) in FEATURES" :key="i"
            class="px-4 py-5 border-b last:border-b-0 border-r-0 lg:border-r lg:[&:nth-child(3n)]:border-r-0 lg:[&:nth-child(n+7)]:border-b-0">
            <component :is="feature.icon" class="text-skin-link size-[22px] mb-4" />
            <h3 class="text-skin-link font-heading !text-[18px] mb-2" v-text="feature.title" />
            <div v-text="feature.about" />
          </div>
        </div>
      </UiContainer>
    </div>
  </div>
</template>
