import Header from "../components/Header";
import Layout from "../components/Layout";
import {Form, Button, Col, Row} from "react-bootstrap";
import { useState } from "react";
import ReadOnlineSteps from "../components/ReadOnlineSteps";
import { setHours } from "../slices/HoursSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Duration = () => {
  const [duration, setDuration] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDuration = (e) => {
    setDuration(e.target.value);
  };

  const handleDispatch = () => {
    dispatch(setHours(duration));
    navigate("/payment");
  }

  return (
    <>
      <Header />
      <Layout>
        <ReadOnlineSteps step1 step2 />

        <Form>
        <Row>

        <Col md={6}>
          <Form.Group controlId="duration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              as="select"
              value={duration}
              onChange={handleDuration}
            >
              {[...Array(24).keys()].map((hour) => (
                <option key={hour + 1} value={hour + 1}>
                  {hour + 1} hour{hour !== 0 && "s"}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Col>
          

          <br />

         <Col md={6}>
          <Button
          style={{marginTop: "30px"}}
            type="button"
            variant="primary"
            onClick={handleDispatch}
          >
            Continue
          </Button>
          </Col>
        </Row>
        </Form>
      </Layout>
    </>
  );
};

export default Duration;
