const { validationResult } = require("express-validator");
const postulateModel = require("../models/postulateModel");
const mongoose = require("mongoose");
const candidateModel = require("../models/candidateModel");
const offerModel = require("../models/offerModel");
const sendEmail = require("../middlewares/sendEmail");

//crear postulacion
exports.createPostulate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const candidate = await candidateModel.findById({
    _id: res.locals.user.id,
  });

  if (!candidate) {
    return res.status(400).json({ message: "No se encontro candidato . . ." });
  }

  const { body } = req;

  const postulateData = {
    intendedsalary: body.intendedsalary,
    experiences: body.experiences,
    studies: body.studies,
    emailcandidate:candidate.email,
    telcandidate: body.telcandidate,
    offerid: mongoose.Types.ObjectId(req.params.offerId),
    candidateid: res.locals.user.id,
  };

  const existPost = await postulateModel
    .findOne()
    .where({ candidateid: res.locals.user.id })
    .where({ offerid: mongoose.Types.ObjectId(req.params.offerId) });

  if (existPost) {
    return res
      .status(400)
      .json({ message: "Ya estas postulado a esta oferta . . ." });
  }

  try {
    const postulate = new postulateModel(postulateData);
    await postulate.save();

    const offer = await offerModel.findById({
      _id: mongoose.Types.ObjectId(req.params.offerId),
    });

    offer.postulateRef.push(postulate._id);
    offer.candidateRef.push(candidate._id);
    await offer.save();
    candidate.postulateRef.push(postulate._id);
    await candidate.save();

    res.send({
      message: "Se registro postulacion correctamente..",
      postulate,
    });
  } catch (err) {
    res.status(500).send(err);
  }
};

//todas las postulaciones admin
exports.getAllPostulates = async (req, res) => {
  try {
    const postulates = await postulateModel.find({});
    res.send(postulates);
  } catch (err) {
    res.status(500).send(err);
  }
};

//todas las postulaciones user
exports.getAllPostulatessUser = async (req, res) => {
  try {
    const postulates = await postulateModel.find(
      { candidateid: res.locals.user.id },
      "-candidateid"
    );

    if (postulates.length === 0) {
      return res.status(200).json({ message: "No tienes postulaciones . . ." });
    }
    res.send(postulates);
  } catch (err) {
    res.status(500).send(err);
  }
};

//Editar postulación
exports.updatePostulate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(404)
        .json({ message: "No de encontro postulación ..." });
    }

    const postulate_in_db = await postulateModel.findOne({
      _id: req.params.id,
    });

    if (!postulate_in_db) {
      return res.status(400).json({ message: "No de encontro postulación ..." });
    }

    const { body } = req;

    const postulateData = {
      state: postulate_in_db.state,
      intendedsalary: body.intendedsalary,
      experiences: body.experiences,
      studies: body.studies,
      telcandidate: body.telcandidate,
    };

    let postulate = await postulateModel.findByIdAndUpdate(
      req.params.id,
      postulateData,
      { new: true }
    );

    postulate = await postulateModel.findOne(
      { _id: req.params.id },
      "-candidateid"
    );

    if (!postulate) {
      return res
        .status(404)
        .json({ message: "No de encontro postulación ..." });
    }

    res.send({
      message: "Se actualizaron tus datos correctamente...",
      postulate,
    });
  } catch (err) {
    res.status(500).send({ message: "Error al editar postulación ..." });
  }
};

//Editar postulación administrador
exports.updatePostulateAdmin = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(404)
        .json({ message: "No de encontro postulación ..." });
    }

    const { state } = req.body;

    if (!state) {
      return res.status(400).json({ message: "Se produjo un error. . ." });
    }

    const postulate_in_db = await postulateModel.findOne({
      _id: req.params.id,
    });

    if (!postulate_in_db) {
      return res.status(400).json({ message: "Credenciales no validas." });
    }

    const offer_in_db = await offerModel.findOne({
      _id: postulate_in_db.offerid,
    });

    //----------------------Email------------------------------------------------------------

    if (state !== "Pendiente") {
      let oferta = offer_in_db.title;
      let email = postulate_in_db.emailcandidate;
      let subject = "Postulacion a Jobs";
      if (state === "Admitido") {
        let html = `<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
          <title>
            RollingJobs | Tu lugar de Trabajo
          </title>
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
            #outlook a {
              padding: 0;
            }
        
            body {
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
        
            table,
            td {
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
        
            img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
            }
        
            p {
              display: block;
              margin: 13px 0;
            }
          </style>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;1,700&display=swap"
            rel="stylesheet" type="text/css">
          <style type="text/css">
            @import url(https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;1,700&display=swap);
          </style>
          <style type="text/css">
            @media only screen and (min-width:480px) {
              .mj-column-per-35 {
                width: 35% !important;
                max-width: 35%;
              }
        
              .mj-column-per-65 {
                width: 65% !important;
                max-width: 65%;
              }
        
              .mj-column-per-100 {
                width: 100% !important;
                max-width: 100%;
              }
            }
          </style>
        
        
          <style type="text/css">
            noinput.mj-menu-checkbox {
              display: block !important;
              max-height: none !important;
              visibility: visible !important;
            }
        
            @media only screen and (max-width:480px) {
              .mj-menu-checkbox[type="checkbox"]~.mj-inline-links {
                display: none !important;
              }
        
              .mj-menu-checkbox[type="checkbox"]:checked~.mj-inline-links,
              .mj-menu-checkbox[type="checkbox"]~.mj-menu-trigger {
                display: block !important;
                max-width: none !important;
                max-height: none !important;
                font-size: inherit !important;
              }
        
              .mj-menu-checkbox[type="checkbox"]~.mj-inline-links>a {
                display: block !important;
              }
        
              .mj-menu-checkbox[type="checkbox"]:checked~.mj-menu-trigger .mj-menu-icon-close {
                display: block !important;
              }
        
              .mj-menu-checkbox[type="checkbox"]:checked~.mj-menu-trigger .mj-menu-icon-open {
                display: none !important;
              }
            }
        
        
            @media only screen and (max-width:480px) {
              table.mj-full-width-mobile {
                width: 100% !important;
              }
        
              td.mj-full-width-mobile {
                width: auto !important;
              }
            }
          </style>
        
        
        </head>
        
        <body style="background-color:#F2F2F2;">
        
        
          <div style="background-color:#F2F2F2;">
            <div style="background:#0c0a59;background-color:#0c0a59;margin:0px auto;max-width:600px;">
        
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#0c0a59;background-color:#0c0a59;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 20px 0 20px;text-align:center;">
                      <div class="mj-column-per-35 mj-outlook-group-fix"
                        style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                          width="100%">
        
                          <tr>
                            <td align="center" style="font-size:0px;word-break:break-word;">
        
        
                              <div class="mj-inline-links">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                  style="border-collapse:collapse;border-spacing:0px;">
                                  <tbody>
                                    <tr>
                                      <td style="width:146px;">
        
                                        <img height="auto" src="https://i.ibb.co/d6grgWg/rollingblanco-2x.png"
                                          style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                          width="146" />
        
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
        
                            </td>
                          </tr>
        
                        </table>
        
                      </div>
                      <div class="mj-column-per-65 mj-outlook-group-fix"
                        style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                          width="100%">
        
                          <tr>
                            <td align="right" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            </td>
                          </tr>
        
                        </table>
        
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
        
            </div>
            <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
        
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 20px 0 20px;text-align:center;">
                      <div class="mj-column-per-100 mj-outlook-group-fix"
                        style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                          width="100%">
        
                          <tr>
                            <td align="center" style="font-size:0px;padding:30px 40px 10px 40px;word-break:break-word;">
        
                              <div
                                style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:32px;font-weight:700;line-height:40px;text-align:center;color:#5FA91D;">
                                ¡Felicidades!
                              </div>
                            </td>
                          </tr>
        
                          <tr>
                            <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
        
                              <p style="border-top:solid 3px #9B9B9B;font-size:1px;margin:0px auto;width:30px;">
                              </p>
                            </td>
                          </tr>
        
                          <tr>
                            <td align="center" style="font-size:0px;padding:30px 40px 10px 40px;word-break:break-word;">
        
                              <div
                                style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:20px;font-weight:300;line-height:20px;text-align:center;color:#5FA91D;">
                                ¡Estas aprovado a tu postulacion de ${oferta}!<br></br> Aguardá al llamado de nuestro Equipo para contiuar con el
                                proceso de Selección</div>
        
                            </td>
                          </tr>
        
                        </table>
        
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
        
            </div>
            <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
        
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:10px 20px;text-align:center;">
                      <div class="mj-column-per-100 mj-outlook-group-fix"
                        style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                          width="100%">
        
                        </table>
        
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
        
            </div>
            <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
        
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:0 20px 20px 20px;text-align:center;">
                    </td>
                  </tr>
                </tbody>
              </table>
        
            </div>
            <div
              style="background:#0c0a59 url(https://lh3.googleusercontent.com/Zm5uvrBHurWxJUsgHWreSf14Ae318H3JeiOnj5mA9Ezrx6CPyH27fv6eilgGE9wxW3iF6gEuIeyNwruN45TYLpnGUkgm18l1lUbhb-Y7upz0TTJ_CfFbWs0-IIMH1nY7X1EseBOt61hachKeznU1MF_wgnXiS8XnCxmO728-2KhgpWZo8KKMFdaQequryUUm0b8IOILhoJ3yidTJNp6kfMo-EGA3ZKZVoE0C6p2Pz9PgRfnSuLphWIdl2nBPvonG3QC5n2tyDbEcBkx2ksM5FIObvoVEfs2qcuIovmB3WdKGQlg6cmNZopCZ5KvSUB8JfLEW3aJ6gwle1f7rCQKGaYZj33gHHzMHWShE6HAPFPs5_4vnDvb1RQly_qdg1uhh8felBcs27_bHwU-uf8INuCZcqKG8VEB5JYW5XH6FBmzas8oD1auctd-JWZosBe6g-YAY_Oc56q1OrDEm03HN4zU1tnzELKL6oH8B0tgdKHPfWJocFduKKh_BWwr381539rOtPPl9RwcH8czC04cW4xegaNi-9Vy36sDgrTT8hLHDWGIdpejz2_dHuZAn1JBa6gjK294HzZtAoA2yRh3iFPj0uCiyDdJpX4wB-4QCzi2ywJ4NIA_MziSDBR0jBepNIPWSGCkXtj45rkdYvfkgjdvSF_UWqqb_V7XrSL-6nqV3p7xaYIkOGtL2cdUIuC4jji0mgA=w1366-h636-ft) top center / cover no-repeat;margin:0px auto;max-width:600px;">
              <div style="line-height:0;font-size:0;">
                <table align="center"
                  background="https://lh3.googleusercontent.com/Zm5uvrBHurWxJUsgHWreSf14Ae318H3JeiOnj5mA9Ezrx6CPyH27fv6eilgGE9wxW3iF6gEuIeyNwruN45TYLpnGUkgm18l1lUbhb-Y7upz0TTJ_CfFbWs0-IIMH1nY7X1EseBOt61hachKeznU1MF_wgnXiS8XnCxmO728-2KhgpWZo8KKMFdaQequryUUm0b8IOILhoJ3yidTJNp6kfMo-EGA3ZKZVoE0C6p2Pz9PgRfnSuLphWIdl2nBPvonG3QC5n2tyDbEcBkx2ksM5FIObvoVEfs2qcuIovmB3WdKGQlg6cmNZopCZ5KvSUB8JfLEW3aJ6gwle1f7rCQKGaYZj33gHHzMHWShE6HAPFPs5_4vnDvb1RQly_qdg1uhh8felBcs27_bHwU-uf8INuCZcqKG8VEB5JYW5XH6FBmzas8oD1auctd-JWZosBe6g-YAY_Oc56q1OrDEm03HN4zU1tnzELKL6oH8B0tgdKHPfWJocFduKKh_BWwr381539rOtPPl9RwcH8czC04cW4xegaNi-9Vy36sDgrTT8hLHDWGIdpejz2_dHuZAn1JBa6gjK294HzZtAoA2yRh3iFPj0uCiyDdJpX4wB-4QCzi2ywJ4NIA_MziSDBR0jBepNIPWSGCkXtj45rkdYvfkgjdvSF_UWqqb_V7XrSL-6nqV3p7xaYIkOGtL2cdUIuC4jji0mgA=w1366-h636-ft"
                  border="0" cellpadding="0" cellspacing="0" role="presentation"
                  style="background:#0c0a59 url(https://lh3.googleusercontent.com/Zm5uvrBHurWxJUsgHWreSf14Ae318H3JeiOnj5mA9Ezrx6CPyH27fv6eilgGE9wxW3iF6gEuIeyNwruN45TYLpnGUkgm18l1lUbhb-Y7upz0TTJ_CfFbWs0-IIMH1nY7X1EseBOt61hachKeznU1MF_wgnXiS8XnCxmO728-2KhgpWZo8KKMFdaQequryUUm0b8IOILhoJ3yidTJNp6kfMo-EGA3ZKZVoE0C6p2Pz9PgRfnSuLphWIdl2nBPvonG3QC5n2tyDbEcBkx2ksM5FIObvoVEfs2qcuIovmB3WdKGQlg6cmNZopCZ5KvSUB8JfLEW3aJ6gwle1f7rCQKGaYZj33gHHzMHWShE6HAPFPs5_4vnDvb1RQly_qdg1uhh8felBcs27_bHwU-uf8INuCZcqKG8VEB5JYW5XH6FBmzas8oD1auctd-JWZosBe6g-YAY_Oc56q1OrDEm03HN4zU1tnzELKL6oH8B0tgdKHPfWJocFduKKh_BWwr381539rOtPPl9RwcH8czC04cW4xegaNi-9Vy36sDgrTT8hLHDWGIdpejz2_dHuZAn1JBa6gjK294HzZtAoA2yRh3iFPj0uCiyDdJpX4wB-4QCzi2ywJ4NIA_MziSDBR0jBepNIPWSGCkXtj45rkdYvfkgjdvSF_UWqqb_V7XrSL-6nqV3p7xaYIkOGtL2cdUIuC4jji0mgA=w1366-h636-ft) top center / cover no-repeat;width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                        <div class="mj-column-per-100 mj-outlook-group-fix"
                          style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                            width="100%">
        
                            <tr>
                              <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
        
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                  style="border-collapse:collapse;border-spacing:0px;">
                                  <tbody>
                                    <tr>
                                      <td style="width:600px;">
        
                                        <img alt="" height="auto" src="http://nimus.de/share/tpl-card/lineshadow.png"
                                          style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                          width="600" />
        
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
        
                              </td>
                            </tr>
        
                            <tr>
                              <td align="center" style="font-size:0px;padding:50px 40px 0 40px;word-break:break-word;">
        
                                <div
                                  style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:16px;font-weight:300;line-height:24px;text-align:center;color:#FFFFFF;">
                                  En RollingJobs creemos en la acción<br>de conectar a las personas con su trabajo ideal.</br>
                                </div>
        
                              </td>
                            </tr>
        
                            <tr>
                              <td align="center" vertical-align="middle"
                                style="font-size:0px;padding:10px 25px;padding-top:20px;padding-bottom:100px;word-break:break-word;">
        
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                  style="border-collapse:separate;line-height:100%;">
                                  <tr>
                                    <td align="center" bgcolor="#5FA91D" role="presentation"
                                      style="border:none;border-radius:2px;cursor:auto;mso-padding-alt:15px 30px;background:#5FA91D;"
                                      valign="middle">
                                      <a href="#"
                                        style="display:inline-block;background:#5FA91D;color:#FFFFFF;font-family:Poppins, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:15px 30px;mso-padding-alt:0px;border-radius:2px;"
                                        target="_blank">
                                        Iniciar Sesión
                                      </a>
                                    </td>
                                  </tr>
                                </table>
        
                              </td>
                            </tr>
        
                          </table>
        
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
        
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:50px 0 0 0;text-align:center;">
                    </td>
                  </tr>
                </tbody>
              </table>
        
            </div>
            <div style="margin:0px auto;max-width:600px;">
        
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:10px 0 20px 0;text-align:center;">
                      <div class="mj-column-per-100 mj-outlook-group-fix"
                        style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                          width="100%">
        
                          <tr>
                            <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
        
                              <div
                                style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:11px;font-weight:400;line-height:24px;text-align:center;color:#9B9B9B;">
                                RollingJobs | Copyright ® 2020. Todos los derechos reservados. <br></div>
        
                            </td>
                          </tr>
        
                        </table>
        
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
        
            </div>
          </div>
        
        </body>
        
        </html>`;
        await sendEmail(email, subject, html);
      } else {
        let html = `<!doctype html>
        <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
          xmlns:o="urn:schemas-microsoft-com:office:office">
        
        <head>
          <title>
            RollingJobs | Tu lugar de Trabajo
          </title>
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
            #outlook a {
              padding: 0;
            }
        
            body {
              margin: 0;
              padding: 0;
              -webkit-text-size-adjust: 100%;
              -ms-text-size-adjust: 100%;
            }
        
            table,
            td {
              border-collapse: collapse;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
            }
        
            img {
              border: 0;
              height: auto;
              line-height: 100%;
              outline: none;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
            }
        
            p {
              display: block;
              margin: 13px 0;
            }
          </style>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;1,700&display=swap"
            rel="stylesheet" type="text/css">
          <style type="text/css">
            @import url(https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;1,700&display=swap);
          </style>
          <style type="text/css">
            @media only screen and (min-width:480px) {
              .mj-column-per-35 {
                width: 35% !important;
                max-width: 35%;
              }
        
              .mj-column-per-65 {
                width: 65% !important;
                max-width: 65%;
              }
        
              .mj-column-per-100 {
                width: 100% !important;
                max-width: 100%;
              }
            }
          </style>
        
        
          <style type="text/css">
            noinput.mj-menu-checkbox {
              display: block !important;
              max-height: none !important;
              visibility: visible !important;
            }
        
            @media only screen and (max-width:480px) {
              .mj-menu-checkbox[type="checkbox"]~.mj-inline-links {
                display: none !important;
              }
        
              .mj-menu-checkbox[type="checkbox"]:checked~.mj-inline-links,
              .mj-menu-checkbox[type="checkbox"]~.mj-menu-trigger {
                display: block !important;
                max-width: none !important;
                max-height: none !important;
                font-size: inherit !important;
              }
        
              .mj-menu-checkbox[type="checkbox"]~.mj-inline-links>a {
                display: block !important;
              }
        
              .mj-menu-checkbox[type="checkbox"]:checked~.mj-menu-trigger .mj-menu-icon-close {
                display: block !important;
              }
        
              .mj-menu-checkbox[type="checkbox"]:checked~.mj-menu-trigger .mj-menu-icon-open {
                display: none !important;
              }
            }
        
        
            @media only screen and (max-width:480px) {
              table.mj-full-width-mobile {
                width: 100% !important;
              }
        
              td.mj-full-width-mobile {
                width: auto !important;
              }
            }
          </style>
        
        
        </head>
        
        <body style="background-color:#F2F2F2;">
        
        
          <div style="background-color:#F2F2F2;">
            <div style="background:#0c0a59;background-color:#0c0a59;margin:0px auto;max-width:600px;">
        
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#0c0a59;background-color:#0c0a59;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 20px 0 20px;text-align:center;">
                      <div class="mj-column-per-35 mj-outlook-group-fix"
                        style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                          width="100%">
        
                          <tr>
                            <td align="center" style="font-size:0px;word-break:break-word;">
        
        
                              <div class="mj-inline-links">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                  style="border-collapse:collapse;border-spacing:0px;">
                                  <tbody>
                                    <tr>
                                      <td style="width:146px;">
        
                                        <img height="auto" src="https://i.ibb.co/d6grgWg/rollingblanco-2x.png"
                                          style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                          width="146" />
        
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
        
                            </td>
                          </tr>
        
                        </table>
        
                      </div>
                      <div class="mj-column-per-65 mj-outlook-group-fix"
                        style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                          width="100%">
        
                          <tr>
                            <td align="right" style="font-size:0px;padding:10px 25px;word-break:break-word;">
                            </td>
                          </tr>
        
                        </table>
        
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
        
            </div>
            <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
        
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:20px 20px 0 20px;text-align:center;">
                      <div class="mj-column-per-100 mj-outlook-group-fix"
                        style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                          width="100%">
        
                          <tr>
                            <td align="center" style="font-size:0px;padding:30px 40px 10px 40px;word-break:break-word;">
        
                              <div
                                style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:32px;font-weight:700;line-height:40px;text-align:center;color:#5FA91D;">
                                ¡Lo sentimos!
                              </div>
                            </td>
                          </tr>
        
                          <tr>
                            <td style="font-size:0px;padding:10px 25px;word-break:break-word;">
        
                              <p style="border-top:solid 3px #9B9B9B;font-size:1px;margin:0px auto;width:30px;">
                              </p>
                            </td>
                          </tr>
        
                          <tr>
                            <td align="center" style="font-size:0px;padding:30px 40px 10px 40px;word-break:break-word;">
        
                              <div
                                style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:20px;font-weight:300;line-height:20px;text-align:center;color:#5FA91D;">
                                Te desestimaron en tu postulación de ${oferta}, no pierdas la esperanza y seguí buscando que tu trabajo te esta esperando.
                              </div>
        
                            </td>
                          </tr>
        
                        </table>
        
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
        
            </div>
            <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
        
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:10px 20px;text-align:center;">
                      <div class="mj-column-per-100 mj-outlook-group-fix"
                        style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                          width="100%">
        
                        </table>
        
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
        
            </div>
            <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
        
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:0 20px 20px 20px;text-align:center;">
                    </td>
                  </tr>
                </tbody>
              </table>
        
            </div>
            <div
              style="background:#0c0a59 url(https://lh3.googleusercontent.com/Zm5uvrBHurWxJUsgHWreSf14Ae318H3JeiOnj5mA9Ezrx6CPyH27fv6eilgGE9wxW3iF6gEuIeyNwruN45TYLpnGUkgm18l1lUbhb-Y7upz0TTJ_CfFbWs0-IIMH1nY7X1EseBOt61hachKeznU1MF_wgnXiS8XnCxmO728-2KhgpWZo8KKMFdaQequryUUm0b8IOILhoJ3yidTJNp6kfMo-EGA3ZKZVoE0C6p2Pz9PgRfnSuLphWIdl2nBPvonG3QC5n2tyDbEcBkx2ksM5FIObvoVEfs2qcuIovmB3WdKGQlg6cmNZopCZ5KvSUB8JfLEW3aJ6gwle1f7rCQKGaYZj33gHHzMHWShE6HAPFPs5_4vnDvb1RQly_qdg1uhh8felBcs27_bHwU-uf8INuCZcqKG8VEB5JYW5XH6FBmzas8oD1auctd-JWZosBe6g-YAY_Oc56q1OrDEm03HN4zU1tnzELKL6oH8B0tgdKHPfWJocFduKKh_BWwr381539rOtPPl9RwcH8czC04cW4xegaNi-9Vy36sDgrTT8hLHDWGIdpejz2_dHuZAn1JBa6gjK294HzZtAoA2yRh3iFPj0uCiyDdJpX4wB-4QCzi2ywJ4NIA_MziSDBR0jBepNIPWSGCkXtj45rkdYvfkgjdvSF_UWqqb_V7XrSL-6nqV3p7xaYIkOGtL2cdUIuC4jji0mgA=w1366-h636-ft) top center / cover no-repeat;margin:0px auto;max-width:600px;">
              <div style="line-height:0;font-size:0;">
                <table align="center"
                  background="https://lh3.googleusercontent.com/Zm5uvrBHurWxJUsgHWreSf14Ae318H3JeiOnj5mA9Ezrx6CPyH27fv6eilgGE9wxW3iF6gEuIeyNwruN45TYLpnGUkgm18l1lUbhb-Y7upz0TTJ_CfFbWs0-IIMH1nY7X1EseBOt61hachKeznU1MF_wgnXiS8XnCxmO728-2KhgpWZo8KKMFdaQequryUUm0b8IOILhoJ3yidTJNp6kfMo-EGA3ZKZVoE0C6p2Pz9PgRfnSuLphWIdl2nBPvonG3QC5n2tyDbEcBkx2ksM5FIObvoVEfs2qcuIovmB3WdKGQlg6cmNZopCZ5KvSUB8JfLEW3aJ6gwle1f7rCQKGaYZj33gHHzMHWShE6HAPFPs5_4vnDvb1RQly_qdg1uhh8felBcs27_bHwU-uf8INuCZcqKG8VEB5JYW5XH6FBmzas8oD1auctd-JWZosBe6g-YAY_Oc56q1OrDEm03HN4zU1tnzELKL6oH8B0tgdKHPfWJocFduKKh_BWwr381539rOtPPl9RwcH8czC04cW4xegaNi-9Vy36sDgrTT8hLHDWGIdpejz2_dHuZAn1JBa6gjK294HzZtAoA2yRh3iFPj0uCiyDdJpX4wB-4QCzi2ywJ4NIA_MziSDBR0jBepNIPWSGCkXtj45rkdYvfkgjdvSF_UWqqb_V7XrSL-6nqV3p7xaYIkOGtL2cdUIuC4jji0mgA=w1366-h636-ft"
                  border="0" cellpadding="0" cellspacing="0" role="presentation"
                  style="background:#0c0a59 url(https://lh3.googleusercontent.com/Zm5uvrBHurWxJUsgHWreSf14Ae318H3JeiOnj5mA9Ezrx6CPyH27fv6eilgGE9wxW3iF6gEuIeyNwruN45TYLpnGUkgm18l1lUbhb-Y7upz0TTJ_CfFbWs0-IIMH1nY7X1EseBOt61hachKeznU1MF_wgnXiS8XnCxmO728-2KhgpWZo8KKMFdaQequryUUm0b8IOILhoJ3yidTJNp6kfMo-EGA3ZKZVoE0C6p2Pz9PgRfnSuLphWIdl2nBPvonG3QC5n2tyDbEcBkx2ksM5FIObvoVEfs2qcuIovmB3WdKGQlg6cmNZopCZ5KvSUB8JfLEW3aJ6gwle1f7rCQKGaYZj33gHHzMHWShE6HAPFPs5_4vnDvb1RQly_qdg1uhh8felBcs27_bHwU-uf8INuCZcqKG8VEB5JYW5XH6FBmzas8oD1auctd-JWZosBe6g-YAY_Oc56q1OrDEm03HN4zU1tnzELKL6oH8B0tgdKHPfWJocFduKKh_BWwr381539rOtPPl9RwcH8czC04cW4xegaNi-9Vy36sDgrTT8hLHDWGIdpejz2_dHuZAn1JBa6gjK294HzZtAoA2yRh3iFPj0uCiyDdJpX4wB-4QCzi2ywJ4NIA_MziSDBR0jBepNIPWSGCkXtj45rkdYvfkgjdvSF_UWqqb_V7XrSL-6nqV3p7xaYIkOGtL2cdUIuC4jji0mgA=w1366-h636-ft) top center / cover no-repeat;width:100%;">
                  <tbody>
                    <tr>
                      <td style="direction:ltr;font-size:0px;padding:0px;text-align:center;">
                        <div class="mj-column-per-100 mj-outlook-group-fix"
                          style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                          <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                            width="100%">
        
                            <tr>
                              <td align="center" style="font-size:0px;padding:0px;word-break:break-word;">
        
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                  style="border-collapse:collapse;border-spacing:0px;">
                                  <tbody>
                                    <tr>
                                      <td style="width:600px;">
        
                                        <img alt="" height="auto" src="http://nimus.de/share/tpl-card/lineshadow.png"
                                          style="border:none;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;"
                                          width="600" />
        
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
        
                              </td>
                            </tr>
        
                            <tr>
                              <td align="center" style="font-size:0px;padding:50px 40px 0 40px;word-break:break-word;">
        
                                <div
                                  style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:16px;font-weight:300;line-height:24px;text-align:center;color:#FFFFFF;">
                                  En RollingJobs creemos en la acción<br>de conectar a las personas con su trabajo ideal.</br>
                                </div>
        
                              </td>
                            </tr>
        
                            <tr>
                              <td align="center" vertical-align="middle"
                                style="font-size:0px;padding:10px 25px;padding-top:20px;padding-bottom:100px;word-break:break-word;">
        
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation"
                                  style="border-collapse:separate;line-height:100%;">
                                  <tr>
                                    <td align="center" bgcolor="#5FA91D" role="presentation"
                                      style="border:none;border-radius:2px;cursor:auto;mso-padding-alt:15px 30px;background:#5FA91D;"
                                      valign="middle">
                                      <a href="#"
                                        style="display:inline-block;background:#5FA91D;color:#FFFFFF;font-family:Poppins, Helvetica, Arial, sans-serif;font-size:13px;font-weight:normal;line-height:120%;margin:0;text-decoration:none;text-transform:none;padding:15px 30px;mso-padding-alt:0px;border-radius:2px;"
                                        target="_blank">
                                        Iniciar Sesión
                                      </a>
                                    </td>
                                  </tr>
                                </table>
        
                              </td>
                            </tr>
        
                          </table>
        
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div style="background:#FFFFFF;background-color:#FFFFFF;margin:0px auto;max-width:600px;">
        
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                style="background:#FFFFFF;background-color:#FFFFFF;width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:50px 0 0 0;text-align:center;">
                    </td>
                  </tr>
                </tbody>
              </table>
        
            </div>
            <div style="margin:0px auto;max-width:600px;">
        
              <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;">
                <tbody>
                  <tr>
                    <td style="direction:ltr;font-size:0px;padding:10px 0 20px 0;text-align:center;">
                      <div class="mj-column-per-100 mj-outlook-group-fix"
                        style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
        
                        <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;"
                          width="100%">
        
                          <tr>
                            <td align="center" style="font-size:0px;padding:10px 25px;word-break:break-word;">
        
                              <div
                                style="font-family:Poppins, Helvetica, Arial, sans-serif;font-size:11px;font-weight:400;line-height:24px;text-align:center;color:#9B9B9B;">
                                RollingJobs | Copyright ® 2020. Todos los derechos reservados. <br></div>
        
                            </td>
                          </tr>
        
                        </table>
        
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
        
            </div>
          </div>
        
        </body>
        
        </html>`;
        await sendEmail(email, subject, html);
      }
    } else {
      return res
        .status(404)
        .json({ message: "El estado continua pendiente. . ." });
    }

    //----------------------Email------------------------------------------------------------

    let postulate = await postulateModel.findByIdAndUpdate(
      req.params.id,
      { state: state },
      { new: true }
    );

    postulate = await postulateModel.findOne(
      { _id: req.params.id },
      "-candidateid"
    );

    if (!postulate) {
      return res
        .status(404)
        .json({ message: "No de encontro postulación ..." });
    }

    res.send({
      message: "Se actualizaron tus datos correctamente...",
      postulate,
    });
  } catch (err) {
    res.status(500).send({ message: "Error al editar postulación ..." });
  }
};

//Borrar postulacion
exports.deletePostulate = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res
        .status(404)
        .json({ message: "No de encontro postulación ..." });
    }

    let postulate = await postulateModel.findById(req.params.id);

    if (!postulate) {
      return res
        .status(404)
        .json({ message: "No de encontro postulación ..." });
    }

    const oferta = await offerModel.findById(postulate.offerid);

    const candidateRef = oferta.candidateRef;
    let indiceCandidate = candidateRef.indexOf(res.locals.user.id);
    candidateRef.splice(indiceCandidate, 1);

    const postulateRef = oferta.postulateRef;
    let indicePostulate = candidateRef.indexOf(res.locals.user.id);
    postulateRef.splice(indicePostulate, 1);

    await offerModel.findByIdAndUpdate(
      postulate.offerid,
      { candidateRef: candidateRef, postulateRef: postulateRef },
      { new: true }
    );

    postulate = await postulateModel.findByIdAndDelete(req.params.id);

    if (!postulate) {
      return res
        .status(404)
        .json({ message: "No de encontro postulación ..." });
    }

    return res.status(200).send({ message: "Se borro postulacion" });
  } catch (error) {
    res.status(500).send({ message: "Error al borrar postulación ..." });
  }
};
