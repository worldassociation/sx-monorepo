<script setup lang="ts">
import ICDiscourse from '~icons/c/discourse';
import ICGitHub from '~icons/c/github';
import ISAdjustments from '~icons/heroicons-solid/adjustments';
import ISBanknotes from '~icons/heroicons-solid/banknotes';
import ISColorSwatch from '~icons/heroicons-solid/color-swatch';
import ISCursorClick from '~icons/heroicons-solid/cursor-click';
import ISShieldCheck from '~icons/heroicons-solid/shield-check';
import ISSparkles from '~icons/heroicons-solid/sparkles';
import ISUserGroup from '~icons/heroicons-solid/user-group';

const FEATURES = [
  {
    title: 'Democratic legitimacy',
    about:
      'Use our Global Voter ID system to ensure that only real and unique people participate in your initiatives.',
    icon: ISUserGroup
  },
  {
    title: 'Costless polls and petitions',
    about:
      'Amplify your advocacy with unlimited polls and petitions, engaging your community like never before.',
    icon: ISCursorClick
  },
  {
    title: 'Community grants',
    about:
      "Receive funding to drive positive change and address humanity's most pressing global challenges.",
    icon: ISBanknotes
  },
  {
    title: 'Open-source software',
    about:
      'Launch your campaigns on a transparent application that is free to use and free to improve.',
    icon: ICGitHub
  },
  {
    title: 'Multiple voting systems',
    about:
      'Choose the appropriate voting method for each decision or create a new one tailored to your needs.',
    icon: ISAdjustments
  },
  {
    title: 'Shielded voting',
    about:
      'Keep voter choices confidential until voting ends, preventing manipulation and promoting fair outcomes.',
    icon: ISShieldCheck
  }
];
</script>

<template>
  <div id="features" class="pt-8 border-b">
    <UiContainer class="!max-w-screen-lg">
      <div class="pb-6 max-w-[600px]">
        <h1 class="mb-4 font-display !text-[36px] sm:!text-[44px]">
          Everything you need to make a global impact
        </h1>
      </div>
    </UiContainer>
    <div class="border-t">
      <UiContainer class="!max-w-screen-lg !px-0">
        <div class="grid grid-cols-1 text-[18px] lg:grid-cols-3">
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
