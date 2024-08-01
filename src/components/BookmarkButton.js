"use client";

import Link from "next/link";
import { FaBookmark } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const BookmarkButton = ({ property }) => {
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [isBookmarked, setisBookmarked] = useState(false);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setloading(false);
      return;
    }
    const checkBookmarkStatus = async () => {
      try {
        const res = await fetch(`/api/bookmarks/check`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            propertyId: property._id,
          }),
        });

        if (res.status === 200) {
          const data = await res.json();
          setisBookmarked(data.isBookmarked);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setloading(false);
      }
    };
    checkBookmarkStatus();
  }, [property._id, userId]);

  const handleclick = async () => {
    if (!userId) {
      toast.error("you need to sign in to bookmark a property");
      return;
    }

    try {
      const res = await fetch(`/api/bookmarks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          propertyId: property._id,
        }),
      });

      if (res.status === 200) {
        const data = await res.json();
        toast.success(data.message);
        setisBookmarked(data.isBookmarked);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  if (loading) return <p>loading...</p>;

  return isBookmarked ? (
    <span onClick={handleclick} style={{ backgroundColor: "red" }}>
      <FaBookmark />
      <Link href={""}>Remove property</Link>
    </span>
  ) : (
    <span onClick={handleclick}>
      <FaBookmark />
      <Link href={""}>Book property</Link>
    </span>
  );
};

export default BookmarkButton;
