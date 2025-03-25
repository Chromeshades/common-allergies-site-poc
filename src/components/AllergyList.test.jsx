import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AllergyList from './AllergyList';
import { getAllergies } from 'common-allergies-js';

// Silence console.error for expected test errors
const originalError = console.error;
beforeAll(() => {
    console.error = jest.fn();
});

afterAll(() => {
    console.error = originalError;
});

afterEach(() => {
    cleanup();
    jest.clearAllMocks();
});

// Mock the common-allergies-js module
jest.mock('common-allergies-js');

const mockAllergies = [
    {
        id: '1',
        name: 'Peanut Allergy',
        description: 'Common food allergy',
        category: 'Food',
        type: 'Food Allergy'
    },
    {
        id: '2',
        name: 'Cat Allergy',
        description: 'Pet dander allergy',
        category: 'Pet',
        type: 'Environmental'
    }
];

describe('AllergyList', () => {
    beforeEach(() => {
        getAllergies.mockReturnValue(mockAllergies);
    });

    const renderComponent = () => {
        return render(
            <BrowserRouter>
                <AllergyList />
            </BrowserRouter>
        );
    };

    test('renders allergy list', () => {
        renderComponent();
        expect(screen.getByText('Common Allergies List')).toBeInTheDocument();
        expect(screen.getByText('Peanut Allergy')).toBeInTheDocument();
        expect(screen.getByText('Cat Allergy')).toBeInTheDocument();
    });

    test('filters allergies by search term', () => {
        renderComponent();
        const searchInput = screen.getByPlaceholderText('Search allergies...');
        fireEvent.change(searchInput, { target: { value: 'peanut' } });
        expect(screen.getByText('Peanut Allergy')).toBeInTheDocument();
        expect(screen.queryByText('Cat Allergy')).not.toBeInTheDocument();
    });

    test('clicking category badge updates category filter', () => {
        renderComponent();
        const categoryBadge = screen.getByTestId('category-badge-Food');
        fireEvent.click(categoryBadge);
        expect(screen.getByText('Peanut Allergy')).toBeInTheDocument();
        expect(screen.queryByText('Cat Allergy')).not.toBeInTheDocument();
    });

    test('clicking type badge updates type filter', () => {
        renderComponent();
        const typeBadge = screen.getByTestId('type-badge-Environmental');
        fireEvent.click(typeBadge);
        expect(screen.queryByText('Peanut Allergy')).not.toBeInTheDocument();
        expect(screen.getByText('Cat Allergy')).toBeInTheDocument();
    });

    test('handles error state', () => {
        getAllergies.mockImplementation(() => {
            throw new Error('Failed to fetch');
        });
        renderComponent();
        expect(screen.getByText(/error/i)).toBeInTheDocument();
    });
});