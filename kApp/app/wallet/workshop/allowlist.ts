import { mockProviderDids } from '../mocks/mocks'

export interface PfiAllowlistConfig {
  pfiUri: string,
  pfiName: string
}

// TODO 1: Choose the PFIs you want as part of your listings

export const pfiAllowlist: PfiAllowlistConfig[] = [
  // {
  //   pfiUri: 'did:dht:kdqnzqsoedntcfmcgrxshr7ek93ep1eznfxn1wnkreyy9reewa9o',
  //   pfiName: 'Emma USDC PFI',
  // },
  {
    pfiUri: mockProviderDids.swiftliquidity_solutions.uri,
    pfiName: mockProviderDids.swiftliquidity_solutions.name,
  },
  {
    pfiUri: mockProviderDids.flowback_financial.uri,
    pfiName: mockProviderDids.flowback_financial.name,
  },
  {
    pfiUri: mockProviderDids.vertex_liquid_assets.uri,
    pfiName: mockProviderDids.vertex_liquid_assets.name,
  },
  {
    pfiUri: mockProviderDids.titanium_trust.uri,
    pfiName: mockProviderDids.titanium_trust.name,
  }]