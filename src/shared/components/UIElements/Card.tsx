import { ReactNode } from "react";

type CardProps = {
  isFixedSize: boolean
  children: ReactNode
}

const Card = ({ children ,isFixedSize}:CardProps) => {
  return (
    <div className={`${isFixedSize && 'max-w-sm'} p-6 m-5 min-w-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
      {children}
    </div>
  );
};

export default Card;
