import React, { useState } from "react";
import { MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import axios from "axios";

const Table = (props) => {
  const [estado, setestado] = useState("");
console.log(props);
  const modificar = async (e) => {
    e.preventDefault();
    console.log(estado);
    console.log({
      // emailcandidate: props.c.emailcandidate,
      // experiences: props.c.experiences,
      // intendedsalary: props.c.intendedsalary,
      // studies: props.c.studies,
      state: estado
      // offerid: props.c.offerid,
      // candidateid: props.c.candidateid
    });
    try {
      await axios.put(
        `http://localhost:3001/api/v1/offer/postulates/${props.c._id}/admin`,
        {
          //  emailcandidate: props.c.emailcandidate,
          // experiences: props.c.experiences,
          // intendedsalary: props.c.intendedsalary,
          // studies: props.c.studies,
          state: estado
          // offerid: props.c.offerid,
          // candidateid: props.c.candidateid
        }
      );
      await Swal.fire(
        "genial",
        "se modifico correctamente la postulación",
        "success"
      );
    } catch (err) {
      if (err.response.data.message === undefined) {
        Swal.fire(
          `Error de ${err.response.data.errors[0].param}`,
          err.response.data.errors[0].msg,
          "error"
        );
      } else {
        Swal.fire("Oops..", err.response.data.message, "error");
      }
    }
  };
  return (
    <tr>
      <td>{props.d.firstname} {props.d.lastname}</td>
      <td>{props.c.emailcandidate}</td>
      <td>{props.c.experiences}</td>
      <td>{props.c.intendedsalary}</td>
      <td>{props.c.studies}</td>
      <td>
        <form onSubmit={modificar}>
          <div className="form-group d-flex flex-nowrap">
            <select
              className="form-control"
              name="state"
              required
              onChange={(e) => setestado(e.target.value)}
              defaultValue={props.c.state}
            >
              <option value="">Pendiente</option>
              <option value="Aceptado">Aceptado</option>
              <option value="Desestimado">Desestimado</option>
            </select>
            <button type="submit" className="btn btn-outline-secondary ml-2">
             <MdEdit/>
            </button>
          </div>
        </form>
      </td>
    </tr>
  );
};

export default Table;
