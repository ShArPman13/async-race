const baseURL = 'http://127.0.0.1:3000';

export const getCars = async () => {
  const response = fetch(`${baseURL}/garage`);

  return (await response).json();
};
