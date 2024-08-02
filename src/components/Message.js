"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContetx } from "../context/GlobalContext";
import Link from "next/link";

const MessageBox = ({ message }) => {
  const [isread, setisread] = useState(message.read);
  const [isdlt, setdlt] = useState(false);

  const { setunread } = useGlobalContetx();

  const handlereadclick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        const { read } = await res.json();
        setisread(read);
        setunread((prevCount) => (read ? prevCount - 1 : prevCount + 1));
        if (read) {
          toast.success("Marked as read");
        } else {
          toast.success("mark as new");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("error at message");
    }
  };

  const handledeleteclick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: "DELETE",
      });

      if (res.status === 200) {
        setdlt(true);
        setunread((prevCount) => prevCount - 1);
        toast.success("Message Deleted");
      }
    } catch (error) {
      toast.error("message was not deleted");
    }
  };

  if (isdlt) {
    return null;
  }

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isread && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-md">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.sender.username}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <Link href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </Link>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <Link href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </Link>
        </li>
        <li>
          <strong>Received:</strong> {""}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handlereadclick}
        className={`mt-4 mr-3 ${
          isread ? "bg-gray-300" : "bg-blue-500 text-white"
        } py-1 px-3 rounded-md`}
      >
        {isread ? " Mark As New" : " Mark As Read"}
      </button>
      <button
        onClick={handledeleteclick}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageBox;
