<script setup lang="ts">
import { lsGet, lsSet } from '@/helpers/utils';
import { ref, computed, watch, onMounted } from 'vue';
import { ethers } from 'ethers';
import { GLOBAL_VOTER_ID_ZKME_ADDRESS, CFA_V1_FORWARDER_ABI, CFA_V1_FORWARDER_ADDRESS, DRACHMA_CONTRACT_ADDRESS } from '../helpers/constants';
import ButtonClaimID from './ButtonClaimID.vue';

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
const loading = ref(true);

async function fetchVoterIdBalance() {
  if (!web3.value.account) return;

  try {
    const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org');
    const abi = [
      "function balanceOf(address owner) view returns (uint256)"
    ];
    const contract = new ethers.Contract(GLOBAL_VOTER_ID_ZKME_ADDRESS, abi, provider);

    const balance = await contract.balanceOf(web3.value.account);
    voterIdBalance.value = ethers.utils.formatUnits(balance, 18);
  } catch (error) {
    console.error('Error fetching voter ID balance:', error);
    voterIdBalance.value = '0';
  } finally {
    loading.value = false;
  }
}

watch(() => web3.value.account, fetchVoterIdBalance, { immediate: true });

const basicIncomeSetUp = ref(false);

async function fetchBasicIncomeStatus() {
  if (!web3.value.account) return;

  try {
    const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org');
    const contract = new ethers.Contract(CFA_V1_FORWARDER_ADDRESS, CFA_V1_FORWARDER_ABI, provider);

    const flowrate = await contract.getAccountFlowrate(DRACHMA_CONTRACT_ADDRESS, web3.value.account);
    basicIncomeSetUp.value = flowrate.gt(ethers.constants.Zero);
  } catch (error) {
    console.error('Error fetching basic income status:', error);
    basicIncomeSetUp.value = false;
  }
}

watch(() => web3.value.account, fetchBasicIncomeStatus, { immediate: true });

const tasks = computed(() => ({
  voterId: !voterIdBalance.value || parseFloat(voterIdBalance.value) === 0,
  basicIncome: !basicIncomeSetUp.value,
  followingWorldAssociation: !followedSpacesStore.isFollowed('s:worldassociation.eth'),
  followingGlobalDemocracy: !followedSpacesStore.isFollowed('s:globaldemocracy.eth'),
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

const isVoterIdBalanceLoaded = computed(() => voterIdBalance.value !== null);
</script>

<template>
  <div v-if="user && loading">
    <UiLabel label="onboarding" :sticky-offset="72" />
    <div class="mx-4">
      <div class="border-b py-[14px] flex gap-x-2.5">
        <div><IS-flag class="text-skin-text/10 mt-0.5" /></div>
        <UiSkeleton class="my-1 h-[18px] w-[120px]" />
      </div>
      <div class="border-b py-[14px] flex gap-x-2.5">
        <div><IS-flag class="text-skin-text/10 mt-0.5" /></div>
        <UiSkeleton class="my-1 h-[17px] w-[120px]" />
      </div>
    </div>
  </div>
  <div v-else-if="user && hasPendingTasks && isVoterIdBalanceLoaded">
    <UiLabel label="onboarding" :sticky-offset="72" />
    <div v-if="tasks.voterId" class="border-b mx-4 py-[14px] flex gap-x-2.5">
      <div><IS-flag class="text-skin-link mt-0.5" /></div>
      <div class="grow">
        <ButtonClaimID @voter-id-claimed="balance => voterIdBalance = balance" />
      </div>
    </div>

    <div v-if="tasks.basicIncome" class="border-b mx-4 py-[14px] flex gap-x-2.5">
      <div><IS-flag class="text-skin-link mt-0.5" /></div>
      <div class="grow">
        <ButtonClaimBasicIncome />
      </div>
    </div>

    <div v-if="tasks.followingWorldAssociation" class="border-b mx-4 py-[14px] flex gap-x-2.5">
      <div><IS-flag class="text-skin-link mt-0.5" /></div>
      <div class="grow">
        <AppLink :to="'/s:worldassociation.eth'">
          <span class="text-skin-text">Follow the</span> World Association
        </AppLink>
      </div>
    </div>

    <div v-if="tasks.followingGlobalDemocracy" class="border-b mx-4 py-[14px] flex gap-x-2.5">
      <div><IS-flag class="text-skin-link mt-0.5" /></div>
      <div class="grow">
        <AppLink :to="'/s:globaldemocracy.eth'">
          <span class="text-skin-text">Follow the</span> Global Democracy <span class="text-skin-text">space</span>
        </AppLink>
      </div>
    </div>

    <div v-if="tasks.votes && !tasks.voterId" class="border-b mx-4 py-[14px] flex gap-x-2.5">
      <div><IS-flag class="text-skin-link mt-0.5" /></div>
      <div class="grow">Cast your first vote</div>
    </div>
  </div>
</template>
