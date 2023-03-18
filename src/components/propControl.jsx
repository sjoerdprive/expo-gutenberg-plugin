import { __experimentalInputControl as InputControl } from '@wordpress/components';
import { useCanvas } from './canvasContext';

export default function PropControl({ prop, transformItem, label }) {
  const { getSelectedItem } = useCanvas();
  return (
    <div className="prop-control">
      <InputControl
        label={label}
        value={getSelectedItem()[prop] || 0}
        type="number"
        onChange={(val) => {
          transformItem({ [prop]: val });
        }}
      />
    </div>
  );
}
