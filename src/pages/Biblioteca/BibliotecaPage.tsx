// ---Dependencies
import { type ReactElement } from 'react';
import { Helmet } from 'react-helmet';
// ---Components
import { Biblioteca } from './Biblioteca/Biblioteca';

/**
 * Componente BibliotecaPage: este componente es para dar datos al Helmet de
 * la página y concatenarla con el contenedor de la página componente
 * @returns { ReactElement } ReactElement
 */
export default function BibliotecaPage(): ReactElement {
  return (
    <>
      <Helmet>
        <title>Biblioteca | Lost Arcana </title>
        <meta name='description' content='Lost Arcana | El ritual de estudio' />
      </Helmet>
      <Biblioteca />
    </>
  );
}
