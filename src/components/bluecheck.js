import * as React from 'react';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { useLocation } from "@reach/router"

const BlueCheck = () => {
  const location = useLocation();
  // console.log(location);
  const isNetlifyApp = location && location.hostname && location.hostname.endsWith('netlify.app');
  // console.log(isNetlifyApp);

  return (
    <span title="This site is verified">
      {!isNetlifyApp && <BsFillCheckCircleFill style={{ color: 'var(--theme-ui-colors-siteColor)' }} />}
    </span>
  );
};

export default BlueCheck;
