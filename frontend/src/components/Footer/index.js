import "./footer.css";
import { FaGithubAlt, FaLinkedinIn, FaConnectdevelop } from "react-icons/fa";

export default function Footer() {
  return (
    <footer>
      <div className="div__footer">
        <div className="div__footer_name">Andrew Dotterer</div>
        <div className="div__footer_icons">
          <a href="https://github.com/adotterer">
            <FaGithubAlt />
          </a>
          <a href="https://www.linkedin.com/in/andrew-dotterer-6338aa97/">
            <FaLinkedinIn />
          </a>
          <a href="https://adotterer.github.io/">
            <FaConnectdevelop />
          </a>
        </div>
      </div>
    </footer>
  );
}
