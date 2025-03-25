import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAllergyById } from 'common-allergies-js';
import { Container, Card, ListGroup, Button, Badge, Row, Col } from 'react-bootstrap';

const AllergyDetail = () => {
    const [allergy, setAllergy] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        try {
            const allergyData = getAllergyById(id);
            setAllergy(allergyData);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching allergy:', err);
        }
    }, [id]);

    if (error) {
        return (
            <Container className="py-4">
                <Button as={Link} to="/" variant="outline-primary" className="mb-4">
                    ← Back to List
                </Button>
                <div className="text-danger">Error: {error}</div>
            </Container>
        );
    }

    if (!allergy) {
        return (
            <Container className="py-4">
                <Button as={Link} to="/" variant="outline-primary" className="mb-4">
                    ← Back to List
                </Button>
                <div>Loading...</div>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <Button as={Link} to="/" variant="outline-primary" className="mb-4">
                ← Back to List
            </Button>
            
            <Card>
                <Card.Body>
                    <Card.Title as="h2" className="mb-4">
                        {allergy.name || 'Unknown Allergy'}
                        <Badge bg="info" className="ms-2">
                            {allergy.type}
                        </Badge>
                        {allergy.category && (
                            <Badge bg="secondary" className="ms-2">
                                {allergy.category}
                            </Badge>
                        )}
                    </Card.Title>

                    <Row>
                        <Col md={8}>
                            {allergy.medicalName && (
                                <div className="mb-4">
                                    <h3 className="h5 mb-2">Medical Name</h3>
                                    <Card.Text>{allergy.medicalName}</Card.Text>
                                </div>
                            )}
                        </Col>
                        <Col md={4}>
                            {allergy.prevalence && Object.keys(allergy.prevalence).length > 0 && (
                                <div className="mb-4">
                                    <h3 className="h5 mb-2">Prevalence</h3>
                                    <ListGroup>
                                        {Object.entries(allergy.prevalence).map(([demographic, value], index) => (
                                            <ListGroup.Item key={index}>
                                                <strong>{demographic}:</strong> {value}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>
                            )}
                        </Col>
                    </Row>

                    {allergy.commonSymptoms && allergy.commonSymptoms.length > 0 && (
                        <div className="mb-4">
                            <h3 className="h5 mb-2">Common Symptoms</h3>
                            <ListGroup>
                                {allergy.commonSymptoms.map((symptom, index) => (
                                    <ListGroup.Item key={index}>{symptom}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    )}

                    {allergy.crossReactivity && allergy.crossReactivity.length > 0 && (
                        <div className="mb-4">
                            <h3 className="h5 mb-2">Cross Reactivity</h3>
                            <ListGroup>
                                {allergy.crossReactivity.map((item, index) => (
                                    <ListGroup.Item key={index}>{item}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    )}

                    {allergy.avoidFoods && allergy.avoidFoods.length > 0 && (
                        <div className="mb-4">
                            <h3 className="h5 mb-2">Foods to Avoid</h3>
                            <ListGroup>
                                {allergy.avoidFoods.map((food, index) => (
                                    <ListGroup.Item key={index}>{food}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    )}

                    {allergy.commonSources && allergy.commonSources.length > 0 && (
                        <div className="mb-4">
                            <h3 className="h5 mb-2">Common Sources</h3>
                            <ListGroup>
                                {allergy.commonSources.map((source, index) => (
                                    <ListGroup.Item key={index}>{source}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    )}

                    {allergy.seasonality && Object.keys(allergy.seasonality).length > 0 && (
                        <div className="mb-4">
                            <h3 className="h5 mb-2">Seasonality</h3>
                            <ListGroup>
                                {Object.entries(allergy.seasonality).map(([season, info], index) => (
                                    <ListGroup.Item key={index}>
                                        <strong>{season}:</strong> {info}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    )}

                    {allergy.peakSeasons && (
                        <div className="mb-4">
                            <h3 className="h5 mb-2">Peak Seasons</h3>
                            <Card.Text>{allergy.peakSeasons}</Card.Text>
                        </div>
                    )}

                    {allergy.allergenProteins && Object.keys(allergy.allergenProteins).length > 0 && (
                        <div className="mb-4">
                            <h3 className="h5 mb-2">Allergen Proteins</h3>
                            <ListGroup>
                                {Object.entries(allergy.allergenProteins).map(([source, protein], index) => (
                                    <ListGroup.Item key={index}>
                                        <strong>{source}:</strong> {protein}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    )}

                    {allergy.testingMethods && allergy.testingMethods.length > 0 && (
                        <div className="mb-4">
                            <h3 className="h5 mb-2">Testing Methods</h3>
                            <ListGroup>
                                {allergy.testingMethods.map((method, index) => (
                                    <ListGroup.Item key={index}>{method}</ListGroup.Item>
                                ))}
                            </ListGroup>
                        </div>
                    )}

                    {allergy.treatment && (
                        <div className="mb-4">
                            <h3 className="h5 mb-2">Treatment</h3>
                            <Card.Text>{allergy.treatment}</Card.Text>
                        </div>
                    )}
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AllergyDetail;