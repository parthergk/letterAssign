
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className=" text-white flex-1 flex flex-col gap-5 items-center justify-center  p-4 bg-neutral-950 h-screen w-full">
      <Outlet/>
    </div>
  );
}

export default App;
