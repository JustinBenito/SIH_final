import { useState,useEffect } from 'react';
import {
  collection,
  onSnapshot
} from "firebase/firestore";
import { db } from '../firebaseconfig';
const LeaderBoard = () => {
  const [leaderboardData, setLeaderboardData] = useState([{email:"jb@gmail.com",score:"10"}]);

  
  useEffect(() => {
    const storesCollection = collection(db, 'scores');
    const unsubscribe = onSnapshot(storesCollection, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setLeaderboardData(data);
    });

    return () => unsubscribe();
  }, []); 

  return (
    <div className="relative   bg-blue-800 w-full h-[885px] overflow-hidden flex flex-col py-[90px] px-[140px] box-border items-start justify-start text-left text-[76px] text-black font-roboto-flex">
      <div className="self-stretch flex-1 flex flex-col items-start justify-start gap-[32px]">
        <div className="self-stretch flex flex-row items-start justify-start">
          <h4 className="m-0 flex-1 text-white relative text-[inherit] leading-[16px] font-semibold font-inherit flex items-center h-[69px]">
            Leader Board - Python
          </h4>
        </div>
        {leaderboardData.map((item, index) => (
          <button
            key={index}
            className="cursor-pointer  px-9 bg-[transparent] self-stretch  text-white flex flex-row items-center justify-between border-2 border-solid rounded-full "
          >
            <b className="relative text-3xl py-6 inline-block font-roboto-flex  text-center w-[115px] shrink-0">
            {item.email ? item.email.split('@')[0] : "Justin"}
            </b>
            <b className="relative text-3xl py-6 inline-block font-roboto-flex  text-center w-[115px] shrink-0">
              {item.score || 10}
            </b>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
