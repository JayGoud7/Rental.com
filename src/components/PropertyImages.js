import { Gallery, Item } from "react-photoswipe-gallery";
import Image from "next/image";
const PropertyImages = ({ images }) => {
  return (
    <section>
      <div className="imgdiv_4">
        {images.length === 1 ? (
          <Image
            src={images[0]}
            alt="img"
            width={200}
            height={200}
            priority={true}
          />
        ) : (
          <div className="imgdiv_4">
            {images.map((image, index) => {
              return (
                <div key={index} className="img-div6">
                  <Image
                    src={image}
                    alt="img"
                    width={200}
                    height={200}
                    priority={true}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
export default PropertyImages;
