const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

const fetchdata = async () => {
  try {
    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`, {
      cache: "no-cache",
    });
    if (!res.ok) {
      throw new error("fetching data error...");
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

// byid

const fetchdataId = async (id) => {
  try {
    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new error("fetching data error...");
    }

    return res.json();
  } catch (error) {
    console.log(error);

    return null;
  }
};

export { fetchdata, fetchdataId };
