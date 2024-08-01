import Link from "next/link";
import PropertyCard from "./PropertyCard";
import { fetchdata } from "@/src/utils/Propertyrequest";

const HomeProperty = async () => {
  const data = await fetchdata();
  const recent = data.properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3);
  return (
    <section className="section2">
      <h1>Recent Properties</h1>
      <div className="cards_recent">
        {recent === 0
          ? "no property"
          : recent.map((property) => {
              return <PropertyCard key={property._id} property={property} />;
            })}
      </div>
      <div className="foote">
      <button><Link href={'/properties'}>View All Properties</Link></button>
      </div>
    </section>
  );
};

export default HomeProperty;
