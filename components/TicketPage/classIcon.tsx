import React from "react";
import {
  ClipboardListIcon,
  ExclamationIcon,
  TruckIcon,
} from "@heroicons/react/outline";

interface ClassIconProps {
  finalclass: string;
  size: number;
  className: string;
}

export const ClassIcon: React.FC<ClassIconProps> = ({
  finalclass,
  size,
  className,
}) => {
  const allClasses = [
    {
      finalclass: "Incident",
      className: `h-${size} w-${size} rounded-full text-yellow-400 p-1 bg-yellow-50 ${className}`,
      icon: ExclamationIcon,
    },
    {
      finalclass: "UserRequest",
      className: `h-${size} w-${size} rounded-full text-blue-500 p-1 bg-blue-50 ${className}`,
      icon: ClipboardListIcon,
    },
    {
      finalclass: "DeliveryRequest",
      className: `h-${size} w-${size} rounded-full text-green-500 p-1 bg-green-50 ${className}`,
      icon: TruckIcon,
    },
  ];

  const search = (key: string, inputArray: any) => {
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].finalclass === key) {
        return inputArray[i];
      }
    }
  };

  const result = search(finalclass, allClasses);

  return <result.icon className={result.className} />;
  // switch (finalclass) {
  //   case "Incident":
  //     return (
  //       <ExclamationIcon
  //         className={`h-${size} w-${size} rounded-full text-yellow-400 p-1 bg-yellow-50 ${className}`}
  //       />
  //     );
  //   case "UserRequest":
  //     return (
  //       <ClipboardListIcon
  //         className={`h-${size} w-${size} rounded-full text-blue-500 p-1 bg-blue-50 ${className}`}
  //       />
  //     );
  //   case "DeliveryRequest":
  //     return (
  //       <TruckIcon
  //         className={`h-${size} w-${size} rounded-full text-green-500 p-1 bg-green-50 ${className}`}
  //       />
  //     );
  // }
};
