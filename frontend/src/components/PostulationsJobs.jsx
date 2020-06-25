import React from 'react'
import CartelJobs from './CartelJobs'
import '.././App.css'


const PostulationsJobs = () =>{
    const data = [
        {name: 'Nombre',
        age: 18,
        document: 12345678,
        cv: 'CV',
        aceptar: 'Si',
        rechazar: 'No',
        }
    ]
    return (
        <div className="d-flex flex-column align-items-center justify-content-around">
            <h3>Ver Postulaciones</h3>
            <CartelJobs />
        <table className="table">
            <thead>
                <tr>
                    <th scope="col">Nombre y Apellido</th>
                    <th scope="col">Edad</th>
                    <th scope="col">Documento</th>
                    <th scope="col">CV</th>
                    <th scope="col">Aceptar</th>
                    <th scope="col">Cancelar</th>
                </tr>
                {data.map (cat => {
                    return (
                        <>
                            <td>{cat.name}</td>
                            <td>{cat.age}</td>
                            <td>{cat.document}</td>
                            <td>{cat.cv}</td>
                            <td>{cat.aceptar}</td>
                            <td>{cat.rechazar}</td>

                        </>
                    )
                })}

            </thead>
        </table>
        </div>
    )
}

export default PostulationsJobs