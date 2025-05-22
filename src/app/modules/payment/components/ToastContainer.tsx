import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Toast() {
  return (
    <>
      {/* Your other components */}
      <ToastContainer position="bottom-right" autoClose={5000} />
    </>
  );
}

export default Toast;