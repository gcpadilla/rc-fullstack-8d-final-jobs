import React from "react";
import Button from "./Button";

const FormID = () => {
    return (
        <div className="d-flex flex-column align-items-center">
        <form >
            <div >
                <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    id="nameID"
                    placeholder="Name"
                />
                </div>
                <div className="form-group">

                <input
                    type="text"
                    className="form-control"
                    id="AdressID"
                    placeholder="Adress"
                />
                </div>
                <div className="form-group">

                <input
                    type="text"
                    className="form-control"
                    id="emailID"
                    placeholder="email@email.com"
                />
                </div>
                <div className="form-group">

                <textarea
                    className="form-control"
                    id="descriptionID"
                    placeholder="Descripción"
                />
                </div>
            </div>
        </form>
        <Button name="Guardar Cambios"/>
        </div>
    );
};

export default FormID