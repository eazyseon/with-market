import React from "react";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <Image src="/loading.gif" alt="로딩중" width={70} height={70} />
    </div>
  );
};

export default Loading;
