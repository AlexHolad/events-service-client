import { Link } from "react-router-dom"

import "./Footer.css"

export default function Footer() {
  return (
    <div className="footer">
    <div className="gen__container">
        <ul className="footer__social__container">
          <li><a href="mailto:svoi.berlin@gmail.com"><img width="50" height="50" src="https://img.icons8.com/ios/50/9DA0C2/gmail--v1.png" alt="gmail--v1"/></a></li>
          <li><a href="https://www.facebook.com/groups/svoi.berlin/" rel="noreferrer" target="_blank"><img width="50" height="50" src="https://img.icons8.com/ios/50/9DA0C2/facebook--v1.png" alt="facebook--v1"/></a></li>
          <li><a href="https://www.instagram.com/svoi.berlin/"rel="noreferrer" target="_blank"><img width="50" height="50" src="https://img.icons8.com/ios/50/9DA0C2/instagram-new--v1.png" alt="instagram-new--v1"/></a></li>
          <li><a href="https://t.me/svoiberlin" rel="noreferrer" target="_blank"><img width="50" height="50" src="https://img.icons8.com/ios/50/9DA0C2/telegram-app.png" alt="telegram-app"/></a></li>
        </ul>
        <p className="icon8__link">Icons by <a href="https://icons8.com/" rel="noreferrer" target="_blank">Icons8</a></p>
        <ul className="footer__rechtl__info__container">
          <li><Link to="datenschutz"><p className="footer__rechtl__info__header">Datenschutz</p></Link></li>
          <li><Link to="impressum"><p className="footer__rechtl__info__header">Impressum</p></Link></li>
        </ul>
        <p className="footer__email">svoi.berlin@gmail.com</p>
    </div>
    </div>
  )
}
