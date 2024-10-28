import { ChainId, NetworkID, VoteType, VoteTypeInfo } from '@/types';

export const APP_NAME = 'World Association';

export const SIDEKICK_URL = 'https://sh5.co';

export const HELPDESK_URL = 'https://help.snapshot.box';

export const ETH_CONTRACT = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';

export const CHAIN_IDS: Record<Exclude<NetworkID, 's' | 's-tn'>, ChainId> = {
  // EVM
  eth: 1,
  oeth: 10,
  matic: 137,
  arb1: 42161,
  sep: 11155111,
  // Starknet
  sn: '0x534e5f4d41494e',
  'sn-sep': '0x534e5f5345504f4c4941'
};

export const COINGECKO_ASSET_PLATFORMS = {
  1: 'ethereum',
  10: 'optimistic-ethereum',
  137: 'polygon-pos',
  42161: 'arbitrum-one'
};

export const COINGECKO_BASE_ASSETS = {
  1: 'ethereum',
  10: 'ethereum',
  137: 'matic-network',
  42161: 'ethereum'
};

export const MAX_SYMBOL_LENGTH = 12;

export const BASIC_CHOICES = ['For', 'Against', 'Abstain'];
export const SUPPORTED_VOTING_TYPES: VoteType[] = [
  'basic',
  'single-choice',
  'approval',
  'ranked-choice',
  'weighted',
  'quadratic'
] as const;
export const VOTING_TYPES_INFO: Record<
  Exclude<VoteType, 'custom'> | 'any',
  VoteTypeInfo
> = {
  any: {
    label: 'Any',
    description: 'Any type of voting.'
  },
  basic: {
    label: 'Basic voting',
    description:
      'Voters have three choices: they can vote "For", "Against" or "Abstain".'
  },
  'single-choice': {
    label: 'Single choice voting',
    description: 'Voters can select only one choice from a predefined list.'
  },
  approval: {
    label: 'Approval voting',
    description:
      'Voters can select multiple choices, each choice receiving full voting power.'
  },
  'ranked-choice': {
    label: 'Ranked choice voting',
    description:
      'Each voter may select and rank any number of choices. Results are calculated by instant-runoff counting method.'
  },
  weighted: {
    label: 'Weighted voting',
    description:
      'Each voter may spread voting power across any number of choices.'
  },
  quadratic: {
    label: 'Quadratic voting',
    description:
      'Each voter may spread voting power across any number of choices. Results are calculated quadratically.'
  }
};

export const PRIVACY_TYPES_INFO: Record<
  'none' | 'shutter',
  { label: string; description?: string }
> = {
  none: {
    label: 'No privacy'
  },
  shutter: {
    label: 'Shielded voting',
    description:
      'Choices are encrypted and only visible once the voting period is over.'
  }
};

export const VALIDATION_TYPES_INFO: Record<
  | 'any-voting'
  | 'only-members'
  | 'basic'
  | 'passport-gated'
  | 'arbitrum'
  | 'karma-eas-attestation',
  { label: string; description: string }
> = {
  'any-voting': {
    label: 'Anyone can vote',
    description: 'Anyone with voting power can cast a vote.'
  },
  'only-members': {
    label: 'Only authors can propose',
    description: 'Allow only authors to submit a proposal'
  },
  basic: {
    label: 'Basic',
    description:
      'Use a minimum score along with any strategy to determine if a user can create a proposal.'
  },
  'passport-gated': {
    label: 'Gitcoin Passport gated',
    description:
      'Protect your space from spam by requiring users to have a Gitcoin Passport to create a proposal.'
  },
  arbitrum: {
    label: 'Arbitrum DAO votable supply',
    description:
      'Use with erc20-votes to validate by percentage of votable supply.'
  },
  'karma-eas-attestation': {
    label: 'Karma EAS Attestation',
    description: 'Use EAS attest.sh to determine if user can create a proposal.'
  }
};

export const CHAIN = 'base';
export const DRACHMA_CONTRACT_ADDRESS =
  '0x2ce6f5e18ee4278dc33df82a28286f006d7d5730';
export const DRACHMA_TREASURY_ADDRESS =
  '0x0a5aaedf418b08a5cd1adeba1d0d8739c7ea8000';
export const GLOBAL_VOTER_ID_ZKME_ADDRESS =
  '0x762CEc1f35e517Da6C178262F8864Fd92b70A20b';
export const FLOW_RATE = '11574074074074';
export const CFA_V1_FORWARDER_ADDRESS =
  '0xcfA132E353cB4E398080B9700609bb008eceB125';
export const CFA_V1_FORWARDER_ABI = [
  {
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'account', type: 'address' }
    ],
    name: 'getAccountFlowrate',
    outputs: [{ name: '', type: 'int96' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const;

export const STREAM_LINK_TEMPLATE =
  'https://app.superfluid.finance/stream/base/0x0a5aaedf418b08a5cd1adeba1d0d8739c7ea8000-address-0x2ce6f5e18ee4278dc33df82a28286f006d7d5730-0.0';
