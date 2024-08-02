// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import { fetchdataId } from "@/src/utils/Propertyrequest";
// import PropertyHeadreImg from "@/src/components/PropertyHeadreImg";
// import Link from "next/link";
// import PropertyDetails from "@/src/components/PropertyDetails";
// import Bookmark from "@/src/components/Bookmark";
// import { FaLongArrowAltLeft } from "react-icons/fa";
// import Loading from "../../loading";

// const PropertyPage = () => {
//   const { id } = useParams();
//   const [property, setproperty] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchdata = async () => {
//       if (!id) return;
//       try {
//         const property = await fetchdataId(id);
//         setproperty(property);
//       } catch (error) {
//         console.error("its error", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     if (property === null) {
//       fetchdata();
//     }
//   }, [id, property]);

//   if (!property && !loading) {
//     return <h1>Property Not Found</h1>;
//   }

//   return (
//     <>
//       {property && (
//         <>
//           <section className="property-d">
//             <PropertyHeadreImg image={property.images[0]} />

//             <div className="bc-lnk">
//               <FaLongArrowAltLeft className="arr-bc" />
//               <Link href={"/properties"}>back to properties</Link>
//             </div>
//             <div className="section-property">
//               <div className="gid-sec">
//                 <PropertyDetails property={property} />
//                 <Bookmark property={property} />
//               </div>
//             </div>
//           </section>
//         </>
//       )}
//     </>
//   );
// };

// export default PropertyPage;

"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchdataId } from "@/src/utils/Propertyrequest";
import PropertyHeadreImg from "@/src/components/PropertyHeadreImg";
import Link from "next/link";
import PropertyDetails from "@/src/components/PropertyDetails";
import Bookmark from "@/src/components/Bookmark";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Loading from '@/src/app/loading' // Ensure correct path

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setproperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      if (!id) return;
      try {
        const property = await fetchdataId(id);
        setproperty(property);
      } catch (error) {
        console.error("Error fetching property data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchdata();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!property) {
    return <h1>Property Not Found</h1>;
  }

  return (
    <section className="property-d">
      <PropertyHeadreImg image={property?.images[0]} />

      <div className="bc-lnk">
        <FaLongArrowAltLeft className="arr-bc" />
        <Link href="/properties">Back to Properties</Link>
      </div>
      <div className="section-property">
        <div className="gid-sec">
          <PropertyDetails property={property} />
          <Bookmark property={property} />
        </div>
      </div>
    </section>
  );
};

export default PropertyPage;
