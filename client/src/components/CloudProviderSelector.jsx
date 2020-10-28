import './CloudProviderSelector.css';

const AVAILABLE_PROVIDERS = [{
  key: 'aws',
  value: 'AWS'
}, {
  key: 'azure',
  value: 'Azure'
}, {
  key: 'google',
  value: 'Google Cloud'
}];

function CloudProviderSelector({setProvider}) {
  const onProviderSelect = (ev) => {
    setProvider(ev.target.value);
  };

  return (
    <div className="CloudProviderSelector">
      <label htmlFor="providerSelect" className='CloudProviderSelector__label'>Cloud Provider:</label>
      <select id='providerSelect' onChange={onProviderSelect} defaultValue='none'>
        <option disabled={true} value='none'>None</option>
        {AVAILABLE_PROVIDERS.map(provider => (
          <option key={provider.key} value={provider.key}>{provider.value}</option>
        ))}
      </select>
    </div>
  );
}

export default CloudProviderSelector;
