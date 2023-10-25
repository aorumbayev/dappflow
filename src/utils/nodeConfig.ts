import {
  KMDConnectionParams,
  NodeConnectionParams,
} from "../packages/core-sdk/types";
import { REACT_APP_NETWORK } from "../env";
import { NETWORKS } from "../packages/core-sdk/constants";

export const supportSettings = REACT_APP_NETWORK === "";

export function getNodeConfig(
  network: string = REACT_APP_NETWORK
): NodeConnectionParams {
  const availableNodes = getNodes();

  if (network) {
    if (network === NETWORKS.SANDBOX) {
      return availableNodes[0];
    }
    if (network === NETWORKS.TESTNET) {
      return availableNodes[1];
    }
    if (network === NETWORKS.MAINNET) {
      return availableNodes[2];
    }
  }

  const defaultNode = availableNodes[2];

  return {
    ...defaultNode,
    algod: {
      url: localStorage.getItem("algodUrl") || defaultNode.algod.url,
      port: localStorage.getItem("algodPort") || defaultNode.algod.port,
      token: localStorage.getItem("algodToken") || defaultNode.algod.token,
    },
    indexer: {
      url: localStorage.getItem("indexerUrl") || defaultNode.indexer.url,
      port: localStorage.getItem("indexerPort") || defaultNode.indexer.port,
      token: localStorage.getItem("indexerToken") || defaultNode.indexer.token,
    },
  };
}

export function getKMDConfig(): KMDConnectionParams {
  const defaultKMDConfig: KMDConnectionParams = {
    url: "http://localhost",
    token: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    port: "4002",
  };

  return {
    url: localStorage.getItem("kmdUrl") || defaultKMDConfig.url,
    port: localStorage.getItem("kmdPort") || defaultKMDConfig.port,
    token: localStorage.getItem("kmdToken") || defaultKMDConfig.token,
  };
}

export function getNodes(): NodeConnectionParams[] {
  return [
    {
      id: "sandbox",
      label: "Sandbox",
      algod: {
        url: "http://localhost",
        port: "4001",
        token:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
      indexer: {
        url: "http://localhost",
        port: "8980",
        token:
          "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      },
    },
    {
      id: "testnet",
      label: "Algonode testnet",
      algod: {
        url: "https://testnet-api.algonode.cloud",
        port: "",
        token: "",
      },
      indexer: {
        url: "https://testnet-idx.algonode.cloud",
        port: "",
        token: "",
      },
    },
    {
      id: "mainnet",
      label: "Algonode mainnet",
      algod: {
        url: "https://mainnet-api.algonode.cloud",
        port: "",
        token: "",
      },
      indexer: {
        url: "https://mainnet-idx.algonode.cloud",
        port: "",
        token: "",
      },
    },
    {
      id: "betanet",
      label: "Algonode betanet",
      algod: {
        url: "https://betanet-api.algonode.cloud",
        port: "",
        token: "",
      },
      indexer: {
        url: "https://betanet-idx.algonode.cloud",
        port: "",
        token: "",
      },
    },
  ];
}
