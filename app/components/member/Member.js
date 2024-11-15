import { members, MINIMUM_CARD_HEIGHT } from '@/app/data/data';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import WindowCard from '../shared/WindowCard';

const Member = () => {
  return (
    <div>
      <WindowCard
        cardLabel={"Members"}
        icon={faUser}
        listItems={members}
        // size={"h-48"}
      />
    </div>
  );
}

export default Member;
