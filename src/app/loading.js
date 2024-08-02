"use client";

import Image from "next/image";
import loader from "@/public/images/loader3.svg";

const Loading = () => {
  return (
    <div className="load">
      <Image
        src={loader}
        width={90}
        height={90}
        alt="i"
        loading='lazy'
        
      />
    </div>
  );
};

export default Loading;
