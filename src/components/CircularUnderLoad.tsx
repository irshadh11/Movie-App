import CircularProgress from "@mui/material/CircularProgress";

const CircularUnderLoad = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <CircularProgress disableShrink
      color="warning"
      size={60} />
    </div>
  );
}
export default CircularUnderLoad;