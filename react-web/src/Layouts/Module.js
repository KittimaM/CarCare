import { Link } from "react-router-dom";
export const Button = ({ to, name }) => {
  return (
    <Link to={to}>
      <button>{name}</button>
    </Link>
  );
};


