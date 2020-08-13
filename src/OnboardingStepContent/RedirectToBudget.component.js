import React  from 'react';
import { withRouter } from 'react-router-dom';

function RedirectToBudget(props) {

  React.useEffect(() => {
    props.history.push('/budget');
  }, []);

  return (
    <div />
  )
}

export default withRouter(RedirectToBudget);
