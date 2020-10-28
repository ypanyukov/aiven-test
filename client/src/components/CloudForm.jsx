import { useState } from 'react';

import RegionSelector from "./RegionSelector";
import CloudProviderSelector from "./CloudProviderSelector";

import './CloudForm.css';

function CloudForm() {
  const [provider, setProvider] = useState('');
  const [providerDataCenter, setProviderDataCenter] = useState('');

  const onRunButtonClick = () => {
    alert(`You have selected ${providerDataCenter} by ${provider}`);
  };

  return (
    <div className="CloudForm">
      <CloudProviderSelector setProvider={setProvider} />
      {provider && <RegionSelector provider={provider} setProviderDataCenter={setProviderDataCenter}/>}
      {providerDataCenter && <button onClick={onRunButtonClick}>Run</button>}
    </div>
  );
}

export default CloudForm;
