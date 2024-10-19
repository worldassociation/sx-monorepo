<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { ZkMeWidget } from '@zkmelabs/widget';
import { ethers } from 'ethers';
import {
    CFA_V1_FORWARDER_ABI,
    CFA_V1_FORWARDER_ADDRESS,
    CHAIN,
    DRACHMA_CONTRACT_ADDRESS,
    DRACHMA_TREASURY_ADDRESS,
    FLOW_RATE,
    GLOBAL_VOTER_ID_ZKME_ADDRESS,
    STREAM_LINK_TEMPLATE
} from '../helpers/constants';
import { Engine } from '@thirdweb-dev/engine';
import '@zkmelabs/widget/dist/style.css'

const {
    VITE_THIRDWEB_ENGINE_URL,
    VITE_THIRDWEB_ENGINE_ACCESS_TOKEN,
    VITE_THIRDWEB_BACKEND_WALLET_ADDRESS,
    VITE_THIRDWEB_BACKEND_SMART_ACCOUNT_ADDRESS
} = import.meta.env;

if (!VITE_THIRDWEB_ENGINE_URL)
    throw new Error('VITE_THIRDWEB_ENGINE_URL is missing');
if (!VITE_THIRDWEB_ENGINE_ACCESS_TOKEN)
    throw new Error('VITE_THIRDWEB_ENGINE_ACCESS_TOKEN is missing');
if (!VITE_THIRDWEB_BACKEND_WALLET_ADDRESS)
    throw new Error('VITE_THIRDWEB_BACKEND_WALLET_ADDRESS is missing');
if (!VITE_THIRDWEB_BACKEND_SMART_ACCOUNT_ADDRESS)
    throw new Error('VITE_THIRDWEB_BACKEND_SMART_ACCOUNT_ADDRESS is missing');

console.log('Component initialization started');

const { web3Account } = useWeb3();

const isBasicIncomeSetUp = ref(false);
const flowrateData = ref<ethers.BigNumber | null>(null);
const balanceData = ref<ethers.BigNumber | null>(null);

const widget = ref<ZkMeWidget | null>(null);

const showResultDialog = ref(false);
const resultDialogContent = ref({
    title: '',
    description: ''
});
const isProcessing = ref(false);
const isSuccess = ref(false);
const isButtonDisabled = ref(false);
const countdown = ref(8);

const fetchFlowrateData = async () => {
    console.log('Fetching flowrate data');
    if (!web3Account.value) {
        console.log('No web3Account, skipping flowrate fetch');
        return;
    }

    const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org');
    const contract = new ethers.Contract(CFA_V1_FORWARDER_ADDRESS, CFA_V1_FORWARDER_ABI, provider);

    try {
        console.log('Calling getAccountFlowrate');
        const flowrate = await contract.getAccountFlowrate(DRACHMA_CONTRACT_ADDRESS, web3Account.value);
        console.log('Flowrate fetched:', flowrate.toString());
        flowrateData.value = flowrate;
        isBasicIncomeSetUp.value = flowrate.gt(ethers.constants.Zero);
        console.log('isBasicIncomeSetUp:', isBasicIncomeSetUp.value);
    } catch (error) {
        console.error('Error fetching flowrate:', error);
    }
};

const fetchBalanceData = async () => {
    console.log('Fetching balance data');
    if (!web3Account.value) {
        console.log('No web3Account, skipping balance fetch');
        return;
    }

    const provider = new ethers.providers.JsonRpcProvider('https://mainnet.base.org');
    const abi = ["function balanceOf(address owner) view returns (uint256)"];
    const contract = new ethers.Contract(GLOBAL_VOTER_ID_ZKME_ADDRESS, abi, provider);

    try {
        console.log('Calling balanceOf');
        const balance = await contract.balanceOf(web3Account.value);
        console.log('Balance fetched:', balance.toString());
        balanceData.value = balance;
    } catch (error) {
        console.error('Error fetching balance:', error);
    }
};

watch(() => web3Account.value, () => {
    console.log('web3Account changed:', web3Account.value);
    fetchFlowrateData();
    fetchBalanceData();
}, { immediate: true });

const initializeWidget = async () => {
    console.log('Initializing widget');
    if (!web3Account.value) {
        console.log('No web3Account, setting widget to null');
        widget.value = null;
        return;
    }

    try {
        const accessToken = await getZkMeToken();
        console.log('ZkMe token obtained');

        const newProvider = {
            async getAccessToken() {
                return accessToken;
            },
            async getUserAccounts() {
                return [web3Account.value];
            }
        };

        widget.value = new ZkMeWidget(
            'M2024053066119595336406774111128',
            'World Association',
            '0x2105',
            newProvider,
            {
                lv: 'MeID',
                mode: 'wallet'
            }
        );
        console.log('Widget initialized successfully');
    } catch (error) {
        console.error('Error initializing widget:', error);
        widget.value = null;
    }
};

watch(web3Account, initializeWidget, { immediate: true });



async function mintMembershipZkMe(address: string) {
    console.log('Minting membership ZkMe for address:', address);
    const engine = new Engine({
        url: VITE_THIRDWEB_ENGINE_URL as string,
        accessToken: VITE_THIRDWEB_ENGINE_ACCESS_TOKEN as string
    });

    try {
        console.log('Attempting to mint membership SBT');
        await engine.erc20.mintTo(
            CHAIN,
            GLOBAL_VOTER_ID_ZKME_ADDRESS,
            VITE_THIRDWEB_BACKEND_WALLET_ADDRESS as string,
            {
                toAddress: address,
                amount: '1.0'
            },
            false,
            '',
            VITE_THIRDWEB_BACKEND_SMART_ACCOUNT_ADDRESS
        );
        console.log('Membership SBT minted successfully');
    } catch (error) {
        console.error('Error during minting:', error);
        throw new Error('Failed to mint membership SBT');
    }
}

async function createDrachmaStream(
    address: string,
    flowRate: bigint
) {
    console.log('Creating test Drachma stream for address:', address, 'with flow rate:', flowRate.toString());
    const engine = new Engine({
        url: VITE_THIRDWEB_ENGINE_URL as string,
        accessToken: VITE_THIRDWEB_ENGINE_ACCESS_TOKEN as string
    });

    try {
        console.log('Attempting to create stream');
        await engine.contract.write(
            CHAIN,
            CFA_V1_FORWARDER_ADDRESS,
            VITE_THIRDWEB_BACKEND_WALLET_ADDRESS as string,
            {
                functionName: 'createFlow',
                args: [
                    DRACHMA_CONTRACT_ADDRESS,
                    DRACHMA_TREASURY_ADDRESS as string,
                    address,
                    flowRate.toString(),
                    '0x0000000000000000000000000000000000000000'
                ]
            },
            false,
            '',
            VITE_THIRDWEB_BACKEND_SMART_ACCOUNT_ADDRESS
        );
        console.log('Stream created successfully');
    } catch (error) {
        console.error('Error during stream creation:', error);
        throw new Error('Failed to create stream');
    }
}

async function getZkMeToken() {
    console.log('Fetching ZkMe token');
    const { VITE_ZKME_API_KEY } = import.meta.env;

    if (!VITE_ZKME_API_KEY) {
        throw new Error('ZKME_API_KEY is missing');
    }

    const response = await fetch('https://nest-api.zk.me/api/token/get', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            'User-Agent': 'World Association'
        },
        body: JSON.stringify({
            apiKey: VITE_ZKME_API_KEY,
            appId: 'M2024053066119595336406774111128',
            apiModePermission: 1,
            lv: 2
        })
    });

    console.log('ZkMe token fetch response:', response.status, response.statusText);

    if (!response.ok) {
        throw new Error('Failed to fetch zkMe token');
    }

    const data = await response.json();

    return data.data.accessToken;
}

const handleLaunchWidget = async () => {
    // const widgetInstance = toRaw(widget.value);
    // console.log('Launching widget');
    // if (widgetInstance) {
    //     widgetInstance.launch();
    //     widgetInstance.on('meidFinished', async (results) => {
    //         console.log('meidFinished event received:', results);
    //         if (results.isGrant) {
    //             console.log('isGrant is true, proceeding with stream creation and membership minting');
    await handleCreateDrachmaStream();
    await handleMintMembershipZkMe();
    //         }
    //     });
    // } else {
    //     console.log('Widget is null, cannot launch');
    // }
};

const handleCreateDrachmaStream = async () => {
    console.log('Handling Drachma stream creation');
    if (!web3Account.value) {
        console.log('No web3Account, aborting stream creation');
        return;
    }

    isProcessing.value = true;
    showResultDialog.value = true;

    const newFlowRate = ethers.BigNumber.from(FLOW_RATE);

    try {
        console.log('Attempting to create Drachma stream');
        await createDrachmaStream(web3Account.value, newFlowRate.toBigInt());
        console.log('Drachma stream created successfully');
        resultDialogContent.value = {
            title: 'Stream created',
            description: 'Your basic income stream has been successfully created.'
        };
        isBasicIncomeSetUp.value = true;
        fetchFlowrateData();
        isSuccess.value = true;
        isButtonDisabled.value = true;
        countdown.value = 8;
        startCountdown();
    } catch (error) {
        console.error('Error in handleCreateDrachmaStream:', error);
        resultDialogContent.value = {
            title: 'Error',
            description: 'Failed to create basic income stream. Please try again.'
        };
        isSuccess.value = false;
    } finally {
        console.log('Stream creation process completed');
        isProcessing.value = false;
    }
};

const handleMintMembershipZkMe = async () => {
    console.log('Handling membership ZkMe minting');
    if (!web3Account.value) {
        console.log('No web3Account, aborting membership minting');
        return;
    }
    if (balanceData.value && balanceData.value.gt(ethers.constants.Zero)) {
        console.log('User already has a balance, skipping membership minting');
        return;
    }

    try {
        console.log('Attempting to mint membership ZkMe');
        await mintMembershipZkMe(web3Account.value);
        console.log('Membership ZkMe minted successfully');
    } catch (error) {
        console.error('Error minting membership SBT:', error);
    }
};

const startCountdown = () => {
    console.log('Starting countdown');
    const timer = setInterval(() => {
        countdown.value--;
        console.log('Countdown:', countdown.value);
        if (countdown.value === 0) {
            console.log('Countdown finished');
            clearInterval(timer);
            isButtonDisabled.value = false;
            isBasicIncomeSetUp.value = true;
        }
    }, 1000);
};

const getUserStreamLink = computed(() => {
    if (!web3Account.value) return '';
    return STREAM_LINK_TEMPLATE.replace(/address/g, web3Account.value);
});

const closeResultDialog = () => {
    showResultDialog.value = false;
};

console.log('Component setup completed');
</script>

<template>
    <template v-if="isBasicIncomeSetUp">
        Check your
        <a :href="getUserStreamLink" target="_blank" rel="noopener noreferrer">
            basic income
        </a>
    </template>
    <template v-else>
        Claim your
        <span class="cursor-pointer text-skin-link" @click="handleLaunchWidget">
            basic income
        </span>
    </template>


    <Teleport to="body">
        <UiModal :open="showResultDialog" @close="closeResultDialog">
            <template #header>
                <h3>{{ resultDialogContent.title }}</h3>
            </template>
            <div class="p-4 flex flex-col space-y-2 text-center">
                <template v-if="isProcessing">
                    <UiLoading />
                    <p class="text-muted-foreground text-sm">
                        Creating your basic income stream...
                    </p>
                </template>
                <template v-else>
                    <p class="text-muted-foreground text-sm">
                        {{ resultDialogContent.description }}
                    </p>
                </template>
            </div>
            <template #footer>
                <div class="flex flex-row items-center justify-center gap-2">
                    <UiButton @click="closeResultDialog" class="w-40" :variant="isSuccess ? 'outline' : 'default'">
                        Close
                    </UiButton>
                    <template v-if="isSuccess">
                        <a :href="getUserStreamLink" target="_blank" rel="noopener noreferrer" class="w-40 sm:w-auto">
                            <UiButton class="w-[160px] flex items-center justify-center" :disabled="isButtonDisabled">
                                {{ isButtonDisabled ? `View stream (${countdown}s)` : 'View stream' }}
                                <IH-arrow-up-right v-if="!isButtonDisabled" class="ml-1 h-[12px] w-[12px]" />
                            </UiButton>
                        </a>
                    </template>
                </div>
            </template>
        </UiModal>
    </Teleport>
</template>
