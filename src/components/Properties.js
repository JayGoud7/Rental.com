"use client";

import PropertyCard from "@/src/components/PropertyCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import Pagination from "./Pagination";

const Properties = () => {
  const [properties, setproperties] = useState([]);
  const [page, setpage] = useState(1);
  const [pagesize, setpagesize] = useState(3);
  const [totalitems, settotalitems] = useState(0);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch(
          `/api/properties?page=${page}&pageSize=${pagesize}`
        );
        if (!res.ok) {
          throw Error("Failed to fetch data");
        }

        const data = await res.json();
        setproperties(data.properties);
        settotalitems(data.total);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProperties();
  }, [page, pagesize]);
  const handlePageChange = (newPage) => {
    setpage(newPage);
  };

  return (
    <section className="px-4 py-4">
      <div className="container-xl lg:container m-auto px-4 ">
        <Link
          href={"/"}
          className="flex items-center text-blue-500 hover:underline mb-7"
        >
          <FaArrowAltCircleLeft className="mr-2 mb-0" /> Back to Home
        </Link>

        {properties.length === 0 ? (
          <p>No search Results found</p>
        ) : (
          <div className="properties-sec">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        <Pagination
          page={page}
          pageSize={pagesize}
          totalitems={totalitems}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
};

export default Properties;
