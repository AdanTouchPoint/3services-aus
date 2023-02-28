import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function Terms({ showTerms, setShowTerms, tac, setTac }) {

  const handleClose = () => setShowTerms(false);

  return (
    <>
      <Modal fullscreen={true} show={showTerms} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: "justify" }}>
          <p>
            This website, www.overton.solutions (the "Site"), provides an online
            platform for users to find and communicate with their elected
            officials. The following terms and conditions govern all use of the
            Site and all content, services, and products available at or through
            the Site (taken together, the "Service"). The Service is owned and
            operated by Overton Corporation.
          </p>
          By accessing or using the Site or the Service, you agree to be bound
          by these terms and conditions, including the Privacy Policy, which is
          hereby incorporated by reference. If you do not agree to all of these
          terms and conditions, do not use the Site or the Service.
          <h3>Use of Service</h3>
          <p>
            The Service is for your personal and non-commercial use. You may use
            the Service only as permitted by law, and you may not use the
            Service for any illegal or unauthorized purpose. You agree not to,
            or attempt to, circumvent, disable, or otherwise interfere with
            security-related features of the Service or features that prevent or
            restrict use or copying of any content accessible through the
            Service.
          </p>
          <h3>User Information</h3>
          <p>
            You acknowledge that by providing information, including but not
            limited to your email address, name, and any correspondence you send
            through the Service, you grant Overton Corporation and the client
            that subscribes to use the Service the right to use and store this
            information for the purpose of providing the Service. We may also
            use this information to send you promotional and informational
            materials, unless you opt out of such communications.
          </p>
          <h3>Elected Officials Information</h3>
          <p>
            The information provided by the Site regarding elected officials is
            based on publicly available information and is believed to be
            accurate at the time it is collected. However, we do not guarantee
            its accuracy and shall not be liable for any inaccuracies.
          </p>
          <h3>Limitation of Liability</h3>
          <p>
            The Service is provided on an "as is" and "as available" basis
            without warranty of any kind, either express or implied. Overton
            Corporation makes no representations or warranties of any kind,
            express or implied, as to the operation of the Site or the
            information, content, materials, or products included on the Site.
            You agree that your use of the Site is at your sole risk.
          </p>
          <h3>Changes to Terms and Conditions</h3>
          <p>
            Overton Corporation reserves the right to make changes to these
            Terms and Conditions at any time and for any reason. The most
            current version of these Terms and Conditions will be posted on the
            Site and will become effective immediately upon posting. Your
            continued use of the Site after any changes are made constitutes
            your acceptance of the new Terms and Conditions.
          </p>
          <h3>Governing Law</h3>
          <p>
            These terms and conditions shall be governed by and construed in
            accordance with the laws of Australia. Any dispute arising under
            these terms and conditions shall be resolved exclusively by the
            courts located in Australia.
          </p>
          <h3>Contact Us</h3>
          <p>
            If you have any questions regarding these terms and conditions,
            please contact us at info@overton.solutions.
          </p>
          <h3>Entire Agreement</h3>
          <p>
            These terms and conditions constitute the entire agreement between
            you, Overton Corporation, and the client that subscribes to use the
            Service with respect to the use of the Site and the Service. <br/>
            These terms and conditions were last updated on 20/02/2023.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Terms;
