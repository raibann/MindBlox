import SwirlingEffectSpinner from "../customized/spinner/spinner-06";

const Loading = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center bg-background z-50">
      <SwirlingEffectSpinner />
    </div>
  );
};

export default Loading;
