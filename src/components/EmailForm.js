import React, { useState } from "react";
import Button from "react-bootstrap/cjs/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Col from "react-bootstrap/cjs/Col";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import Loader from "react-loader-spinner";

const EmailForm = ({
  setShowThankYou,
  setShowFindForm,
  dataUser,
  setDataUser,
  showEmailForm,
  setShowEmailForm,
  emailData,
  setEmailData,
  clientId,
}) => {
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(false);
  const [showLoadSpin, setShowLoadSpin] = useState(false);
  const handleChange = (e) => {
    e.preventDefault();
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value
        .replace(/\n\r?/g, "<br/>")
        .replace(/#/g, " "),
    });
    setEmailData({
      ...dataUser,
      ...emailData,
      [e.target.name]: e.target.value
        .replace(/\n\r?/g, "<br/>")
        .replace(/#/g, " "),
    });
  };
  const { userName } = dataUser;
  const correoEnviado = (respuestaDeExito, dataUseryEmail) => {
    axios.post(
      `https://payload-demo-tpm.herokuapp.com/leads?&firstName=${
        dataUser.userName ? dataUser.userName : ""
      }&postalcode=${
        dataUser.postcode ? dataUser.postcode : ""
      }&emailData=${dataUser.emailUser}&representative=${
        emailData.name
      }&emailMessage=${dataUser.text}&city=${emailData.state}&party=${
        emailData.party
      }&clientId=${clientId}&sended=${respuestaDeExito}`,
      dataUseryEmail
    );
  };
  const send = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    if (
      //firstName.trim() === '' || lastName.trim() === '' || //
      userName.trim() === ""
    ) {
      setError(true);
      return;
    }
    setError(false);
    //const name = dataUser.userName.split(' ')
    //console.log(dataUser.text.replace(/\n\r?/g, "<br/>"))
    const payload = await axios.post(
      `https://payload-demo-tpm.herokuapp.com/send-email?to=${
        emailData.email
      }&subject=${dataUser.subject}&firstName=${dataUser.userName}&emailData=${
        dataUser.emailUser
      }&text=${dataUser.text.replace(/\n\r?/g, "<br/>")}`
    );
    await setShowLoadSpin(false);
    if (payload.status === 200) {
      correoEnviado("Si", { dataUser, emailData });
      setShowEmailForm(true);
      setShowThankYou(false);
      dataUser.id = "";
    }
    if (payload.status !== 200) {
      correoEnviado("No", { dataUser, emailData });

      return (
        <Alert>
          El correo no ha sido enviado con éxito, por favor intente de nuevo más
          tarde
          <Button
            className={"button-email-form"}
            variant={"dark"}
            onClick={back}
          >
            Regresar
          </Button>
        </Alert>
      );
    }
  };
  const back = (e) => {
    e.preventDefault();
    setShowFindForm(false);
    setShowEmailForm(true);
  };
  //console.log("emailData", emailData);
  //console.log(dataUser, "data user");
  return (
    <div className={"emailContainer"} hidden={showEmailForm}>
      {error ? (
        <Alert variant={"danger"}>
          All fields are required!
        </Alert>
      ) : null}
      <Form onSubmit={send} noValidate validated={validated}>
        <div className={"formEmail"}>
          <Col>
            <Form.Group controlId="name">
              <Form.Label>*Name and Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name"
                name="userName"
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>*Email</Form.Label>
              <Form.Control
                type="email"
                placeholder={emailData.emailUser}
                onChange={handleChange}
                name="emailUser"
                readOnly
              />
            </Form.Group>
          </Col>
        </div>
        <Col>
          <Form.Label>To: MP's Information</Form.Label>
        </Col>
        <div className={"formEmail"}>
          <Col>
            <Form.Group>
              <Form.Control
                as={"input"}
                readOnly
                type="text"
                placeholder={emailData.name}
                name="nameTo"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control
                as={"input"}
                readOnly
                type="text"
                placeholder={`${emailData.state}`}
                name="state-city"
              />
            </Form.Group>
          </Col>
          <Col>
            <InputGroup>
              <Form.Control
                readOnly
                type="text"
                name="cp"
                placeholder={dataUser.zipCode}
              />
            </InputGroup>
          </Col>
        </div>
        <div className="input-subject">
          <Col>
            <Form.Group>
              <Form.Label>Subject Line:</Form.Label>
              <Form.Control
                onChange={handleChange}
                as="input"
                type="text"
                name="subject"
                defaultValue={dataUser.subject}
              />
            </Form.Group>
          </Col>
        </div>
        <Col>
          <Form.Group className="input-text-form">
            <Form.Control
              as="textarea"
              rows={8}
              defaultValue={dataUser.text}
              onChange={handleChange}
              name="text"
            />
          </Form.Group>
        </Col>
        <Loader
          visible={showLoadSpin}
          type="Puff"
          color="#000000"
          height={100}
          width={100}
          timeout={5000} //5 secs
        />
      </Form>
      <div className={"container buttons-container-email-form"}>
        <Button
          type={"submit"}
          className={"button-email-form"}
          variant={"dark"}
          onClick={send}
        >
          Send
        </Button>
        <Button className={"button-email-form"} variant={"dark"} onClick={back}>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default EmailForm;
