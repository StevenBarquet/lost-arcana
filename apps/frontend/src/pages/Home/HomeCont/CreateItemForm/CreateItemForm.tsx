// ---Dependencies
import { ReactElement, useState } from 'react';
// ---UI Dependencies
import { Button, Input, Space } from 'antd';

interface Props {
  onCreate: (name: string) => void;
  loading?: boolean;
}

/**
 * CreateItemForm Component: input + botón para crear un item (presentacional).
 * Maneja solo el estado del texto; delega el "crear" al padre vía `onCreate`.
 * Lo reutilizan ambos ejemplos de tRPC (React Query y cliente vanilla).
 * @param {Props} props - onCreate (callback con el nombre) y loading.
 * @returns {ReactElement} ReactElement
 */
export function CreateItemForm({ onCreate, loading }: Props): ReactElement {
  // -----------------------CONSTS, HOOKS, STATES
  const [name, setName] = useState('');

  // -----------------------MAIN METHODS
  function handleCreate() {
    if (!name.trim()) return;
    onCreate(name.trim());
    setName('');
  }

  // -----------------------RENDER
  return (
    <Space.Compact className="CreateItemForm" style={{ width: '100%' }}>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Nombre del nuevo item"
        onPressEnter={handleCreate}
      />
      <Button type="primary" onClick={handleCreate} loading={loading}>
        Crear
      </Button>
    </Space.Compact>
  );
}
