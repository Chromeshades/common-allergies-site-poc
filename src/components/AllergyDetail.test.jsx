import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AllergyDetail from './AllergyDetail';
import { getAllergyById } from 'common-allergies-js';

// Silence console.error for expected test errors
const originalError = console.error;
beforeAll(() => {
    console.error = jest.fn();
});

afterAll(() => {
    console.error = originalError;
});

jest.mock('common-allergies-js');

const mockAllergy = {
    id: '1',
    name: 'Peanut Allergy',
    description: 'A common food allergy',
    type: 'Food Allergy',
    category: 'Food',
    medicalName: 'Arachis hypogaea allergy',
    commonSymptoms: ['Hives', 'Swelling'],
    treatment: 'Avoid peanuts and carry epinephrine',
    crossReactivity: ['Tree nuts'],
    avoidFoods: ['Peanuts', 'Peanut oil'],
    prevalence: {
        'General Population': '2%',
        'Children': '5%'
    }
};

describe('AllergyDetail', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        getAllergyById.mockReturnValue(mockAllergy);
    });

    const renderComponent = (id = '1') => {
        return render(
            <BrowserRouter>
                <Routes>
                    <Route path="*" element={<AllergyDetail />} />
                </Routes>
            </BrowserRouter>
        );
    };

    test('renders allergy details', () => {
        renderComponent();
        expect(screen.getByText(mockAllergy.name)).toBeInTheDocument();
        expect(screen.getByText(mockAllergy.type)).toBeInTheDocument();
        expect(screen.getByText(mockAllergy.category)).toBeInTheDocument();
        expect(screen.getByText(mockAllergy.medicalName)).toBeInTheDocument();
        expect(screen.getByText(mockAllergy.treatment)).toBeInTheDocument();
    });

    test('renders lists correctly', () => {
        renderComponent();
        mockAllergy.commonSymptoms.forEach(symptom => {
            expect(screen.getByText(symptom)).toBeInTheDocument();
        });
        mockAllergy.crossReactivity.forEach(item => {
            expect(screen.getByText(item)).toBeInTheDocument();
        });
        mockAllergy.avoidFoods.forEach(food => {
            expect(screen.getByText(food)).toBeInTheDocument();
        });
    });

    test('renders prevalence data', () => {
        renderComponent();
        Object.entries(mockAllergy.prevalence).forEach(([demographic, value]) => {
            expect(screen.getByText(demographic + ':')).toBeInTheDocument();
            expect(screen.getByText(value)).toBeInTheDocument();
        });
    });

    test('handles error state', async () => {
        const errorMessage = 'Failed to fetch';
        getAllergyById.mockImplementation(() => {
            throw new Error(errorMessage);
        });
        
        renderComponent();
        expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
        expect(screen.getByText(/back to list/i)).toBeInTheDocument();
    });

    test('renders loading state', () => {
        getAllergyById.mockReturnValue(null);
        renderComponent();
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    test('renders back button', () => {
        renderComponent();
        const backButton = screen.getByText(/back to list/i);
        expect(backButton).toBeInTheDocument();
        expect(backButton.closest('a')).toHaveAttribute('href', '/');
    });
});