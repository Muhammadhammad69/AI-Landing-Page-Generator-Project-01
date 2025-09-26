import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center border-[#e81111]">
      <ClipLoader
        color="#a5a2a2"
        cssOverride={{
          borderWidth: "6px",
        }}
        loading
        size={55}
        speedMultiplier={1}
      />
    </div>
  );
};
export { Loader };
