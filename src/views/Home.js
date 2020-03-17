import React, { useState, useEffect, useContext } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button, Pagination, PaginationItem, PaginationLink
} from "reactstrap";

import {
  keysUrl,
  getHeaders,
  errorToast,
  successToast,
  infoToast
} from "../config";
import { toast } from "react-toastify";
import axios from "axios";

const Home = props => {
  const [keys, setKeys] = useState([]);

  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);
  const [processingError, setProcessingError] = useState([]);
  
  const [nextUrl, setNextUrl] = useState(null);
  const [previousUrl, setPreviousUrl] = useState(null);
  const [count, setCount] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // get keys
  const getKeys = async (url) => {
    setLoading(true);
    await axios
      .get(url, { headers: getHeaders() })
      .then(res => {
        setLoading(false);
        setKeys(res.data.results);
      })
      .catch(err => {
        if (err.response) {
          setLoading(false);
          setServerErrors(err.response.data);
        } else {
          setLoading(false);
        }
        errorToast(toast, "Error Retrieving Keys, Try Again.", err, props);
      });
  };
  // end keys


  const updateKeys = () => {
    getKeys(keysUrl);
  };

  useEffect(() => {
    getKeys(keysUrl);
  }, []);

  const handleDelete = async id => {
    setLoading(true);
    await axios
      .delete(keysUrl + `${id}/`, { headers: getHeaders() })
      .then(res => {
        setLoading(false);
        updateKeys();
      })
      .catch(err => {
        if (err.response) {
          setLoading(false);
          setServerErrors(err.response.data);
        } else {
          setLoading(false);
        }
        errorToast(toast, "Error Deleting Key, Try Again.", err, props);
      });
  };

  // handle table pagination
  const handleNext = e => {
    e.preventDefault();
    getKeys(nextUrl);
    let cp = currentPage;
    setCurrentPage(cp + 1);
  };

  const handlePrevious = e => {
    e.preventDefault();
    getKeys(previousUrl);
    let cp = currentPage;
    setCurrentPage(cp - 1);
  };

  const fullArraySizeNow = currentPage * pageSize;
  const indexSet = fullArraySizeNow - pageSize;
  // end table pagination

  return (
      <Container fluid className="main-content-container px-5">

        <Row className="text-center mb-5">
          

          {ready ? (
            <React.Fragment>
                <Col lg={{ size: 12 }}>
                  <Card small className="mb-4 ml-5">
                    <CardHeader className="border-bottom">
                      <h4 className="m-0">
                        Generated Product Keys
                      </h4>
                    </CardHeader>
                    <CardBody className="p-0 pb-3">
                      <table className="table mb-0">
                        <thead className="bg-light">
                          <tr>
                            <th scope="col" className="border-0">
                              <span className="text-primary">#</span>
                            </th>
                            <th scope="col" className="border-0">
                              <span className="text-primary">
                                Key Text
                              </span>
                            </th>
                            <th scope="col" className="border-0">
                              <span className="text-primary">Used</span>
                            </th>

                            <th scope="col" className="border-0">
                              <span className="text-info">
                                Date Created
                              </span>
                            </th>

                            <th scope="col" className="border-0">
                              <span className="text-success">Date Updated</span>
                            </th>

                            <th>
                              <span className="text-danger">Action</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {keys.map((key, index) => (
                            <tr>
                              <td>
                                <span className="text-primary">
                                  {index + 1 + indexSet}
                                </span>
                              </td>
                              <td>{key.text}</td>
                              <td>${key.used}</td>
                              <td>
                                <span className="text-info">
                                  {key.created_at}
                                </span>
                              </td>

                              <td>
                                <span className="text-success">
                                  {key.secondary}
                                </span>
                              </td>
                              
                                <td>
                                  <Button
                                    size="sm"
                                    theme="danger"
                                    onClick={handleDelete.bind(
                                      this,
                                      key.id
                                    )}
                                  >
                                    <i className="fa fa-check" />
                                    {loading && (
                                      <i className="fas fa-spinner fa-spin" />
                                    )}
                                  </Button>
                                </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardBody>
                  </Card>
                  <Pagination
                    aria-label="Page navigation example"
                    className="ml-5"
                  >
                    {/* <PaginationItem>
                  <PaginationLink first href="#" />
                </PaginationItem> */}
                    {previousUrl && (
                      <PaginationItem>
                        <PaginationLink
                          previous
                          href="#"
                          onClick={handlePrevious}
                        >
                          Previous
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {nextUrl && (
                      <PaginationItem>
                        <PaginationLink next href="#" onClick={handleNext}>
                          Next
                        </PaginationLink>
                      </PaginationItem>
                    )}

                    {/* <PaginationItem>
                  <PaginationLink last href="#" />
                </PaginationItem> */}
                  </Pagination>
                </Col>
            </React.Fragment>
          ) : (
            <Col lg={{ size: 4, offset: 4 }} className="text-center">
              <i className="fas fa-spinner fa-spin fa-5x"></i>
            </Col>
          )}
        </Row>
      </Container>
  );
};

export default Home;
