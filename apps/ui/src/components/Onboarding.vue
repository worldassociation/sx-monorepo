<script setup lang="ts">
import { lsGet, lsSet } from '@/helpers/utils';

const usersStore = useUsersStore();
const { web3 } = useWeb3();
const followedSpacesStore = useFollowedSpacesStore();

const user = computed(() => {
  if (
    !web3.value.authLoading &&
    web3.value.account &&
    followedSpacesStore.followedSpacesLoaded
  ) {
    return usersStore.getUser(web3.value.account);
  } else {
    return null;
  }
});

const tasks = computed(() => ({
  profile: !user.value?.created,
  following: !followedSpacesStore.isFollowed('s:worldassociation.eth'),
  votes: !user.value?.votesCount
}));

const hasPendingTasks = computed(() =>
  Object.values(tasks.value).includes(true)
);

watch(
  hasPendingTasks,
  value => {
    lsSet('showOnboarding', {
      ...lsGet('showOnboarding'),
      [web3.value.account]: !value ? false : undefined
    });
  },
  { immediate: true }
);

onMounted(async () => {
  const pending = lsGet('showOnboarding')?.[web3.value.account] ?? true;
  if (pending && web3.value.account)
    await usersStore.fetchUser(web3.value.account, true);
});
</script>

<template>
  <div v-if="user && hasPendingTasks">
    <UiLabel label="onboarding" sticky />
    <div v-if="tasks.profile" class="border-b mx-4 py-[14px] flex gap-x-2.5">
      <IS-flag class="text-skin-link mt-1 shrink-0" />
      <div class="grow">
        Set up your
        <AppLink :to="{ name: 'user', params: { user: user.id } }">
          profile
        </AppLink>
      </div>
    </div>

    <div v-if="tasks.following" class="border-b mx-4 py-[14px] flex gap-x-2.5">
      <div><IS-flag class="text-skin-link mt-1" /></div>
      <div class="grow">
        Follow the
        <AppLink :to="'/s:worldassociation.eth'"> World Association </AppLink>
      </div>
    </div>

    <div class="border-b mx-4 py-[14px] flex gap-x-2.5">
      <div><IS-flag class="text-skin-link mt-1" /></div>
      <div class="grow">
        Create your
        <a href="https://globalvoterid.org" target="_blank" class="text-skin-link">
          Global Voter ID
        </a>
      </div>
    </div>

    <div class="border-b mx-4 py-[14px] flex gap-x-2.5">
      <div><IS-flag class="text-skin-link mt-1" /></div>
      <div class="grow">
        Claim your
        <a href="https://globalbasicincome.org" target="_blank" class="text-skin-link">
          basic income
        </a>
      </div>
    </div>

    <div v-if="tasks.votes" class="border-b mx-4 py-[14px] flex gap-x-2.5">
      <div><IS-flag class="text-skin-link mt-1" /></div>
      <div class="grow">Cast your first vote</div>
    </div>
  </div>
</template>
