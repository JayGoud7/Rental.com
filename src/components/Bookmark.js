import BookmarkButton from "./BookmarkButton";
import ShareButton from "./ShareButton";
import PropertyContact from "./PropertyContact";

const Bookmark = ({ property }) => {
  return (
    <aside className="side">
      <div className="links-bs">
        <BookmarkButton property={property} />

        <ShareButton property={property} />
      </div>

      <PropertyContact property={property} />
    </aside>
  );
};

export default Bookmark;
