"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchdataId } from "@/src/utils/Propertyrequest";
import PropertyHeadreImg from "@/src/components/PropertyHeadreImg";
import Link from "next/link";
import PropertyDetails from "@/src/components/PropertyDetails";
import Bookmark from "@/src/components/Bookmark";
import { FaLongArrowAltLeft } from "react-icons/fa";

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setproperty] = useState(null);

  useEffect(() => {
    const fetchPropertydata = async () => {
      if (!id) return;
      try {
        const property = await fetchdataId(id);
        setproperty(property);
      } catch (error) {
        console.error("its error", error);
      }
    };
    if (property === null) {
      fetchPropertydata();
    }
  }, [id, property]);

  if (!property) {
    return <h1>Property Not Found</h1>;
  }

  return (
    <>
      {property && (
        <>
          <section className="property-d">
            <PropertyHeadreImg image={property.images[0]} />

            <div className="bc-lnk">
              <FaLongArrowAltLeft className="arr-bc" />
              <Link href={"/properties"}>back to properties</Link>
            </div>
            <div className="section-property">
              <div className="gid-sec">
                <PropertyDetails property={property} />
                <Bookmark property={property} />
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default PropertyPage;
