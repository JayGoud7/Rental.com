import Image from "next/image";
import loader from "@/public/images/loader3.svg";

const loading = () => {
  return (
    <div className="load">
      <Image src={loader} width={90} height={90} priority={true} />
    </div>
  );
};

export default loading;
