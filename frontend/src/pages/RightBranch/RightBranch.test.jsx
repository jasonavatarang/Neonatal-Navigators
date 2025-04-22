import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RightBranch from './RightBranch';
import '@testing-library/jest-dom';

beforeAll(() => {
  window.scrollTo = jest.fn();
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1000 });
});

function selectRadioByName(name, visibleTextFragment) {
  const inputs = screen.getAllByRole('radio', { hidden: true }).filter(r => r.getAttribute('name') === name);

  for (const input of inputs) {
    const label = input.closest('label');
    if (label && label.textContent.toLowerCase().includes(visibleTextFragment.toLowerCase())) {
      fireEvent.click(input);
      return;
    }
  }

  throw new Error(`No matching radio button found for name="${name}" and label fragment="${visibleTextFragment}"`);
}


describe('SARNAT Exam', () => {
  test('qualifies for systemic hypothermia', () => {
    render(
      <MemoryRouter>
        <RightBranch />
      </MemoryRouter>
    );

    selectRadioByName("gestational_age", "Yes");
    selectRadioByName("birth_weight", "Yes");
    selectRadioByName("time_since_insult", "Yes");
    selectRadioByName("acute_perinatal_event", "Yes");
    selectRadioByName("apgar_assisted_ventilation", "Yes");
    selectRadioByName("has_seizures", "Yes");

    fireEvent.change(screen.getByPlaceholderText("pH"), { target: { value: '7.00' } });
    fireEvent.change(screen.getByPlaceholderText("Base Deficit"), { target: { value: '16.1' } });

    selectRadioByName("level_of_consciousness", "Moderate - Lethargic");
    selectRadioByName("posture", "Severe - Decerebrate");
    selectRadioByName("tone", "Moderate - Hypotonia (focal/general), hypertonia (focal/truncal)");
    fireEvent.click(screen.getByText("Summarize Results"));

    expect(screen.getByText(/qualifies/i)).toBeInTheDocument();
    expect(screen.getAllByText(/Severe/i).length).toBeGreaterThan(0);
  });
});
