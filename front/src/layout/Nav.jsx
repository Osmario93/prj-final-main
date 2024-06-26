import { NavLink } from "react-router-dom";

function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Indivíduos</NavLink>
        </li>
        <li>
          <NavLink to="/sequencias">Sequências</NavLink>
        </li>
        <li>
          <NavLink to="/setores">Setores</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
