"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchdataId } from "@/src/utils/Propertyrequest";
import PropertyHeadreImg from "@/src/components/PropertyHeadreImg";
import Link from "next/link";
import PropertyDetails from "@/src/components/PropertyDetails";
import Bookmark from "@/src/components/Bookmark";
import { FaLongArrowAltLeft } from "react-icons/fa";


const page = () => {
  const [property, setproperty] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const property = await fetchdataId(id);
        setproperty(property);
      } catch (error) {
        console.error("its error", error);
      }
    };
    if (property === null) {
      fetchdata();
    }
  }, [id, property]);

  if (!property) {
    return <h1>Property not found</h1>;
  }

  return (
    <>
      { property && (
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
      )}
    </>
  );
};

export default page;
