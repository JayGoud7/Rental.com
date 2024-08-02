// const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// const fetchdata = async () => {
//   try {
//     if (!apiDomain) {
//       return [];
//     }
//     const res = await fetch(`${apiDomain}/properties`, {
//       cache: "no-cache",
//     });
//     if (!res.ok) {
//       throw new error("fetching data error...");
//     }
//     return res.json();
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

// // byid

// const fetchdataId = async (id) => {
//   try {
//     if (!apiDomain) {
//       return null;
//     }
//     const res = await fetch(`${apiDomain}/properties/${id}`);

//     if (!res.ok) {
//       throw new error("fetching data error...");
//     }

//     return res.json();
//   } catch (error) {
//     console.log(error);

//     return null;
//   }
// };

// export { fetchdata, fetchdataId };


const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || 'https://default-api-domain.com'; // Ensure apiDomain is set

const fetchdata = async () => {
  try {
    if (!apiDomain) {
      console.error('API domain is not set.');
      return [];
    }
    const res = await fetch(`${apiDomain}/properties`, {
      cache: "no-cache",
    });

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error in fetchdata:', error.message);
    return [];
  }
};

// Fetch data by ID
const fetchdataId = async (id) => {
  try {
    if (!apiDomain) {
      console.error('API domain is not set.');
      return null;
    }
    const res = await fetch(`${apiDomain}/properties/${id}`);

    if (!res.ok) {
      throw new Error(`Error fetching data: ${res.status} ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error('Error in fetchdataId:', error.message);
    return null;
  }
};

export { fetchdata, fetchdataId };
