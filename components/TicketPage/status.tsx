import React from "react";

interface StatusBadgeProps {
  status: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const [badge, setBadge] = React.useState({
    title: "",
    className: "bg-pink-50 text-pink-800",
  });
  console.log(status);

  // switch (status) {
  //   case "new":
  //     setBadge({
  //       ...badge,
  //       title: "Новый",
  //       className: "bg-blue-50 text-blue-800",
  //     });
  //     break;
  //   case "assigned":
  //     setBadge({
  //       ...badge,
  //       title: "Назначен",
  //       className: "bg-pink-50 text-pink-800",
  //     });
  //     break;
  //   case "dispatched":
  //     setBadge({
  //       ...badge,
  //       title: "Направлен на команду",
  //       className: "bg-purple-50 text-purple-800",
  //     });
  //     break;
  //   case "resolved":
  //     setBadge({
  //       ...badge,
  //       title: "Решённый",
  //       className: "bg-green-50 text-green-800",
  //     });
  //     break;
  //   case "escalated_tto":
  //     setBadge({
  //       ...badge,
  //       title: "Просрочен по времени назначения",
  //       className: "bg-yellow-50 text-yellow-800",
  //     });
  //     break;
  //   case "escalated_ttr":
  //     setBadge({
  //       ...badge,
  //       title: "Просрочен по времени решения",
  //       className: "bg-yellow-50 text-yellow-800",
  //     });
  //     break;
  //   case "pending":
  //     setBadge({
  //       ...badge,
  //       title: "В ожидании",
  //       className: "bg-orange-50 text-orange-800",
  //     });
  //     break;
  //   case "redispatched":
  //     setBadge({
  //       ...badge,
  //       title: "Перенаправлен",
  //       className: "bg-teal-50 text-teal-800",
  //     });
  //     break;
  //   case "approved":
  //     setBadge({
  //       ...badge,
  //       title: "Утвержден",
  //       className: "bg-cyan-50 text-cyan-800",
  //     });
  //     break;
  //   case "rejected":
  //     setBadge({
  //       ...badge,
  //       title: "Отклонен",
  //       className: "bg-red-50 text-red-800",
  //     });
  //     break;
  //   case "waiting_for_approval":
  //     setBadge({
  //       ...badge,
  //       title: "Ожидание утверждения",
  //       className: "bg-yellow-50 text-yellow-800",
  //     });
  //     break;
  //   case "waiting_for_correction":
  //     setBadge({
  //       ...badge,
  //       title: "Ожидание исправления",
  //       className: "bg-yellow-50 text-yellow-800",
  //     });
  //     break;
  //   case "closed":
  //     setBadge({
  //       ...badge,
  //       title: "Закрыт",
  //       className: "bg-gray-50 text-gray-800",
  //     });
  //     break;
  // }

  const allStatus = [
    {
      status: "new",
      title: "Новый",
      className: "bg-blue-50 text-blue-800",
    },
    {
      status: "assigned",
      title: "Назначен",
      className: "bg-pink-50 text-pink-800",
    },
    {
      status: "dispatched",
      title: "Направлен на команду",
      className: "bg-purple-50 text-purple-800",
    },
    {
      status: "resolved",
      title: "Решённый",
      className: "bg-green-50 text-green-800",
    },
    {
      status: "escalated_tto",
      title: "Просрочен по времени назначения",
      className: "bg-yellow-50 text-yellow-800",
    },
    {
      status: "escalated_ttr",
      title: "Просрочен по времени решения",
      className: "bg-yellow-50 text-yellow-800",
    },
    {
      status: "pending",
      title: "В ожидании",
      className: "bg-orange-50 text-orange-800",
    },
    {
      status: "redispatched",
      title: "Перенаправлен",
      className: "bg-teal-50 text-teal-800",
    },
    {
      status: "approved",
      title: "Утвержден",
      className: "bg-cyan-50 text-cyan-800",
    },
    {
      status: "rejected",
      title: "Отклонен",
      className: "bg-red-50 text-red-800",
    },
    {
      status: "waiting_for_approval",
      title: "Ожидание утверждения",
      className: "bg-yellow-50 text-yellow-800",
    },
    {
      status: "waiting_for_correction",
      title: "Ожидание исправления",
      className: "bg-yellow-50 text-yellow-800",
    },
    {
      status: "closed",
      title: "Закрыт",
      className: "bg-gray-50 text-gray-800",
    },
  ];

  const search = (key: string, inputArray: any) => {
    for (let i = 0; i < inputArray.length; i++) {
      if (inputArray[i].status === key) {
        return inputArray[i];
      }
    }
  };

  const statusData = search(status, allStatus);

  return (
    <span
      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-2xl ${statusData.className}`}
    >
      {statusData.title}
    </span>
  );
};
