async function getData() {
  const url = "/data.json";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Error fetching datas... " + res.status);
    }
    const result = await res.json();
    return result;
  } catch (err) {
    console.error(err.message);
    return null;
  }
}

export default getData;