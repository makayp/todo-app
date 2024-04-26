import { Outlet } from "react-router-dom";
import SubHeader from "./SubHeader";

function AppContainer() {
  return (
    <div className='box'>
      <SubHeader />
      <Outlet />
    </div>
  );
}

export default AppContainer;
