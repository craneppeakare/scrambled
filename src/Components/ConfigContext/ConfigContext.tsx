import { createContext, useState } from "react";
import { ConfigContextState } from "./types";

const contextDefaultValues: ConfigContextState = {
  configs: {},
  addConfig: () => { },
};

export const ConfigContext =
  createContext<ConfigContextState>(contextDefaultValues);

type ConfigObject = { key: string; value: any };

// type ProviderPorps = { configJson: any; children: SVGRectElement };

export default function ConfigsProvider(props: any) {
  const [configs, setConfigs] = useState<any>(props.configJson);

  const addConfig = (prevConfig: any, newConfig: ConfigObject) => {
    prevConfig[newConfig.key] = newConfig.value;
    setConfigs(prevConfig);
  };

  return (
    <ConfigContext.Provider value={{ configs, addConfig }}>
      {props.children}
    </ConfigContext.Provider>
  );
}
