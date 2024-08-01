"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useGlobalContetx } from "../context/GlobalContext";
import { FaBell } from "react-icons/fa6";

const UnreadMessageCount = ({ session }) => {
  const { unread, setunread } = useGlobalContetx(0);

  useEffect(() => {
    if (!session) return;

    const fetchunreadmessages = async () => {
      try {
        const res = await fetch(`/api/messages/unread-count`);
        if (res.status === 200) {
          const data = await res.json();
          setunread(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchunreadmessages();
  }, [session]);

  return (
    <>
      
      <div className="msg-icon">
      {unread > 0 && <span className="notif">{unread}</span>}
        <Link href={"/messages"}>
          <FaBell />
        </Link>
      </div>
    </>
  );
};

export default UnreadMessageCount;
