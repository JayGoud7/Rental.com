import Link from "next/link";

const Boxesitems = ({ h3, p, btn, btn_color, href }) => {
  return (
    <div className="boxes">
      <h3>{h3}</h3>
      <p>{p}</p>

      <button>
        <Link href={href} className={`btn-${btn_color}`}>
          {btn}
        </Link>
      </button>
    </div>
  );
};

export default Boxesitems;
