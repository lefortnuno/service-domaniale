import axios from "../../api/axios";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const URL_BASE = `procedure/`;

//#region

//#endregion

export default function ModalAjout(props) {
  const u_info = {
    u_token: localStorage.token,
    u_attribut: localStorage.u_attribut,
    u_numCompte: localStorage.u_numCompte,
  };
  const [inputs, setInputs] = useState([]);
  const [erreurs, setErreurs] = useState([]);
  const [messages, setMessages] = useState({
    nomProcedure: "Nom Procedure obligatoire",
    nomBureau: "Nom Bureau obligatoire"
  });

  //#region // IMAGE PHOTO DE PROFILE DES UTILISATEUR

  //#endregion

  //#region // HANDLE CHANGE FONCTION
  const handleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setInputs((values) => ({ ...values, [name]: value }));
    setErreurs((values) => ({ ...values, [name]: false }));
  };
  //#endregion

  //#region // FUNCTION AJOUT NOUVEAU XXX
  const onSubmit = (event) => {
    // event.preventDefault();
    const opts = {
      headers: {
        Authorization: u_info.u_token,
      },
    };
    axios
      .post(URL_BASE, inputs, opts)
      .then(function (response) {
        if (response.status === 200 ) {
          toast.success("Ajout Reussi.");
          reset();
          props.onHide();
        } else {
          toast.error("Echec de l'Ajout!");
          // FONCTON DE REDIRECTION VERS LE FORMULAIRE AJOUT INDIVIDU
        }
      })
      .catch((e) => {
        if (e.response.status === 403) {
          toast.error("Vous n'etes pas autoriser a ajouter un utilisateur!");
        }
      })
      .finally(() => {
        reset();
        props.onHide();
      });
  };

  //#endregion

  //#region // SCHEMA VALIDATION FORMULAIRE -----
  const handleSubmit = () => {
    let isValidate = true;
    //#region // --- VALEUR PAR DEFAUT
    if (!inputs.nomProcedure) {
      inputs.nomProcedure = false;
      isValidate = false;
    } 
    if (!inputs.idBureau) {
      inputs.idBureau = false;
      isValidate = false;
    } 
    //#endregion

    //#region //-------- PRE-VALIDATION
    if (!inputs.nomProcedure) {
      setErreurs({
        nomProcedure: true,
      });
    } 
    if (!inputs.idBureau) {
      setErreurs({
        idBureau: true,
      });
    } 
    //#endregion

    if (isValidate) {
      onSubmit();
    }
  };
  //#endregion

  //#region // CLOSE MODAL
  function reset() {
    setInputs([]);
  }
  function onClose() {
    props.onHide();
    reset();
  }
  //#endregion

  const rowStyle = {
    marginTop: "1rem",
  };

  //#region // RENU HTML
  return (
    <>
      <Modal
        size="md"
        show={props.show}
        onHide={props.closeAddModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{props.children}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Container>
            <Form>
              <Row style={rowStyle}>
                <Col col="md-8" ml="auto">
                  <Form.Label>Nom du Procedure</Form.Label>
                  <Form.Control
                    type="text"
                    name="nomProcedure"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Nom du Procedure...."
                    inline="true"
                    disabled={false}
                  />
                  <small className="text-danger d-block">
                    {erreurs.nomProcedure ? messages.nomProcedure : null}
                  </small>
                </Col>
                <Col col="md-8" ml="auto">
                  <Form.Label>Nom du Bureau</Form.Label>
                  <Form.Control
                    type="text"
                    name="idBureau"
                    onChange={handleChange}
                    autoComplete="off"
                    placeholder="Nom du Bureau...."
                    inline="true"
                    disabled={false}
                  />
                  <small className="text-danger d-block">
                    {erreurs.idBureau ? messages.idBureau : null}
                  </small>
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="danger" onClick={onClose}>
            Annuler
          </Button>

          <Button variant="primary" onClick={handleSubmit}>
            Enregistré
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  //#endregion
}
