import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Display from './../Display';
import fetchShow from '../../api/fetchShow';


jest.mock('../../api/fetchShow')

const testShow = {
    name: "Stranger Things",
    summary: "Stranger Things summary",
    seasons: [
        {id: 0, name: "S1", episodes: []},
        {id: 1, name: "S2", episodes: []}
    ]
}

test('renders without errors with no props', () => { 
    render(<Display/>)
});

test('renders Show component when the button is clicked ', async () => { 
    render(<Display/>)
    
    fetchShow.mockResolvedValueOnce(testShow)

    const button = screen.getByRole("button")
    userEvent.click(button)

   const show = await screen.findByTestId("show-container")
   expect(show).toBeInTheDocument()
});

test('renders show season options matching your data when the button is clicked', async () => {
    render(<Display/>)
    
    fetchShow.mockResolvedValueOnce(testShow)

    const button = screen.getByRole("button")
    userEvent.click(button) 

    const options = await screen.findAllByTestId("season-option")
    expect(options).toHaveLength(2)
});

test("when the fetch button is pressed, displayFunc is called", async () => {
    const mockDisplayFunc = jest.fn()
    fetchShow.mockResolvedValueOnce(testShow)

    render(<Display displayFunc={mockDisplayFunc}/>)
    const button = screen.getByRole("button")
    userEvent.click(button)

    await waitFor(() => {
        expect(mockDisplayFunc.mock.calls.length).toBe(1)
    })
})