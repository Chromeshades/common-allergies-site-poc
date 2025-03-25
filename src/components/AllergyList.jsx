import React, { useEffect, useState } from 'react';
import { getAllergies } from 'common-allergies-js';
import { Link } from 'react-router-dom';
import { Card, Container, Row, Col, Form } from 'react-bootstrap';

const AllergyList = () => {
    const [allergies, setAllergies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedType, setSelectedType] = useState('');

    const getUniqueCategories = () => {
        const categories = new Set(allergies.map(allergy => allergy.category));
        return Array.from(categories).sort();
    };

    const getUniqueTypes = () => {
        const types = new Set(allergies.map(allergy => allergy.type));
        return Array.from(types).sort();
    };

    useEffect(() => {
        const fetchAllergies = async () => {
            try {
                const data = getAllergies();
                if (!Array.isArray(data)) {
                    throw new Error('Invalid data received from getAllergies');
                }
                setAllergies(data);
            } catch (error) {
                console.error('Error fetching allergies:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAllergies();
    }, []);

    const filteredAllergies = allergies.filter(allergy => {
        const searchTermLower = searchTerm.toLowerCase();
        const searchableFields = [
            allergy.name,
            allergy.description,
            allergy.commonSymptoms?.join(' '),
            allergy.crossReactivity?.join(' '),
            allergy.treatment,
            allergy.avoidFoods?.join(' '),
            allergy.prevention?.join(' '),
            allergy.category,
            allergy.type,
            allergy.commonNames?.join(' ')
        ];
        
        const matchesSearch = searchTerm === '' || searchableFields
            .filter(Boolean)
            .some(field => field.toLowerCase().includes(searchTermLower));
            
        const matchesCategory = !selectedCategory || allergy.category === selectedCategory;
        const matchesType = !selectedType || allergy.type === selectedType;
        
        return matchesSearch && matchesCategory && matchesType;
    });

    if (loading) {
        return (
            <Container className="py-4">
                <div className="text-center">Loading...</div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="py-4">
                <h1>Error</h1>
                <p className="text-danger">{error}</p>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            <h1 className="mb-4 text-center">Common Allergies List</h1>
            
            <Form className="mb-4">
                <Row>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Control
                                type="text"
                                placeholder="Search allergies..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Categories</Form.Label>
                            <Form.Select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">All Categories</option>
                                {getUniqueCategories().map(category => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col md={4}>
                        <Form.Group className="mb-3">
                            <Form.Label>Types</Form.Label>
                            <Form.Select
                                value={selectedType}
                                onChange={(e) => setSelectedType(e.target.value)}
                            >
                                <option value="">All Types</option>
                                {getUniqueTypes().map(type => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>

            {(!filteredAllergies || filteredAllergies.length === 0) ? (
                <p className="text-center">No allergies found</p>
            ) : (
                <Row xs={1} md={2} lg={3} className="g-4">
                    {filteredAllergies.map((allergy, index) => (
                        <Col key={allergy.id || `allergy-${index}`}>
                            <Card className="h-100 hover-shadow">
                                <Card.Body>
                                    <Card.Title>{allergy.name || 'Unnamed Allergy'}</Card.Title>
                                    {allergy.description && (
                                        <Card.Text className="text-muted">
                                            {allergy.description.length > 100 
                                                ? `${allergy.description.substring(0, 100)}...` 
                                                : allergy.description}
                                        </Card.Text>
                                    )}
                                    <div className="mb-3">
                                        <span 
                                            className="badge bg-secondary me-2"
                                            style={{ cursor: 'pointer', position: 'relative', zIndex: 2 }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedCategory(allergy.category);
                                            }}
                                            data-testid={`category-badge-${allergy.category}`}
                                        >
                                            {allergy.category}
                                        </span>
                                        <span 
                                            className="badge bg-info"
                                            style={{ cursor: 'pointer', position: 'relative', zIndex: 2 }}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setSelectedType(allergy.type);
                                            }}
                                            data-testid={`type-badge-${allergy.type}`}
                                        >
                                            {allergy.type}
                                        </span>
                                    </div>
                                    <div style={{ position: 'relative', zIndex: 1 }}>
                                        <Link 
                                            to={`/allergy/${allergy.id}`}
                                            className="btn btn-primary"
                                            style={{ width: '100%' }}
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default AllergyList;