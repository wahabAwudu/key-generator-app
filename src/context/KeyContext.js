import React, { createContext, useState } from "react";

export const KeyContext = createContext();

const KeyProvider = props => {
  const [keys, setKeys] = useState([]);

  return (
    <KeyContext.Provider
      value={{
        keys,
        setKeys
      }}
    >
      {props.children}
    </KeyContext.Provider>
  );
};

export default KeyProvider;
