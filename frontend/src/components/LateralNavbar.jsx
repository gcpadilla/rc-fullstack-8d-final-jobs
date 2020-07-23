import React from 'react'
import $ from 'jquery'; 
const LateralNavbar = () => {

    $(function() {
        // Sidebar toggle behavior
        $('#sidebarCollapse').on('click', function() {
          $('#sidebar, #content').toggleClass('active');
        });
      });


    return (
      <div className="col-md-3 col-lg-9 vertical-nav " id="sidebar">
      <div className="py-4 px-3 mb-4">
        <div className="media d-flex align-items-center">
          <div className="media-body">
            <p className="m-0 text-white">Bienvenido</p>
            <h4 className="m-0 text-white"> {username}</h4>
          </div>
        </div>
      </div>

      <ul className="nav flex-column  mb-0">
        <li className="nav-item">
          <button
            onClick={crearOferta}
            className="text-white btn btn-link"
          >
            {" "}
            Crear Ofertas
          </button>
        </li>
        <li className="nav-item">
          <button
            onClick={mostrarOfertas}
            className="text-white btn btn-link"
          >
            {" "}
            Ofertas Publicadas
          </button>
        </li>
        <li className="nav-item">
          <button
            onClick={signOutHandler}
            className="text-white btn btn-link mt-auto"
          >
            {" "}
            Cerrar Sesión
          </button>{" "}
        </li>
      </ul>
    </div>

//  End vertical navbar 
)
}
export default LateralNavbar