const getToken = async () => {
  const url = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL;

  const response = await fetch(`${url}/api/token`);
  const data = await response.json();

  return data.token;
};

export default getToken;
