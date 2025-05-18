import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import { FiLogOut } from "react-icons/fi";
import { MdClose } from "react-icons/md";

/**
 * <LogoutModal />
 * 
 * Widget/Component for confirming user logout.
 * 
 * Usage:
 * <LogoutModal handleClose={closeModalFunction} />
 * 
 * This component will show a modal with a confirmation prompt.
 * It handles user logout via localStorage and navigation.
 */
const LogoutModal = ({ handleClose }) => {
  const navigate = useNavigate();
  const { setData: setCurrentUser } = useLocalStorage(
    { username: null, email: null },
    "dot_quizz_current_user"
  );

  function logout() {
    setCurrentUser({ username: null, email: null });
    setTimeout(() => navigate("/login"), 500);
  }

  return (
    <section
      aria-modal="true"
      role="dialog"
      className="w-full max-w-md mx-auto p-8 rounded-2xl shadow-2xl bg-white/95 flex flex-col gap-8 items-center relative border border-[#e7f5ff]"
    >
      {/* Close button (top-right) */}
      <button
        onClick={handleClose}
        className="absolute top-4 right-4 text-[#1864ab] hover:bg-[#e7f5ff] rounded-full p-2 text-2xl transition"
        aria-label="Close"
        type="button"
      >
        <MdClose />
      </button>

      {/* Icon and Title */}
      <div className="flex flex-col items-center gap-2">
        <FiLogOut className="text-5xl text-[#fa5252] mb-2 drop-shadow" />
        <h2 className="text-2xl md:text-3xl font-bold text-[#1e266e] text-center">
          Log out from <span className="text-[#2460f4]">DOT Quizz App</span>?
        </h2>
      </div>

      {/* Buttons */}
      <div className="flex gap-6 w-full justify-center mt-2">
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-gradient-to-r from-[#fa5252] to-[#fa896b] hover:from-[#e03131] hover:to-[#fa5252] text-white text-xl md:text-2xl font-semibold px-8 py-3 rounded-xl shadow-md transition-all duration-150"
          type="button"
        >
          <FiLogOut className="text-2xl" />
          Yes, Logout
        </button>
        <button
          onClick={handleClose}
          className="flex items-center gap-2 bg-[#f4f6fb] hover:bg-[#e7f5ff] text-[#1e266e] border border-[#b6c3e6] text-xl md:text-2xl font-semibold px-8 py-3 rounded-xl transition-all duration-150"
          type="button"
        >
          <MdClose className="text-2xl" />
          Cancel
        </button>
      </div>
    </section>
  );
};

LogoutModal.propTypes = {
  /** Function to close the modal */
  handleClose: PropTypes.func,
};

export default LogoutModal;