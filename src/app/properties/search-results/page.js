"use client";

import PropertyCard from "@/src/components/PropertyCard";
import PropertySearchForm from "@/src/components/PropertySearchForm";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const Searchpage = () => {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState([]);

  const location = searchParams.get("location");
  const propertyType = searchParams.get("propertyType");

  useEffect(() => {
    const fetchsearchresults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );

        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.error("error fetching search", error);
      }
    };
    fetchsearchresults();
  }, [location, propertyType]);

  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto px-4 py-6">
          <Link
            href={"/properties"}
            className="flex items-center text-blue-500 hover:underline mb-3"
          >
            <FaArrowAltCircleLeft className="mr-2 mb-0" /> Back to properties
          </Link>
          <h1 className="tetx-2xl mb-4">Search Results</h1>
          {properties.length === 0 ? (
            <p>No search Results found</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
              {properties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Searchpage;
