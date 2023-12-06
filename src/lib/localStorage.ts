const getLocalStorage = (key: string) => {
  const localStorage = window.localStorage;
  const localStorageValue = localStorage.getItem(key);
  if (localStorageValue) {
    return localStorageValue;
  }
  return "";
};

const setLocalStorage = (key: string, value: string) => {
  const localStorage = window.localStorage;
  localStorage.setItem(key, value);
};

const removeLocalStorage = (key: string) => {
  const localStorage = window.localStorage;
  localStorage.removeItem(key);
};

export { setLocalStorage, getLocalStorage, removeLocalStorage };
