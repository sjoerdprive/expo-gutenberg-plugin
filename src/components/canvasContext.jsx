const Context = React.createContext();

export function useCanvas() {
  return React.useContext(Context);
}

export default function CanvasContextProvider({ children, value }) {
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
