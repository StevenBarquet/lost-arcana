// ---Dependencies
import { type ReactElement } from 'react';
// ---Styles
import style from './Greeting.module.scss';

export function Greeting(): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  // -----------------------MAIN METHODS
  // -----------------------HELPERS
  // -----------------------RENDER
  return (
    <div className={style['Greeting']}>
      <p className="label">Good morning, Ana</p>
      <h1>Return to the cards.</h1>
      <p className="subtitle">
        A quiet moment to deepen your relationship with tarot.
      </p>
    </div>
  );
}
