import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardHeader,
  Form,
  FormInput,
  ListGroup,
  ListGroupItem,
  Button,
  FormSelect
} from "reactstrap";

import {
  keysUrl,
  getHeaders,
  errorToast,
} from "../config";
import axios from "axios";
import { toast } from "react-toastify";

const DetailCard = props => {
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [key, setKey] = useState({});

  const { history, id } = props;

  // get key
  const getKey = () => {
    setLoading(true);

    axios
      .get(keysUrl + `${id}/`, { headers: getHeaders() })
      .then(res => {
        setLoading(false);
        setKey(res.data);
      })
      .catch(err => {
        if (err.response) {
          setLoading(false);
          setServerErrors(err.response.data);
        } else {
          setLoading(false);
        }
        errorToast(toast, "Error Retrieving Key, Try Again.", err, props);
      });
  };
  // end key

  useEffect(() => {
    getKey();
  }, []);

  const handleHome = e => {
    e.preventDefault();
    history.push(`/`);
  };

  return (
    <Card small className="mb-3">
      <CardHeader>
        <h5 className="text-center">
          Generated Key
        </h5>
      </CardHeader>
      <CardBody>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <span className="d-flex mb-2">
              <i className="material-icons mr-1">view</i>
              <strong className="mr-1">Key Text:</strong>{" "}
              {key.text}
            </span>
            <span className="d-flex mb-2">
              <i className="material-icons mr-1">view</i>
              <strong className="mr-1">Used:</strong>{" "}
              <strong className="text-success">{key.used}</strong>
            </span>
            <span className="d-flex mb-2">
              <i className="material-icons mr-1">view</i>
              <strong className="mr-1">Date Created:</strong> {key.created_at}
            </span>
            <span className="d-flex">
              <i className="material-icons mr-1">view</i>
              <strong className="mr-1">Date Updated:</strong>{" "}
              <strong className="text-warning">{key.updated_at}</strong>
            </span>
          </ListGroupItem>
          <ListGroupItem className="d-flex px-3 border-0">
            <Button
              theme="accent"
              size="sm"
              className="ml-auto btn-block"
              disabled={disabled}
              onClick={handleHome}
            >
              View All
              {loading && <i className="fas fa-spinner fa-spin"></i>}
              {!loading && <i className="fa fa-arrow-right"></i>}
            </Button>
          </ListGroupItem>
        </ListGroup>
      </CardBody>
    </Card>
  );
};

const Detail = props => {
  const { history } = props;
  const { id } = props.match.params;

  return (
      <Container fluid className="main-content-container px-4 pb-4">

        <Row>
          {/* Form */}
          <Col lg={{ size: 6, offset: 3 }} md="12">
            <DetailCard history={history} id={id} />
          </Col>
        </Row>
      </Container>
  );
};

export default Detail;
