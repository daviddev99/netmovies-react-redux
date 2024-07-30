import { useState } from "react";

export const Switch = ({ data, onActiveChange }) => {
  const [active, setActive] = useState(0);

  const handleActiveSwitch = (item, index) => {
    setActive(index);
    onActiveChange(item, index);
  };
  return (
    <div className="flex  md:justify-normal w-full">
      {data?.map((item, index) => {
        return (
          <span
            key={index}
            className={`md:py-1 lg:py-2 md:px-4 lg:px-8 flex-1 text-center text-sm md:text-xl font-bold text-nowrap  ${
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
