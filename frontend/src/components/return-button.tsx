import { Link } from "react-router";
import returnIcon from "../assets/return-icon.png";

interface ReturnButtonProps {
  to: string;
}

export const ReturnButton = ({ to }: ReturnButtonProps) => {
  return (
    <Link
      to={to}
      className="border border-cyan-secondary rounded-full p-3 inline-flex"
    >
      <img src={returnIcon} className="scale-80" />
    </Link>
  );
};
