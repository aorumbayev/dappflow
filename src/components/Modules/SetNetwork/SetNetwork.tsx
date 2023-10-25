// src/components/Modules/SetNetwork/SetNetwork.tsx
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showSnack } from "../../../redux/common/actions/snackbar";
import { getNodeConfig } from "../../../utils/nodeConfig";
import { Network } from "../../../packages/core-sdk/network";
import { logOut } from "../../../redux/wallet/actions/wallet";
import { updateAppId } from "../../../redux/abi/actions/abiStudio";

function SetNetwork(): JSX.Element {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const networkName = searchParams.get("name");
    const redirectUrl = searchParams.get("redirect") || "/";

    const nodeConfig = getNodeConfig(networkName);
    console.log(nodeConfig, networkName, redirectUrl);
    if (nodeConfig.id !== networkName) {
      dispatch(
        showSnack({
          severity: "error",
          message: `Invalid network name: ${networkName}`,
        })
      );
      return;
    }

    const network = new Network(nodeConfig);
    localStorage.setItem("algodUrl", network.getAlgodUrl());
    localStorage.setItem("algodPort", network.algod.port || "");
    localStorage.setItem("algodToken", String(network.algod.token) || "");
    localStorage.setItem("indexerUrl", network.indexer.url || "");
    localStorage.setItem("indexerPort", network.indexer.port || "");
    localStorage.setItem("indexerToken", String(network.indexer.token) || "");
    dispatch(logOut());
    dispatch(updateAppId(""));
    window.location.reload();
    window.open(redirectUrl, "_self");
  }, []);

  return null;
}

export default SetNetwork;
