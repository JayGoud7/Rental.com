import Properties from "@/src/components/Properties";
import PropertySearchForm from "@/src/components/PropertySearchForm";

const PropertySearchPage = async () => {
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>

      <Properties />
    </>
  );
};

export default PropertySearchPage;
