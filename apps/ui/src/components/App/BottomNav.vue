<script setup lang="ts">
import IHBell from '~icons/heroicons-outline/bell';
import IHGlobe from '~icons/heroicons-outline/globe-americas';
import IHHome from '~icons/heroicons-outline/home';
import IHUser from '~icons/heroicons-outline/user';

const { web3 } = useWeb3();
const route = useRoute();

const { isVisible, isMobile } = useScrollVisibility({ threshold: 100 });

const menu = [
  {
    link: { name: 'my-home' },
    icon: IHHome
  },
  {
    link: { name: 'my-explore' },
    icon: IHGlobe
  },
  {
    link: { path: '/s:worldassociation.eth' },
    icon: defineComponent({
      render() {
        return h('div', {
          class: 'box-border h-[18px] w-[18px] rounded-full border-[3px] border-skin-primary'
        });
      }
    })
  },
  {
    link: { name: 'my-notifications' },
    icon: IHBell
  },
  {
    link: { name: 'user', params: { user: web3.value.account } },
    icon: IHUser
  }
];
</script>

<template>
  <nav class="fixed bottom-0 inset-x-0 z-50 bg-skin-bg border-t text-xs transition-transform duration-300"
    :class="{ 'translate-y-full': !isVisible && isMobile }">
    <div class="flex px-4 justify-between">
      <AppLink v-for="(item, i) in menu" :key="i" :to="item.link"
        class="inline-flex flex-col text-center truncate justify-center max-w-[120px]"
        :class="route.name === item.link.name ? 'text-skin-link' : 'text-skin-text'">
        <component :is="item.icon" class="mx-auto size-4" />
      </AppLink>
    </div>
  </nav>
</template>
