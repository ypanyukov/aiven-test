import {useEffect, useState, useCallback} from 'react';

import { get } from '../helpers/fetch'

import './RegionSelector.css';

import closestDataCenterSorting from '../helpers/closestDataCenterSorting';

function RegionSelector({setProviderDataCenter, provider}) {
  const [dataCenterList, setDataCenterList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(() => {
    setLoading(true);

    return get('/api/clouds').then((response) => {
      if (response.success) return response.data;

      console.info(response.error);
      return [];
    });
  }, []);

  useEffect(() => {
    fetchData()
      .then((data) => (
        data.filter(cloud => cloud.cloud_name.includes(provider))
      ))
      .then(closestDataCenterSorting)
      .then((data) => {
        setDataCenterList(data);
        setProviderDataCenter(data[0] && data[0].cloud_name);
        setLoading(false);
      });
  }, [provider]);

  const onRegionSelect = (ev) => {
    setProviderDataCenter(ev.target.value);
  };

  return (
    <div className="RegionSelector">
      <label htmlFor="regionSelect" className='RegionSelector__label'>Closest datacenters:</label>
      {loading && 'Loading...'}
      {!loading && (
        <select id='regionSelect' onChange={onRegionSelect}>
          {dataCenterList.map(datacenter => (
            <option value={datacenter.cloud_name} key={datacenter.cloud_name}>{datacenter.cloud_description}</option>
          ))}
        </select>
      )}
    </div>
  );
}

export default RegionSelector;
