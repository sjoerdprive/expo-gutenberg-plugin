import { Button } from '@wordpress/components';

export default function TransformButton({
  amt,
  axis,
  min,
  max,
  transform,
  selectedItem,
}) {
  return (
    <Button
      className="transform-button"
      onClick={(e) => {
        const val = Number(selectedItem[axis]) + Number(amt);


        const pos = { [axis]: Math.max(min, Math.min(val, max || val)) };

        console.log({ pos });

        transform({ [axis]: Math.max(min, Math.min(val, max || val)) });
      }}
    >
      {amt}
    </Button>
  );
}
