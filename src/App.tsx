import { useEffect, useState } from "react";
import OfflineStatus from "./components/OffilineStatus";
import OnlineStatus from "./components/OnlineStatus";
import useNetworkStatus from "./hooks/NetWorkStatus.hook";
import "./App.css";

type NetWorkStatus = "online" | "offline";

const FirstTimeComponent = (props: { status: NetWorkStatus }) => {
  const statusId = props.status === "online" ? "online" : "offline";
  return (
    <div id={statusId}>
      <h3>First time rendered : {props.status}</h3>
    </div>
  );
};

function App() {
  const { isOnline } = useNetworkStatus();
  const [firstTime, setFirstTime] = useState(true);
  const getReconnectionStatus = () => {
    return isOnline ? <OnlineStatus /> : <OfflineStatus />;
  };
  useEffect(() => {
    if (!isOnline) setFirstTime(false);
  }, [isOnline]);
  return firstTime && (isOnline ?? isOnline) ? (
    <FirstTimeComponent status={isOnline ? "online" : "offline"} />
  ) : (
    getReconnectionStatus()
  );
}

export default App;
