import { useCallback,useState } from "react";
import { useNavigate } from "react-router-dom";
import {  signInWithEmailAndPassword   } from 'firebase/auth';
import { auth } from '../firebaseconfig';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLoginHereClick = useCallback(() => {
    navigate("/signup");
  }, [navigate]);

  const onSubmit = async (e) => {
    e.preventDefault()
   
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
          navigate('/quiz', { state: { userEmail: user.email } });
          // ...
      })
      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage);
          // ..
      });

 
  }

  return (
    <div className="relative bg-zinc-900  w-full h-[1041px] overflow-hidden flex flex-row py-20 px-[140px] box-border items-center justify-center text-center text-17xl text-darkorange-100 font-roboto">
      <div className="rounded-md  border-zinc-50 border-dashed  border-2 flex flex-row items-start justify-start">
        <div className="rounded-3xs bg-text-white shadow-[0px_4px_12px_rgba(0,_0,_0,_0.05)] w-[536px] h-[677px] flex flex-col py-[55px] px-[29px] box-border items-center justify-start">
          <div className="self-stretch flex-1 flex flex-col items-center justify-start gap-[69px]">
            <b className="relative text-black">Login</b>
            <div className="self-stretch flex flex-col items-start justify-start gap-[24px]">
              <div className="self-stretch rounded-3xs bg-ghostwhite shadow-[0px_0px_22px_rgba(0,_0,_0,_0.02)] flex flex-row py-[17px] px-5 items-start justify-start">
                <div className="bg-zinc-50 rounded-md w-auto h-16 flex-1 flex flex-row items-center justify-start gap-[22px]">
                  <img
                    className="relative w-6 h-6 overflow-hidden shrink-0"
                    alt=""
                    src="/frame.svg"
                  />
                  <input
                    className="font-medium font-roboto text-sm bg-[transparent] flex-1 relative text-gray-800 text-left inline-block h-[13px]"
                    type="email"
                    placeholder="Enter email"
                    onChange={(e)=>setEmail(e.target.value)}
                    value={email}
                    required
                    style={{ outline: 'none', border: 'none' }}
                  />
                </div>
              </div>
              <div className="self-stretch rounded-3xs bg-ghostwhite shadow-[0px_0px_22px_rgba(0,_0,_0,_0.02)] flex flex-col py-[19px] px-5 items-start justify-start">
                <div className="bg-zinc-50 rounded-md w-[440px] h-16 flex flex-row items-center justify-start gap-[22px]">
                  <img
                    className="relative w-6 h-6 overflow-hidden shrink-0"
                    alt=""
                    src="/frame1.svg"
                  />
                  <input
                    className="[border:none] font-roboto text-sm bg-[transparent] flex-1 relative text-gray-800 text-left inline-block h-[13px]"
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    required
                    style={{outline:'none',border:'none'}}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="self-stretch p flex-1 flex flex-col items-center justify-center gap-[23px] mt-[-113px] text-xs text-black">
            <button
              className="cursor-pointer [border:none] py-[18px]  bg-white text-black rounded-3xs w-[317px] flex flex-row box-border items-end justify-center"
              onClick={onSubmit}          
            >
              <div className="bg-zinc-50 rounded-md w-16 h-auto p-2 relative text-lg font-medium  !text-black text-center">
                Login
              </div>
            </button>
            <div className="flex flex-row items-end justify-center gap-[5px]">
              <div className="relative font-medium text-white">
                <span>Do you have an account?</span>
                <span className="[background:linear-gradient(114.78deg,_#ffa925,_#ff7841)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">{` `}</span>
              </div>
              <button
                className="cursor-pointer [border:none] p-0 bg-[transparent] relative text-xs text-white font-medium font-roboto text-darkorange-100 text-center inline-block"
                onClick={onLoginHereClick}
              >
                Signup here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
);
};

export default Login;
