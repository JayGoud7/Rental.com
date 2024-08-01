import Image from "next/image";
import Link from "next/link";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { TbLineHeight } from "react-icons/tb";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { FaLocationDot } from "react-icons/fa6";
const PropertyCard = ({ property }) => {
  return (
    <Link href={`/properties/${property._id}`}>
    <div className="prop-card">
      <div key={property._id} className="prop-img">
        <Image
          src={property.images[0]}
          alt="img"
          width={200}
          height={200}
          priority={true}
        />
      </div>
      <h2 className="rates-hd">
        ₹{property.rates.nightly}
        <span>/nyt</span>
      </h2>
      <h4 className="type-cd">{property.type}</h4>
      <h2 className="name-cd">{property.name}</h2>
      <div className="info-b">
        <span>
          <FaBed className="icon-cd" /> {property.beds} Beds
        </span>
        <span>
          <FaBath className="icon-cd" /> {property.baths} Baths
        </span>
        <span>
          <TbLineHeight className="icon-cd" /> {property.square_feet} Sqft
        </span>
      </div>
      <div className="rates-cd">
        {property.rates.nightly ? (
          <span>
            <RiMoneyRupeeCircleFill className="icon-r" />
            Nightly
          </span>
        ) : null}
        {property.rates.weekly ? (
          <span>
            <RiMoneyRupeeCircleFill className="icon-r" />
            Weekly
          </span>
        ) : null}
        {property.rates.monthly ? (
          <span>
            <RiMoneyRupeeCircleFill className="icon-r" />
            Monthly
          </span>
        ) : null}
      </div>
      <div className="loc-dl">
        <div className="dl-5">
          <span className="cd-c">
            <FaLocationDot className="location" />
            {property.location.city}
          </span>
          <span className="cd-s">{property.location.state}</span>
        </div>
        <div className="cd-btn3">
          <button>
            <Link href={`/properties/${property._id}`}>Details</Link>
          </button>
        </div>
      </div>
    </div>
    </Link>
  );
};

export default PropertyCard;
