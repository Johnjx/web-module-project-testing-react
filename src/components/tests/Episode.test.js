import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Episode from './../Episode';

const testEpisode = {
    id: 1,
    image: "",
    name: "",
    season: 1,
    number: 1,
    summary: "Stranger Things ep. summary",
    runtime: 1
}

const testEpisodeNullImage = {
    id: 1,
    image: null,
    name: "",
    season: 1,
    number: 1,
    summary: "Stranger Things ep. summary",
    runtime: 40
}

test("renders without error", () => { 
    render(<Episode episode={testEpisode}/>)
});

test("renders the summary test passed as prop", () => { 
    render(<Episode episode={testEpisode}/>)
    const summary = screen.queryByText(/stranger things ep. summary/i)
    expect(summary).toBeInTheDocument()
    expect(summary).not.toBeNull()
    expect(summary).toBeVisible()
});

test("renders default image when image is not defined", () => { 
    render(<Episode episode={testEpisodeNullImage}/>)
    const altTag = screen.queryByAltText('https://i.ibb.co/2FsfXqM/stranger-things.png')
    expect(altTag).toBeInTheDocument()
});
