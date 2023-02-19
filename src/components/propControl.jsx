import { __experimentalInputControl as InputControl } from '@wordpress/components';

export default function PropControl({
  prop,
  selectedItem,
  transformItem,
  label,
}) {
  return (
    <div className="prop-control">
      <InputControl
        label={label}
        value={selectedItem[prop]}
        type="number"
        onChange={(val) => {
          transformItem({ [prop]: val });
        }}
      />
    </div>
  );
}
