const KEY = "user";

export const login = (user) => {
  localStorage.setItem(KEY, user);
};

export const logout = () => {
  localStorage.removeItem(KEY);
};

export const isLogin = () => {
  if (localStorage.getItem(KEY)) {
    return true;
  }

  return false;
};
