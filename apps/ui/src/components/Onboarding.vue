<script setup lang="ts">
import { lsGet, lsSet } from '@/helpers/utils';
import { ref, computed, watch } from 'vue';
import { ethers } from 'ethers';
import { GLOBAL_VOTER_ID_ZKME_ADDRESS } from '../helpers/constants';

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

const voterIdBalance = ref<string | null>(null);

async function fetchVoterIdBalance() {
  if (!web3.value.account) return;

  const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org');
  const abi = [
    "function balanceOf(address owner) view returns (uint256)"
  ];
  const contract = new ethers.Contract(GLOBAL_VOTER_ID_ZKME_ADDRESS, abi, provider);

  const balance = await contract.balanceOf(web3.value.account);
  voterIdBalance.value = ethers.utils.formatUnits(balance, 18);
}

watch(() => web3.value.account, fetchVoterIdBalance, { immediate: true });

const tasks = computed(() => ({
  voterId: !voterIdBalance.value || parseFloat(voterIdBalance.value) === 0,
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
    <div v-if="tasks.voterId" class="border-b mx-4 py-[14px] flex gap-x-2.5">
      <div><IS-flag class="text-skin-link mt-0.5" /></div>
      <div class="grow">
        Create your
        <ButtonClaim />
      </div>
    </div>

    <div class="border-b mx-4 py-[14px] flex gap-x-2.5">
      <div><IS-flag class="text-skin-link mt-0.5" /></div>
      <div class="grow">
        Claim your
        <a href="https://globalbasicincome.org" target="_blank" class="text-skin-link">
          basic income
        </a>
      </div>
    </div>

    <div v-if="tasks.following" class="border-b mx-4 py-[14px] flex gap-x-2.5">
      <div><IS-flag class="text-skin-link mt-0.5" /></div>
      <div class="grow">
        Follow the
        <AppLink :to="'/s:worldassociation.eth'"> World Association </AppLink>
      </div>
    </div>

    <div v-if="tasks.votes && !tasks.voterId" class="border-b mx-4 py-[14px] flex gap-x-2.5">
      <div><IS-flag class="text-skin-link mt-0.5" /></div>
      <div class="grow">Cast your first vote</div>
    </div>

    <div v-if="!tasks.voterId" class="border-b mx-4 py-[14px] flex gap-x-2.5">
      <div><IS-flag class="text-skin-link mt-0.5" /></div>
      <div class="grow">
        Create a
        <AppLink :to="'/s:polls.worldassociation.eth'"> poll </AppLink>
        or start a
        <AppLink :to="'/s:petitions.worldassociation.eth'"> petition </AppLink>
      </div>
    </div>
  </div>
</template>
