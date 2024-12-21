const _localStorage = {
  set(key: string, data: any) {
    const jsonData = data ? JSON.stringify(data) : "";
    localStorage.setItem(key, jsonData);
    return jsonData;
  },
  get(key: string) {
    const jsonData = localStorage.getItem(key);
    const data = jsonData ? JSON.parse(jsonData) : null;
    return data;
  },
  remove(key: string) {
    localStorage.removeItem(key);
    return true;
  },
};

export default _localStorage;
