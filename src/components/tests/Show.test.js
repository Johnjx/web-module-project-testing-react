import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Show from './../Show';
import Episodes from '../Episodes';

const testShow = {
    name: "Stranger Things",
    summary: "Stranger Things summary",
    seasons: [
        {id: 0, name: "S1", episodes: []},
        {id: 1, name: "S2", episodes: []}
    ]
}

test('renders without errors', () => { 
    render(<Show show={testShow} selectedSeason="none"/>)
});

test('renders Loading component when prop show is null', () => { 
    render(<Show show={null}/>)
    const loadingComp = screen.getByTestId("loading-container")
    expect(loadingComp).toBeTruthy()
});

test('renders same number of options seasons are passed in', () => {
    render(<Show show={testShow} selectedSeason="none"/>)
    const seasonOptions = screen.getAllByTestId("season-option")
    expect(seasonOptions).toHaveLength(2)
 });

 test('handleSelect is called when an season is selected', () => { 
    const mockHandleSelect = jest.fn()

    render(<Show show={testShow} selectedSeason="none" handleSelect={mockHandleSelect}/>)
    const selectSeason = screen.queryByLabelText(/select a season/i)
    userEvent.selectOptions(selectSeason, ['0'])

    expect(mockHandleSelect).toHaveBeenCalledTimes(1)

});

test('component renders when no seasons are selected and when rerenders with a season passed in', () => { 
    const { rerender } = render(<Show show={testShow} selectedSeason="none"/>)
    let episodeList = screen.queryByTestId("episodes-container")
    expect(episodeList).not.toBeInTheDocument()

    rerender(<Show show={testShow} selectedSeason={1}/>)
    episodeList = screen.queryByTestId("episodes-container")
    expect(episodeList).toBeInTheDocument()
});
