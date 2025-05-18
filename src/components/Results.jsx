import { useEffect } from "react";
import { useQuiz } from "../hooks/useQuiz";
import useLocalStorage from "../hooks/useLocalStorage";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import { createPortal } from "react-dom";
import { FaCheckCircle, FaTimesCircle, FaRedoAlt, FaFireAlt } from "react-icons/fa";

export default function Results() {
  const {
    correctAnswer,
    incorrectAnswer,
    questions,
    dispatch,
    QuizState,
    state,
    secondsRemaining,
  } = useQuiz();

  // [Local Storage Essentials]
  const { data: users, setData: setUsers } = useLocalStorage([], "dot_quizz_user");
  const { data: usersHighscore, setData: setUsersHighscore } = useLocalStorage([], "dot_quizz_user_highscore");
  const { data: currentUser } = useLocalStorage([], "dot_quizz_current_user");

  const { width, height } = useWindowSize();

  let score;
  if (secondsRemaining >= 1) {
    score = secondsRemaining * correctAnswer;
  } else {
    score = correctAnswer * (100 / 15);
  }

  const currentUserHighscore = usersHighscore.find(
    (user) => user.username === currentUser.username && user.email === currentUser.email
  )?.highscore ?? 0;

  // Update user and highscore only once, if the new score beats the previous
  useEffect(() => {
    if (score > currentUserHighscore) {
      let updatedUsers = users.map((user) =>
        user.username === currentUser.username && user.email === currentUser.email
          ? { ...user, quiz: { ...state, highscore: score } }
          : user
      );
      const updateHighscore = usersHighscore.map((user) =>
        user.username === currentUser.username && user.email === currentUser.email
          ? { ...user, highscore: score }
          : user
      );
      setUsers(updatedUsers);
      setUsersHighscore(updateHighscore);
    }
    // eslint-disable-next-line
  }, []); // Only run once on mount

  const isNewHighscore = score > currentUserHighscore;

  return (
    <>
      {isNewHighscore && createPortal(<Confetti width={width} height={height} />, document.body)}
      <div className="mx-auto w-full max-w-xl mt-16 mb-8 p-0 flex flex-col items-center">
        <h2 className="text-5xl font-extrabold text-[#192378] mb-6 drop-shadow tracking-tight flex items-center gap-4">
          <FaFireAlt className="text-[#fcb900] text-4xl" />
          Results
        </h2>
        {isNewHighscore && (
          <div className="w-full flex items-center justify-center mb-6">
            <span className="text-2xl md:text-3xl font-bold text-[#2460f4] bg-[#e7f5ff] px-6 py-2 rounded-xl flex items-center gap-3 shadow">
              <FaFireAlt className="text-[#fcb900] animate-bounce" />
              Wow {currentUser.username}, you set a new Highscore!
            </span>
          </div>
        )}
        <ul className="w-full flex flex-col gap-5 text-xl md:text-2xl font-medium text-[#1e266e]">
          <li className="flex items-center justify-between border-b border-[#e9ecef] py-2">
            <span className="flex items-center gap-2">
              <FaCheckCircle className="text-green-500" />
              Correct Answers
            </span>
            <span className="font-bold">{correctAnswer}</span>
          </li>
          <li className="flex items-center justify-between border-b border-[#e9ecef] py-2">
            <span className="flex items-center gap-2">
              <FaTimesCircle className="text-red-400" />
              Incorrect Answers
            </span>
            <span className="font-bold">{incorrectAnswer}</span>
          </li>
          <li className="flex items-center justify-between border-b border-[#e9ecef] py-2">
            <span>Answered Questions</span>
            <span className="font-bold">
              {correctAnswer + incorrectAnswer} of {questions.length}
            </span>
          </li>
          <li className="flex items-center justify-between border-b border-[#e9ecef] py-2">
            <span>Score</span>
            <span className="text-[#2460f4] font-extrabold text-2xl">{score ?? 0}</span>
          </li>
          <li className="flex items-center justify-between py-2">
            <span>Highscore</span>
            <span className="text-[#fcb900] font-extrabold text-2xl">{Math.max(score, currentUserHighscore)}</span>
          </li>
        </ul>
        <button
          onClick={() => dispatch({ type: QuizState.RETAKE })}
          className="mt-12 flex items-center gap-3 text-2xl md:text-3xl bg-gradient-to-r from-[#2460f4] to-[#192378] text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:scale-[1.04] hover:shadow-xl transition-all duration-150"
        >
          <FaRedoAlt className="text-white" />
          Retake Quiz
        </button>
      </div>
    </>
  );
}