import { RxCross2 } from "react-icons/rx";
import { FaBed } from "react-icons/fa6";
import { FaBath } from "react-icons/fa";
import { TbLineHeight } from "react-icons/tb";
import { TiTick } from "react-icons/ti";
import PropertyImages from "./PropertyImages";

const PropertyDetails = ({ property }) => {
  return (
    <div className="details">
      <div className="Pro_detail">
        <div className="headP">
          <h3>{property.type}</h3>
          <h2>{property.name}</h2>
        </div>
        <div className="addr">
          <h4>
            {property.location.street},{property.location.city},
            {property.location.state}
          </h4>
        </div>
        <h2 className="rates">Rates & Options</h2>
        <div className="pricing">
          <div className="price">
            <h2>Nightly</h2>
            {property.rates.nightly ? (
              <h4>₹{property.rates.nightly.toLocaleString()}</h4>
            ) : (
              <RxCross2 />
            )}
          </div>
          <div className="price">
            <h2>Weekly</h2>
            {property.rates.weekly ? (
              <h4>₹{property.rates.weekly.toLocaleString()}</h4>
            ) : (
              <RxCross2 />
            )}
          </div>
          <div className="price">
            <h2>Monthly</h2>
            {property.rates.monthly ? (
              <h4>₹{property.rates.monthly.toLocaleString()}</h4>
            ) : (
              <RxCross2 />
            )}
          </div>
        </div>
      </div>
      <div className="desc-p">
        <h1>Description&Details</h1>
        <div className="se">
          <span>
            {" "}
            <FaBed className="hh" /> {property.beds} Beds
          </span>
          <span>
            {" "}
            <FaBath className="hh" />
            {property.baths} Baths
          </span>
          <span>
            <TbLineHeight className="hh" />
            {property.square_feet}sqt
          </span>
        </div>

        <p>{property.description}</p>
      </div>
      <div className="amenities">
        <h2>Amenities</h2>
        <ul className="am-list">
          {property.amenities.map((amenity, i) => {
            return (
              <li key={i}>
                {" "}
                <TiTick className="ww" /> {amenity}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
      <PropertyImages images={property.images} />
      </div>
    </div>
  );
};

export default PropertyDetails;
