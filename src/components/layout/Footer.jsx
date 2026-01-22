import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  const siteUrl = "https://configura-pro.vercel.app/";

  return (
    <footer className="bg-light border-top mt-auto py-2">
      <Container>
        <Row className="align-items-center">
          {/* Text */}
          <Col>
            <div className="text-muted">
              © {new Date().getFullYear()}{" "}
              <a
                href={siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none fw-semibold"
              >
                ConfiguraPro
              </a>
              . All rights reserved.
            </div>
          </Col>

          {/* Logo */}
          <Col className="text-end">
            <a
              href={siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="d-inline-block"
            >
              <img
                src="/logo.png"
                alt="ConfiguraPro Logo"
                height="60"
                style={{ cursor: "pointer" }}
              />
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
