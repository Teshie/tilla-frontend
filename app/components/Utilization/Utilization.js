import React from 'react'
import WindowCard from '../shared/WindowCard';
import { faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { MINIMUM_CARD_HEIGHT } from '@/app/data/data';

const Utilization = () => {
  return (
    <div>
      <WindowCard
        cardLabel={"Utilization"}
        icon={faClipboardList}
        listItems={[]}
        size={MINIMUM_CARD_HEIGHT}
      />
    </div>
  );
}

export default Utilization
