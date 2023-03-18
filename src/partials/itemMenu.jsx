import PropControl from '../components/propControl';
import { useCanvas } from './../components/canvasContext';
import { Button } from '@wordpress/components';

export default function ItemMenu() {
  const { transformItem, changeOrder, deleteItem } = useCanvas();
  return (
    <>

      <h3>Formaat</h3>
      <PropControl transformItem={transformItem} prop="w" label="Breedte" />
      <PropControl transformItem={transformItem} prop="h" label="Hoogte" />

      <h3>Positie</h3>
      <PropControl transformItem={transformItem} prop="x" label="X-as" />
      <PropControl transformItem={transformItem} prop="y" label="Y-as" />
      <PropControl transformItem={transformItem} prop="z" label="Z-as" />

      <PropControl transformItem={changeOrder} prop="order" label="Volgorde" />

      <h3>Functies</h3>
      <Button
        className="delete"
        icon={'trash'}
        showTooltip
        label="Verwijder item"
        isDestructive
        onClick={deleteItem}
      />
    </>
  );
}
