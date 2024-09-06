import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseconfig';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        navigate('/quiz', { state: { userEmail: user.email } });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const onSignupHereClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-zinc-900 to-black px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold text-center text-darkorange-100 mb-6">Login</h2>
        <form onSubmit={onLogin} className="space-y-6">
          <div className="relative">
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkorange-100"
            />
          </div>
          <div className="relative">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-darkorange-100"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 text-black bg-darkorange-100  border-2  bg-white rounded-lg hover:bg-black hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-darkorange-100 transition ease-in-out duration-150"
          >
            Login
          </button>
        </form>
        <div className="mt-6 text-center">
          <span className="text-gray-600">Don &apos; t have an account? </span>
          <button
            onClick={onSignupHereClick}
            className="text-darkorange-100 hover:underline focus:outline-none focus:ring-2 focus:ring-darkorange-100 transition ease-in-out duration-150"
          >
            Signup here
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
