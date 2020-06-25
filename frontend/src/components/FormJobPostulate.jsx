import React from 'react'
import Button from './Button'

const FormJobPostulate = () => {
    return (
        <div className="d-flex flex-column align-items-center">
                        <h3>Publicar Empleo</h3>

            <form>
                <div className="form-group">
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="titleID"
                            placeholder="Titulo del Puesto"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="summaryID"
                            placeholder="Resumen"
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            id="descriptionID"
                            placeholder="Descripción"
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="LocationID"
                            placeholder="Lugar"
                        />
                    </div>
                    <select className="form-control">
                        <option>Media Jornada</option>
                        <option>Jornada Completa</option>
                    </select>
                </div>
            </form>
            <div className="buttonOptions d-flex justify-content-between">
            <Button className="mr-2" name="Guardar Cambios" />
            <Button className="mr-2" name="Publicar" />

            </div>

        </div>
    )
}

export default FormJobPostulate
