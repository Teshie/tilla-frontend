import React from 'react'
import WindowCard from '../shared/WindowCard';
import { faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { MINIMUM_CARD_HEIGHT, provider } from '@/app/data/data';

const Provider = () => {
  return (
    <div>
      <WindowCard
        cardLabel={"Providers"}
        icon={faStethoscope}
        listItems={provider}
        // size={MINIMUM_CARD_HEIGHT}
      />
    </div>
  );
}

export default Provider
