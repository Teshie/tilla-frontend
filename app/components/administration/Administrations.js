import React from 'react'
import WindowCard from '../shared/WindowCard';
import {
  faCog
} from "@fortawesome/free-solid-svg-icons";
import { administration, MINIMUM_CARD_HEIGHT } from '@/app/data/data';

const Administrations = () => {
  return (
    <div>
    <WindowCard cardLabel={"Administrations"} icon={faCog} listItems={administration} size={MINIMUM_CARD_HEIGHT}/>
    </div>
  );
}

export default Administrations
