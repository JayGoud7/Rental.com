"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

const Page = () => {
  const { data: session } = useSession();
  const [properties, setproperties] = useState([]);
  const [loading, setloading] = useState(false);

  const profileImg = session?.user?.image;
  const profileEmail = session?.user?.email;
  const profileName = session?.user?.name;

  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      if (!userId) {
        return;
      }
      try {
        const res = await fetch(`/api/properties/user/${userId}`);

        if (res.status === 200) {
          const data = await res.json();
          setproperties(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };

    //fetch session of user
    if (session?.user?.id) {
      fetchUserProperties(session.user.id);
    }
  }, [session]);

  const handleDeleteProperty = async (propertyId) => {
    const confirmed = window.confirm("Are you sure to delete this Property?");
    if (!confirmed) return;
    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        );

        setproperties(updatedProperties);
        toast.success("Property deleted");
      } else {
        toast.error("failed to delete");
      }
    } catch (error) {
      toast.error("failed property to delete");
    }
  };
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-2xl font-bold mb-2">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-5 mt-5 profile-lx">
              <div className="mb-4">
                <Image
                  className="h-26 w-26 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  src={profileImg}
                  alt="User"
                  width={100}
                  height={100}
                />
              </div>
              <div>
                <h2 className="text-xl mb-4 text-center">
                  <span className="block">Name: </span> {profileName}
                </h2>
                <h2 className="text-xl text-center">
                  <span className="block ">Email: </span> {profileEmail}
                </h2>
              </div>
            </div>

            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>

              {!loading && properties.length === 0 && (
                <h2>No property is listed here...</h2>
              )}

              {properties.map((property) => {
                return (
                  <div key={property._id} className="mb-10">
                    <Link href={`/properties/${property._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        src={property.images[0]}
                        alt="Property 2"
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-xm font-semibold">{property.name}</p>
                      <p className="text-gray-600 text-xm profile-p">
                        {" "}
                        Address:
                        {property.location.street}
                        {property.location.city}
                        {property.location.state}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                        onClick={() => handleDeleteProperty(property._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
