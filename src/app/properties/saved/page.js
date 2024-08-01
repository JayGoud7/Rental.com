"use client";
import PropertyCard from "@/src/components/PropertyCard";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SavedPropertypage = () => {
  const [properties, setProperties] = useState([]);


  useEffect(() => {
    const fetchSavedProperties = async () => {
      try {
        const res = await fetch("/api/bookmarks");
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          console.log(res.statusText);
          toast.error("Failed to fetch saved properties");
        }
      } catch (error) {
        console.log(error);
        toast.error("failed to fetch saved properties");
      } 
    };
    fetchSavedProperties();
  }, []);
  
  return (
    <>
      <section className="section9">
        <h1 className="text-2xl mb-4">Saved Properties</h1>
        <div className="cards_saved">
          {properties.length === 0
            ? "no saved property"
            : properties.map((property) => {
                return <PropertyCard key={property._id} property={property} />;
              })}
        </div>
      </section>
    </>
  );
};

export default SavedPropertypage;
