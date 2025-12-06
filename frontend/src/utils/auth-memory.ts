let accessTokenMemory: string | null = null;

export const setAccessTokenMemory = (token: string | null) => {
  accessTokenMemory = token;
};

export const getAccessTokenMemory = () => accessTokenMemory;
