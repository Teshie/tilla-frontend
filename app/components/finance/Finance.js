import React from 'react'
import WindowCard from '../shared/WindowCard';
import { finances, funding, MINIMUM_CARD_HEIGHT } from '@/app/data/data';
import { faDollar } from '@fortawesome/free-solid-svg-icons';

const Finance = () => {
  return (
    <div className="">
      <WindowCard
        cardLabel={"Finances"}
        icon={faDollar}
        listItems={finances}
        size={MINIMUM_CARD_HEIGHT}
      />
    </div>
  );
}

export default Finance
