import {useState, useEffect} from 'react';
import axios from 'axios-on-rails';

function useFetch(url, shouldUpdate) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchUrl() {
    const response = await axios.get(url);
    setData(response.data);
    setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, [shouldUpdate]);
  return [data, loading];
}
export {useFetch};
