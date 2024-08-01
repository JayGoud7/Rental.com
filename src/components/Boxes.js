import Boxesitems from "./Boxesitems";

const Boxes = () => {
  return (
    <div className="box_container">
      <Boxesitems
        h3={"For Renters"}
        p={
          "Find your dream rental property. Bookmark properties and contact owners."
        }
        btn={"Browse Properties"}
        btn_color={"black"}
        href = {'/properties'}
      />
      <Boxesitems
        h3={"For Property Owners"}
        p={
          "List your properties and reach potential tenants. Rent as an Airbnb or long term"
        }
        btn={"Add Property"}
        btn_color={"white"}
        href = {'/properties/add'}
      />
    </div>
  );
};

export default Boxes;
