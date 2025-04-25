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
    selectRadioByName("spontaneous_activity", "Mild - Normal");
    selectRadioByName("posture", "Severe - Decerebrate");
    selectRadioByName("tone", "Moderate - Hypotonia (focal/general), hypertonia (focal/truncal)");
    selectRadioByName("suck", "Mild - Decreased");
    selectRadioByName("moro", "Normal - Complete");
    selectRadioByName("pupils", "Mild - Mydriasis");
    selectRadioByName("heart_rate", "Mild - Tachycardia (>160)");
    selectRadioByName("respirations", "Mild - Hyperventilation (RR > 60)");



    fireEvent.click(screen.getByText("Summarize Results"));
    
    const summary = screen.getByTestId("summary");
    expect(summary).toHaveTextContent("The neonate shows signs of Moderate encephalopathy");

  });
  test('does not qualify due to insufficient predictors and mild signs', () => {
    render(
      <MemoryRouter>
        <RightBranch />
      </MemoryRouter>
    );
  
    selectRadioByName("gestational_age", "Yes");
    selectRadioByName("birth_weight", "Yes");
    selectRadioByName("time_since_insult", "Yes");
    selectRadioByName("acute_perinatal_event", "No");
    selectRadioByName("apgar_assisted_ventilation", "No");
    selectRadioByName("has_seizures", "No");
  
    fireEvent.change(screen.getByPlaceholderText("pH"), { target: { value: '7.25' } });
    fireEvent.change(screen.getByPlaceholderText("Base Deficit"), { target: { value: '5.5' } });
  
    selectRadioByName("level_of_consciousness", "Mild - Hyper-alert");
    selectRadioByName("spontaneous_activity", "Mild - Normal");
    selectRadioByName("posture", "Normal - Predominantly flexed when quiet");
    selectRadioByName("tone", "Mild - Normal or slightly increased peripheral tone");
    selectRadioByName("suck", "Mild - Decreased");
    selectRadioByName("moro", "Mild - Partial response, low threshold to elicit");
    selectRadioByName("pupils", "Normal");
    selectRadioByName("heart_rate", "Normal - 100–160");
    selectRadioByName("respirations", "Normal - Regular respirations");
  
    fireEvent.click(screen.getByText("Summarize Results"));
  
    const summary = screen.getByTestId("summary");
    expect(summary).toHaveTextContent("The neonate shows signs of Mild encephalopathy");
  });
  test('qualifies via Predictor A with 3 moderate signs (Moderate encephalopathy)', () => {
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
    selectRadioByName("has_seizures", "No");
  
    fireEvent.change(screen.getByPlaceholderText("pH"), { target: { value: '7.00' } });
    fireEvent.change(screen.getByPlaceholderText("Base Deficit"), { target: { value: '16.1' } });
  
    // 3 moderate signs
    selectRadioByName("level_of_consciousness", "Moderate - Lethargic");
    selectRadioByName("posture", "Moderate - Distal flexion, complete extension, frog leg posture");
    selectRadioByName("tone", "Moderate - Hypotonia (focal/general), hypertonia (focal/truncal)");
  
    fireEvent.click(screen.getByText("Summarize Results"));
  
    const summary = screen.getByTestId("summary");
    expect(summary).toHaveTextContent("The neonate shows signs of Moderate encephalopathy");
  });
  test('does not qualify – only mild signs and fails predictors', () => {
    render(
      <MemoryRouter>
        <RightBranch />
      </MemoryRouter>
    );
  
    selectRadioByName("gestational_age", "Yes");
    selectRadioByName("birth_weight", "Yes");
    selectRadioByName("time_since_insult", "Yes");
    selectRadioByName("acute_perinatal_event", "No");
    selectRadioByName("apgar_assisted_ventilation", "No");
    selectRadioByName("has_seizures", "No");
  
    fireEvent.change(screen.getByPlaceholderText("pH"), { target: { value: '7.25' } });
    fireEvent.change(screen.getByPlaceholderText("Base Deficit"), { target: { value: '5.2' } });
  
    selectRadioByName("level_of_consciousness", "Mild - Hyper-alert, jitteriness, high-pitched cry, inconsolable");
    selectRadioByName("spontaneous_activity", "Mild - Normal");
    selectRadioByName("posture", "Mild - Mild flexion of distal joints");
    selectRadioByName("tone", "Mild - Normal or slightly increased peripheral tone");
    selectRadioByName("suck", "Mild - Decreased");
    selectRadioByName("moro", "Mild - Partial response, low threshold to elicit");
    selectRadioByName("pupils", "Mild - Mydriasis");
    selectRadioByName("heart_rate", "Mild - Tachycardia (>160)");
    selectRadioByName("respirations", "Mild - Hyperventilation (RR > 60)");
  
    fireEvent.click(screen.getByText("Summarize Results"));
  
    const summary = screen.getByTestId("summary");
    expect(summary).toHaveTextContent("The neonate shows signs of Mild");
  });
});
