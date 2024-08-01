"use client";

import { useState } from "react";
import { IoIosSend } from "react-icons/io";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const PropertyContact = ({ property }) => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [phone, setphone] = useState("");
  const [submit, setsubmit] = useState(false);

  const { data: session } = useSession();

  const handlesubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      message,
      phone,
      recipient: property.owner,
      property: property._id,
    };

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (res.status === 200) {
        toast.success("Message sent successfully");
        setsubmit(true);
      } else if (res.status === 400 || res.status === 401) {
        const obj = await res.json();
        toast.error(obj.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error sending form");
    } finally {
      setname("");
      setphone("");
      setmessage("");
      setemail("");
    }
  };

  return (
    <div className="contact-info">
      <h2>Contact Property Manager</h2>
      {!session ? (
        <p className="text-black-500 ml-10 font-bold ">You Must Login First</p>
      ) : submit ? (
        <p className="text-black-500 mb-4">Your message was sent!</p>
      ) : (
        <form onSubmit={handlesubmit} className="form">
          <div className="name">
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </div>
          <div className="email">
            <label htmlFor="Email">Email : </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
          <div className="phone">
            <label htmlFor="name">Phone : </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setphone(e.target.value)}
            />
          </div>
          <div className="message">
            <label htmlFor="Message">Message : </label>
            <textarea
              name="Message"
              id=""
              cols="30"
              rows="6"
              value={message}
              onChange={(e) => setmessage(e.target.value)}
            ></textarea>
          </div>

          <button type="submit">
            {" "}
            <IoIosSend /> send message
          </button>
        </form>
      )}
    </div>
  );
};

export default PropertyContact;
