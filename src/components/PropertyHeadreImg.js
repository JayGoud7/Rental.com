import Image from "next/image";

const PropertyHeadreImg = ({ image }) => {
  return (
    <div className="imgH">
      <Image src={image} width={900} height={300} alt="img5" priority={true} />
    </div>
  );
};

export default PropertyHeadreImg;
