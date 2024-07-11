import { useState } from "react";

export const Switch = ({ data, onActiveChange }) => {
  const [active, setActive] = useState(0);

  const handleActiveSwitch = (item, index) => {
    setActive(index);
    onActiveChange(item, index);
  };
  return (
    <div className="flex">
      {data.map((item, index) => {
        return (
          <span
            key={index}
            className={`py-2 px-8 text-xl font-bold text-nowrap flex-grow-1 ${
              active === index
                ? "border-b-2 border-orange-400 "
                : "text-gray-400"
            }  `}
            onClick={() => handleActiveSwitch(item, index)}
          >
            {item}
          </span>
        );
      })}
    </div>
  );
};
