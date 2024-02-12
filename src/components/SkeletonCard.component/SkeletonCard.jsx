import { Link } from "react-router-dom";

// CSS
import "./SkeletonCard.css";

export default function SkeletonCard({ index }) {
  return (
    <div className="skeletoncard__container" key={index}>
      <div className="skeletoncard__img__container skeleton">
        <div className="skeletoncard__img"></div>
      </div>
      <div className="skeletoncard__info">
        <div className="skeletoncard__title__container skeleton"></div>
        <div className="skeletoncard__date__container skeleton"></div>
        <div className="skeletoncard__location skeleton"></div>
      </div>
    </div>
  );
}
