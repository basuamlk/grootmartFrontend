import React, { useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';

const Alerts = () => {
  const alertContext = useContext(AlertContext);

  return (
    alertContext.alerts.length > 0 &&
    alertContext.alerts.map((alert) => (
      <div key={alert.id} className={'red'}>
        <strong>{alert.msg}</strong>
        <i className='material-icons left'>info</i>
      </div>
    ))
  );
};

export default Alerts;
